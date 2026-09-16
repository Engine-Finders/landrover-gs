import Icon from "@/components/reusable/Icon";

export default function HomeSec3({ data }) {
  return (
    <section className="px-2 pt-0 sm:px-6 sm:pt-6 lg:px-8">
      <div
        className="glass-card mx-auto flex max-w-6xl items-stretch rounded-2xl px-2 py-4 sm:px-6 sm:py-6"
        style={{ boxShadow: "0 0 40px -8px rgba(173,135,92,0.35)" }}
      >
        {data.stats.map((stat, i) => (
          <div key={stat.label} className="flex min-w-0 flex-1 items-stretch justify-center">
            {i > 0 && <span className="mr-1 w-0.5 shrink-0 self-center bg-hero-blue/45 sm:mr-6" style={{ height: "75%" }} />}
            <div className="flex min-w-0 flex-col items-center px-0.5 text-center">
              <Icon name={stat.icon} className="mb-1 h-6 w-6 shrink-0 text-hero-blue sm:mb-2 sm:h-9 sm:w-9" />
              <p className="whitespace-nowrap text-xs font-extrabold italic text-[#1a1a1a] sm:text-2xl lg:text-3xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[10px] font-medium leading-tight text-[#1a1a1a] sm:mt-1 sm:text-xs lg:text-sm">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
