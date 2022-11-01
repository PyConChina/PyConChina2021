import { useTranslation } from 'next-export-i18n';
import Layout from '../components/layout';

const NotFound = () => {
  const { t } = useTranslation();
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
                  href="https://github.com/PyConChina/PyConChina2021/issues/new"
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

export default NotFound;
