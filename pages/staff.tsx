/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-export-i18n';
import Layout from '../components/layout';
import { loadYaml } from '../utils';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type Staff = {
  name: string;
  position?: string;
  avatar?: string;
};

const defaultAvatar = '/2021/assets/people/anonymous.jpg';

const StaffItem = ({ staff }: { staff: Staff }) => (
  <div className="has-text-centered is-flex-shrink-0 mb-6">
    <figure className="image mb-2 is-128x128">
      <img className="is-rounded" src={staff.avatar || defaultAvatar} alt={staff.name} />
    </figure>
    <div className="is-size-5">{staff.name}</div>
    {staff.position && <div className="is-size-6">{staff.position}</div>}
  </div>
);

const StaffPage = ({
  organizers,
  volunteers,
  donators,
}: {
  organizers: Staff[];
  volunteers: Staff[];
  donators: string;
}) => {
  const { t } = useTranslation();

  return (
    <Layout title={t('staff_list')}>
      <section className="section">
        <div className="container content">
          <h1>{t('staff_list')}</h1>
          <hr />
          <h2>{t('organizers')}</h2>
          <div className="is-flex is-flex-wrap-wrap">
            {organizers.map((staff, i) => (
              <StaffItem staff={staff} key={i} />
            ))}
          </div>
          <h2>{t('volunteers')}</h2>
          <div className="is-flex is-flex-wrap-wrap">
            {volunteers.map((staff, i) => (
              <StaffItem staff={staff} key={i} />
            ))}
          </div>
          <h2>{t('donators')}</h2>
          <div className="content">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} plugins={[remarkGfm]}>
              {donators}
            </ReactMarkdown>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StaffPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const data = await loadYaml('staff.yaml');
  return {
    props: {
      ...data,
    },
  };
};
