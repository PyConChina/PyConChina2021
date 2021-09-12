import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

const Layout = function ({ children, title }: { children: React.ReactNode; title: string }) {
  const { t } = useTranslation('common');
  return (
    <>
      <NextSeo
        title={title}
        openGraph={{ title, description: t('site_description'), site_name: t('site_name') }}
      />
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: 'linear', duration: 0.5 }}
        className="main"
      >
        {children}
      </motion.main>
    </>
  );
};

export default Layout;
