import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import Header from "./Header";
import Hero from "./Hero";
import Comments from "./comments"; 

function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/videos/${id}`)
      .then(res => res.json())
      .then(setVideo);
  }, [id]);

  if (!video) return null;

  return (
    <>
      <VideoPlayer videoId={video.videoId} />
      <Header />
      <Hero />
      <Comments />
    </>
  );
}

export default Watch;
