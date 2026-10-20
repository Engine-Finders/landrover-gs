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
      // guide pages renamed to the addresses used in the content documents: old address keeps working
      { source: "/land-rover-before-after-rebuilds", destination: "/landrover-before-after-rebuilds", permanent: true },
      { source: "/land-rover-bmw-sourced-v8-hot-vee-repair", destination: "/landrover-bmw-v8-hot-vee-repair", permanent: true },
      { source: "/land-rover-cylinder-head-repair-rebuild", destination: "/landrover-cylinder-head-repair", permanent: true },
      { source: "/land-rover-dc-dc-converter-repair", destination: "/landrover-dc-dc-converter-repair", permanent: true },
      { source: "/land-rover-diesel-timing-chain-repair", destination: "/landrover-diesel-timing-chain-repair", permanent: true },
      { source: "/land-rover-engine-bearing-replacement", destination: "/landrover-engine-bearing-replacement", permanent: true },
      { source: "/land-rover-engine-compatibility-application-matching", destination: "/landrover-engine-compatibility", permanent: true },
      { source: "/land-rover-engine-components-we-replace", destination: "/landrover-engine-components-replaced", permanent: true },
      { source: "/land-rover-engine-failure-repair", destination: "/landrover-engine-failure-repair", permanent: true },
      { source: "/land-rover-engine-inspection-assessment", destination: "/landrover-engine-inspection-assessment", permanent: true },
      { source: "/land-rover-engine-machining", destination: "/landrover-engine-machining", permanent: true },
      { source: "/land-rover-engine-matching-by-registration-vin", destination: "/landrover-engine-matching", permanent: true },
      { source: "/land-rover-engine-rebuild", destination: "/landrover-engine-rebuild", permanent: true },
      { source: "/land-rover-engine-rebuild-case-studies", destination: "/landrover-engine-rebuild-case-studies", permanent: true },
      { source: "/land-rover-engine-rebuild-process", destination: "/landrover-engine-rebuild-process", permanent: true },
      { source: "/land-rover-engine-rebuild-warranty-explained", destination: "/landrover-engine-warranty", permanent: true },
      { source: "/land-rover-engine-removal-refit-and-final-testing", destination: "/landrover-engine-removal-refit", permanent: true },
      { source: "/land-rover-engine-replacement", destination: "/landrover-engine-replacement", permanent: true },
      { source: "/land-rover-engine-supply-and-fit", destination: "/landrover-engine-supply-fit", permanent: true },
      { source: "/land-rover-engine-teardown-inspection", destination: "/landrover-engine-teardown-inspection", permanent: true },
      { source: "/land-rover-failed-previous-rebuild-remediation", destination: "/landrover-failed-previous-rebuild-remediation", permanent: true },
      { source: "/land-rover-high-mileage-engine-rebuild", destination: "/landrover-high-mileage-engine-rebuild", permanent: true },
      { source: "/land-rover-ingenium-diesel-repair", destination: "/landrover-ingenium-diesel-repair", permanent: true },
      { source: "/land-rover-inside-our-workshop", destination: "/landrover-inside-workshop", permanent: true },
      { source: "/land-rover-nationwide-engine-recovery", destination: "/landrover-engine-recovery", permanent: true },
      { source: "/land-rover-oil-leak-gasket-repair", destination: "/landrover-oil-leak-gasket-repair", permanent: true },
      { source: "/land-rover-rebuild-vs-reconditioned-what-s-the-difference", destination: "/landrover-rebuild-vs-reconditioned", permanent: true },
      { source: "/land-rover-rebuild-vs-remanufactured", destination: "/landrover-rebuild-vs-remanufactured", permanent: true },
      { source: "/land-rover-rebuild-vs-replacement", destination: "/landrover-rebuild-vs-replacement", permanent: true },
      { source: "/land-rover-rebuild-vs-used-engine", destination: "/landrover-rebuild-vs-used", permanent: true },
      { source: "/land-rover-repair-vs-full-rebuild", destination: "/landrover-repair-vs-rebuild", permanent: true },
      { source: "/land-rover-svr-sv-performance-engine-rebuild", destination: "/landrover-svr-sv-performance-engine-rebuild", permanent: true },
      { source: "/land-rover-timing-chain-failure-repair", destination: "/landrover-timing-chain-failure-repair", permanent: true },
      { source: "/land-rover-trade-fleet-engine-services", destination: "/landrover-trade-fleet-engines", permanent: true },
      { source: "/land-rover-turbo-ancillary-repair", destination: "/landrover-turbo-ancillary-repair", permanent: true },
      { source: "/land-rover-v8-supercharged-repair", destination: "/landrover-v8-supercharged-repair", permanent: true },
      // duplicate of /landrover-s68-engine: consolidate to one canonical URL
      { source: "/landrover-s68-bmw-sourced-engine", destination: "/landrover-s68-engine", permanent: true },
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
