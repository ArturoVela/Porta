import { Image } from "@chakra-ui/react";
import type { CoverImage } from "@/types/content";

function alternateSource(src: string, extension: "avif" | "webp") {
  return src.startsWith("/assets/") && /\.(?:avif|webp)$/.test(src)
    ? src.replace(/\.(?:avif|webp)$/, `.${extension}`)
    : null;
}

function responsiveSources(src: string) {
  return src.startsWith("/assets/images/project-covers/")
    ? [640, 1280].map((width) => `${width === 1280 ? src : src.replace(/\.(avif|webp)$/, `-${width}.$1`)} ${width}w`).join(", ")
    : src;
}

export function ResponsiveImage({ image, loading = "lazy", sizes = "(min-width: 80rem) 1280px, 100vw" }: { image: CoverImage; loading?: "eager" | "lazy"; sizes?: string }) {
  const avif = alternateSource(image.src, "avif");
  const webp = alternateSource(image.src, "webp");
  return (
    <picture style={{ display: "block", width: "100%", height: "100%" }}>
      {avif ? <source srcSet={responsiveSources(avif)} sizes={sizes} type="image/avif" /> : null}
      {webp ? <source srcSet={responsiveSources(webp)} sizes={sizes} type="image/webp" /> : null}
      <Image
        src={image.src}
        srcSet={image.src.startsWith("/assets/images/project-covers/") ? responsiveSources(image.src) : undefined}
        sizes={sizes}
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
