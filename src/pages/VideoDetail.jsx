import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideos from "../components/RelatedVideos";
import Comment from "../components/Comment";

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();

  const { title, channelId, channelTitle, description } = video.snippet;
  const [isExpanded, setIsExpanded] = useState(false);

  // Display only first 100 characters by default
  const shortDescription = `${description.substring(0, 100)}...`;

  return (
    <section className="flex flex-col lg:flex-row">
      <article className="basis-4/6">
        <iframe
          id="player"
          type="text/html"
          width="100%"
          height="640"
          src={`https://www.youtube.com/embed/${video.id}`}
          frameBorder="0"
          title={title}
        />
        <div className="p-8">
          <h2 className="text-xl font-bold">{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <pre className="whitespace-pre-wrap">
            {isExpanded ? description : shortDescription}
          </pre>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500"
          >
            {isExpanded ? "간략히" : "더보기"}
          </button>
          <Comment videoId={video.id} />
        </div>
      </article>
      <section className="basis-2/6">
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
}
