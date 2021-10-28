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
    <Layout title={t('home')}>
      <div className="hero is-medium cover">
        {/* <div className="shade" /> */}
        <div className="hero-body">
          <div className="has-text-centered">
            <div>
              <img alt="pycon title" src="/2021/assets/images/title.png" />
            </div>
            <p className="title is-size-2-desktop is-size-4 has-text-white has-text-weight-normal mt-4 mb-6">
              2021 中国 Python 开发者大会
            </p>
            <p className="subtitle is-size-3-desktop has-text-white">2021.10.16 - 17</p>
          </div>
          <div className="buttons is-centered mt-2">
            {shouldShowLive ? (
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <button
                    className="button is-primary is-large is-rounded"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span>{t('live_address')}</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <a
                      href="https://www.huodongxing.com/event/9618480117522"
                      className="dropdown-item"
                    >
                      活动行
                    </a>
                    <a
                      className="dropdown-item"
                      href="https://segmentfault.com/area/pyconchina-2021"
                    >
                      思否
                    </a>
                    <a
                      href="https://live.csdn.net/room/pyconchina/KEfhW846"
                      className="dropdown-item"
                    >
                      CSDN
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/cfp">
                <a className="button is-primary is-large is-rounded">{t('cfp')}</a>
              </Link>
            )}
            <a
              className="button is-primary is-large is-rounded"
              href="https://www.huodongxing.com/event/9618480117522"
              target="_blank"
              rel="noreferrer"
            >
              {t('purchase')}
            </a>
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
              <div className="column is-half is-one-quarter-desktop" key={i}>
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
                <h3 className="title is-4 mt-6">{level}</h3>
                {items.map((item, j) => (
                  <a
                    href={item.link || '#'}
                    key={j}
                    className="mx-4 my-2 is-inline-block"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      alt={item.name}
                      src={item.icon}
                      style={{ width: '200px' }}
                      title={item.name}
                    />
                  </a>
                ))}
              </div>
            ))}
            <p>
              <Link href="/assets/sponsorship.pdf">
                <a className="button is-primary is-large" target="_blank">
                  {t('sponsor_us')}
                </a>
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
    s.events.forEach((e) => {
      speakers.push(...(e.talks.filter((t) => t.keynote) as SpeakerType[]));
    });
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
