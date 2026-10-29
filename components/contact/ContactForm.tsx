"use client";

import React, { useState, type FormEvent } from "react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = {
  name: "",
  email: "",
  message: "",
};

export const ContactForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (current: FormValues): FieldErrors => {
    const nextErrors: FieldErrors = {};

    if (!current.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!current.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(current.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!current.message.trim()) {
      nextErrors.message = "Please enter a message.";
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        setFeedback(data.message ?? "Something went wrong. Please try again later.");
        return;
      }

      setValues(EMPTY_FORM);
      setStatus("success");
      setFeedback(data.message ?? "Thanks! Your message has been sent.");
    } catch {
      setStatus("error");
      setFeedback("We could not reach the server. Please check your connection and try again.");
    }
  };

  const isSending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl"
    >
      {/* Name Field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-name"
          className="text-xs font-mono uppercase tracking-wider text-white/70"
        >
          Name <span className="text-[#00c8ff]">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`w-full px-4 py-3 rounded-xl bg-white/4 border text-white text-sm outline-none transition placeholder:text-white/25 ${
            errors.name
              ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
              : "border-white/10 focus:border-[#00c8ff] focus:ring-1 focus:ring-[#00c8ff]/40"
          }`}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-red-400 font-mono">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-email"
          className="text-xs font-mono uppercase tracking-wider text-white/70"
        >
          Email <span className="text-[#00c8ff]">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full px-4 py-3 rounded-xl bg-white/4 border text-white text-sm outline-none transition placeholder:text-white/25 ${
            errors.email
              ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
              : "border-white/10 focus:border-[#00c8ff] focus:ring-1 focus:ring-[#00c8ff]/40"
          }`}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-400 font-mono">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-xs font-mono uppercase tracking-wider text-white/70"
        >
          Message <span className="text-[#00c8ff]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={5000}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder="How can we help?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full px-4 py-3 rounded-xl bg-white/4 border text-white text-sm outline-none transition placeholder:text-white/25 resize-y ${
            errors.message
              ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
              : "border-white/10 focus:border-[#00c8ff] focus:ring-1 focus:ring-[#00c8ff]/40"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-400 font-mono">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
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
          <span>Send Message</span>
        )}
      </button>

      {/* Status Feedback */}
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
