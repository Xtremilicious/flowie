import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light p-4 h-20" style={{ height: "15vh" }}>
      <a className="navbar-brand mx-sm-4 mr-sm-5" href="#">
        <span className="brand-title">Flowie</span>
      </a>
      {/* <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarText"
    aria-controls="navbarText"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button> */}
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active mx-3 ml-5">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item mx-3">
            <a className="nav-link" href="#">
              Features
            </a>
          </li>
        </ul>
        {/* <span className="navbar-text">Something</span> */}
      </div>
    </nav>
  );
}
