import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import React from "react"

export const NavBar = ({ currentArtist }) => {
  return (
    <ul className="navBar">
      <li className="navbar-item">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/dashboard/add">Add Commission</NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to={`/portfolio/${currentArtist?.username}`}>
          My Profile
        </NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/dashboard/profile/edit">Edit Profile</NavLink>
      </li>

      {localStorage.getItem("portfolio_artist") ? (
        <li className="navbar-item navbar-logout">
          <NavLink
            className="navbar-link"
            to="/login"
            onClick={() => {
              localStorage.removeItem("portfolio_artist")
              window.location.href = "/login"
            }}
          >
            Logout
          </NavLink>
        </li>
      ) : (
        ""
      )}
    </ul>
  )
}
