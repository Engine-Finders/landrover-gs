"use client";

import { useState } from "react";
import useLeadForm, { LeadStatus } from "@/components/reusable/useLeadForm";
import Icon from "@/components/reusable/Icon";
import RegPlate from "@/components/reusable/RegPlate";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";
import FormSelect from "@/components/reusable/FormSelect";

function FaqCard({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white/80 p-5 shadow-[0_15px_40px_-25px_rgba(16,24,40,0.4)] backdrop-blur-md">
      <button type="button" onClick={onToggle} className="flex w-full items-start gap-3 text-left">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-hero-blue text-sm font-extrabold text-white">
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

function Field({ label, name, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="label-text uppercase tracking-wide text-white">
        {label} <span className="text-bmw-red">*</span>
      </span>
      <input
        name={name}
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 h-13 w-full rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-hero-blue"
      />
    </label>
  );
}

export default function ModelSec18({ data }) {
  const [openIndex, setOpenIndex] = useState(new Set());

  function toggle(i) {
    setOpenIndex((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const [reg, setReg] = useState("");
  const lead = useLeadForm();
  const handleSubmit = lead.handleSubmit;

  const [formHighlightWord1, ...formHighlightRestWords] = data.form.headlineHighlight.split(" ");
  const formMobileLine2 = formHighlightRestWords.join(" ");

  return (
    <section id="quote-form" className="theme-light relative scroll-mt-6 overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 pb-10 pt-4 md:hidden">
        <div className="flex items-center gap-2">
          <LandRoverStripe className="h-6 w-12 shrink-0" />
          <h2 className="h2 origin-left scale-y-110 scale-x-90 whitespace-nowrap uppercase">
            <span className="text-[#101828]">{data.kicker} </span>{" "}
            <span className="text-hero-blue">{data.kickerHighlight}</span>
          </h2>
        </div>

        <div className="mt-5 space-y-4">
          {[...data.faqLeft, ...data.faqRight].map((item, i) => (
            <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} />
          ))}
        </div>

        {/* quote form */}
        <form
          onSubmit={handleSubmit}
          className="theme-dark relative mt-8 overflow-hidden rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, #141813 0%, #0a0c09 100%)",
            boxShadow: "0 0 0 1px rgba(96,112,86,0.3), 0 25px 60px -20px rgba(96,112,86,0.4)",
          }}
        >
          <LandRoverStripe className="absolute right-5 top-5 h-6 w-12" />

          <h3 className="h3 origin-left scale-y-110 scale-x-90 max-w-[82%] uppercase">
            <span className="block">
              <span className="text-white">{data.form.headlinePre} </span>{" "}
              <span className="text-hero-blue">{formHighlightWord1}</span>
            </span>{" "}
            <span className="block text-hero-blue">{formMobileLine2}</span>{" "}
            <span className="block text-white">{data.form.headlinePost}</span>
          </h3>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="label-text uppercase tracking-wide text-white">
                {data.form.fields.reg.label} <span className="text-bmw-red">*</span>
              </span>
              <div className="mt-2 flex items-stretch gap-2">
                <div className="min-w-0 flex-1">
                  <RegPlate value={reg} onChange={setReg} heightClass="[--ph:56px]" className="max-w-none!" ariaLabel="Vehicle registration" />
                </div>
                <button type="submit" aria-label="Continue" className="flex w-14 shrink-0 items-center justify-center rounded-lg bg-hero-blue text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-110">
                  <span aria-hidden className="text-2xl leading-none">→</span>
                </button>
                <input type="hidden" name="vehicle_vrm" value={reg} required />
              </div>
            </label>

            <Field name="name" label={data.form.fields.name.label} placeholder={data.form.fields.name.placeholder} />
            <Field name="number" label={data.form.fields.phone.label} placeholder={data.form.fields.phone.placeholder} type="tel" />
            <Field name="email" label={data.form.fields.email.label} placeholder={data.form.fields.email.placeholder} type="email" />
            <Field name="postcode" label={data.form.fields.postcode.label} placeholder={data.form.fields.postcode.placeholder} />

            <label className="block">
              <span className="label-text uppercase tracking-wide text-white">
                {data.form.fields.enquiry.label} <span className="text-bmw-red">*</span>
              </span>
              <div className="relative mt-2">
                <FormSelect name="description" required theme="dark" placeholder={data.form.fields.enquiry.placeholder} options={data.form.fields.enquiry.options} className="h-13 rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white" />
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={lead.status === "loading"}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-extrabold uppercase tracking-wide text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, var(--color-hero-gold) 0%, #4c5a45 100%)",
              boxShadow: "0 8px 20px rgba(96,112,86,0.4)",
            }}
          >
            {data.form.submitLabel} <span aria-hidden>→</span>
          </button>
          <LeadStatus lead={lead} />

          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-white">
            <Icon name="shield-check" className="h-4 w-4 shrink-0 text-hero-blue" />
            {data.form.guarantee}
          </p>
        </form>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <LandRoverStripe className="h-10 w-16" />
          <div role="heading" aria-level="2" className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="text-[#101828]">{data.kicker} </span>{" "}
            <span className="text-hero-blue">{data.kickerHighlight}</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
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
            background: "linear-gradient(135deg, #141813 0%, #0a0c09 100%)",
            boxShadow: "0 0 0 1px rgba(96,112,86,0.3), 0 25px 60px -20px rgba(96,112,86,0.4)",
          }}
        >
          <LandRoverStripe className="absolute right-6 top-6 h-8 w-16" />

          <div role="heading" aria-level="3" className="h3 origin-left scale-y-110 scale-x-90 whitespace-nowrap text-white uppercase">
            {data.form.headlinePre} <span className="text-hero-blue">{data.form.headlineHighlight}</span>{" "}
            {data.form.headlinePost}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <label className="block">
              <span className="label-text uppercase tracking-wide text-white">
                {data.form.fields.reg.label} <span className="text-bmw-red">*</span>
              </span>
              <div className="mt-2 flex items-stretch gap-2">
                <div className="min-w-0 flex-1">
                  <RegPlate value={reg} onChange={setReg} heightClass="[--ph:56px]" className="max-w-none!" ariaLabel="Vehicle registration" />
                </div>
                <button type="submit" aria-label="Continue" className="flex w-14 shrink-0 items-center justify-center rounded-lg bg-hero-blue text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-110">
                  <span aria-hidden className="text-2xl leading-none">→</span>
                </button>
                <input type="hidden" name="vehicle_vrm" value={reg} required />
              </div>
            </label>

            <Field name="name" label={data.form.fields.name.label} placeholder={data.form.fields.name.placeholder} />
            <Field name="number" label={data.form.fields.phone.label} placeholder={data.form.fields.phone.placeholder} type="tel" />
            <Field name="email" label={data.form.fields.email.label} placeholder={data.form.fields.email.placeholder} type="email" />
            <Field name="postcode" label={data.form.fields.postcode.label} placeholder={data.form.fields.postcode.placeholder} />

            <label className="block">
              <span className="label-text uppercase tracking-wide text-white">
                {data.form.fields.enquiry.label} <span className="text-bmw-red">*</span>
              </span>
              <div className="relative mt-2">
                <FormSelect name="description" required theme="dark" placeholder={data.form.fields.enquiry.placeholder} options={data.form.fields.enquiry.options} className="h-13 rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white" />
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={lead.status === "loading"}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-extrabold uppercase tracking-wide text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, var(--color-hero-gold) 0%, #4c5a45 100%)",
              boxShadow: "0 8px 20px rgba(96,112,86,0.4)",
            }}
          >
            {data.form.submitLabel} <span aria-hidden>→</span>
          </button>
          <LeadStatus lead={lead} />

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white">
            <Icon name="shield-check" className="h-4 w-4 shrink-0 text-hero-blue" />
            {data.form.guarantee}
          </p>
        </form>
      </div>
      </div>
    </section>
  );
}
