import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createArtist } from "../../services/artistService"
import { Link } from "react-router-dom"
import "./Login.css"

export const Register = () => {
  const navigate = useNavigate()
  const [artist, setArtist] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    profileLink: "",
  })

  const registerNewArtist = () => {
    const newArtist = {
      ...artist,
    }

    createArtist(newArtist).then((createdArtist) => {
      if (createdArtist.hasOwnProperty("id")) {
        localStorage.setItem(
          "portfolio_artist",
          JSON.stringify({
            id: createdArtist.id,
            username: createdArtist.username,
          }),
        )

        navigate("/")
      }
    })
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Full name"
        onChange={(e) => setArtist({ ...artist, fullName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setArtist({ ...artist, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setArtist({ ...artist, email: e.target.value })}
      />

      <button onClick={registerNewArtist}>Register</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}
