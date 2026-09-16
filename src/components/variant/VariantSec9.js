import Image from "next/image";
import Icon from "@/components/reusable/Icon";

export default function VariantSec9({ data }) {
  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="absolute inset-0">
          <Image src={data.imageMobile} alt="Land Rover engines on workshop pallets" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-hero-dark" />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/45 to-transparent" />
        </div>

        <div className="relative px-4 pb-6 pt-4">
          <div className="max-w-[88%]">
            <h2 className="h2 uppercase">
              <span className="block text-white">{data.headlinePre}</span>
              <span className="block whitespace-nowrap text-hero-blue">{data.headlineHighlight}</span>
              <span className="block text-white">{data.headlinePost}</span>
            </h2>

            <p className="mt-2.5 text-xs leading-snug text-white">{data.body}</p>
            <p className="mt-1.5 text-xs font-semibold text-white">{data.prompt}</p>
          </div>

          <a
            href={data.cta.href}
            className="btn-text mt-3.5 flex w-fit items-center gap-2.5 whitespace-nowrap rounded-lg border border-hero-blue bg-black/30 px-5 py-3 uppercase text-hero-blue transition-colors hover:bg-hero-blue/10"
          >
            <Icon name="engine" className="h-5 w-5 shrink-0" />
            {data.cta.label} <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0">
          <Image
            src={data.image}
            alt="Land Rover engines on workshop pallets"
            fill
            className="-scale-x-100 object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to left, #070b14 0%, #070b14 48%, rgba(7,11,20,0.9) 60%, transparent 75%)" }}
          />
        </div>

        <div className="relative mx-auto flex max-w-6xl justify-end px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="h2 uppercase">
              <span className="block whitespace-nowrap text-white">{data.headlinePre}</span>
              <span className="block text-hero-blue">
                {data.headlineHighlight} <span className="text-white">{data.headlinePost}</span>
              </span>
            </h2>

            <p className="mt-4 w-full text-sm text-white lg:text-base">{data.body}</p>
            <p className="mt-2 text-sm font-semibold text-white">{data.prompt}</p>

            <a
              href={data.cta.href}
              className="mt-5 inline-flex items-center gap-3 rounded-lg border border-hero-blue bg-black/30 px-7 py-3.5 text-sm font-bold uppercase text-hero-blue transition-colors hover:bg-hero-blue/10"
            >
              <Icon name="engine" className="h-6 w-6 shrink-0" />
              {data.cta.label} <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
