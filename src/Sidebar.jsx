import React from "react";

function Sidebar() {
  return (
    <div
      className="border-end vh-100 p-2 d-none d-md-block"
      style={{ width: "80px", position: "fixed", top: "56px", left: 0, zIndex: 1030 }}
      aria-hidden="true"
    >
      <div className="d-flex flex-column align-items-center gap-4 text-center">
        <div>
          <i className="fa-solid fa-house fs-5"></i>
          <small className="d-block">Home</small>
        </div>

        <div>
          <i className="fa-solid fa-bolt fs-5"></i>
          <small className="d-block">Shorts</small>
        </div>

        <div>
          <i className="fa-solid fa-layer-group fs-5"></i>
          <small className="d-block">Subs</small>
        </div>

        <div>
          <i className="fa-solid fa-user fs-5"></i>
          <small className="d-block">You</small>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
