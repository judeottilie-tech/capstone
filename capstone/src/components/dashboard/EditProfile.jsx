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
        <form onSubmit={handleSave}>
          <div className="bg-white border border-neutral-border rounded-2xl p-6 flex gap-6 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-neutral-border">
              {artist.profileImageUrl ? (
                <img
                  src={artist.profileImageUrl}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-light flex items-center justify-center text-xl text-blue-dark font-bold">
                  {artist.fullName?.charAt(0)}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="text-sm text-blue-dark">
                Profile Image URL
              </label>
              <input
                type="text"
                value={artist.profileImageUrl || ""}
                onChange={(event) =>
                  setArtist({ ...artist, profileImageUrl: event.target.value })
                }
                className="w-100px border border-neutral-border rounded-pill px-4 py-1 mt-1 outline-none text-blue-mid focus:border-pink-main"
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <input
                type="text"
                value={artist.fullName || ""}
                onChange={(event) =>
                  setArtist({ ...artist, fullName: event.target.value })
                }
                className="text-xl font-bold text-blue-dark outline-none border-b border-neutral-border focus:border-pink-main"
              />

              <textarea
                value={artist.bio || ""}
                onChange={(event) =>
                  setArtist({ ...artist, bio: event.target.value })
                }
                className="text-sm text-blue-mid outline-none border-b border-neutral-border focus:border-pink-main resize-none"
              />

              <input
                type="text"
                value={artist.profileLink || ""}
                onChange={(event) =>
                  setArtist({ ...artist, profileLink: event.target.value })
                }
                className="text-sm text-pink-main outline-none border-b border-neutral-border focus:border-pink-main"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-main text-white px-4 py-2 items-center rounded-pill hover:bg-blue-dark transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

/*email edit-

<div className="mb-4">
            <label className="text-sm text-blue-mid">Email</label>
            <input
              type="email"
              value={artist.email || ""}
              onChange={(e) => setArtist({ ...artist, email: e.target.value })}
              className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-1 outline-none focus:border-pink-main"
            />
          </div>*/
