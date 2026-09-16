export default function Heading({ text, as: Tag = "h2", className = "", accentClassName = "text-[var(--color-hero-gold)]" }) {
  const lines = text.split("|");
  return (
    <Tag className={className}>
      {lines.map((line, i) => {
        const isAccent = lines.length === 1 ? false : lines.length === 2 ? i === 1 : i > 0 && i < lines.length - 1;
        return (
          <span key={i} className={`block ${isAccent ? accentClassName : ""}`}>
            {line}
          </span>
        );
      })}
    </Tag>
  );
}
