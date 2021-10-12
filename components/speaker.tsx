import Link from 'next/link';

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

const properTitle = (title: string): string => {
  return title.length <= 50 ? title : title.slice(47) + '...';
};

export default function Speaker(props: SpeakerType) {
  return (
    <Link href={`/talks/${props.slug}`}>
      <a className="card is-block">
        <div className="card-image">
          <figure className="image is-square">
            <img src={props.avatar || defaultAvatar} alt={props.speaker} />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-5">{props.speaker}</p>
          <p className="subtitle is-6">{props.company}</p>
          <div className="content is-size-5">{properTitle(props.title)}</div>
        </div>
        <style jsx>{`
          .card-content {
            height: 200px;
          }
        `}</style>
      </a>
    </Link>
  );
}
