import Image from "next/image";
import Icon from "@/components/reusable/Icon";

export default function VariantSec4({ data }) {
  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="relative h-40 w-full overflow-hidden">
          <Image src={data.topImage} alt="Land Rover engine block" fill className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, var(--theme-light-bg) 0%, var(--theme-light-bg) 62%, rgba(241,237,232,0.85) 72%, transparent 88%)" }}
          />
          <div className="relative z-10 p-4">
            <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
              <span className="block text-[#101828]">{data.headlinePre}</span>
              <span className="block text-hero-blue">{data.headlineHighlight}</span>
            </h2>
            <p className="mt-2 max-w-[60%] text-xs leading-snug text-[#101828]">{data.description}</p>
          </div>
        </div>

        <div className="relative px-4 pb-10">
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {data.cards.map((c) => (
              <div key={c.number} className="glass-card flex flex-col rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--theme-light-bg)">
                    <Icon name={c.icon} className="h-5 w-5 text-hero-blue" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-hero-blue">{c.number}</span>
                      {c.badge && (
                        <span className="rounded-sm bg-hero-blue px-1.5 py-0.5 text-[7px] font-extrabold uppercase text-white">{c.badge}</span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs font-extrabold uppercase leading-tight text-[#101828]">{c.title}</p>
                <p className="body-text mt-1.5 line-clamp-4 leading-snug text-[#4a5568]">{c.body}</p>
                <a href="#quote-form" className="label-text mt-2 inline-flex w-fit items-center gap-1 font-bold text-hero-blue">
                  {c.link} <span aria-hidden>→</span>
                </a>
              </div>
            ))}
          </div>

          <div className="glass-card relative mt-5 overflow-hidden rounded-2xl p-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  transform: "skewX(-20deg)",
                  transformOrigin: "top left",
                  background:
                    "linear-gradient(90deg, var(--color-bmw-blue) 0%, var(--color-bmw-blue) 30%, var(--color-bmw-violet) 30%, var(--color-bmw-violet) 62%, var(--color-bmw-red) 62%, var(--color-bmw-red) 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
                  maskImage: "linear-gradient(to bottom right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
                }}
              />
            </div>

            <div className="relative z-10 pl-20">
              <p className="text-sm font-extrabold uppercase leading-tight text-[#101828]">{data.banner.title}</p>
              <p className="mt-1.5 text-xs leading-snug text-[#101828]">{data.banner.body}</p>
              <a
                href={data.banner.cta.href}
                className="btn-text mt-3 flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-linear-to-br from-hero-blue to-hero-blue-dark px-4 py-2.5 uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                {data.banner.cta.label} <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden md:block">
        <div className="relative h-64 w-full overflow-hidden bg-[#e6eade] lg:h-72">
          <div className="absolute inset-y-0 left-[24%] right-0">
            <Image src={data.topImage} alt="Land Rover engine block" fill className="object-cover" sizes="100vw" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
                <span className="block text-[#101828]">{data.headlinePre}</span>
                <span className="block text-hero-blue">{data.headlineHighlight}</span>
              </h2>
              <p className="mt-3 text-sm text-[#101828] lg:text-base">{data.description}</p>
            </div>
          </div>
        </div>

        <div className="relative px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-3 gap-3">
              {data.cards.map((c) => (
                <div
                  key={c.number}
                  className="glass-card flex flex-col justify-between rounded-lg p-4"
                >
                  <div>
                    <div className="flex items-start gap-4">
                      <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-(--theme-light-bg)">
                        <Icon name={c.icon} className="h-11 w-11 text-hero-blue" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-extrabold text-hero-blue">{c.number}</span>
                          {c.badge && (
                            <span className="label-text rounded-sm bg-hero-blue px-2.5 py-1 font-extrabold uppercase text-white">{c.badge}</span>
                          )}
                        </div>
                        <p className="mt-1 text-base font-extrabold uppercase leading-tight text-[#101828]">{c.title}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#4a5568]">{c.body}</p>
                  </div>
                  <a href="#quote-form" className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-hero-blue">
                    {c.link} <span aria-hidden>→</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="glass-card relative mt-6 grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto] items-stretch gap-6 overflow-hidden rounded-2xl p-6">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20" aria-hidden="true">
                <div
                  className="absolute inset-0"
                  style={{
                    transform: "skewX(-25deg)",
                    transformOrigin: "top left",
                    background:
                      "linear-gradient(90deg, var(--color-bmw-blue) 0%, var(--color-bmw-blue) 30%, var(--color-bmw-violet) 30%, var(--color-bmw-violet) 62%, var(--color-bmw-red) 62%, var(--color-bmw-red) 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
                    maskImage: "linear-gradient(to bottom right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
                  }}
                />
              </div>

              <div className="relative z-10 flex items-center pl-24">
                <div>
                  <p className="text-lg font-extrabold uppercase leading-tight text-[#101828]">{data.banner.title}</p>
                  <p className="mt-1.5 text-sm leading-snug text-[#101828]">{data.banner.body}</p>
                </div>
              </div>

              <div className="relative -my-6 overflow-hidden opacity-15" aria-hidden="true">
                <Image src={data.banner.image} alt="" fill className="object-cover" sizes="240px" />
              </div>

              <a
                href={data.banner.cta.href}
                className="relative z-10 flex h-14 shrink-0 items-center justify-center self-center whitespace-nowrap rounded-sm bg-linear-to-br from-hero-blue to-hero-blue-dark px-8 text-sm font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                {data.banner.cta.label} <span className="ml-2" aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
