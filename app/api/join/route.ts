import {
  createRateLimiter,
  escapeHtml,
  getClientIp,
  getTransporter,
  readPayload,
  readString,
} from "@/lib/mail";
import {
  EMAIL_PATTERN,
  isValidPhone,
  normalizeHttpUrl,
} from "@/lib/validation";

// Nodemailer needs Node.js APIs, so this handler cannot run on the edge runtime.
export const runtime = "nodejs";

const LIMITS = {
  name: 100,
  email: 254,
  phone: 25,
  state: 100,
  link: 500,
} as const;

const RATE_LIMIT = {
  windowMs: 10 * 60 * 1000,
  max: 5,
} as const;

const isRateLimited = createRateLimiter(RATE_LIMIT);

type JoinForm = {
  name: string;
  email: string;
  phone: string;
  state: string;
  linkedin: string;
  portfolio: string;
};

type FieldErrors = Partial<Record<keyof JoinForm, string>>;

function validate(payload: Record<string, unknown>) {
  const values: JoinForm = {
    name: readString(payload, "name"),
    email: readString(payload, "email"),
    phone: readString(payload, "phone"),
    state: readString(payload, "state"),
    linkedin: readString(payload, "linkedin"),
    portfolio: readString(payload, "portfolio"),
  };

  const errors: FieldErrors = {};

  if (!values.name) {
    errors.name = "Please enter your name.";
  } else if (values.name.length > LIMITS.name) {
    errors.name = `Your name must be ${LIMITS.name} characters or fewer.`;
  } else if (/[\r\n]/.test(values.name)) {
    errors.name = "Your name must be a single line.";
  }

  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (
    values.email.length > LIMITS.email ||
    !EMAIL_PATTERN.test(values.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.phone) {
    errors.phone = "Please enter your phone number.";
  } else if (values.phone.length > LIMITS.phone || !isValidPhone(values.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.state) {
    errors.state = "Please enter your state or governorate.";
  } else if (values.state.length > LIMITS.state) {
    errors.state = `Your state must be ${LIMITS.state} characters or fewer.`;
  } else if (/[\r\n]/.test(values.state)) {
    errors.state = "Your state must be a single line.";
  }

  if (values.linkedin) {
    if (values.linkedin.length > LIMITS.link) {
      errors.linkedin = `Your LinkedIn link must be ${LIMITS.link} characters or fewer.`;
    } else if (!normalizeHttpUrl(values.linkedin)) {
      errors.linkedin = "Please enter a valid LinkedIn URL.";
    }
  }

  if (values.portfolio) {
    if (values.portfolio.length > LIMITS.link) {
      errors.portfolio = `Your portfolio link must be ${LIMITS.link} characters or fewer.`;
    } else if (!normalizeHttpUrl(values.portfolio)) {
      errors.portfolio = "Please enter a valid portfolio URL.";
    }
  }

  return { values, errors };
}

export async function POST(request: Request) {
  const payload = await readPayload(request);
  const { values, errors } = validate(payload);

  if (Object.keys(errors).length > 0) {
    return Response.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        errors,
      },
      { status: 400 },
    );
  }

  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return Response.json(
      {
        ok: false,
        message: "Too many applications sent. Please try again in a few minutes.",
      },
      { status: 429 },
    );
  }

  const to = process.env.JOIN_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;

  if (!to) {
    console.error("JOIN_TO_EMAIL (or CONTACT_TO_EMAIL) is not set.");
    return Response.json(
      {
        ok: false,
        message: "The application form is not configured yet. Please try again later.",
      },
      { status: 500 },
    );
  }

  const linkedinUrl = values.linkedin ? normalizeHttpUrl(values.linkedin) : null;
  const portfolioUrl = values.portfolio
    ? normalizeHttpUrl(values.portfolio)
    : null;

  const details: Array<{ label: string; value: string; href?: string }> = [
    { label: "Name", value: values.name },
    { label: "Email", value: values.email, href: `mailto:${values.email}` },
    {
      label: "Phone",
      value: values.phone,
      href: `tel:${values.phone.replace(/[^\d+]/g, "")}`,
    },
    { label: "State / Governorate", value: values.state },
    {
      label: "LinkedIn",
      value: linkedinUrl ?? "Not provided",
      href: linkedinUrl ?? undefined,
    },
    {
      label: "Portfolio",
      value: portfolioUrl ?? "Not provided",
      href: portfolioUrl ?? undefined,
    },
  ];

  try {
    const transporter = getTransporter();
    const from = process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER;

    await transporter.sendMail({
      // A plain address in `from` avoids header-injection tricks via user input.
      // Replies go straight back to the applicant through `replyTo`.
      from,
      to,
      replyTo: values.email,
      subject: `New Join Us application from ${values.name}`,
      text: details.map((detail) => `${detail.label}: ${detail.value}`).join("\n"),
      html: `
        <h2 style="margin:0 0 16px">New Join Us application</h2>
        <table style="border-collapse:collapse">
          <tbody>
            ${details
              .map(
                (detail) => `
              <tr>
                <td style="padding:6px 16px 6px 0;vertical-align:top;color:#666">${escapeHtml(
                  detail.label,
                )}</td>
                <td style="padding:6px 0;vertical-align:top;white-space:pre-wrap">${
                  detail.href
                    ? `<a href="${escapeHtml(detail.href)}">${escapeHtml(
                        detail.value,
                      )}</a>`
                    : escapeHtml(detail.value)
                }</td>
              </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      `,
    });

    return Response.json({
      ok: true,
      message: "Thanks! Your application has been sent.",
    });
  } catch (error) {
    console.error("Failed to send join us email:", error);

    return Response.json(
      {
        ok: false,
        message:
          "We could not send your application right now. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
