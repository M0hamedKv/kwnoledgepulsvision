import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import {
  PageTransitionProvider,
  TransitionOverlay,
} from "@/components/transitions";

export const metadata: Metadata = {
  title: "KV Studio",
  description: "Welcome to KV Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col bg-black text-white relative">
        <PageTransitionProvider>
          {/* Global Ambient Dark Atmosphere with Professional Architectural Blue Glow Spots */}
          <AmbientBackground />
          <div className="relative z-10 flex-1 flex flex-col w-full bg-transparent">
            <Navbar />
            <main id="main-page-wrapper" className="flex-1 flex flex-col w-full bg-transparent">
              {children}
            </main>
            <Footer />
          </div>
          {/* Blue Architectural Page Transition Overlay */}
          <TransitionOverlay />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
