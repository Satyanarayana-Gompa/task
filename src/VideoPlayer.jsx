function VideoPlayer({ videoId }) {
  return (
    <div className="container mt-3">
      <div className="mx-auto" style={{ maxWidth: "1280px" }}>
        <div className="ratio ratio-16x9">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
