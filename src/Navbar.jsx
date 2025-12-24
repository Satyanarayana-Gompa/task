import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white border-bottom sticky-top px-3">
     
      <div className="d-flex align-items-center gap-3">
        <i className="fa-solid fa-bars fs-5"></i>
        <span className="fw-bold fs-4 text-danger">
          <i className="fa-brands fa-youtube me-1"></i>YouTube
        </span>
      </div>

      
      <div className="d-none d-md-flex flex-grow-1 justify-content-center">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control rounded-start-pill"
            placeholder="Search"
            aria-label="Search site"
          />
          <button className="btn btn-outline-secondary rounded-end-pill" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-link p-0 d-md-none" aria-label="Open search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <i className="fa-solid fa-microphone"></i>
        <i className="fa-regular fa-bell position-relative">
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            9+
          </span>
        </i>
        <i className="fa-solid fa-circle-user fs-4"></i>
      </div>
    </nav>
  );
}

export default Navbar;
