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

  const handleLogin = (e) => {
    e.preventDefault()

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
        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">portfol.io</h1>
        <p>Please sign in</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            autoFocus
            className="form-control"
          />
          <button type="submit" className="btn-primary">
            Sign in
          </button>
        </form>
        <Link to="/register">Not a member yet?</Link>
      </div>
    </div>
  )
}
