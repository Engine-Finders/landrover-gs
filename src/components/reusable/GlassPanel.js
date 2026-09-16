export default function GlassPanel({ children, className = "" }) {
  return (
    <div className={`glass-panel p-4 sm:p-7 ${className}`}>
      <span className="glass-sparkle glass-sparkle-tl" aria-hidden="true" />
      <span className="glass-sparkle glass-sparkle-tr" aria-hidden="true" />
      <span className="glass-glare glass-glare-tl" aria-hidden="true" />
      <span className="glass-glare glass-glare-tr" aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  );
}
