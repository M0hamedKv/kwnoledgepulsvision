import {
  createRateLimiter,
  escapeHtml,
  getClientIp,
  getTransporter,
  readPayload,
  readString,
} from "@/lib/mail";
import { EMAIL_PATTERN } from "@/lib/validation";

// Nodemailer needs Node.js APIs, so this handler cannot run on the edge runtime.
export const runtime = "nodejs";

const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

const RATE_LIMIT = {
  windowMs: 10 * 60 * 1000,
  max: 5,
} as const;

const isRateLimited = createRateLimiter(RATE_LIMIT);

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof ContactForm, string>>;

function readField(payload: Record<string, unknown>, key: keyof ContactForm) {
  return readString(payload, key);
}

function validate(payload: Record<string, unknown>) {
  const values: ContactForm = {
    name: readField(payload, "name"),
    email: readField(payload, "email"),
    message: readField(payload, "message"),
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

  if (!values.message) {
    errors.message = "Please enter a message.";
  } else if (values.message.length > LIMITS.message) {
    errors.message = `Your message must be ${LIMITS.message} characters or fewer.`;
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
        message: "Too many messages sent. Please try again in a few minutes.",
      },
      { status: 429 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL;

  if (!to) {
    console.error("CONTACT_TO_EMAIL is not set.");
    return Response.json(
      {
        ok: false,
        message: "The contact form is not configured yet. Please try again later.",
      },
      { status: 500 },
    );
  }

  try {
    const transporter = getTransporter();
    const from = process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER;

    await transporter.sendMail({
      // A plain address in `from` avoids header-injection tricks via user input.
      // Replies go straight back to the visitor through `replyTo`.
      from,
      to,
      replyTo: values.email,
      subject: `New contact message from ${values.name}`,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        "",
        values.message,
      ].join("\n"),
      html: `
        <h2 style="margin:0 0 16px">New contact message</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(values.name)}</p>
        <p style="margin:0 0 16px">
          <strong>Email:</strong>
          <a href="mailto:${escapeHtml(values.email)}">${escapeHtml(values.email)}</a>
        </p>
        <p style="margin:0 0 8px"><strong>Message:</strong></p>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(values.message)}</p>
      `,
    });

    return Response.json({ ok: true, message: "Thanks! Your message has been sent." });
  } catch (error) {
    console.error("Failed to send contact email:", error);

    return Response.json(
      {
        ok: false,
        message:
          "We could not send your message right now. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
