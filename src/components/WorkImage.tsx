import { useState } from "react";

export function WorkImage({ src, srcSet, sizes, alt, width, height, priority = false }: { src: string; srcSet?: string; sizes?: string; alt: string; width: number; height: number; priority?: boolean }) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  return <span className="work-image" data-state={state} aria-busy={state === "loading"}>
    {state !== "loaded" && <span className="work-image-feedback" role={state === "error" ? "status" : undefined}>
      {state === "error" ? "Imagen no disponible." : "Cargando imagen…"}
    </span>}
    <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} width={width} height={height} loading="eager" decoding="async" fetchPriority={priority ? "high" : "auto"}
      aria-hidden={state !== "loaded"} onLoad={() => setState("loaded")} onError={() => setState("error")} />
  </span>;
}
