import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/layout";


const NotFound = () => {
  const {t} = useTranslation('common');
  return (
    <Layout title={t('notfound')}>
      <div className="container">
      <section className="hero is-info is-fullheight">
        <div className="hero-body has-text-centered">
          <div className="is-flex-grow-1">
            <p className="title">
              {t('stay_tuned')}
            </p>
            <p className="subtitle">
              {t('notfoundmessage')}
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
