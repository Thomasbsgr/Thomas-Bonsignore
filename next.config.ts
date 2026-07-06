import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  poweredByHeader: false,
  allowedDevOrigins: [],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
