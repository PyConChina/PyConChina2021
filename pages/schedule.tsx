import { GetStaticProps } from 'next';
import { useState } from 'react';
import { loadYaml } from '../utils';
import cn from 'classnames';
import Link from 'next/link';
import Layout from '../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import ReactMarkdown from 'react-markdown';

export type ScheduleEvent = {
  start: string;
  end: string;
  title: string;
  speaker?: string;
  avatar?: string;
  company?: string;
  desc?: string;
  intro?: string;
  slug?: string;
  calendar?: string;
  keynote?: boolean;
};

export type ScheduleItem = {
  date: string;
  events: Array<ScheduleEvent>;
};

const EmptySchedule = () => {
  const { t } = useTranslation('common');
  return (
    <div className="hero is-medium">
      <div className="hero-body has-text-centered">
        <p className="title">{t('stay_tuned')}</p>
        <p>
          <Link href="/cfp">
            <a className="button is-primary is-large">{t('cfp')}</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

const Schedule = ({ schedule }: { schedule: Array<ScheduleItem> }) => {
  const [activeDate, setActiveDate] = useState(0);
  const { t } = useTranslation('common');
  const events = schedule[activeDate].events.sort((a, b) => a.start.localeCompare(b.start));
  return (
    <Layout title={t('schedule')}>
      <section className="section">
        <div className="container">
          <h1 className="title">{t('schedule')}</h1>
          <div className="has-text-centered">
            <a href="/2021/calendar.ics" download className="button is-primary">
              {t('add_to_calendar')}(.ics)
            </a>
          </div>
          <div className="tabs is-centered is-large">
            <ul>
              {schedule.map((item, i) => (
                <li key={i} className={cn({ 'is-active': activeDate === i })}>
                  <a onClick={() => setActiveDate(i)}>
                    <strong>{item.date}</strong>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {events.length === 0 ? (
            <EmptySchedule />
          ) : (
            <div className="timeline mx-auto">
              <header className="timeline-header">
                <span className="tag is-medium is-primary">{t('start')}</span>
              </header>
              {events.map((e, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <p className="heading">{e.start ? `${e.start} - ${e.end}` : t('TBD')}</p>
                    {e.slug ? (
                      <Link href={`/talks/${e.slug}`}>
                        <a className="box">
                          <p className="title is-5">{e.title}</p>
                          {e.speaker && <p className="subtitle is-6">{e.speaker}</p>}
                          {e.desc && (
                            <div className="content is-size-6">
                              <ReactMarkdown>{e.desc}</ReactMarkdown>
                            </div>
                          )}
                        </a>
                      </Link>
                    ) : (
                      <div className="box">
                        <p className="title is-5">{e.title}</p>
                        {e.speaker && <p className="subtitle is-6">{e.speaker}</p>}
                        {e.desc && <ReactMarkdown>{e.desc}</ReactMarkdown>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="timeline-header">
                <span className="tag is-medium is-primary">{t('end')}</span>
              </div>
            </div>
          )}
        </div>
        <style jsx>
          {`
            .timeline {
              max-width: 800px;
            }
          `}
        </style>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const data = await loadYaml('schedule.yaml', locale);
  return {
    props: {
      schedule: data.schedule as Array<ScheduleItem>,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Schedule;
