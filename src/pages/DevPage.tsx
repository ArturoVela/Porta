import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Code2, Download, Github, Mail, MapPin, Share2, Search } from "lucide-react";
import { ContentLink as Link } from "@/components/ContentLink";
import { ProjectVisual } from "@/components/ContentCards";
import { useContent } from "@/content/context";
import { CV_URL } from "@/lib/links";
import { DEV_APPS, DEV_APP_GROUPS, devAppDescription, filterDevApps, projectTechnologies, type DevAppGroup } from "@/lib/dev";
import { contactVCard, publicDevUrl, shareDevCard } from "@/lib/contact";
import { CopyEmail } from "@/components/CopyEmail";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";
import { selectSpotlightProjects } from "@/lib/spotlight";
import { activityMetrics, contributionWeeks, GITHUB_URL, GITHUB_USERNAME, type GitHubCalendar, type GitHubSummary } from "@/lib/github";
import "./dev.css";

const LANGUAGE_COLORS: Record<string, string> = { TypeScript: "#3178c6", JavaScript: "#c49d19", HTML: "#d84b2b", CSS: "#8055c3", PHP: "#777bb3", Java: "#ad6812", Python: "#387dab", Dart: "#168ca6", Shell: "#508329", SCSS: "#ba4686" };

function useGitHub<T>(path: string) {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: boolean }>({ data: null, loading: true, error: false });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: false });
    fetch(path, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("GitHub no disponible");
        return response.json() as Promise<T>;
      })
      .then((data) => { if (!controller.signal.aborted) setState({ data, loading: false, error: false }); })
      .catch(() => { if (!controller.signal.aborted) setState({ data: null, loading: false, error: true }); });
    return () => controller.abort();
  }, [path, attempt]);
  return { ...state, retry: () => setAttempt((value) => value + 1) };
}

function GitHubNotice({ loading, retry }: { loading: boolean; retry: () => void }) {
  const { copy } = useContent();
  const c = copy.dev;
  return <div className="dev-notice" role="status">
    <p>{loading ? c.loading : c.unavailable}</p>
    {!loading && <button type="button" onClick={retry}>{c.retry} <ArrowRight size={15} aria-hidden="true" /></button>}
  </div>;
}

function Activity() {
  const { copy, locale } = useContent();
  const c = copy.dev;
  const intlLocale = locale === "en" ? "en-US" : "es-PE";
  const number = new Intl.NumberFormat(intlLocale);
  const dateLabel = new Intl.DateTimeFormat(intlLocale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const monthLabel = new Intl.DateTimeFormat(intlLocale, { month: "short", timeZone: "UTC" });
  const [year, setYear] = useState("last");
  const summary = useGitHub<GitHubSummary>("/api/github");
  const calendar = useGitHub<GitHubCalendar>(`/api/github/contributions?year=${year}`);
  const weeks = contributionWeeks(calendar.data?.days ?? []);
  const metrics = calendar.data ? activityMetrics(calendar.data.days) : null;
  const currentYear = new Date().getFullYear();
  const firstYear = summary.data ? new Date(summary.data.createdAt).getUTCFullYear() : 2022;
  const totalBytes = summary.data?.languages.reduce((total, language) => total + language.bytes, 0) ?? 0;
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const selected = calendar.data?.days.find((day) => day.date === selectedDay);

  return <section className="dev-activity" id="actividad" aria-labelledby="activity-title">
    <div className="dev-section-heading">
      <div><h2 id="activity-title">{c.activityTitle}</h2><p>{c.activityIntro}</p></div>
      <a className="dev-text-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">{c.github} <ArrowUpRight size={17} aria-hidden="true" /></a>
    </div>
    <div className="dev-calendar-panel">
      <div className="dev-calendar-heading">
        <h3>{metrics ? <><strong>{number.format(metrics.total)}</strong> {c.contributions} <span>{year === "last" ? c.lastPeriod : `${c.inYear} ${year}`}</span></> : c.calendarTitle}</h3>
        <label className="dev-year">{c.period}<select aria-label={c.period} value={year} onChange={(event) => { setYear(event.target.value); setSelectedDay(null); }}>
          <option value="last">{c.lastMonths}</option>
          {Array.from({ length: currentYear - firstYear + 1 }, (_, index) => currentYear - index).map((value) => <option key={value} value={value}>{value}</option>)}
        </select></label>
      </div>
      {calendar.data ? <>
        <div className="dev-calendar-scroll" tabIndex={0} role="region" aria-label={c.calendarRegion}>
          <div className="dev-calendar" style={{ "--weeks": weeks.length } as CSSProperties}>
            <div className="dev-months" aria-hidden="true">{weeks.map((week, index) => {
              const day = week.find((value) => value && (index === 0 || value.date.endsWith("-01")));
              return <span key={index}>{day ? monthLabel.format(new Date(`${day.date}T00:00:00Z`)).replace(".", "") : ""}</span>;
            })}</div>
            <div className="dev-weekdays" aria-hidden="true">{c.weekdays.map((day) => <span key={day}>{day}</span>)}</div>
            <div className="dev-contribution-weeks">{weeks.map((week, index) => <div className="dev-week" key={index}>{week.map((day, weekday) => day
              ? <button key={day.date} type="button" className="dev-day" data-date={day.date} data-level={day.level} tabIndex={day.date === (selectedDay ?? calendar.data!.to) ? 0 : -1} aria-label={`${number.format(day.count)} ${day.count === 1 ? c.contribution : c.contributions}, ${dateLabel.format(new Date(`${day.date}T00:00:00Z`))}`} title={`${day.count} ${c.contributions} · ${dateLabel.format(new Date(`${day.date}T00:00:00Z`))}`} onClick={() => setSelectedDay(day.date)} onKeyDown={(event) => {
                const offset = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 }[event.key];
                if (offset === undefined) return;
                event.preventDefault();
                const days = calendar.data!.days;
                const next = days[days.findIndex((value) => value.date === day.date) + offset];
                if (next) {
                  setSelectedDay(next.date);
                  event.currentTarget.closest(".dev-contribution-weeks")?.querySelector<HTMLButtonElement>(`[data-date="${next.date}"]`)?.focus();
                }
              }} />
              : <span className="dev-day dev-day-empty" key={weekday} />)}</div>)}</div>
          </div>
        </div>
        <div className="dev-calendar-footer">
          <p role="status">{selected ? `${number.format(selected.count)} ${c.contributions} · ${dateLabel.format(new Date(`${selected.date}T00:00:00Z`))}` : c.selectDay}</p>
          <div className="dev-legend" aria-label={c.intensity}><span>{c.less}</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} className="dev-day" data-level={level} aria-hidden="true" />)}<span>{c.more}</span></div>
        </div>
      </> : <GitHubNotice loading={calendar.loading} retry={calendar.retry} />}
    </div>
    <div className="dev-data-grid">
      <div className="dev-performance">
        <h3>{c.consistency}</h3>
        {metrics ? <dl className="dev-metrics">
          <div><dt>{c.activeDays}</dt><dd>{number.format(metrics.activeDays)} <span>{c.days}</span></dd></div>
          <div><dt>{c.streak}</dt><dd>{number.format(metrics.bestStreak)} <span>{c.consecutiveDays}</span></dd></div>
          <div><dt>{c.publicRepos}</dt><dd>{summary.data ? number.format(summary.data.publicRepos) : "—"}</dd></div>
        </dl> : <p className="dev-muted">{calendar.loading ? c.calculating : c.directActivity}</p>}
        <p className="dev-data-note">{c.activityNote}</p>
        {summary.error && <GitHubNotice loading={false} retry={summary.retry} />}
      </div>
      <div className="dev-languages">
        <h3>{c.languages}</h3>
        {summary.data ? summary.data.languages.length ? <>
          <div className="dev-language-bar" aria-hidden="true">{summary.data.languages.map((language) => <span key={language.name} style={{ flexGrow: language.bytes, backgroundColor: LANGUAGE_COLORS[language.name] ?? "var(--chakra-colors-app-accent)" }} />)}</div>
          <ul>{summary.data.languages.map((language) => <li key={language.name}>
            <span><i style={{ backgroundColor: LANGUAGE_COLORS[language.name] ?? "var(--chakra-colors-app-accent)" }} aria-hidden="true" />{language.name}</span>
            <strong>{(language.bytes / totalBytes * 100).toLocaleString(intlLocale, { maximumFractionDigits: 1 })}%</strong>
          </li>)}</ul>
          <p className="dev-data-note">{c.languagesNote}</p>
        </> : <p className="dev-muted">{c.noLanguages}</p> : <GitHubNotice loading={summary.loading} retry={summary.retry} />}
      </div>
    </div>
    {(calendar.data || summary.data) && <p className="dev-source">{c.source} · {calendar.data?.stale || summary.data?.stale ? c.stale : c.updated} {dateLabel.format(new Date(calendar.data?.fetchedAt ?? summary.data!.fetchedAt))}. {c.sourceNote}</p>}
  </section>;
}

function CardActions() {
  const { content, copy, locale } = useContent();
  const c = copy.dev;
  const [status, setStatus] = useState<"copied" | "shared" | "blocked" | "downloadError" | null>(null);
  const url = publicDevUrl(locale);
  function download() {
    try {
      const blob = new Blob([contactVCard(content.site, locale)], { type: "text/vcard;charset=utf-8" });
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "arturo-vela.vcf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      setStatus(null);
    } catch { setStatus("downloadError"); }
  }
  return <div className="dev-card-tools">
    <div className="dev-card-tool-buttons">
      <button type="button" onClick={download}><Download size={16} aria-hidden="true" />{c.download}</button>
      <button type="button" onClick={async () => {
        const result = await shareDevCard(content.site.name, locale);
        setStatus(result === "cancelled" ? null : result);
      }}><Share2 size={16} aria-hidden="true" />{c.share}</button>
      <details className="dev-qr"><summary>{c.showQr}</summary><div><img src={`/assets/images/portfolio/dev-qr-${locale}.png`} alt={c.qrAlt} width="296" height="296" loading="lazy" /><a href={url}>{url}</a></div></details>
    </div>
    {status && <p role="status">{status === "blocked" ? c.copyBlocked : c[status]}</p>}
    {status === "blocked" && <a className="dev-share-url" href={url}>{url}</a>}
  </div>;
}

export function DevPage() {
  const { content, copy, locale } = useContent();
  const c = copy.dev;
  const featured = selectSpotlightProjects(content.projects);
  const technologies = projectTechnologies(content.projects);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<DevAppGroup | "all">("all");
  const [showAllApps, setShowAllApps] = useState(false);
  const apps = filterDevApps(query, group, locale, content.projects);
  function clearFilters() { setQuery(""); setGroup("all"); setShowAllApps(false); }
  return <div className="dev-page">
    <section className="dev-card" aria-labelledby="dev-name">
      <div className="dev-portrait">
        <img src="/assets/images/Me/Fototech.jpg" alt={c.portrait} width="1792" height="2400" fetchPriority="high" />
        <div className="dev-portrait-caption"><MapPin size={16} aria-hidden="true" /><span>{content.site.location}</span><span className="dev-portrait-code" aria-hidden="true">&lt;/&gt;</span></div>
      </div>
      <div className="dev-introduction">
        <div className="dev-identity"><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">@{GITHUB_USERNAME} <ArrowUpRight size={14} aria-hidden="true" /></a></div>
        <h1 id="dev-name">{content.site.name}<span>.</span></h1>
        <p className="dev-role">{c.role}</p>
        <p className="dev-bio">{content.site.intro}</p>
        <div className="dev-actions">
          <Link className="dev-button dev-button-primary" to="/contacto"><Mail size={18} aria-hidden="true" />{c.workTogether} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <a className="dev-button dev-button-secondary" href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><Github size={18} aria-hidden="true" />GitHub</a>
        </div>
        <div className="dev-contact-links">
          <a href={`mailto:${content.site.email}`}>{content.site.email}</a>
          <a href={CV_URL} target="_blank" rel="noopener noreferrer">{c.cv} <ArrowUpRight size={15} aria-hidden="true" /></a>
          {content.site.socials.filter((social) => social.label === "LinkedIn").map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a>)}
        </div>
        <CopyEmail />
        <CardActions />
      </div>
    </section>

    <nav className="dev-index" aria-label={c.index}><a href="#proyectos">{c.projects} <ArrowRight size={15} aria-hidden="true" /></a><a href="#apps">{c.apps} <ArrowRight size={15} aria-hidden="true" /></a><a href="#actividad">{c.activity} <ArrowRight size={15} aria-hidden="true" /></a></nav>

    <section className="dev-projects" id="proyectos" aria-labelledby="projects-title">
      <div className="dev-section-heading"><div><h2 id="projects-title">{c.projectsTitle}</h2><p>{c.projectsIntro}</p></div><Link className="dev-text-link" to="/proyectos">{c.allProjects} <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <div className="dev-featured">{featured.map((project) => <div key={project.id} className="dev-project">
        <Link to={`/proyectos/${project.slug}`}>
          <div className="dev-project-visual"><ProjectVisual project={project} compact /></div>
          <div className="dev-project-title"><h3>{project.title}</h3><ArrowUpRight size={21} aria-hidden="true" /></div>
        </Link>
        <p>{project.excerpt}</p>
        {project.outcomes[0] && <p className="dev-project-outcome">{project.outcomes.find((outcome) => /\d|dos empresas|two companies/i.test(outcome)) ?? project.outcomes[0]}</p>}
        <span className="dev-project-tech">{project.stack.slice(0, 3).join(" · ")}</span>
        <div className="dev-project-links"><Link to={`/proyectos/${project.slug}`}>{c.viewCase} <ArrowRight size={15} aria-hidden="true" /></Link>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{projectAvailabilityLabel(project) === "Acceso restringido" ? c.openAccess : c.openApp} <ArrowUpRight size={15} aria-hidden="true" /></a>}
        </div>
      </div>)}</div>
    </section>

    <section className="dev-apps" id="apps" aria-labelledby="apps-title">
      <div className="dev-section-heading"><div><h2 id="apps-title">{c.appsTitle}</h2><p>{DEV_APPS.length} {c.appsIntro}</p></div><Link className="dev-text-link" to="/linktree">{c.wallet} <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <div className="dev-app-filters">
        <label className="dev-search">{c.search}<span><Search size={18} aria-hidden="true" /><input type="search" value={query} placeholder={c.searchPlaceholder} onChange={(event) => { setQuery(event.target.value); setShowAllApps(false); }} /></span></label>
        <label className="dev-category">{c.category}<select aria-label={c.category} value={group} onChange={(event) => { setGroup(event.target.value as DevAppGroup | "all"); setShowAllApps(false); }}><option value="all">{c.all}</option>{(Object.keys(DEV_APP_GROUPS) as DevAppGroup[]).map((key) => <option key={key} value={key}>{c.groups[key]}</option>)}</select></label>
      </div>
      <div className="dev-filter-status"><p role="status">{apps.length} {apps.length === 1 ? c.resultSingular : c.results}</p>{(query || group !== "all") && <button type="button" onClick={clearFilters}>{c.clear}</button>}</div>
      <div className="dev-app-list" id="dev-app-list">{apps.slice(0, showAllApps ? apps.length : 8).map((app) => <a className="dev-app" key={app.id} href={`https://${app.domain}`} target="_blank" rel="noopener noreferrer">
        <div className="dev-app-icon" aria-hidden="true">{app.image ? <img src={app.image} alt="" width="750" height="288" loading="lazy" /> : <Code2 size={24} />}</div>
        <div><h3>{app.name}{app.private && <span>{c.private}</span>}</h3><p>{devAppDescription(app, locale, content.projects)}</p><span className="dev-app-domain">{app.domain}</span></div><ArrowUpRight size={18} aria-hidden="true" />
      </a>)}</div>
      {!apps.length && <div className="dev-app-empty"><h3>{c.empty}</h3><p>{c.emptyHelp}</p><button type="button" onClick={clearFilters}>{c.clear} <ArrowRight size={16} aria-hidden="true" /></button></div>}
      {apps.length > 8 && <button className="dev-show-apps" type="button" aria-expanded={showAllApps} aria-controls="dev-app-list" onClick={() => setShowAllApps((value) => !value)}>{showAllApps ? c.showLess : `${c.showAll} (${apps.length})`} <ArrowRight size={17} aria-hidden="true" /></button>}
    </section>

    {!!technologies.length && <section className="dev-technologies" aria-labelledby="technologies-title"><div className="dev-section-heading"><div><h2 id="technologies-title">{c.technologies}</h2><p>{c.technologiesIntro}</p></div></div><div className="dev-technology-list">{technologies.map(({ name, project }) => <Link key={name} to={`/proyectos/${project.slug}`}><strong>{name}</strong><span>{project.title} <ArrowUpRight size={16} aria-hidden="true" /></span></Link>)}</div></section>}

    <Activity />

    <section className="dev-close" aria-labelledby="contact-title"><div><h2 id="contact-title">{c.close}</h2><p>{content.site.availability}</p></div><Link className="dev-button dev-button-primary" to="/contacto">{c.contact} <ArrowUpRight size={19} aria-hidden="true" /></Link></section>
  </div>;
}
