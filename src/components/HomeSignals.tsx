import { useEffect, useState } from "react";
import { useContent } from "@/content/context";
import { isUptimeSummary, type UptimeSummary } from "@/lib/uptime";

export function localTime(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(date);
}

export function HomeSignals() {
  const { copy, locale } = useContent();
  const [now, setNow] = useState(() => new Date());
  const [uptime, setUptime] = useState<UptimeSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      setNow(new Date());
      timer = setTimeout(update, 60_000 - Date.now() % 60_000);
    };
    const resume = () => { clearTimeout(timer); update(); };
    update();
    document.addEventListener("visibilitychange", resume);
    return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", resume); };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch("/api/uptime", { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]) });
        if (!response.ok) throw new Error("Estado no disponible");
        const data: unknown = await response.json();
        if (!isUptimeSummary(data)) throw new Error("Estado inválido");
        if (!controller.signal.aborted) setUptime(data);
      } catch {
        if (!controller.signal.aborted) setUptime(null);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void load();
    const timer = setInterval(() => { if (!document.hidden) void load(); }, 300_000);
    return () => { controller.abort(); clearInterval(timer); };
  }, []);

  const c = copy.home;
  const percent = uptime?.averagePercent;
  const value = loading ? c.uptimeLoading : percent != null ? new Intl.NumberFormat(locale, { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(percent / 100) : uptime ? c.uptimeEmpty : c.uptimeUnavailable;
  const detail = uptime ? `${c.uptimeDetail} ${uptime.serviceCount}/${uptime.totalServices}. ${uptime.checkedAt ? `${c.uptimeChecked} ${new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(uptime.checkedAt))}.` : ""}` : c.uptimeUnavailable;

  return (
    <div className="home-signals">
      <span>{c.localTime} <time dateTime={now.toISOString()}>{localTime(now, locale)}</time></span>
      <a href="https://status.velaarturo.com/" target="_blank" rel="noopener noreferrer" title={loading ? c.uptimeLoading : detail} aria-label={`${c.uptimeAverage}: ${value} · ${c.uptimePeriod}${uptime?.stale ? ` · ${c.uptimeStale}` : ""}`}>
        <span>{c.uptimeAverage}</span>
        <span className="home-signals__result" role="status" aria-busy={loading}>
          <span className="home-signals__value" data-loading={loading} aria-label={loading ? c.uptimeLoading : undefined}>
            {loading ? "—" : value}
          </span>
          <span> · {c.uptimePeriod}{uptime?.stale ? ` · ${c.uptimeStale}` : ""}</span>
        </span>
      </a>
    </div>
  );
}
