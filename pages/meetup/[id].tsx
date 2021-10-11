/*
Each entry of this page is a markdown file under /data/meetup/
*/

import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout';
import TextPage from '../../components/TextPage';
import { getMarkdownFiles, readData } from '../../utils';

const Meetup = ({ name, content }: { name: string; content: string }) => {
  const { t } = useTranslation('common');
  return (
    <Layout title={t(name)}>
      <TextPage>{content}</TextPage>
    </Layout>
  );
};

type Path = {
  params: {
    id: string;
  };
  locale: string;
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Path[] = [];
  const names = await getMarkdownFiles('meetup');
  names.forEach((name) => {
    paths.push(
      ...(locales as string[]).map((locale) => ({
        params: { id: name },
        locale,
      }))
    );
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const id = params?.id;
  const content = await readData(`meetup/${id}.md`, locale);
  return {
    props: { name: id, content, ...(await serverSideTranslations(locale as string, ['common'])) },
  };
};

export default Meetup;
