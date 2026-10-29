import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Nodemailer relies on Node.js internals, so keep it out of the server bundle.
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
