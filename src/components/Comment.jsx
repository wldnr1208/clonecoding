import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useYoutubeApi } from "../context/YoutubeApiContext";

export default function CommentSection({ videoId }) {
  const { youtube } = useYoutubeApi();
  const { data: comments } = useQuery(
    ["videoComments", videoId],
    () => youtube.fetchComments(videoId),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <div className="max-w-2xl mt-12">
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            <h3 className="text-xs mt-6">@ {comment.authorDisplayName}</h3>
            <p className="text-base">{comment.textDisplay}</p>
          </div>
        ))}
    </div>
  );
}
