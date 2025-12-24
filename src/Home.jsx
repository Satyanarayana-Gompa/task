import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Home.css";

function formatViews(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M views";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K views";
  return n + " views";
}

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = videos
    .filter((v) => v.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.published) - new Date(a.published);
      if (sort === "popular") return b.views - a.views;
      return 0;
    });

  return (
    <>
      <Navbar />
      <Sidebar />

      <main id="main" className="main-content">
        
        <section className="hero bg-light rounded-4 p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="hero-title mb-2">Recommended for you</h2>
              <p className="text-muted mb-0">
                Hand-picked videos and trending highlights based on recent
                activity.
              </p>
            </div>

            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <div className="d-inline-flex align-items-center gap-2">
                <input
                  type="text"
                  className="form-control form-control-sm search-input"
                  placeholder="Search videos"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search videos"
                />

                <select
                  className="form-select form-select-sm"
                  style={{ width: "180px" }}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort videos"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most popular</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="container-fluid px-0">
          <h5 className="section-heading mb-3">Trending</h5>

          
          <div className="row g-3">
            {loading &&
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card video-card p-2">
                    <div className="skeleton-thumb mb-2" />
                    <div className="skeleton-line w-75 mb-1" />
                    <div className="skeleton-line w-50" />
                  </div>
                </div>
              ))}

            {!loading && filtered.length === 0 && (
              <div className="col-12">
                <div className="empty-state p-4 text-center rounded-3">
                  <h6 className="mb-2">No videos found</h6>
                  <p className="text-muted mb-2">Try a different search term.</p>
                </div>
              </div>
            )}

            {!loading &&
              filtered.map((video) => (
                <div key={video.id} className="col-lg-3 col-md-4 col-sm-6">
                  <Link
                    to={`/watch/${video.id}`}
                    className="text-decoration-none text-dark"
                    aria-label={`Open video ${video.title}`}
                  >
                    <div className="card video-card">
                      <div className="position-relative">
                        <img
                          src={video.thumbnail}
                          loading="lazy"
                          alt={video.title}
                          className="img-fluid rounded-3 video-thumb"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/480x270?text=Video";
                          }}
                        />

                        {video.duration && (
                          <span className="badge bg-dark duration-badge">
                            {video.duration}
                          </span>
                        )}
                      </div>

                      <div className="card-body p-2">
                        <h6 className="mb-1 video-title">{video.title}</h6>
                        <div className="d-flex justify-content-between align-items-center small text-muted">
                          <div>{video.channel}</div>
                          <div>{formatViews(video.views)} • {video.published}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
