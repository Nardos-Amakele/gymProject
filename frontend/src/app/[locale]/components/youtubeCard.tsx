"use client";
import { useEffect, useRef, useState } from "react";

export interface VideoData {
  vId: string;
}

type YouTubePlayerProps = {
  videoId: string;
  // width: string;
  // height: string;
  isYouTubeLoaderReady: boolean;
};

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
                                                              videoId,
                                                              // width,
                                                              // height,
                                                              isYouTubeLoaderReady,
                                                            }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting !== isIntersecting) {
          setIsIntersecting(entries[0].isIntersecting);
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting && isYouTubeLoaderReady) {
      new (window as any).YT.Player(videoRef.current, {
        // width,
        // height,
        videoId,
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      });
    }
  }, [isIntersecting, videoId, isYouTubeLoaderReady]);

  return (
    <div className="size-full">
      <div
        ref={videoRef}
        className="size-full rounded-xl"
        id={`youtube-player-${videoId}-parent`}
      >
        <div id={`youtube-player-${videoId}`}></div>
      </div>
    </div>
  );
};
