import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";

function Header() {
  const [header, setHeader] = useState(null);
  const [showShare, setShowShare] = useState(false);

  const videoUrl = "https://youtu.be/Ma1x7ikpid8";

  
  useEffect(() => {
    fetch("http://localhost:3001/header")
      .then(res => res.json())
      .then(data => {
        
        setHeader({
          subscribers: data.subscribers || 0,
          likes: data.likes || 0,
          dislikes: data.dislikes || 0,
          subscribed: data.subscribed || false
        });
      });
  }, []);

  
  const updateHeader = (updated) => {
    fetch("http://localhost:3001/header", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });

    setHeader(prev => ({
      ...prev,
      ...updated
    }));
  };

  if (!header) return null;

  return (
    <>
      
      <div className="container mt-3">
        <h5 className="fw-bold">
          Avatar: Fire and Ash | Official New Trailer
        </h5>

        <div className="row align-items-center mt-3">
         
          <div className="col-md-5 d-flex align-items-center gap-3">
            <img
              src={logo}
              alt="Avatar"
              className="rounded-circle"
              width="48"
            />

            <div>
              <h6 className="mb-0 fw-semibold">Avatar</h6>
              <small className="text-muted">
                {header.subscribers} subscribers
              </small>
            </div>

            <button
              className={`btn ${
                header.subscribed ? "btn-secondary" : "btn-dark"
              } rounded-pill px-4`}
              onClick={() =>
                updateHeader({
                  subscribed: !header.subscribed,
                  subscribers: header.subscribed
                    ? Math.max(header.subscribers - 1, 0)
                    : header.subscribers + 1
                })
              }
            >
              {header.subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

         
          <div className="col-md-7 d-flex justify-content-end gap-2 mt-3 mt-md-0">
            <button
              className="btn btn-light rounded-pill"
              onClick={() =>
                updateHeader({ likes: header.likes + 1 })
              }
            >
              <i className="fa-regular fa-thumbs-up me-1"></i>
              {header.likes}
            </button>

            <button
              className="btn btn-light rounded-pill"
              onClick={() =>
                updateHeader({ dislikes: header.dislikes + 1 })
              }
            >
              <i className="fa-regular fa-thumbs-down me-1"></i>
              {header.dislikes}
            </button>

            <button
              className="btn btn-light rounded-pill"
              onClick={() => setShowShare(true)}
            >
              <i className="fa-solid fa-share me-1"></i>
              Share
            </button>

            <a
              className="btn btn-light rounded-pill"
              href="/sample-video.mp4"
              download
            >
              <i className="fa-solid fa-download me-1"></i>
              Download
            </a>
          </div>
        </div>
      </div>

 
      {showShare && (
        <> 
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={() => setShowShare(false)}
          ></div>

          
          <div
            className="position-fixed top-50 start-50 translate-middle bg-white rounded-4 p-4"
            style={{ width: "420px", maxWidth: "95%", zIndex: 1050 }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="fw-semibold mb-0">Share</h6>
              <button
                className="btn-close"
                onClick={() => setShowShare(false)}
              ></button>
            </div>

            <hr />

            
            <div className="d-flex justify-content-between text-center">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(videoUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none text-dark"
              >
                <i className="fa-brands fa-whatsapp fa-2x text-success"></i>
                <div className="small mt-1">WhatsApp</div>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${videoUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none text-dark"
              >
                <i className="fa-brands fa-facebook fa-2x text-primary"></i>
                <div className="small mt-1">Facebook</div>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${videoUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none text-dark"
              >
                <i className="fa-brands fa-x-twitter fa-2x"></i>
                <div className="small mt-1">X</div>
              </a>

              <a
                href={`mailto:?subject=Check this video&body=${videoUrl}`}
                className="text-decoration-none text-dark"
              >
                <i className="fa-solid fa-envelope fa-2x text-secondary"></i>
                <div className="small mt-1">Email</div>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
