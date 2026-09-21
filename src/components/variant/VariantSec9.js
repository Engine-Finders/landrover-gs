import Image from "next/image";

export default function VariantSec9({ data }) {
  return (
    <section className="theme-dark relative overflow-hidden bg-hero-dark">
      <div className="absolute inset-0" aria-hidden="true">
        <Image src="/variant/sec8.webp" alt="" fill className="object-cover object-right" sizes="100vw" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-8 md:py-7 lg:px-8">
        <div className="md:max-w-[62%]">
          <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="block text-white">{data.headlinePre}</span>
            <span className="text-hero-blue">{data.headlineHighlight}</span>{" "}
            <span className="text-white">{data.headlinePost}</span>
          </h2>
          <p className="mt-2 text-xs leading-snug text-white md:text-sm">{data.body}</p>
        </div>
        <a
          href={data.cta.href}
          className="btn-text flex h-14 shrink-0 items-center justify-center gap-3 rounded-lg border-2 border-transparent px-8 uppercase text-white shadow-lg transition-transform hover:scale-[1.02] md:mr-8"
          style={{
            background:
              "linear-gradient(#607056, #607056) padding-box, linear-gradient(135deg, #8f9f7d 0%, #607056 50%, #4c5a45 100%) border-box",
          }}
        >
          {data.cta.label} <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
