import nodemailer from "nodemailer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) => HTML_ENTITIES[character] ?? character,
  );
}

export function readString(
  payload: Record<string, unknown>,
  key: string,
): string {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

export async function readPayload(
  request: Request,
): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body: unknown = await request.json().catch(() => null);
    return typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData = await request.formData().catch(() => null);
    return formData ? Object.fromEntries(formData.entries()) : {};
  }

  return {};
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

/**
 * Very small in-memory rate limiter. It stops casual form spam in a single
 * server process; use a shared store (Redis, Upstash, ...) if you run several
 * instances or deploy to a serverless platform.
 */
export function createRateLimiter(options: { windowMs: number; max: number }) {
  const submissions = new Map<string, number[]>();

  return function isRateLimited(key: string) {
    const now = Date.now();
    const recent = (submissions.get(key) ?? []).filter(
      (time) => now - time < options.windowMs,
    );

    if (recent.length >= options.max) {
      submissions.set(key, recent);
      return true;
    }

    recent.push(now);
    submissions.set(key, recent);
    return false;
  };
}

export function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in your environment.",
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}
