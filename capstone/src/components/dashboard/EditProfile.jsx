//editprofile learning moments w different fields
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getArtistById, updateArtist } from "../../services/artistService"

export const EditProfile = ({ currentArtist }) => {
  const navigate = useNavigate()
  const [artist, setArtist] = useState({
    fullName: "",
    email: "",
    bio: "",
    profileLink: "",
    profileImageUrl: "",
  })

  useEffect(() => {
    getArtistById(currentArtist.id).then((artistData) => {
      setArtist(artistData)
    })
  }, [])
  
  const handleSave = (event) => {
    event.preventDefault()

    const updatedArtist = {
      ...artist,
      id: currentArtist.id,
    }

    updateArtist(updatedArtist).then(() => {
      navigate(`/portfolio/${currentArtist.username}`)
    })
  }

  return (
    <div className="min-h-screen bg-neutral-soft p-6 ">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-neutral-border">
        <h2 className="text-2xl font-bold text-blue-dark mb-6">edit profile</h2>

        <form className="flex flex-col gap-4">
          <label className="text-1xl font-bold text-blue-mid">
            profile icon
          </label>
          <input
            type="text"
            value={artist.profileImageUrl || ""}
            onChange={(event) =>
              setArtist({ ...artist, profileImageUrl: event.target.value })
            }
            placeholder="image url"
            className="border border-neutral-border rounded-pill px-4 py-2 outline-none placeholder:text-blue-mid text-blue-dark  focus:border-pink-mid"
          />
          

          <label className="text-1xl font-bold text-blue-mid">edit name </label>
          <input
            type="text"
            value={artist.fullName || ""}
            onChange={(event) =>
              setArtist({ ...artist, fullName: event.target.value })
            }
            placeholder="Full Name"
            className="border border-neutral-border rounded-pill px-4 py-2 outline-none placeholder:text-blue-mid text-blue-dark  focus:border-pink-mid"
          />
          <label className="text-1xl font-bold text-blue-mid">
            edit email{" "}
          </label>
          <input
            type="email"
            value={artist.email || ""}
            onChange={(event) =>
              setArtist({ ...artist, email: event.target.value })
            }
            placeholder="Email"
            className="border border-neutral-border rounded-pill px-4 py-2 outline-none placeholder:text-blue-mid text-blue-dark focus:border-pink-mid"
          />
          <label className="text-1xl font-bold text-blue-mid">edit bio </label>
          <textarea
            value={artist.bio || ""}
            onChange={(event) =>
              setArtist({ ...artist, bio: event.target.value })
            }
            placeholder="Bio"
            className="border border-neutral-border rounded-pill px-4 py-2 outline-none placeholder:text-blue-mid text-blue-dark  focus:border-pink-mid"
          />
          <label className="text-1xl font-bold text-blue-mid">edit link </label>
          <input
            type="text"
            value={artist.profileLink || ""}
            onChange={(event) =>
              setArtist({ ...artist, profileLink: event.target.value })
            }
            placeholder="Profile Link"
            className="border border-neutral-border rounded-pill px-4 py-2 outline-none placeholder:text-blue-mid text-blue-dark  focus:border-pink-mid"
          />

          <button
            onClick={handleSave}
            className="bg-blue-main border-neutral-border rounded-pill px-4 text-white py-2 rounded-pill hover:bg-blue-mid transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
