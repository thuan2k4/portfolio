import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Facebook, Instagram, Globe, ChevronRight, Briefcase, GraduationCap, Menu, X, Copy, Check, Mail } from 'lucide-react';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import GithubActivity from './components/GithubActivity';
import CONFIG from './config';

const sectionReveal = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const Header = ({ currentLang, toggleLang }) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = ['about', 'experience', 'work', 'contact'];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-5 sm:px-8 md:px-12 py-4 ${
        scrolled ? 'bg-navy-dark/90 backdrop-blur-md shadow-lg h-16' : 'bg-transparent h-20 md:h-24'
      }`}
    >
      <nav className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <motion.a 
          href="#hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.08, rotate: -3 }}
          whileTap={{ scale: 0.96 }}
          className="text-green font-mono text-xl font-bold cursor-pointer"
        >
          T.
        </motion.a>
        
        {/* Desktop Navigation: visible on lg (>=1024px) */}
        <div className="hidden lg:flex items-center space-x-4">
          <ul className="flex items-center space-x-2">
            {navItems.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <a href={`#${item}`} className="nav-link">
                  <span>0{i + 1}.</span> {t(`nav.${item}`)}
                </a>
              </motion.li>
            ))}
          </ul>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-4 ml-4"
          >
            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={toggleLang}
              className="font-mono text-xs text-green border border-green px-2.5 py-1.5 rounded hover:bg-green-tint transition-all"
              aria-label="Toggle language"
            >
              {currentLang.toUpperCase()}
            </motion.button>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={CONFIG.resumeUrl} target="_blank" rel="noreferrer" className="btn py-2 px-4">{t('nav.resume')}</motion.a>
          </motion.div>
        </div>

        {/* Mobile / Tablet Menu Button: visible on < lg */}
        <div className="flex items-center gap-3 lg:hidden">
          <button 
            onClick={toggleLang}
            className="font-mono text-xs text-green border border-green px-2 py-1 rounded hover:bg-green-tint transition-all"
            aria-label="Toggle language"
          >
            {currentLang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-green hover:bg-green-tint rounded transition-all focus:outline-none focus:ring-2 focus:ring-green/50"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-navy-dark/80 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[min(80vw,340px)] z-50 bg-navy-light/95 backdrop-blur-md shadow-2xl border-l border-green/20 flex flex-col justify-between px-8 py-10 lg:hidden"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-green hover:bg-green-tint rounded transition-all"
                  aria-label="Close menu"
                >
                  <X size={26} />
                </button>
              </div>

              <nav className="flex flex-col items-center justify-center space-y-6 text-center">
                <ul className="flex flex-col items-center space-y-5 w-full">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i }}
                      className="w-full"
                    >
                      <a
                        href={`#${item}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block font-mono text-base tracking-wider text-slate-lightest hover:text-green py-2 transition-all"
                      >
                        <span className="text-green text-xs block mb-1">0{i + 1}.</span>
                        {t(`nav.${item}`)}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-4 flex flex-col items-center gap-4 w-full">
                  <a
                    href={CONFIG.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn py-3 px-8 text-xs w-full text-center"
                  >
                    {t('nav.resume')}
                  </a>
                </div>
              </nav>

              <div className="flex justify-center items-center gap-5 text-slate-light">
                <a href={CONFIG.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-green"><Github size={18} /></a>
                <a href={CONFIG.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-green"><Linkedin size={18} /></a>
                <a href={CONFIG.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-green"><Instagram size={18} /></a>
                <a href={CONFIG.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-green"><Facebook size={18} /></a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const SocialLinks = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="fixed bottom-0 left-6 md:left-12 hidden lg:flex flex-col items-center space-y-6 after:content-[''] after:w-[1px] after:h-24 after:bg-slate after:mt-6"
  >
    <a href={CONFIG.socials.github} target="_blank" rel="noreferrer" className="text-slate hover:text-green hover:-translate-y-1 transition-all"><Github size={20} /></a>
    <a href={CONFIG.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate hover:text-green hover:-translate-y-1 transition-all"><Linkedin size={20} /></a>
    <a href={CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="text-slate hover:text-green hover:-translate-y-1 transition-all"><Instagram size={20} /></a>
    <a href={CONFIG.socials.facebook} target="_blank" rel="noreferrer" className="text-slate hover:text-green hover:-translate-y-1 transition-all"><Facebook size={20} /></a>
  </motion.div>
);

const EmailLink = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="fixed bottom-0 right-6 md:right-12 hidden lg:flex flex-col items-center space-y-6 after:content-[''] after:w-[1px] after:h-24 after:bg-slate after:mt-6"
  >
    <a 
      href={`mailto:${CONFIG.email}`} 
      className="text-slate hover:text-green hover:-translate-y-1 transition-all font-mono text-xs tracking-widest [writing-mode:vertical-rl]"
    >
      {CONFIG.email}
    </a>
  </motion.div>
);

const About = () => {
  const { t } = useTranslation();
  const skills = t('about.skills', { returnObjects: true });

  return (
    <motion.section
      id="about"
      className="max-w-4xl mx-auto"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="section-heading">
        <span>01.</span>{' '}{t('about.title')}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-center md:items-start">
        <div className="md:col-span-2 space-y-4 text-base md:text-lg leading-8">
          <p>{t('about.para1')}</p>
          <p>{t('about.para2')}</p>
          <p>{t('about.skills_intro')}</p>
          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm pt-4 leading-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map(skill => (
              <motion.li
                key={skill}
                variants={itemReveal}
                whileHover={{ y: -2 }}
                className="flex items-center space-x-2 rounded border border-navy-lightest/70 bg-navy-light/40 px-3 py-2 text-slate-light hover:border-green/50 hover:text-green transition-all"
              >
                <ChevronRight size={14} className="text-green shrink-0 mt-1" />
                <span>{skill}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <div className="relative group max-w-[260px] sm:max-w-[280px] md:max-w-[300px] mx-auto md:mx-0 w-full">
          <div className="relative z-10 border-2 border-green rounded md:translate-x-4 md:translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300">
            <div className="aspect-square bg-green rounded overflow-hidden">
               {CONFIG.avatarUrl ? (
                 <img src={CONFIG.avatarUrl} alt="Avatar" className="w-full h-full object-cover transition-all" />
               ) : (
                 <div className="w-full h-full bg-navy-light flex items-center justify-center text-green font-bold transition-all">
                  [ PHOTO ]
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>

      <GithubActivity />
    </motion.section>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  const jobs = t('experience.jobs', { returnObjects: true });
  const [activeTab, setActiveTab] = useState(0);
  const activeJob = jobs[activeTab];
  const ActiveIcon = activeTab === jobs.length - 1 ? GraduationCap : Briefcase;

  return (
    <motion.section
      id="experience"
      className="max-w-4xl mx-auto"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="section-heading">
        <span>02.</span>{' '}{t('nav.experience')}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] lg:grid-cols-[220px_1fr] gap-6 mt-8">
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-navy-lightest pb-3 md:pb-0 md:pl-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {jobs.map((job, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-xs font-mono text-left whitespace-nowrap rounded border transition-all min-w-[170px] md:min-w-0 md:w-full ${
                i === activeTab
                  ? 'text-green border-green bg-green-tint shadow-lg shadow-green/5'
                  : 'text-slate border-transparent hover:border-navy-lightest hover:bg-navy-light/70 hover:text-slate-lightest'
              }`}
            >
              {job.company}
            </button>
          ))}
        </div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="relative overflow-hidden rounded border border-navy-lightest/70 bg-navy-light/60 p-6 md:p-8 shadow-2xl shadow-black/10"
        >
          <div className="absolute right-6 top-6 text-green/10 pointer-events-none">
            <ActiveIcon size={76} strokeWidth={1.2} />
          </div>
          <div className="relative">
            <p className="mb-3 inline-flex items-center gap-2 rounded border border-green/40 bg-green-tint px-3 py-1 font-mono text-xs text-green">
              <ActiveIcon size={14} />
              {activeJob.company}
            </p>
            <h3 className="max-w-xl text-lg sm:text-xl md:text-2xl font-bold mb-2 leading-snug">
              {activeJob.role}
            </h3>
            <p className="font-mono text-xs mb-8 text-slate-light">{activeJob.range}</p>
          </div>
          <ul className="relative space-y-4 text-slate text-sm md:text-base max-w-2xl leading-7">
             {activeJob.points.map((point, idx) => (
               <li key={idx} className="flex gap-3 leading-relaxed">
                 <ChevronRight size={16} className="text-green shrink-0 mt-1" />
                 <span>{point}</span>
               </li>
             ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

const NoteworthyProjects = () => {
  const { t } = useTranslation();
  const projects = t('projects.noteworthy.list', { returnObjects: true });

  return (
    <motion.section
      className="text-center"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-12 leading-tight">{t('projects.noteworthy.title')}</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={itemReveal}
            whileHover={{ y: -8 }}
            className="bg-navy-light/80 border border-navy-lightest/50 p-6 md:p-7 rounded shadow-lg flex flex-col justify-between group hover:border-green/50 hover:shadow-2xl hover:shadow-green/5 transition-all"
          >
            <div>
              <div className="flex justify-between items-center mb-7 text-green">
                 <Globe size={36} />
                 <div className="flex gap-4 text-slate-lightest">
                   {CONFIG.projectLinks.noteworthy[i]?.github && CONFIG.projectLinks.noteworthy[i].github !== '#' && (
                     <motion.a
                       whileHover={{ y: -3 }}
                       href={CONFIG.projectLinks.noteworthy[i].github}
                       target="_blank"
                       rel="noreferrer"
                       aria-label="GitHub Repository"
                       className="hover:text-green cursor-pointer"
                     >
                       <Github size={20} />
                     </motion.a>
                   )}
                 </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 leading-snug group-hover:text-green transition-all">{project.name}</h3>
              <p className="text-slate text-sm mb-5 leading-7">{project.desc}</p>
            </div>
            <ul className="flex flex-wrap gap-2 font-mono text-xs text-slate-light">
               {project.tech.map(t => (
                 <li key={t} className="rounded border border-navy-lightest/70 px-2 py-1">{t}</li>
               ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-10 text-center font-mono text-xs">
      {/* Mobile/Tablet social links */}
      <div className="flex lg:hidden justify-center items-center gap-6 mb-6 text-slate-light">
        <a href={CONFIG.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-green hover:-translate-y-1 transition-all"><Github size={22} /></a>
        <a href={CONFIG.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-green hover:-translate-y-1 transition-all"><Linkedin size={22} /></a>
        <a href={CONFIG.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-green hover:-translate-y-1 transition-all"><Instagram size={22} /></a>
        <a href={CONFIG.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-green hover:-translate-y-1 transition-all"><Facebook size={22} /></a>
      </div>
      <p className="hover:text-green cursor-pointer transition-all">{t('footer.built_by')}</p>
      <p className="mt-2 text-slate-light">{t('footer.inspired_by')}</p>
    </footer>
  );
};

const CopyEmailPill = ({ email }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        return;
      }
    } catch {
      // Fallback if clipboard API throws or blocked
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } catch (err) {
      console.error('Copy fallback failed:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group relative inline-flex items-center gap-2.5 rounded-full border border-green/40 bg-navy-light/90 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-mono text-slate-light shadow-lg hover:border-green hover:shadow-[0_0_20px_rgba(100,255,218,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
      title={t('contact.email_tooltip', { defaultValue: 'Click to copy email address' })}
    >
      <Mail size={15} className="text-green shrink-0 pointer-events-none" />
      <span className="text-slate-lightest font-medium select-none pointer-events-none">{email}</span>
      <span className="h-3.5 w-[1px] bg-navy-lightest pointer-events-none" />
      <span className="flex items-center gap-1.5 text-green text-xs pointer-events-none">
        {copied ? (
          <>
            <Check size={14} className="text-green stroke-[2.5]" />
            <span className="font-semibold text-[11px] sm:text-xs text-green">{t('contact.copied', { defaultValue: 'Copied!' })}</span>
          </>
        ) : (
          <>
            <Copy size={13} className="text-slate-light group-hover:text-green transition-colors" />
            <span className="text-slate group-hover:text-green text-[11px] sm:text-xs transition-colors">
              {t('contact.copy_email', { defaultValue: 'Copy' })}
            </span>
          </>
        )}
      </span>
    </button>
  );
};

function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'vi' : 'en';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative">
      <Header currentLang={lang} toggleLang={toggleLang} />
      <SocialLinks />
      <EmailLink />
      
      <main className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <Hero />
        <About />
        <Experience />
        <FeaturedProjects />
        <NoteworthyProjects />
        
        {/* Contact Section */}
        <motion.section
          id="contact"
          className="max-w-2xl mx-auto text-center"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="font-mono text-green mb-5">{t('contact.subheading')}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-slate-lightest leading-tight">{t('contact.title')}</h2>
          <p className="text-slate mb-8 text-base md:text-lg leading-8">{t('contact.description')}</p>
          
          {/* Interactive Copy Email Pill Badge */}
          <div className="flex justify-center mb-10">
            <CopyEmailPill email={CONFIG.email} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} href={`mailto:${CONFIG.email}`} className="btn py-4 px-10 inline-block">{t('contact.cta')}</motion.a>
            {CONFIG.resumeUrl !== '#' && (
              <motion.a
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                href={CONFIG.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn py-4 px-10 inline-block bg-green-tint"
              >
                {t('contact.resume_cta')}
              </motion.a>
            )}
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

