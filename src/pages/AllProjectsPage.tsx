import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { ContentLink as Link } from "@/components/ContentLink";
import { useContent } from "@/content/context";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";

function searchable(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
}

export function AllProjectsPage() {
  const { content } = useContent();
  const [query, setQuery] = useState("");
  const search = searchable(query.trim());
  const projects = [...content.projects]
    .sort((a, b) => a.order - b.order)
    .filter((project) => !search || searchable([project.title, project.excerpt, project.category, project.type, ...project.stack].join(" ")).includes(search));

  return (
    <div className="all-projects">
      <div className="all-projects__intro">
        <div>
          <h1>Todos los proyectos</h1>
          <p>Un acceso rápido a cada proyecto, sin recorrer el portafolio.</p>
        </div>
        <span className="all-projects__total">{content.projects.length} en total</span>
      </div>

      <label className="all-projects__search">
        <Search aria-hidden="true" size={20} />
        <span className="sr-only">Buscar proyectos</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nombre, tipo o tecnología"
          autoComplete="off"
        />
      </label>

      <p className="all-projects__count" role="status">{projects.length} {projects.length === 1 ? "proyecto" : "proyectos"}</p>
      {projects.length ? (
        <div className="all-projects__grid">
          {projects.map((project) => {
            const availability = projectAvailabilityLabel(project);
            return (
              <article className="all-projects__item" key={project.id}>
                <div className="all-projects__meta"><span>{project.category}</span><span>{project.year}</span></div>
                <h2><Link to={`/proyectos/${project.slug}`}>{project.title}</Link></h2>
                <p className="all-projects__excerpt">{project.excerpt}</p>
                <div className="all-projects__actions">
                  {project.liveUrl ? (
                    <a className="all-projects__open" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      {availability === "Acceso restringido" ? "Abrir acceso" : "Abrir proyecto"}<ArrowUpRight aria-hidden="true" size={16} />
                    </a>
                  ) : null}
                  <Link className="all-projects__detail" to={`/proyectos/${project.slug}`}>Ver ficha</Link>
                  <span className="all-projects__availability">{availability}</span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="all-projects__empty">No hay proyectos con esa búsqueda. Prueba otro nombre o tecnología.</p>
      )}
    </div>
  );
}
