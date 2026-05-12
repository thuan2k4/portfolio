import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-0 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-green font-mono text-sm md:text-base mb-5 ml-1 font-normal">{t('hero.intro')}</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-lightest font-bold mb-3 leading-[1.08]">
          {t('hero.title')}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="max-w-5xl text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-slate font-bold mb-6 leading-[1.12]">
          {t('hero.subtitle')}
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="max-w-2xl text-base md:text-lg text-slate mb-12 leading-8">
          {t('hero.description')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.a
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          href="#work"
          className="btn inline-block"
        >
          {t('hero.cta')}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
