import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Github,
  Maximize2,
  Monitor,
  Radio,
  ServerCog,
  ShieldCheck,
  X,
} from 'lucide-react';
import CONFIG from '../config';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const flowIcons = [Monitor, ServerCog, BrainCircuit, Radio, CheckCircle2];

const ProjectScopeDiagram = ({ project, compact = false }) => {
  const isConfidential = project.name.includes('NDA');

  return (
    <div className={`flex h-full flex-col justify-between ${compact ? 'p-5 md:p-7' : 'p-6 md:p-10'}`}>
      <div className="flex items-center justify-between gap-4 text-green">
        <div className="flex items-center gap-3">
          <ShieldCheck size={compact ? 28 : 34} />
          <span className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-slate-light">
            Full-stack scope
          </span>
        </div>
        {isConfidential && (
          <span className="rounded border border-green/40 px-2.5 py-1 font-mono text-[11px] md:text-xs uppercase tracking-widest">
            Confidential
          </span>
        )}
      </div>

      <div className="grid grid-cols-5 items-start gap-2 md:gap-4">
        {(project.visual_steps || project.tech.slice(0, 5)).map((step, stepIndex) => {
          const StepIcon = flowIcons[stepIndex] || CheckCircle2;
          const detail = project.visual_details?.[stepIndex];

          return (
            <div
              key={step}
              className="group/node relative flex flex-col items-center text-center hover:z-40 focus-within:z-40"
            >
              {stepIndex < 4 && (
                <span className="absolute left-1/2 top-5 h-px w-full translate-x-5 bg-green/25" />
              )}
              <button
                type="button"
                className={`${compact ? 'h-10 w-10' : 'h-12 w-12'} relative z-10 flex items-center justify-center rounded border border-green/40 bg-navy-dark text-green shadow-lg shadow-black/20 transition-all hover:-translate-y-1 hover:border-green focus:outline-none focus:ring-2 focus:ring-green/60`}
                aria-label={`${step}${detail ? `: ${detail}` : ''}`}
                onClick={(event) => event.stopPropagation()}
              >
                <StepIcon size={compact ? 18 : 22} />
              </button>
              <span className={`${compact ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'} mt-3 leading-snug text-slate-light`}>
                {step}
              </span>
              {detail && (
                <span
                  className={`pointer-events-none absolute top-full z-50 mt-3 w-56 rounded border border-green/30 bg-navy-dark px-3 py-2 text-left text-[11px] leading-5 text-slate-light opacity-0 shadow-2xl shadow-black/30 transition-all group-hover/node:opacity-100 group-focus-within/node:opacity-100 ${
                    stepIndex === 0
                      ? 'left-0'
                      : stepIndex === 4
                        ? 'right-0'
                        : 'left-1/2 -translate-x-1/2'
                  }`}
                >
                  {detail}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <p className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-slate-light">Engineering Case Study</p>
        <h4 className={`${compact ? 'text-base sm:text-lg md:text-xl' : 'text-xl md:text-3xl'} mt-2 max-w-2xl font-bold leading-snug text-slate-lightest group-hover:text-green transition-all`}>
          {project.name}
        </h4>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const { t } = useTranslation();
  const projects = t('projects.featured', { returnObjects: true });
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="work">
      <div className="section-heading">
        <span>03.</span> {t('projects.title')}
      </div>

      <div className="space-y-20 md:space-y-28">
        {projects.map((project, index) => {
          const projectLink = CONFIG.projectLinks.featured[index]?.github;
          const hasProjectLink = projectLink && projectLink !== '#';

          return (
            <motion.div
              key={project.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={`relative grid grid-cols-12 gap-4 md:gap-2 items-center ${
                index % 2 === 0 ? '' : 'md:text-right'
              }`}
            >
              <div
                className={`col-span-12 md:col-span-7 relative group ${
                  index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-6'
                }`}
              >
                <motion.button
                  type="button"
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  onClick={() => setSelectedProject(project)}
                  className="relative block w-full aspect-video rounded overflow-hidden cursor-zoom-in group border border-green/30 bg-navy-light text-left shadow-2xl shadow-black/20"
                  aria-label={`Open ${project.name} diagram`}
                >
                  {project.image ? (
                    <>
                      <div className="absolute inset-0 bg-navy-dark/30 z-10 group-hover:bg-transparent transition-all duration-300"></div>
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </>
                  ) : (
                    <ProjectScopeDiagram project={project} compact />
                  )}

                  <span className="absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded border border-green/40 bg-navy-dark/80 text-green opacity-0 backdrop-blur transition-all group-hover:opacity-100">
                    <Maximize2 size={16} />
                  </span>
                </motion.button>
              </div>

              <div
                className={`col-span-12 md:col-span-6 z-10 p-5 md:p-0 ${
                  index % 2 === 0
                    ? 'md:col-start-7 md:text-right'
                    : 'md:col-start-1 md:text-left'
                }`}
              >
                <p className="font-mono text-green text-xs md:text-sm mb-2">{t('projects.featured_label')}</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl text-slate-lightest font-bold mb-5 leading-tight hover:text-green cursor-pointer">
                  {project.name}
                </h3>

                {Array.isArray(project.metrics) && (
                  <ul className={`flex flex-wrap gap-2 mb-5 ${
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    {project.metrics.map((metric) => (
                      <li key={metric} className="rounded border border-green/30 bg-green-tint px-3 py-1 font-mono text-[11px] text-green">
                        {metric}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="bg-navy-light/95 border border-navy-lightest/60 p-5 md:p-6 rounded shadow-xl mb-5 text-slate-light text-sm md:text-[15px]">
                  <ul className="space-y-3">
                    {Array.isArray(project.desc) ? (
                      project.desc.map((item) => (
                        <li key={item} className="flex gap-2 leading-7">
                          <ChevronRight size={15} className="text-green shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li>{project.desc}</li>
                    )}
                  </ul>
                </div>

                <ul className={`flex flex-wrap gap-2 mb-5 font-mono text-[11px] md:text-xs text-slate-light ${
                  index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                }`}>
                  {project.tech.map((tech) => (
                    <li key={tech} className="rounded border border-navy-lightest/70 px-2 py-1">{tech}</li>
                  ))}
                </ul>

                {hasProjectLink && (
                  <div className={`flex gap-4 text-slate-lightest ${
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-green"
                    >
                      <Github size={20} />
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative h-[58vh] w-full max-w-5xl overflow-hidden rounded border border-green/40 bg-navy-light shadow-2xl shadow-black/40 md:h-[64vh]"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded border border-green/40 bg-navy-dark text-green hover:bg-green-tint transition-all"
                aria-label="Close diagram"
              >
                <X size={18} />
              </button>
              <ProjectScopeDiagram project={selectedProject} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProjects;
