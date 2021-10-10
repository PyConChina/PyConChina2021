/*
Each entry of this page is a markdown file under /data/contents/
*/

import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout';
import TextPage from '../components/TextPage';
import { getMarkdownFiles, readData } from '../utils';

const Markdown = ({ name, content }: { name: string; content: string }) => {
  const { t } = useTranslation('common');
  return (
    <Layout title={t(name)}>
      <TextPage>{content}</TextPage>
    </Layout>
  );
};

type Path = {
  params: {
    md: string;
  };
  locale: string;
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Path[] = [];
  const names = await getMarkdownFiles();
  names.forEach((name) => {
    paths.push(
      ...(locales as string[]).map((locale) => ({
        params: { md: name },
        locale,
      }))
    );
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const md = params?.md;
  const content = await readData(`contents/${md}.md`, locale);
  return {
    props: { name: md, content, ...(await serverSideTranslations(locale as string, ['common'])) },
  };
};

export default Markdown;
