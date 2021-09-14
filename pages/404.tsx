import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout';

const NotFound = () => {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('notfound')}>
      <div className="container">
        <section className="hero is-fullheight">
          <div className="hero-body has-text-centered">
            <div className="is-flex-grow-1">
              <p className="title">{t('stay_tuned')}</p>
              <p className="subtitle mt-2">
                {t('notfoundmessage')}
                <a
                  href="https://github.com/PyConChina/PyConChina2021/issues/new/choose"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('report-to-us')}
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale as string, ['common'])) },
  };
};

export default NotFound;
