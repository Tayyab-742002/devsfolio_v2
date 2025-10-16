"use client";
import { getSvg } from "@/utils/getSvg";
import { FC, useEffect, useMemo, useState } from "react";

type GithubStats = {
  username: string;
  followers: number;
  following: number;
  publicRepos: number;
  stars: number;
  forks: number;
};

type Metric = {
  label: string;
  value: number | null;
  title: string;
};

type GithubMetricsProps = {
  stats: GithubStats | null;
  loading?: boolean;
  error?: string | null;
  className?: string;
};

const AnimatedDigits: FC<{ value: number | null }> = ({ value }) => {
  const [display, setDisplay] = useState<number>(0);

  useEffect(() => {
    if (typeof value !== "number") return;
    const start = Math.max(0, display);
    const end = value;
    if (start === end) return;

    const durationMs = 1200;
    const startTs = performance.now();

    const tick = (ts: number) => {
      const t = Math.min(1, (ts - startTs) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(start + (end - start) * eased);
      setDisplay(next);
      if (t < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, display]);

  const text = useMemo(() => {
    if (typeof value !== "number") return "---";
    return new Intl.NumberFormat("en-US").format(display);
  }, [display, value]);

  return (
    <span
      className="font-mono text-lg sm:text-xl md:text-2xl tracking-tight text-white/95"
      style={{
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "0.05em",
      }}
      aria-live="polite"
    >
      {text}
    </span>
  );
};

const MetricCard: FC<{ metric: Metric }> = ({ metric }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 min-w-[70px] sm:min-w-[80px] md:min-w-[90px]"
      title={metric.title}
      aria-label={metric.title}
    >
      <AnimatedDigits value={metric.value} />
      <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-white/40 font-medium">
        {metric.label}
      </span>
    </div>
  );
};

const GithubIcon = getSvg("github");

export const GithubMetrics: FC<GithubMetricsProps> = ({
  stats,
  loading,
  error,
  className,
}) => {
  const metrics: Metric[] = useMemo(() => {
    return [
      {
        label: "Followers",
        value: stats?.followers ?? null,
        title: "GitHub followers",
      },
      {
        label: "Stars",
        value: stats?.stars ?? null,
        title: "Total repository stars",
      },
      {
        label: "Public Repos",
        value: stats?.publicRepos ?? null,
        title: "Public repositories",
      },
    ];
  }, [stats]);

  return (
    <div
      className={`inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-4 sm:py-5 rounded-2xl ${className || ""}`}
      style={{
        background: "rgba(255, 255, 255, 0.01)",
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
        border: "1px solid rgba(140, 92, 255, 0.5)",
        boxShadow: "0 8px 32px 0 rgba(140, 92, 255, 0.3)",
      }}
    >
      <div className="flex items-center" style={{ color: "#8c5cff" }}>
        {GithubIcon && <GithubIcon className="w-6 h-6" />}  
      </div>

      {loading && (
        <div className="text-primary/50 text-xs sm:text-sm font-light">
          Loading...
        </div>
      )}

      {!loading && error && (
        <div className="text-white/50 text-xs sm:text-sm font-light">
          Unavailable
        </div>
      )}

      {!loading && !error && (
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
          {metrics.map((m, i) => (
            <div key={m.label} className="flex items-center gap-6 md:gap-8">
              <MetricCard metric={m} />
              {i < metrics.length - 1 && (
                <div className="hidden sm:block w-px h-8 md:h-12 bg-primary/20" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GithubMetrics;
