import Image from "next/image";
import { partImageFor } from "@/lib/partImage";

// Workshop gallery photo. When the caption names a part (timing chain replacement, valve covers, stripped block ...)
// that part's photo is shown on the dimmed workshop photo; other captions keep the workshop photo as is.
export default function GalleryPhoto({ src, label, sizes }) {
  const part = partImageFor(label);
  return (
    <>
      <Image src={src} alt={part ? "" : label} fill className={part ? "object-cover opacity-30" : "object-cover"} sizes={sizes} />
      {part && <Image src={part} alt={label} fill className="object-contain p-5 drop-shadow-[0_10px_24px_rgba(0,0,0,0.6)]" sizes={sizes} />}
    </>
  );
}
