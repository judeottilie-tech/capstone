//similar to learning moments but username + email

//import { getUserByEmail } from "../../services/userService"
import "./Login.css"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getArtistByEmail } from "../../services/artistService"

export const Login = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()

    getArtistByEmail(email).then((foundArtists) => {
      if (foundArtists.length === 1) {
        const artist = foundArtists[0]
        localStorage.setItem(
          "portfolio_artist",
          JSON.stringify({
            id: artist.id,
            username: artist.username,
          }),
        )
        navigate("/dashboard")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-soft">
      <div className="flex flex-col gap-4 w-80">
        <h1 className="text-5xl font-bold tracking-tight text-pink-main">
          portfol.io
        </h1>
        <p className="text-pink-main text-sm">Please sign in</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              className="border border-neutral-border rounded-pill px-4 py-2 placeholder:text-blue-mid text-blue-dark flex-1 min-w-0 outline-none focus:border-pink-main bg-white"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              required
              autoFocus
            />
            <button
              type="submit"
              className="bg-pink-main text-white rounded-pill px-4 py-2 text-sm hover:bg-pink-mid whitespace-nowrap transition-colors"
            >
              Sign in!
            </button>
          </div>
        </form>
        <Link
          className="text-sm text-pink-mid hover:text-blue-main transition-colors"
          to="/register"
        >
          Not a member yet? Click here to register!
        </Link>
      </div>
    </div>
  )
}
