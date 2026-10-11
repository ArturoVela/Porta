import { Info, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ContentLink } from "@/components/ContentLink";
import { useContent } from "@/content/context";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";
import type { ProjectContent } from "@/types/content";

type PreviewProject = Pick<ProjectContent, "title" | "excerpt"> & Partial<Pick<ProjectContent, "year" | "stack" | "type" | "liveUrl" | "repoUrl">>;

export function ProjectPreview({ project, imageSrc, to, onOpen, children }: {
  project: PreviewProject;
  imageSrc?: string;
  to?: string;
  onOpen?: () => void;
  children: ReactNode;
}) {
  const { copy, locale } = useContent();
  const [open, setOpen] = useState(false);
  const [imageState, setImageState] = useState<"loading" | "ready" | "error">(imageSrc ? "loading" : "ready");
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const show = () => { setOpen(true); onOpen?.(); };

  useEffect(() => {
    const image = root.current?.querySelector("img");
    setImageState(!imageSrc ? "ready" : image?.complete ? image.naturalWidth ? "ready" : "error" : "loading");
  }, [imageSrc]);

  return <div ref={root} className="project-preview" data-open={open || undefined}
    onPointerLeave={(event) => { if (!event.currentTarget.contains(document.activeElement)) setOpen(false); }}
    onFocusCapture={(event) => { if (event.target.matches(":focus-visible")) show(); }}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); root.current?.querySelector<HTMLButtonElement>(".project-preview-toggle")?.focus(); setOpen(false); } }}>
    <div className="project-preview-visual" onPointerEnter={(event) => { if (event.pointerType === "mouse") show(); }}>
    <div className="project-preview-media" aria-busy={imageState === "loading"}
      onLoadCapture={() => setImageState("ready")} onErrorCapture={() => setImageState("error")}>
      {to ? <ContentLink to={to} className="project-preview-image-link" aria-label={project.title}>{children}</ContentLink> : children}
      {imageState !== "ready" && <div className="project-preview-placeholder" data-error={imageState === "error" || undefined} role="status">
        {imageState === "loading" ? copy.cards.loadingImage : copy.home.imageUnavailable}
      </div>}
    </div>
    <div id={id} className="project-preview-panel" inert={!open} aria-hidden={!open}>
      <div className="project-preview-dots" aria-hidden="true"><i /><i /><i /></div>
      <div className="project-preview-content">
        <strong className="project-preview-title">{project.title}</strong>
        <div className="project-preview-description">{project.excerpt}</div>
        {!!project.stack?.length && <div className="project-preview-stack" aria-label={copy.project.technology}>
          {project.stack.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
          {project.stack.length > 4 && <span title={project.stack.slice(4).join(", ")}>+{project.stack.length - 4}</span>}
        </div>}
        <div className="project-preview-meta"><span>{projectAvailabilityLabel({ ...project, type: project.type ?? "" }, locale)}</span>{project.year && <span>{project.year}</span>}</div>
        {to && <ContentLink to={to} className="project-preview-case">{copy.cards.viewCase}</ContentLink>}
      </div>
    </div>
    </div>
    <div className="project-preview-controls"><button type="button" className="project-preview-toggle" aria-controls={id} aria-expanded={open}
      aria-label={`${open ? copy.cards.closePreview : copy.cards.preview}: ${project.title}`}
      onClick={() => { setOpen((value) => !value); onOpen?.(); }}>
      {open ? <X size={16} aria-hidden="true" /> : <Info size={16} aria-hidden="true" />}<span>{open ? copy.cards.closePreview : copy.cards.preview}</span>
    </button></div>
  </div>;
}
