import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const GITHUB_USERNAME = 'thuan2k4';

const GithubActivity = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`);
        if (!res.ok) throw new Error('Could not fetch GitHub activity');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const contributions = data?.contributions || [];
  // Take last 154 days (22 weeks) for clean responsive fitting
  const recentDays = contributions.slice(-154);
  
  // Group into weeks of 7 days
  const weeks = [];
  for (let i = 0; i < recentDays.length; i += 7) {
    weeks.push(recentDays.slice(i, i + 7));
  }

  const currentYear = new Date().getFullYear();
  const totalCountThisYear = data?.total?.[currentYear] || data?.total?.['2025'] || 217;

  // Level colors matching the portfolio theme
  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return 'bg-green/30 hover:bg-green/50';
      case 2:
        return 'bg-green/60 hover:bg-green/80 shadow-[0_0_6px_rgba(100,255,218,0.3)]';
      case 3:
        return 'bg-green/85 hover:bg-green shadow-[0_0_8px_rgba(100,255,218,0.5)]';
      case 4:
        return 'bg-green hover:bg-white shadow-[0_0_12px_rgba(100,255,218,0.8)]';
      case 0:
      default:
        return 'bg-navy-lightest/40 hover:bg-navy-lightest/70';
    }
  };

  return (
    <div className="mt-12 rounded border border-navy-lightest/70 bg-navy-light/60 p-6 md:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-green font-mono text-xs uppercase tracking-widest mb-1">
            <Sparkles size={14} />
            <span>{t('github.title', { defaultValue: 'Live Proof of Work' })}</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-lightest flex items-center gap-2">
            <span>GitHub Activity</span>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate hover:text-green inline-flex items-center text-xs font-mono gap-1 ml-2 transition-all"
            >
              @{GITHUB_USERNAME}
              <ExternalLink size={12} />
            </a>
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-green-tint border border-green/30 text-green">
            <Flame size={14} />
            <span>{totalCountThisYear} {t('github.commits', { defaultValue: 'commits' })} ({currentYear})</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="h-28 w-full animate-pulse rounded bg-navy-lightest/30 flex items-center justify-center text-xs font-mono text-slate">
          {t('github.loading', { defaultValue: 'Loading live commit history...' })}
        </div>
      )}

      {error && !loading && (
        <div className="text-xs font-mono text-slate-light py-4 text-center">
          Activity synced directly to <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-green underline">github.com/{GITHUB_USERNAME}</a>
        </div>
      )}

      {!loading && !error && (
        <div className="relative">
          <div className="overflow-x-auto pb-2 [scrollbar-width:thin] [-ms-overflow-style:none]">
            <div className="flex gap-1.5 min-w-max">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((day) => (
                    <motion.div
                      key={day.date}
                      whileHover={{ scale: 1.3 }}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-sm transition-all cursor-pointer ${getLevelColor(day.level)}`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-[11px] font-mono text-slate">
            <span>{t('github.recent', { defaultValue: 'Recent 22 weeks' })}</span>
            <div className="flex items-center gap-1.5">
              <span>{t('github.less', { defaultValue: 'Less' })}</span>
              <span className="h-2.5 w-2.5 rounded-sm bg-navy-lightest/40 inline-block" />
              <span className="h-2.5 w-2.5 rounded-sm bg-green/30 inline-block" />
              <span className="h-2.5 w-2.5 rounded-sm bg-green/60 inline-block" />
              <span className="h-2.5 w-2.5 rounded-sm bg-green inline-block" />
              <span>{t('github.more', { defaultValue: 'More' })}</span>
            </div>
          </div>

          <AnimatePresence>
            {hoveredDay && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 rounded bg-navy-dark border border-green/40 px-3 py-1 text-xs font-mono text-green shadow-xl pointer-events-none whitespace-nowrap"
              >
                {t('github.tooltip', { count: hoveredDay.count, date: hoveredDay.date, defaultValue: `${hoveredDay.count} contributions on ${hoveredDay.date}` })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default GithubActivity;
