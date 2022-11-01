/*
Each entry of this page is a markdown file under /data/contents/
*/

import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation, useSelectedLanguage } from 'next-export-i18n';
import Layout from '../components/layout';
import TextPage from '../components/TextPage';
import { getMarkdownFiles, readData } from '../utils';

const MarkdownContent = ({ name, contents }: { name: string; contents: Record<string, string> }) => {
  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();
  return (
    <Layout title={t(name || '_default')}>
      <TextPage>{contents?.[lang] || ''}</TextPage>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const names = await getMarkdownFiles('contents');
  const paths = names.map((name) => ({ params: { md: name } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const md = params?.md;
  const contents = {
    zh: await readData(`contents/${md}.md`, 'zh'),
    en: await readData(`contents/${md}.md`, 'en')
  }

  return {
    props: { name: md, contents },
  };
};

export default MarkdownContent;
