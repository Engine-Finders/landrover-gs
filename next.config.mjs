/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Next's default re-encode quality (75) visibly softens full-bleed
    // hero/background photography compared to the source webp — allow
    // higher values so those Image usages can opt in via `quality`.
    qualities: [75, 90, 100],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.landrovergarage.co.uk" }],
        destination: "https://landrovergarage.co.uk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
