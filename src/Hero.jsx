import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";

function Hero() {
  const [hero, setHero] = useState(null);
  const [showMore, setShowMore] = useState(false);

  
  useEffect(() => {
    fetch("http://localhost:3001/hero")
      .then(res => res.json())
      .then(data => {
        setHero({
          views: data.views || 0,
          date: data.date || new Date().toISOString().split("T")[0],
          subscribed: data.subscribed || false
        });
      });
  }, []);

  const updateHero = (updated) => {
    fetch("http://localhost:3001/hero", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });

    setHero(prev => ({ ...prev, ...updated }));
  };

  if (!hero) return null;

  return (
    <div className="container mt-3">
      <div className="bg-light rounded-3 p-3">

        
        <p className="fw-semibold mb-1">
          {hero.views.toLocaleString()} views ·{" "}
          {new Date(hero.date).toDateString()}{" "}
          <span className="text-primary">#AvatarFireandAsh #Avatar</span>
        </p>

       
        {!showMore && (
          <>
            <p className="mb-1">
              This world is much deeper than you imagine. Watch the brand-new
              trailer for Avatar: Fire and Ash and experience it in theatres
              December 19th.
            </p>

            <p className="mb-0">
              Also, don’t miss Avatar: The Way of Water back on the big screen in
              3D for one week only, starting October 3rd.
              <span
                className="fw-semibold ms-1"
                style={{ cursor: "pointer" }}
                onClick={() => setShowMore(true)}
              >
                …more
              </span>
            </p>
          </>
        )}

        
        {showMore && (
          <>
            
            <p>
              This world is much deeper than you imagine. Watch the brand-new
              trailer for Avatar: Fire and Ash and experience it in theatres
              December 19th.
            </p>

            <p>
              Also, don’t miss Avatar: The Way of Water back on the big screen in
              3D for one week only, starting October 3rd.
            </p>

            <p>
              With “Avatar: Fire and Ash,” James Cameron takes audiences back to
              Pandora in an immersive new adventure with Jake Sully, Neytiri, and
              the Sully family, facing a new threat unlike anything they’ve seen
              before.
            </p>

            
            <p className="mt-2">
              <strong>Director:</strong> James Cameron <br />
              <strong>Cast:</strong> Sam Worthington, Zoe Saldaña, Sigourney
              Weaver, Stephen Lang <br />
              <strong>Producers:</strong> James Cameron, Jon Landau <br />
              <strong>Studio:</strong> 20th Century Studios <br />
              <strong>Music:</strong> Simon Franglen
            </p>

            
            <p>
               Official Website:{" "}
              <a
                href="https://www.avatar.com"
                target="_blank"
                rel="noreferrer"
              >
                https://www.avatar.com
              </a>
            </p>

            <p>
              Watch Avatar: The Way of Water trailer:{" "}
              <a
                href="https://youtu.be/d9MyW72ELq0"
                target="_blank"
                rel="noreferrer"
              >
                https://youtu.be/d9MyW72ELq0
              </a>
            </p>

           
            <p className="small text-muted">
              © 2025 20th Century Studios. All Rights Reserved. Avatar and
              associated marks are trademarks of 20th Century Studios.
            </p>

            <p className="text-primary">
              #Avatar #AvatarFireAndAsh #Pandora #JamesCameron #SciFi
            </p>

            <hr />

            
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={logo}
                  alt="Avatar"
                  className="rounded-circle"
                  width="48"
                />

                <div>
                  <h6 className="mb-0 fw-semibold">Avatar</h6>
                  <small className="text-muted">Official Channel</small>
                </div>
              </div>

              <button
                className={`btn ${
                  hero.subscribed ? "btn-secondary" : "btn-dark"
                } rounded-pill px-4`}
                onClick={() =>
                  updateHero({ subscribed: !hero.subscribed })
                }
              >
                {hero.subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            
            <span
              className="fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => setShowMore(false)}
            >
              Show less
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Hero;
