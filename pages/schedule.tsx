import { GetStaticProps } from 'next';
import { useState } from 'react';
import { loadYaml } from '../utils';
import cn from 'classnames';
import Link from 'next/link';
import Layout from '../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export type ScheduleTalk = {
  venue?: string;
  title: string;
  speaker?: string;
  avatar?: string;
  company?: string;
  desc?: string;
  intro?: string;
  slug?: string;
  calendar?: boolean;
  keynote?: boolean;
};

export type ScheduleEvent = {
  start: string;
  end: string;
  talks: ScheduleTalk[];
};

export type ScheduleItem = {
  date: string;
  events: ScheduleEvent[];
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
  const events = schedule[activeDate].events.sort((a, b) =>
    (a.start || '').localeCompare(b.start || '')
  );
  return (
    <Layout title={t('schedule')}>
      <section className="section">
        <div className="container">
          <h1 className="title">{t('schedule')}</h1>
          <div className="has-text-centered">
            <Link href="/calendar.ics">
              <a download className="button is-primary">
                {t('add_to_calendar')}(.ics)
              </a>
            </Link>
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
                  <div className="timeline-content is-flex-grow-1">
                    <p className="heading">{e.start ? `${e.start} - ${e.end}` : t('TBD')}</p>
                    <div className="columns">
                      {e.talks.map((m, j) => (
                        <div className="column" key={j}>
                          {m.slug ? (
                            <Link href={`/talks/${m.slug}`}>
                              <a className="box">
                                <div className="is-flex is-justify-content-space-between">
                                  <p className="title is-5">{m.title}</p>
                                  <p className="has-text-grey is-size-6">
                                    {m.venue ? `${t('venue')} ${m.venue}` : t('main_venue')}
                                  </p>
                                </div>
                                {m.speaker && <p className="subtitle mt-2">{m.speaker}</p>}
                              </a>
                            </Link>
                          ) : (
                            <div className="box">
                              <div className="is-flex is-justify-content-space-between">
                                <p className="title is-5">{m.title}</p>
                                <p className="has-text-grey is-size-6">
                                  {m.venue ? `${t('venue')} ${m.venue}` : t('main_venue')}
                                </p>
                              </div>
                              {m.speaker && <p className="subtitle mt-2">{m.speaker}</p>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="timeline-header">
                <span className="tag is-medium is-primary">{t('end')}</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const data = await loadYaml('schedule.yaml', locale);
  return {
    props: {
      schedule: data.schedule as ScheduleItem[],
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Schedule;
