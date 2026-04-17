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

  const registerNewArtist = (event) => {
    event.preventDefault()

    // checking it before calling createArtist, if empty it stops
    if (!artist.fullName || !artist.username || !artist.email) {
      window.alert("please fill out all fields!")
      return
    }

    createArtist(artist).then((createdArtist) => {
      if (createdArtist.hasOwnProperty("id")) {
        localStorage.setItem(
          "portfolio_artist",
          JSON.stringify({
            id: createdArtist.id,
            username: createdArtist.username,
          }),
        )
        navigate("/dashboard")
      }
    })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-soft">
      <div className="flex flex-col gap-4 w-80">
        <h2 className="text-4xl font-bold tracking-tight text-pink-main">
          register
        </h2>
        <form onSubmit={registerNewArtist} className="flex flex-col gap-4">
          <input
            className="border border-neutral-border rounded-pill px-4 py-2 placeholder:text-blue-mid text-blue-dark flex-1 min-w-0 outline-none focus:border-pink-main bg-white"
            type="text"
            placeholder="full name"
            required
            onChange={(event) =>
              setArtist({ ...artist, fullName: event.target.value })
            }
          />
          <input
            className="border border-neutral-border rounded-pill px-4 py-2 placeholder:text-blue-mid text-blue-dark flex-1 min-w-0 outline-none focus:border-pink-main bg-white"
            type="text"
            placeholder="username"
            required
            onChange={(event) =>
              setArtist({ ...artist, username: event.target.value })
            }
          />
          <input
            className="border border-neutral-border rounded-pill px-4 py-2 placeholder:text-blue-mid text-blue-dark flex-1 min-w-0 outline-none focus:border-pink-main bg-white"
            type="email"
            placeholder="email"
            required
            onChange={(event) =>
              setArtist({ ...artist, email: event.target.value })
            }
          />

          <button
            type="submit"
            className="bg-pink-main text-white rounded-pill px-4 py-2 text-sm hover:bg-pink-mid whitespace-nowrap transition-colors"
          >
            start creating!
          </button>
        </form>

        <p className="text-sm text-pink-mid hover:text-pink-main transition-colors">
          already have an account?{" "}
          <Link
            className="text-sm text-pink-mid hover:text-blue-main transition-colors"
            to="/login"
          >
            login!
          </Link>
        </p>
      </div>
    </div>
  )
}
