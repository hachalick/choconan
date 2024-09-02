/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "80",
        pathname: "/**/*",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "80",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "127.0.0.1",
        port: "80",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "127.0.0.1",
        port: "80",
        pathname: "/*",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/**/*",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "choconan.ir",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "choconan.ir",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "api.choconan.ir",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "api.choconan.ir",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

const withPWA = withPWAInit({
  dest: "public",
});
// export default withPWA(nextConfig);
export default nextConfig
