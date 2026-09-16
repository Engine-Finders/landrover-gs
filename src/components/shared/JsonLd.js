/**
 * Renders a JSON-LD <script>. Server component — safe to use in any page or layout.
 * Pass a single schema object (usually a { "@context", "@graph": [...] } document).
 */
export default function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
