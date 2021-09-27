/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/layout';
import { loadYaml } from '../../utils';
import { ScheduleEvent, ScheduleItem } from '../schedule';

type Path = {
  params: {
    id: string;
  };
  locale: string;
};

type TalkEvent = {
  date: string;
  start: string;
  end: string;
  title: string;
  speaker: string;
  company: string;
  intro: string;
  desc: string;
  avatar?: string;
};

const defaultAvatar = '/2021/assets/people/anonymous.jpg';

const Talk = (props: TalkEvent) => {
  const { t } = useTranslation('common');
  return (
    <Layout title={t('talk')}>
      <div className="container py-6">
        <div className="content px-2">
          <div>
            <span className="tag is-primary is-light">{t('talk')}</span>
          </div>
          <h1 className="is-size-1 mt-1">{props.title}</h1>
          <p className="has-text-grey-light">
            <i className="far fa-calendar mr-1" />
            {props.date}
            <i className="far fa-clock mr-1 ml-3" />
            {props.start && `${props.start} - ${props.end}`}
          </p>
          <hr />
          <div className="columns">
            <div className="column is-one-fifth">
              <figure className="image mx-0">
                <img
                  src={props.avatar || defaultAvatar}
                  alt={props.speaker || ''}
                  className="is-rounded"
                />
              </figure>
            </div>
            <div className="column">
              <p className="subtitle is-3">
                {props.speaker}
                <span className="ml-4 is-size-4 has-text-light">{props.company}</span>
              </p>
              {props.intro && <ReactMarkdown>{props.intro}</ReactMarkdown>}
            </div>
          </div>
          <hr />
          {props.desc && (
            <div className="description">
              <ReactMarkdown>{props.desc}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { schedule } = await loadYaml('schedule.yaml');
  const paths = [] as Array<Path>;
  schedule.forEach((s: ScheduleItem) => {
    s.events.forEach((e: ScheduleEvent) => {
      if (e.slug) {
        for (let locale of locales as Array<string>) {
          paths.push({ params: { id: e.slug }, locale });
        }
      }
    });
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { schedule } = await loadYaml('schedule.yaml', locale);
  let matchedEvent = {} as TalkEvent;
  for (let item of schedule) {
    for (let event of item.events) {
      if (event.slug === params?.id) {
        matchedEvent = { date: item.date, ...event };
      }
    }
  }
  return {
    props: { ...matchedEvent, ...(await serverSideTranslations(locale as string, ['common'])) },
  };
};

export default Talk;
