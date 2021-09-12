import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout';
import TextPage from '../components/TextPage';
import { readData } from '../utils';

const CodeOfConduct = ({ content }: { content: string }) => {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('coc')}>
      <TextPage>{content}</TextPage>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const content = await readData('contents/coc.md', locale);
  return {
    props: { content, ...(await serverSideTranslations(locale as string, ['common'])) },
  };
};

export default CodeOfConduct;
