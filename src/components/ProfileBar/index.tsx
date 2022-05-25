import React from "react";
import "./style.scss"
import ThemeToggle from "../ThemeToggle";
import Avatar from "./Avatar";

function ProfileBar() {
  return (
    <header className="app-profile-bar">
      <section className="app-profile-bar-container">
        <div className="app-profile-bar-btts">
          <ThemeToggle />
          <i className="app-profile-bar-separator"></i>
          <Avatar />
        </div>
      </section>
    </header>
  )
}

export default ProfileBar