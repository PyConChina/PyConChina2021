import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
export type SpeakerType = {
  avatar: string;
  speaker: string;
  desc: string;
  title: string;
  slug: string;
};

export default function Speaker(props: SpeakerType) {
  return (
    <Link href={`/talks/${props.slug}`}>
      <a className="card is-block">
        <div className="card-image">
          <figure className="image is-square">
            <img src={props.avatar} alt={props.speaker} />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-4">{props.speaker}</p>
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
