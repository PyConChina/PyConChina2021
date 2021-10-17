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
  title?: string;
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
  type?: string;
  start: string;
  end: string;
  talks: ScheduleTalk[];
};

export type ScheduleItem = {
  date: string;
  events: ScheduleEvent[];
};

type ScheduleSection = {
  events: ScheduleEvent[];
  pyhouse?: ScheduleEvent;
};

const splitEvents = (events: ScheduleEvent[]): ScheduleSection[] => {
  const result: ScheduleSection[] = [];
  let current: ScheduleEvent[] = [];
  for (const event of events) {
    switch (event.type) {
      case 'pyhouse':
        result.push({ events: [...current], pyhouse: event });
        current = [];
        break;
      case 'break':
        if (current.length) {
          result.push({ events: current });
          current = [];
        }
        result.push({ events: [event] });
        break;
      default:
        current.push(event);
        break;
    }
  }
  if (current.length) {
    result.push({ events: current });
  }
  return result;
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

const Talk = ({ talk }: { talk: ScheduleTalk }) => {
  const { t } = useTranslation('common');
  const className = talk.venue ? `box h-full venue-${talk.venue}` : 'box h-full';
  if (!talk.title) {
    return <div />;
  }
  return talk.slug ? (
    <Link href={`/talks/${talk.slug}`}>
      <a className={className}>
        <div className="is-flex is-justify-content-space-between">
          <p className="title is-5">{talk.title}</p>
          <p className="has-text-grey is-size-6 is-flex-shrink-0">
            {talk.venue ? `${t('venue')} ${talk.venue}` : t('main_venue')}
          </p>
        </div>
        {talk.speaker && <p className="subtitle mt-2">{talk.speaker}</p>}
      </a>
    </Link>
  ) : (
    <div className={className}>
      <div className="is-flex is-justify-content-space-between">
        <p className="title is-5">{talk.title}</p>
        <p className="has-text-grey is-size-6 is-flex-shrink-0">
          {!talk.venue
            ? t('main_venue')
            : talk.venue === 'pyhouse'
            ? talk.venue
            : `${t('venue')} ${talk.venue}`}
        </p>
      </div>
      {talk.speaker && <p className="subtitle mt-2">{talk.speaker}</p>}
    </div>
  );
};

const Event = ({ event }: { event: ScheduleEvent }) => {
  const { t } = useTranslation('common');
  return (
    <>
      <div className="timeline-marker"></div>
      <div className="timeline-content is-flex is-flex-direction-column h-full">
        <p className="heading">{event.start ? `${event.start} - ${event.end}` : t('TBD')}</p>
        <div className="columns is-flex-grow-1">
          {event.talks.map((m, j) => (
            <div className="column" key={j}>
              <Talk talk={m} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Schedule = ({ schedule }: { schedule: Array<ScheduleItem> }) => {
  const [activeDate, setActiveDate] = useState(0);
  const { t } = useTranslation('common');
  const sections = splitEvents(schedule[activeDate].events);
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
          {sections.length === 0 ? (
            <EmptySchedule />
          ) : (
            <div className="timeline mx-auto">
              <header className="timeline-header">
                <span className="tag is-medium">{t('start')}</span>
              </header>
              {sections.map((s, i) => (
                <div className="is-flex timeline-item is-align-items-stretch" key={i}>
                  <div className="is-flex-grow-2 is-flex-shrink-1">
                    {s.events.map((e, j) => (
                      <div key={j}>
                        <Event event={e} />
                      </div>
                    ))}
                  </div>
                  {s.pyhouse && (
                    <div className="is-flex-grow-1 is-flex-shrink-1">
                      <Event event={s.pyhouse} />
                    </div>
                  )}
                </div>
              ))}
              <div className="timeline-header">
                <span className="tag is-medium">{t('end')}</span>
              </div>
            </div>
          )}
        </div>
      </section>
      <style jsx>{`
        .box {
          height: 100%;
        }
      `}</style>
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
