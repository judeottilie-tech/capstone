import { NavLink, useNavigate } from "react-router-dom"
import React, { useState } from "react"

export const NavBar = ({ currentArtist }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("portfolio_artist")
    setIsOpen(false)
    navigate("/login")
  }

  const mobileLinkStyles = ({ isActive }) =>
    `block w-full px-4 py-3 rounded-xl text-sm transition ${
      isActive
        ? "bg-pink-light text-pink-dark font-semibold"
        : "text-blue-dark hover:bg-neutral-soft"
    }`

  const desktopLinkStyles = ({ isActive }) =>
    `px-4 py-2 rounded-pill text-sm transition ${
      isActive ? "bg-pink-dark text-white" : "text-pink-mid hover:bg-pink-light"
    }`

  return (
    <>
      <nav className="w-full bg-white border-b border-neutral-border px-4 py-3 flex items-center justify-between">
        {/*logo, will need to swap the text for an img tag once i make the logo*/}
        <NavLink
          to="/dashboard"
          className="text-pink-main font-bold text-lg tracking-tight hover:opacity-75 transition"
        >
          portfol.io
        </NavLink>

        {/*desktop links hidden on mobile*/}
        <ul className="hidden md:flex gap-3 items-center">
          <li>
            <NavLink to="/dashboard" className={desktopLinkStyles}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/portfolio/${currentArtist?.username}`}
              className={desktopLinkStyles}
            >
              my profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile/edit" className={desktopLinkStyles}>
              edit profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add" className={desktopLinkStyles}>
              add commission
            </NavLink>
          </li>
          <li className="ml-auto">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-pill text-sm text-pink-mid hover:bg-pink-light transition"
            >
              logout
            </button>
          </li>
        </ul>

        {/* hamburgr only visible on mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          {/* burger lines */}
          <div
            className={`w-6 h-0.5 bg-pink-main transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-pink-main transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-pink-main transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>
      {/*mobile dropdown menu, only shows when on mobile*/}
      <div
        className={`md:hidden bg-white border-b border-neutral-border px-4 py-2 flex flex-col gap-1 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}
      >
        <NavLink
          to="/dashboard"
          className={mobileLinkStyles}
          onClick={() => setIsOpen(false)}
        >
          dashboard
        </NavLink>
        <NavLink
          to={`/portfolio/${currentArtist?.username}`}
          className={mobileLinkStyles}
          onClick={() => setIsOpen(false)}
        >
          my profile
        </NavLink>
        <NavLink
          to="/dashboard/profile/edit"
          className={mobileLinkStyles}
          onClick={() => setIsOpen(false)}
        >
          edit profile
        </NavLink>
        <NavLink
          to="/dashboard/add"
          className={mobileLinkStyles}
          onClick={() => setIsOpen(false)}
        >
          add commission
        </NavLink>
        <button
          onClick={handleLogout}
          className="text-left w-full px-4 py-3 rounded-xl text-sm text-pink-mid hover:bg-neutral-soft transition"
        >
          logout
        </button>
      </div>
    </>
  )
}
