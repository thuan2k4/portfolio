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
  const isConfidential = project.name.includes('NDA') || project.name.includes('Confidential') || project.name.includes('Bảo Mật');

  return (
    <div className={`flex h-full flex-col justify-between ${compact ? 'p-4 sm:p-5 md:p-6' : 'p-4 sm:p-6'}`}>
      <div className="flex items-center justify-between gap-3 text-green">
        <div className="flex items-center gap-2 sm:gap-3">
          <ShieldCheck size={compact ? 22 : 28} />
          <span className="font-mono text-[10px] sm:text-[11px] md:text-xs uppercase tracking-widest text-slate-light">
            Full-stack scope
          </span>
        </div>
        {isConfidential && (
          <span className="rounded border border-green/40 bg-green-tint/50 px-2 sm:px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-green">
            Confidential
          </span>
        )}
      </div>

      <div className="grid grid-cols-5 items-start gap-1 sm:gap-2 md:gap-3 my-3 sm:my-4">
        {(project.visual_steps || project.tech.slice(0, 5)).map((step, stepIndex) => {
          const StepIcon = flowIcons[stepIndex] || CheckCircle2;
          const detail = project.visual_details?.[stepIndex];

          return (
            <div
              key={step}
              className="group/node relative flex flex-col items-center text-center hover:z-40 focus-within:z-40"
            >
              {stepIndex < 4 && (
                <div className="absolute left-1/2 top-4 sm:top-5 h-[2px] w-full translate-x-3 sm:translate-x-5 overflow-hidden pointer-events-none z-0">
                  <div className="h-full w-full bg-green/20" />
                  <motion.div
                    className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-green to-transparent shadow-[0_0_8px_#64ffda]"
                    animate={{ x: ['-100%', '250%'] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.4,
                      ease: 'linear',
                      delay: stepIndex * 0.45,
                    }}
                  />
                </div>
              )}
              <button
                type="button"
                className={`${compact ? 'h-8 w-8 sm:h-10 sm:w-10' : 'h-10 w-10 sm:h-11 sm:w-11'} relative z-10 flex items-center justify-center rounded-lg border border-green/40 bg-navy-dark text-green shadow-lg shadow-black/20 transition-all hover:-translate-y-1 hover:border-green hover:shadow-[0_0_12px_rgba(100,255,218,0.35)] focus:outline-none focus:ring-2 focus:ring-green/60`}
                aria-label={`${step}${detail ? `: ${detail}` : ''}`}
                onClick={(event) => event.stopPropagation()}
              >
                <StepIcon size={compact ? 15 : 19} />
                {stepIndex === 0 && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green"></span>
                  </span>
                )}
              </button>
              <span className={`${compact ? 'text-[9px] sm:text-[10px] md:text-xs' : 'text-[11px] sm:text-xs'} mt-2 leading-tight text-slate-light line-clamp-2`}>
                {step}
              </span>
              {detail && (
                <span
                  className={`pointer-events-none absolute bottom-full mb-2 z-50 w-48 sm:w-56 rounded border border-green/30 bg-navy-dark/95 p-2.5 text-left text-[11px] leading-relaxed text-slate-light opacity-0 shadow-2xl shadow-black/50 transition-all group-hover/node:opacity-100 group-focus-within/node:opacity-100 ${
                    stepIndex === 0
                      ? 'left-0'
                      : stepIndex === 4
                        ? 'right-0'
                        : 'left-1/2 -translate-x-1/2'
                  }`}
                >
                  <span className="block font-mono text-[10px] text-green font-bold mb-1">{step}</span>
                  {detail}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-navy-lightest/40 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-light">Architecture Flow</p>
          <p className="text-xs text-green font-mono hidden sm:block truncate max-w-xs">{project.tech.slice(0, 4).join(' • ')}</p>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono text-green flex items-center gap-1 opacity-80 group-hover:opacity-100">
          Click to zoom ↗
        </span>
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
        <span>03.</span>{' '}{t('projects.title')}
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
              viewport={{ once: true, margin: '-40px' }}
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
                  whileHover={{ y: -5, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  onClick={() => setSelectedProject(project)}
                  className="relative block w-full min-h-[220px] sm:min-h-[240px] md:aspect-video rounded overflow-hidden cursor-zoom-in group border border-green/30 bg-navy-light text-left shadow-2xl shadow-black/20"
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

                  <span className="absolute bottom-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded border border-green/40 bg-navy-dark/80 text-green opacity-0 backdrop-blur transition-all group-hover:opacity-100">
                    <Maximize2 size={15} />
                  </span>
                </motion.button>
              </div>

              <div
                className={`col-span-12 md:col-span-6 z-10 p-2 sm:p-4 md:p-0 ${
                  index % 2 === 0
                    ? 'md:col-start-7 md:text-right'
                    : 'md:col-start-1 md:text-left'
                }`}
              >
                <p className="font-mono text-green text-xs md:text-sm mb-2">{t('projects.featured_label')}</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl text-slate-lightest font-bold mb-4 leading-tight hover:text-green cursor-pointer">
                  {project.name}
                </h3>

                {Array.isArray(project.metrics) && (
                  <ul className={`flex flex-wrap gap-2 mb-4 ${
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    {project.metrics.map((metric) => (
                      <li key={metric} className="rounded border border-green/30 bg-green-tint px-2.5 py-1 font-mono text-[11px] text-green">
                        {metric}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="bg-navy-light/95 border border-navy-lightest/60 p-5 md:p-6 rounded shadow-xl mb-4 text-slate-light text-sm md:text-[15px]">
                  <ul className="space-y-2.5">
                    {Array.isArray(project.desc) ? (
                      project.desc.map((item) => (
                        <li key={item} className="flex gap-2 leading-relaxed">
                          <ChevronRight size={15} className="text-green shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li>{project.desc}</li>
                    )}
                  </ul>
                </div>

                <ul className={`flex flex-wrap gap-2 mb-4 font-mono text-[11px] md:text-xs text-slate-light ${
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
                      aria-label="GitHub Repository"
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
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-green/40 bg-navy-light shadow-2xl shadow-black/50 p-6 sm:p-8"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded border border-green/40 bg-navy-dark text-green hover:bg-green-tint transition-all"
                aria-label="Close diagram"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-lightest mb-1 pr-12">
                {selectedProject.name}
              </h3>
              <p className="font-mono text-xs text-green mb-5">Interactive Architecture Flow</p>

              <ProjectScopeDiagram project={selectedProject} />

              {/* Detailed visual steps breakdown */}
              {selectedProject.visual_details && (
                <div className="mt-6 border-t border-navy-lightest/70 pt-5">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-slate-light mb-3">Pipeline Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.visual_details.map((detail, idx) => (
                      <div key={idx} className="rounded border border-navy-lightest/80 bg-navy-dark/50 p-3">
                        <span className="font-mono text-xs text-green font-bold block mb-1">
                          0{idx + 1}. {selectedProject.visual_steps?.[idx] || `Step ${idx + 1}`}
                        </span>
                        <p className="text-xs text-slate leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProjects;
