import React from "react";
import type { Metadata } from "next";
import { JoinForm } from "@/components/join/JoinForm";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Join Us | KV Studio",
  description:
    "Join KV Studio. Apply with your details, LinkedIn profile, and portfolio to work on architecture, computational design, and visualization.",
};

const DISCIPLINES = [
  "Architecture & Interior Design",
  "Computational Design & BIM",
  "3D Visualization & Interactive Media",
];

export default function JoinUsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-[#00c8ff] selection:text-black">
      <PageHero
        theme="cyan"
        eyebrow={{
          tag: "[ CAREERS // JOIN THE STUDIO ]",
          subtitle: "OPEN APPLICATIONS • CAIRO & REMOTE",
          statusColor: "#00c8ff",
        }}
        metaBadge={{
          primaryText: "TALENT NETWORK",
          secondaryText: "ACCEPTING PORTFOLIOS",
          metricText: "CAIRO // REMOTE",
          dotColor: "bg-emerald-400",
        }}
        headline={{
          line1: "BUILD THE",
          line2: "FUTURE WITH US",
          highlightWord: "FUTURE",
          gradientText: true,
        }}
        description="We are always looking for architects, designers, engineers, and visual storytellers who want to shape spaces through technology. Send us your details and portfolio — we review every application."
        anchorsLabel="QUICK LINK:"
        anchors={[
          {
            label: "APPLY NOW",
            targetId: "apply",
            number: "01 //",
            accentColor: "#00c8ff",
          },
        ]}
        scrollCueText="SCROLL TO APPLY"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <aside className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                Why KV Studio
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
                Design the next standard with us.
              </h2>
              <p className="font-['Rubik',sans-serif] text-sm sm:text-base text-white/65 leading-relaxed">
                KV Studio is a multidisciplinary practice where architecture,
                computational design, and visualization meet. You will work on
                real commissions with a small, focused team that values
                precision, curiosity, and ideas that move.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                Disciplines
              </span>
              <ul className="flex flex-col gap-2.5">
                {DISCIPLINES.map((discipline, index) => (
                  <li
                    key={discipline}
                    className="flex items-center gap-3 text-sm text-white/75 font-['Rubik',sans-serif]"
                  >
                    <span className="font-mono text-[10px] text-[#00c8ff]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {discipline}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                What to send
              </span>
              <p className="font-['Rubik',sans-serif] text-sm text-white/65 leading-relaxed">
                Your name, email, phone number, state, and a link to your
                LinkedIn profile and portfolio. If you do not have a portfolio
                online yet, send us your best work through the link you have.
              </p>
            </div>

            <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white/3 border border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#00c8ff]">
                No perfect match?
              </span>
              <p className="font-['Rubik',sans-serif] text-sm text-white/65 leading-relaxed">
                Apply anyway. We keep open applications on file and reach out
                when a role fits your profile.
              </p>
              <a
                href="mailto:info@knowledgeplusvision.in?subject=Join%20Us%20Application"
                className="font-mono text-xs text-white hover:text-[#00c8ff] transition-colors break-all"
              >
                info@knowledgeplusvision.in
              </a>
            </div>
          </aside>

          <section id="apply" className="lg:col-span-7 scroll-mt-28">
            <div className="flex flex-col gap-2 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-[#00c8ff]">
                Application Form
              </span>
              <h2 className="font-['BlauerNue',sans-serif] text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Tell us about you
              </h2>
              <p className="text-sm text-white/50 font-mono">
                Fields marked <span className="text-[#00c8ff]">*</span> are
                required.
              </p>
            </div>

            <JoinForm />
          </section>
        </div>
      </div>
    </main>
  );
}
