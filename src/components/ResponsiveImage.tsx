import { Image } from "@chakra-ui/react";
import type { CoverImage } from "@/types/content";

function alternateSource(src: string, extension: "avif" | "webp") {
  return src.startsWith("/assets/") && /\.(?:avif|webp)$/.test(src)
    ? src.replace(/\.(?:avif|webp)$/, `.${extension}`)
    : null;
}

export function ResponsiveImage({ image, loading = "lazy" }: { image: CoverImage; loading?: "eager" | "lazy" }) {
  const avif = alternateSource(image.src, "avif");
  const webp = alternateSource(image.src, "webp");
  return (
    <picture style={{ display: "block", width: "100%", height: "100%" }}>
      {avif ? <source srcSet={avif} type="image/avif" /> : null}
      {webp ? <source srcSet={webp} type="image/webp" /> : null}
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={loading}
        fetchPriority={loading === "eager" ? "high" : "auto"}
        w="100%"
        h="100%"
        objectFit="cover"
      />
    </picture>
  );
}
