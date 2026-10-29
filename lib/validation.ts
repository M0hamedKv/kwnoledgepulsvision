export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Accepts a phone number made of digits plus the usual separators and
 * requires between 7 and 15 digits (roughly E.164).
 */
export function isValidPhone(value: string) {
  const trimmed = value.trim();

  if (!/^[+()\d\s.-]+$/.test(trimmed)) {
    return false;
  }

  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Normalizes a user supplied link to an absolute http(s) URL.
 * Returns `null` when the value cannot be a valid web address, so callers can
 * safely use the result in an `href`.
 */
export function normalizeHttpUrl(value: string): string | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const candidate = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(candidate);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    if (!url.hostname.includes(".")) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}
