"use client";

import React, { useState, type FormEvent } from "react";
import {
  EMAIL_PATTERN,
  isValidPhone,
  normalizeHttpUrl,
} from "@/lib/validation";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  state: string;
  linkedin: string;
  portfolio: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = {
  name: "",
  email: "",
  phone: "",
  state: "",
  linkedin: "",
  portfolio: "",
};

const fieldClasses = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl bg-white/4 border text-white text-sm outline-none transition placeholder:text-white/25 ${
    hasError
      ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
      : "border-white/10 focus:border-[#00c8ff] focus:ring-1 focus:ring-[#00c8ff]/40"
  }`;

type TextFieldProps = {
  id: string;
  name: keyof FormValues;
  label: string;
  value: string;
  placeholder: string;
  maxLength: number;
  type?: "text" | "email" | "tel" | "url";
  autoComplete?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  onChange: (field: keyof FormValues, value: string) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  id,
  name,
  label,
  value,
  placeholder,
  maxLength,
  type = "text",
  autoComplete,
  required = false,
  error,
  hint,
  onChange,
}) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={id}
      className="text-xs font-mono uppercase tracking-wider text-white/70"
    >
      {label}{" "}
      {required ? (
        <span className="text-[#00c8ff]">*</span>
      ) : (
        <span className="text-white/35 normal-case tracking-normal">
          (optional)
        </span>
      )}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      maxLength={maxLength}
      required={required}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={placeholder}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      className={fieldClasses(Boolean(error))}
    />
    {error ? (
      <p id={`${id}-error`} className="text-xs text-red-400 font-mono">
        {error}
      </p>
    ) : hint ? (
      <p id={`${id}-hint`} className="text-[11px] text-white/35 font-mono">
        {hint}
      </p>
    ) : null}
  </div>
);

export const JoinForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (current: FormValues): FieldErrors => {
    const nextErrors: FieldErrors = {};

    if (!current.name.trim()) {
      nextErrors.name = "Please enter your name.";
    } else if (current.name.trim().length > 100) {
      nextErrors.name = "Your name must be 100 characters or fewer.";
    }

    if (!current.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(current.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!current.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!isValidPhone(current.phone)) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!current.state.trim()) {
      nextErrors.state = "Please enter your state or governorate.";
    } else if (current.state.trim().length > 100) {
      nextErrors.state = "Your state must be 100 characters or fewer.";
    }

    if (current.linkedin.trim() && !normalizeHttpUrl(current.linkedin)) {
      nextErrors.linkedin = "Please enter a valid LinkedIn URL.";
    }

    if (current.portfolio.trim() && !normalizeHttpUrl(current.portfolio)) {
      nextErrors.portfolio = "Please enter a valid portfolio URL.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setFeedback("Please check the highlighted fields and try again.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          state: values.state.trim(),
          linkedin: values.linkedin.trim(),
          portfolio: values.portfolio.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        setFeedback(
          data.message ?? "Something went wrong. Please try again later.",
        );
        return;
      }

      setValues(EMPTY_FORM);
      setStatus("success");
      setFeedback(data.message ?? "Thanks! Your application has been sent.");
    } catch {
      setStatus("error");
      setFeedback(
        "We could not reach the server. Please check your connection and try again.",
      );
    }
  };

  const isSending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField
          id="join-name"
          name="name"
          label="Name"
          value={values.name}
          placeholder="Your full name"
          autoComplete="name"
          maxLength={100}
          required
          error={errors.name}
          onChange={updateField}
        />

        <TextField
          id="join-email"
          name="email"
          label="Email"
          type="email"
          value={values.email}
          placeholder="you@example.com"
          autoComplete="email"
          maxLength={254}
          required
          error={errors.email}
          onChange={updateField}
        />

        <TextField
          id="join-phone"
          name="phone"
          label="Phone"
          type="tel"
          value={values.phone}
          placeholder="+20 10 1234 5678"
          autoComplete="tel"
          maxLength={25}
          required
          error={errors.phone}
          onChange={updateField}
        />

        <TextField
          id="join-state"
          name="state"
          label="State / Governorate"
          value={values.state}
          placeholder="e.g. Cairo"
          autoComplete="address-level1"
          maxLength={100}
          required
          error={errors.state}
          onChange={updateField}
        />

        <TextField
          id="join-linkedin"
          name="linkedin"
          label="LinkedIn"
          type="url"
          value={values.linkedin}
          placeholder="linkedin.com/in/your-profile"
          maxLength={500}
          error={errors.linkedin}
          hint="Paste your LinkedIn profile link."
          onChange={updateField}
        />

        <TextField
          id="join-portfolio"
          name="portfolio"
          label="Portfolio"
          type="url"
          value={values.portfolio}
          placeholder="yourportfolio.com"
          maxLength={500}
          error={errors.portfolio}
          hint="Website, Behance, or any project archive."
          onChange={updateField}
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="mt-2 w-full py-4 rounded-xl font-['BlauerNue',sans-serif] font-black uppercase tracking-[0.2em] text-xs sm:text-sm text-black bg-white hover:bg-[#00c8ff] hover:shadow-[0_0_25px_rgba(0,200,255,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
      >
        {isSending ? (
          <>
            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <span>Send Application</span>
        )}
      </button>

      {feedback && (
        <p
          aria-live="polite"
          className={`text-xs font-mono text-center ${
            status === "error" ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {feedback}
        </p>
      )}
    </form>
  );
};
