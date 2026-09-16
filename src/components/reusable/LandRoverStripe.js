const sizes = {
  default: "h-4 w-8",
  lg: "h-5 w-12",
  wide: "h-1.5 w-24",
  full: "h-1.5 w-full",
};

export default function BMWStripe({ className = "", size = "default" }) {
  return (
    <span className={`inline-flex gap-0.5 ${sizes[size] || sizes.default} ${className}`} aria-hidden="true">
      <span className="flex-1 skew-x-[-20deg] bg-[var(--color-bmw-blue)]" />
      <span className="flex-1 skew-x-[-20deg] bg-[var(--color-bmw-violet)]" />
      <span className="flex-1 skew-x-[-20deg] bg-[var(--color-bmw-red)]" />
    </span>
  );
}
