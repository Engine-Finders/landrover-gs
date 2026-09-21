"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import GbBadge from "@/components/reusable/GbBadge";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

function FaqCard({ item, isOpen, onToggle, compact = false }) {
  return (
    <div className={`glass-card rounded-xl ${compact ? "p-3.5" : "p-5"}`}>
      <button type="button" onClick={onToggle} className="flex w-full items-start gap-3 text-left">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1f3a26] text-sm font-extrabold text-white">
          ?
        </span>
        <span className="origin-left scale-y-115 flex-1 text-sm font-extrabold text-[#101828]">{item.q}</span>
        <Icon
          name="chevron-down"
          className={`h-4 w-4 shrink-0 text-[#101828] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && <p className="ml-10 mt-2 text-sm leading-relaxed text-[#101828]">{item.a}</p>}
    </div>
  );
}

function Field({ label, placeholder, type = "text", compact = false }) {
  return (
    <label className="block">
      <span className="label-text uppercase tracking-wide text-white">
        {label} <span className="text-bmw-red">*</span>
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-hero-blue ${
          compact ? "mt-1.5 h-11" : "mt-2 h-13"
        }`}
      />
    </label>
  );
}

function LightField({ label, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="label-text uppercase tracking-wide text-white">
        {label} <span className="text-[#9fb08c]">*</span>
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-md bg-white px-4 text-sm text-[#101828] placeholder:text-[#101828]/40 outline-none"
      />
    </label>
  );
}

export default function VariantSec13({ data }) {
  const [openIndex, setOpenIndex] = useState(new Set());

  function toggle(i) {
    setOpenIndex((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Lead form — dev to wire up submission endpoint.
  }

  return (
    <section id="quote-form" className="theme-light relative scroll-mt-6 overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 pb-7 pt-5 md:hidden">
        <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
          <LandRoverStripe className="float-left mr-2 mt-0.5 h-6 w-12 shrink-0" />
          <span className="text-[#101828]">{data.kicker} </span>
          <span className="text-hero-blue">{data.kickerHighlight}</span>
        </h2>

        <div className="mt-4 space-y-3">
          {[...data.faqLeft, ...data.faqRight].map((item, i) => (
            <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} compact />
          ))}
        </div>

        {/* quote form */}
        <form
          onSubmit={handleSubmit}
          className="theme-dark relative mt-6 overflow-hidden rounded-2xl p-4"
          style={{ boxShadow: "0 0 0 1px rgba(96,112,86,0.3), 0 25px 60px -20px rgba(96,112,86,0.4)" }}
        >
          <div className="absolute inset-0">
            <Image src="/variant/sec13.v2.webp" alt="Land Rover vehicle in a dark showroom" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="relative">
            <h3 className="h3 origin-left scale-y-110 scale-x-90 uppercase">
              <LandRoverLogo className="float-left mr-2 mt-0.5 h-8 w-8 shrink-0" />
              <span className="text-white">{data.form.headlinePre} </span>
              <span className="text-hero-blue">{data.form.headlineHighlight}</span>{" "}
              <span className="text-white">{data.form.headlinePost}</span>
            </h3>

            <div className="mt-3 space-y-2.5">
              <label className="block">
                <span className="label-text uppercase tracking-wide text-white">
                  {data.form.fields.reg.label} <span className="text-bmw-red">*</span>
                </span>
                <div className="mt-1.5 flex h-11 overflow-hidden rounded-lg border border-white/15 bg-white/5">
                  <GbBadge className="w-12" />
                  <input
                    type="text"
                    placeholder={data.form.fields.reg.placeholder}
                    className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/40 outline-none"
                  />
                </div>
              </label>

              <Field label={data.form.fields.postcode.label} placeholder={data.form.fields.postcode.placeholder} compact />
              <Field label={data.form.fields.name.label} placeholder={data.form.fields.name.placeholder} compact />
              <Field label={data.form.fields.phone.label} placeholder={data.form.fields.phone.placeholder} type="tel" compact />
              <Field label={data.form.fields.email.label} placeholder={data.form.fields.email.placeholder} type="email" compact />

              <label className="block">
                <span className="label-text uppercase tracking-wide text-white">
                  {data.form.fields.enquiry.label} <span className="text-bmw-red">*</span>
                </span>
                <div className="relative mt-1.5">
                  <select className="h-11 w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 pr-10 text-sm text-white outline-none">
                    <option>{data.form.fields.enquiry.placeholder}</option>
                  </select>
                  <Icon
                    name="chevron-down"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                  />
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #607056 0%, #4c5a45 100%)",
                boxShadow: "0 8px 20px rgba(96,112,86,0.4)",
              }}
            >
              {data.form.submitLabel} <span aria-hidden>→</span>
            </button>

            <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-white">
              <Icon name="shield-check" className="h-4 w-4 shrink-0 text-hero-blue" />
              {data.form.guarantee}
            </p>
          </div>
        </form>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          {/* title banner */}
          <div className="relative overflow-hidden rounded-2xl">
            <Image src="/variant/sec13.v2.webp" alt="Land Rover Defender parked on open moorland" fill className="object-cover object-right" sizes="1152px" />
            <div className="relative flex items-center gap-5 px-8 py-8">
              <LandRoverLogo className="h-20 w-20 shrink-0" />
              <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
                <span className="block text-[#101828]">{data.kicker}</span>
                <span className="block text-hero-blue">{data.kickerHighlight}</span>
              </h2>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 items-start gap-4">
            <div className="space-y-4">
              {data.faqLeft.map((item, i) => (
                <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} />
              ))}
            </div>
            <div className="space-y-4">
              {data.faqRight.map((item, i) => {
                const idx = data.faqLeft.length + i;
                return <FaqCard key={item.q} item={item} isOpen={openIndex.has(idx)} onToggle={() => toggle(idx)} />;
              })}
            </div>
          </div>

          {/* quote form */}
          <form
            onSubmit={handleSubmit}
            className="theme-dark relative mt-8 overflow-hidden rounded-2xl p-8"
            style={{
              background: "linear-gradient(135deg, #14281a 0%, #0d1a11 100%)",
              boxShadow: "0 0 0 1px rgba(96,112,86,0.35), 0 25px 60px -20px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="h3 origin-left scale-y-110 scale-x-90 text-white uppercase">
                {data.form.headlinePre} <span className="text-[#9fb08c]">{data.form.headlineHighlight}</span>{" "}
                {data.form.headlinePost}
              </h3>
              <div className="flex shrink-0 flex-col items-center gap-1">
                <LandRoverLogo className="h-14 w-14" />
                <span className="label-text tracking-widest text-white">ABOVE &amp; BEYOND</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-[minmax(0,0.85fr)_1px_minmax(0,1.9fr)] gap-6">
              <div className="flex flex-col justify-start gap-5">
                {[
                  { icon: "shield-check", title: "100% VIN-Matched", body: "We confirm your exact engine using your registration." },
                  { icon: "truck", title: "Nationwide Recovery", body: "From £70. Most vehicles collected within a few hours." },
                  { icon: "wrench", title: "12 Month Warranty", body: "Unlimited-mileage warranty with every rebuild." },
                ].map((f, i) => (
                  <Fragment key={f.title}>
                    {i > 0 && <span className="block h-px bg-white/15" aria-hidden="true" />}
                    <div className="flex items-stretch gap-4">
                      <span className="relative w-20 shrink-0">
                        <Icon name={f.icon} className="absolute inset-0 h-full w-full text-[#9fb08c]" />
                      </span>
                      <div className="min-w-0 py-1">
                        <p className="text-base font-extrabold uppercase leading-tight text-white">{f.title}</p>
                        <p className="mt-2 text-sm leading-snug text-white">{f.body}</p>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>

              <span className="bg-white/15" aria-hidden="true" />

              <div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <label className="block">
                    <span className="label-text uppercase tracking-wide text-white">
                      {data.form.fields.reg.label} <span className="text-[#9fb08c]">*</span>
                    </span>
                    <div className="mt-2 flex h-12 overflow-hidden rounded-md bg-white">
                      <GbBadge className="w-12" />
                      <input
                        type="text"
                        placeholder={data.form.fields.reg.placeholder}
                        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#101828] placeholder:text-[#101828]/40 outline-none"
                      />
                    </div>
                  </label>
                  <LightField label={data.form.fields.postcode.label} placeholder={data.form.fields.postcode.placeholder} />
                  <LightField label={data.form.fields.name.label} placeholder={data.form.fields.name.placeholder} />
                  <LightField label={data.form.fields.phone.label} placeholder={data.form.fields.phone.placeholder} type="tel" />
                  <LightField label={data.form.fields.email.label} placeholder={data.form.fields.email.placeholder} type="email" />
                  <label className="block">
                    <span className="label-text uppercase tracking-wide text-white">
                      {data.form.fields.enquiry.label} <span className="text-[#9fb08c]">*</span>
                    </span>
                    <div className="relative mt-2">
                      <select className="h-12 w-full appearance-none rounded-md bg-white px-4 pr-10 text-sm text-[#101828]/60 outline-none">
                        <option>{data.form.fields.enquiry.placeholder}</option>
                      </select>
                      <Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#101828]" />
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-md border border-[#9fb08c]/50 py-4 text-base font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #3f5a3a 0%, #2c4128 100%)" }}
                >
                  {data.form.submitLabel} <span aria-hidden>→</span>
                </button>

                <p className="mt-3 flex items-center justify-center gap-2 text-sm text-white">
                  <Icon name="shield-check" className="h-4 w-4 shrink-0 text-[#9fb08c]" />
                  {data.form.guarantee}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
