import { NavLink } from "react-router-dom"
import React from "react"

export const NavBar = ({ currentArtist }) => {
  const linkStyles = ({ isActive }) =>
    `px-7 py-4 rounded-pill text-sm transition ${
      isActive ? "bg-pink-dark text-white" : "text-pink-mid hover:bg-pink-light"
    }`
console.log("Navbar rendering")

  return (
    <nav className="w-full bg-white border-b border-neutral-border p-4">
      <ul className="flex gap-3 items-center">
        <li>
          <NavLink to="/dashboard" className={linkStyles}>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`/portfolio/${currentArtist?.username}`}
            className={linkStyles}
          >
            My Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/profile/edit" className={linkStyles}>
            Edit Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/add" className={linkStyles}>
            Add Commission
          </NavLink>
        </li>

        <li className="ml-auto">
          <NavLink
            to="/login"
            className="px-4 py-2 rounded-pill text-sm text-pink-mid hover:bg-pink-light transition"
            onClick={() => {
              localStorage.removeItem("portfolio_artist")
              window.location.href = "/login"
            }}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
