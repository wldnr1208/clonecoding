import React from "react";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";

export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();

  function formatSubscribers(subscribers) {
    if (subscribers >= 10000) {
      const divided = subscribers / 10000;
      return divided % 1 === 0 ? `${divided}만명` : `${divided.toFixed(1)}만명`;
    }
    return subscribers;
  }

  const { data: url } = useQuery(
    ["channel", id],
    () => youtube.channelImageURL(id),
    { staleTime: 1000 * 60 * 5 }
  );

  const { data: channelData } = useQuery(
    ["channelDetails", id],
    () => youtube.channelDetails(id),
    { staleTime: 1000 * 60 * 5 }
  );

  const subscribers = channelData?.statistics?.subscriberCount;
  return (
    <div className="flex my-4 mb-8 items-center">
      {url && <img className="w-10 h-10 rounded-full" src={url} alt={name} />}
      <div className="flex flex-col ml-2">
        <p className="text-lg font-medium">{name}</p>
        {subscribers && <p>구독자 {formatSubscribers(subscribers)}</p>}
      </div>
    </div>
  );
}
