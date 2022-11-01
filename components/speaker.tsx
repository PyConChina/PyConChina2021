import Link from 'next/link';
import { useLanguageQuery } from 'next-export-i18n';

/* eslint-disable @next/next/no-img-element */
export type SpeakerType = {
  avatar?: string;
  speaker: string;
  desc: string;
  company: string;
  title: string;
  slug: string;
};

export const defaultAvatar = '/2021/assets/people/anonymous.jpg';

export default function Speaker(props: SpeakerType) {
  const [query] = useLanguageQuery();
  return (
    <Link href={{query, pathname: `/talks/${props.slug}`}}>
      <a className="card is-block">
        <div className="card-image">
          <figure className="image is-square">
            <img src={props.avatar || defaultAvatar} alt={props.speaker} />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-5">{props.speaker}</p>
          <p className="subtitle is-6">{props.company}</p>
          <p className="content is-size-5">{props.title}</p>
        </div>
        <style jsx>{`
          .card-content {
            height: 210px;
          }
          .subtitle {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .content {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        `}</style>
      </a>
    </Link>
  );
}
