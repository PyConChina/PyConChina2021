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
          <p className="title is-4">{props.speaker}</p>
          <p className="subtitle is-5">{props.company}</p>
          <div className="content">{props.title}</div>
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
