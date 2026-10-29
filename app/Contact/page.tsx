import React from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { STUDIO_SOCIAL_LINKS } from "@/constant";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  ArrowUpRightIcon,
} from "@/svgs";

export const metadata: Metadata = {
  title: "Contact | KV Studio",
  description:
    "Get in touch with KV Studio for architectural commissions, real estate platforms, and inquiries.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background text-white selection:bg-[#00c8ff] selection:text-black">
      {/* Unified Kinetic Page Hero */}
      <PageHero
        theme="cyan"
        eyebrow={{
          tag: "[ CONTACT // GET IN TOUCH ]",
          subtitle: "GLOBAL COMMISSIONS & INQUIRIES",
          statusColor: "#00c8ff",
        }}
        metaBadge={{
          primaryText: "STUDIO ATELIER",
          secondaryText: "OPEN FOR COMMISSIONS",
          metricText: "NEW CAIRO // CAPE TOWN",
          dotColor: "bg-emerald-400",
        }}
        headline={{
          line1: "LET’S WORK",
          line2: "TOGETHER",
          highlightWord: "TOGETHER",
        }}
        description="Have a project in mind or looking to collaborate? Reach out to our team to discuss architectural commissions, digital real estate platforms, or general inquiries."
      />

      {/* 2-Column Split: Studio Info (5 cols) & Form (7 cols) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Studio Contact Information */}
          <aside className="lg:col-span-5 flex flex-col gap-8">
            {/* Direct Email */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                Email
              </span>
              <a
                href="mailto:info@knowledgeplusvision.in"
                className="text-lg sm:text-xl font-medium text-white hover:text-[#00c8ff] transition-colors"
              >
                info@knowledgeplusvision.in
              </a>
            </div>

            {/* Telephone */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                Phone
              </span>
              <div className="flex flex-wrap items-center gap-2 text-lg sm:text-xl font-medium text-white">
                <a
                  href="tel:+201024865713"
                  className="hover:text-[#00c8ff] transition-colors"
                >
                  01024865713
                </a>
                <span className="text-white/30">•</span>
                <a
                  href="tel:+201025000659"
                  className="hover:text-[#00c8ff] transition-colors"
                >
                  01025000659
                </a>
              </div>
            </div>

            {/* Physical Location */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                Studio Location
              </span>
              <p className="text-base text-white/80 leading-relaxed font-sans">
                South Academy 5TH Settelment
                Cairo,<br />
                EGYPT
              </p>
            </div>

            {/* Operating Hours */}
            <div className="flex flex-col gap-2 pt-6 border-t border-white/10">
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                Operating Hours
              </span>
              <p className="text-sm text-white/70 font-mono">
                Sunday – Saturday: 10:00 AM – 8:00 PM
              </p>
            </div>

            {/* Social Presence / Official Channels */}
            <div className="flex flex-col gap-3.5 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-white/40 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] animate-pulse" />
                  Social Presence
                </span>
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                  Official Channels
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {STUDIO_SOCIAL_LINKS.map((social) => {
                  const Icon =
                    social.id === "instagram"
                      ? InstagramIcon
                      : social.id === "facebook"
                      ? FacebookIcon
                      : LinkedInIcon;

                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-white/3 hover:bg-[#00c8ff]/10 border border-white/10 hover:border-[#00c8ff]/40 hover:shadow-[0_0_20px_rgba(0,200,255,0.15)] transition-all duration-300 text-center"
                      aria-label={`${social.label} - ${social.handle}`}
                    >
                      <span className="absolute top-2 right-2 text-white/30 group-hover:text-[#00c8ff] transition-colors">
                        <ArrowUpRightIcon className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#00c8ff] text-white/70 group-hover:text-black flex items-center justify-center transition-all duration-300 mb-2">
                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="font-['BlauerNue',sans-serif] font-bold text-xs sm:text-sm text-white group-hover:text-[#00c8ff] transition-colors">
                        {social.label}
                      </span>
                      <span className="font-mono text-[10px] text-white/40 group-hover:text-white/70 transition-colors mt-0.5 truncate max-w-full">
                        {social.handle}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Isolated Contact Form Component */}
          <section className="lg:col-span-7">
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  );
}
