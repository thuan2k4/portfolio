import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Linkedin, Facebook, Instagram, Globe, ChevronRight, Briefcase, GraduationCap } from 'lucide-react';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
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

  const navItems = ['about', 'experience', 'work', 'contact'];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 ${
        scrolled ? 'bg-navy-dark/90 backdrop-blur-md shadow-lg h-16' : 'bg-transparent h-24'
      }`}
    >
      <nav className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.08, rotate: -3 }}
          whileTap={{ scale: 0.96 }}
          className="text-green font-mono text-xl font-bold cursor-pointer"
        >
          T.
        </motion.div>
        
        <div className="hidden md:flex items-center space-x-4">
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
              className="font-mono text-xs text-green border border-green px-2 py-1 rounded hover:bg-green-tint transition-all"
            >
              {currentLang.toUpperCase()}
            </motion.button>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={CONFIG.resumeUrl} target="_blank" rel="noreferrer" className="btn py-2 px-4">{t('nav.resume')}</motion.a>
          </motion.div>
        </div>
      </nav>
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
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="section-heading">
        <span>01.</span> {t('about.title')}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
              <motion.li key={skill} variants={itemReveal} className="flex items-center space-x-2">
                <ChevronRight size={14} className="text-green shrink-0 mt-1" />
                <span>{skill}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <div className="relative group max-w-[300px] mx-auto md:mx-0">
          <div className="relative z-10 border-2 border-green rounded translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300">
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
    </motion.section>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  const jobs = t('experience.jobs', { returnObjects: true });
  const [activeTab, setActiveTab] = useState(0);
  const activeJob = jobs[activeTab];
  const ActiveIcon = activeTab === 0 ? Briefcase : GraduationCap;

  return (
    <motion.section
      id="experience"
      className="max-w-4xl mx-auto"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="section-heading">
        <span>02.</span> {t('nav.experience')}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] lg:grid-cols-[220px_1fr] gap-6 mt-8">
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-navy-lightest pb-3 md:pb-0 md:pl-3">
          {jobs.map((job, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-xs font-mono text-left whitespace-nowrap rounded border transition-all min-w-[170px] md:w-full ${
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
          <div className="absolute right-6 top-6 text-green/10">
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
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-12 leading-tight">{t('projects.noteworthy.title')}</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={itemReveal}
            whileHover={{ y: -10 }}
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
      <p className="hover:text-green cursor-pointer transition-all">{t('footer.built_by')}</p>
      <p className="mt-2 text-slate-light">{t('footer.inspired_by')}</p>
    </footer>
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
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="font-mono text-green mb-5">{t('contact.subheading')}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-slate-lightest leading-tight">{t('contact.title')}</h2>
          <p className="text-slate mb-12 text-base md:text-lg leading-8">{t('contact.description')}</p>
          <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} href={`mailto:${CONFIG.email}`} className="btn py-4 px-10 inline-block">{t('contact.cta')}</motion.a>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
