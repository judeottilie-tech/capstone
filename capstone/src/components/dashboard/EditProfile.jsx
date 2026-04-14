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
  })

  useEffect(() => {
    setArtist(currentArtist)
  }, [currentArtist])

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
    <form>
      <h2>Edit Profile</h2>

      <fieldset>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={artist.fullName || ""}
            onChange={(event) => setArtist({ ...artist, fullName: event.target.value })}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={artist.email || ""}
            onChange={(event) => setArtist({ ...artist, email: event.target.value })}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            className="form-control"
            value={artist.bio || ""}
            onChange={(event) => setArtist({ ...artist, bio: event.target.value })}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Profile Link</label>
          <input
            type="text"
            className="form-control"
            value={artist.profileLink || ""}
            onChange={(event) =>
              setArtist({ ...artist, profileLink: event.target.value })
            }
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-info" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </fieldset>
    </form>
  )
}
