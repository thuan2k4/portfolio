import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, ShieldCheck, ChevronRight, Monitor, ServerCog, BrainCircuit, Radio, CheckCircle2 } from 'lucide-react';
import CONFIG from '../config';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const FeaturedProjects = () => {
  const { t } = useTranslation();
  const projects = t('projects.featured', { returnObjects: true });
  const flowIcons = [Monitor, ServerCog, BrainCircuit, Radio, CheckCircle2];

  return (
    <section id="work">
      <div className="section-heading">
        <span>03.</span> {t('projects.title')}
      </div>

      <div className="space-y-20 md:space-y-28">
        {projects.map((project, index) => {
          const projectLink = CONFIG.projectLinks.featured[index]?.github;
          const hasProjectLink = projectLink && projectLink !== '#';
          const isConfidential = project.name.includes('NDA');

          return (
            <motion.div
            key={index}
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
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="relative aspect-video rounded overflow-hidden cursor-pointer group border border-green/30 bg-navy-light shadow-2xl shadow-black/20"
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
                  <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
                    <div className="flex items-center justify-between gap-4 text-green">
                      <div className="flex items-center gap-3">
                        <ShieldCheck size={28} />
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

                    <div className="grid grid-cols-5 items-start gap-2 md:gap-3">
                      {(project.visual_steps || project.tech.slice(0, 5)).map((step, stepIndex) => {
                        const StepIcon = flowIcons[stepIndex] || CheckCircle2;
                        return (
                          <div key={step} className="relative flex flex-col items-center text-center">
                            {stepIndex < 4 && (
                              <span className="absolute left-1/2 top-5 h-px w-full translate-x-5 bg-green/25" />
                            )}
                            <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded border border-green/40 bg-navy-dark text-green shadow-lg shadow-black/20">
                              <StepIcon size={18} />
                            </span>
                            <span className="mt-3 text-[10px] md:text-xs leading-snug text-slate-light">
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div>
                      <p className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-slate-light">Engineering Case Study</p>
                      <h4 className="mt-2 max-w-md text-base sm:text-lg md:text-xl font-bold leading-snug text-slate-lightest group-hover:text-green transition-all">
                        {project.name}
                      </h4>
                    </div>
                  </div>
                )}
              </motion.div>
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
              
              <div className="bg-navy-light/95 border border-navy-lightest/60 p-5 md:p-6 rounded shadow-xl mb-5 text-slate-light text-sm md:text-[15px]">
                <ul className="space-y-3">
                  {Array.isArray(project.desc) ? (
                    project.desc.map((item, i) => (
                      <li key={i} className="flex gap-2 leading-7">
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
                {project.tech.map((tech, idx) => (
                  <li key={idx} className="rounded border border-navy-lightest/70 px-2 py-1">{tech}</li>
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
    </section>
  );
};

export default FeaturedProjects;
