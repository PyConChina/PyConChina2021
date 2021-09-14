/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/layout';
import { SpeakerType, default as Speaker } from '../components/speaker';
import { loadYaml } from '../utils';
import { ScheduleItem } from './schedule';

type Sponsor = {
  name: string;
  icon: string;
  link?: string;
};

type IndexProps = {
  news: Array<string>;
  introduction: string;
  speakers: Array<SpeakerType>;
  sponsors: Array<{
    level: string;
    items: Array<Sponsor>;
  }>;
};

const Home = (props: IndexProps) => {
  const { t } = useTranslation('common');

  const shouldShowLive = new Date() >= new Date('2021-10-02T00:00:00+08:00');

  return (
    <Layout title="首页">
      <div className="hero is-large cover">
        {/* <div className="shade" /> */}
        <div className="hero-body">
          <div className="buttons is-centered">
            {shouldShowLive ? (
              <a className="button is-primary is-large is-rounded">{t('live_address')}</a>
            ) : (
              <Link href="/cfp">
                <a className="button is-primary is-large is-rounded">{t('cfp')}</a>
              </Link>
            )}
            <a className="button is-primary is-large is-rounded">{t('purchase')}</a>
          </div>
        </div>
      </div>
      <div className="container">
        <section className="section">
          <h1 className="section-title" id="introduction">
            {t('latest_news')}
          </h1>
          <div className="content">
            <ul>
              {props.news.map((text, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: text }} />
              ))}
            </ul>
          </div>
        </section>
        <section className="section">
          <h1 className="section-title" id="introduction">
            {t('introduction')}
          </h1>
          <div className="content">
            <ReactMarkdown>{props.introduction}</ReactMarkdown>
          </div>
        </section>
        <section className="section">
          <h1 className="section-title" id="speakers">
            {t('keynote_speakers')}
          </h1>
          <div className="columns is-clearfix is-multiline is-centered is-8-desktop is-variable">
            {props.speakers.map((speaker, i) => (
              <div className="column is-half is-one-third-desktop" key={i}>
                <Speaker {...speaker} />
              </div>
            ))}
          </div>
          <div className="has-text-centered">
            <Link href="/schedule">
              <a className="button is-primary is-large">{t('schedule')}</a>
            </Link>
          </div>
        </section>
        <section className="section">
          <h1 className="section-title" id="sponsors">
            {t('support')}
          </h1>
          <div className="has-text-centered">
            {props.sponsors.map(({ level, items }, i) => (
              <div key={i} className="sponsor-group">
                <h3 className="title is-4 my-6">{level}</h3>
                {items.map((item, j) => (
                  <a href={item.link || '#'} key={j} className="mx-4 my-2 is-inline-block">
                    <img alt={item.name} src={item.icon} style={{ width: '200px' }} />
                  </a>
                ))}
              </div>
            ))}
            <p>
              <Link href="/sponsorship">
                <a className="button is-primary is-large">{t('sponsor_us')}</a>
              </Link>
            </p>
          </div>
        </section>
        <style jsx>{`
          .sponsor-group img {
            vertical-align: middle;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const indexData = await loadYaml('index.yaml', locale);
  const { schedule } = await loadYaml('schedule.yaml', locale);

  const speakers = [] as Array<SpeakerType>;
  schedule.forEach((s: ScheduleItem) => {
    return speakers.push(...(s.events.filter((e) => e.keynote) as Array<SpeakerType>));
  });
  return {
    props: {
      ...indexData,
      speakers,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Home;
