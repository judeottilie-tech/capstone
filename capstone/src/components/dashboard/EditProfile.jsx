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
      <h2 className="text-2xl font-bold text-blue-dark p-1 py-2">
        Edit Profile
      </h2>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl border border-neutral-border">
        <div className="flex justify-between items-center mb-6">
          <form onSubmit={handleSave}>
            <div className="flex flex-col md:flex-row">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-neutral-border flex-shrink-0">
                {artist.profileImageUrl ? (
                  <img
                    src={artist.profileImageUrl}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full mt-3 bg-blue-light flex items-center justify-center text-xl text-blue-dark font-bold">
                    {artist.fullName?.charAt(0)}
                  </div>
                )}
              </div>

              <label className="text-sm mt-3 text-blue-dark">
                Profile Image URL
              </label>
              <input
                type="text"
                value={artist.profileImageUrl || ""}
                onChange={(event) =>
                  setArtist({
                    ...artist,
                    profileImageUrl: event.target.value,
                  })
                }
                className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-3 outline-none placeholder:text-pink-mid text-pink-dark focus:border-pink-main"
              />
              <label className="text-sm mt-3 text-blue-dark">Artist Name</label>
              <div className="text-l text-blue-dark ">
                <input
                  type="text"
                  value={artist.fullName || ""}
                  onChange={(event) =>
                    setArtist({ ...artist, fullName: event.target.value })
                  }
                  className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-3 outline-none placeholder:text-pink-mid text-pink-dark focus:border-pink-main"
                />
                <label className="text-sm mt-3 text-blue-dark">
                  Bio
                </label>
                <textarea
                  value={artist.bio || ""}
                  onChange={(event) =>
                    setArtist({ ...artist, bio: event.target.value })
                  }
                  className="w-full border border-neutral-border px-2 py-10 mt-3 outline-none placeholder:text-pink-mid text-pink-dark focus:border-pink-main"
                />
                <label className="text-sm mt-3 text-blue-dark">
                  Social URL
                </label>
                <input
                  type="text"
                  value={artist.profileLink || ""}
                  onChange={(event) =>
                    setArtist({ ...artist, profileLink: event.target.value })
                  }
                  className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-3 outline-none placeholder:text-pink-mid text-pink-dark focus:border-pink-main"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-main text-white px-4 py-2 mt-3 items-center rounded-pill hover:bg-blue-dark transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

{/*
  
  (
  <div className="min-h-screen bg-neutral-soft p-6">
    {/* this is to add when someone is logged in viewing another persons profile if necessary
    
    {currentArtist && !isOwnProfile && (
      <div className="bg-blue-light text-blue-dark text-sm text-center py-2 px-4 rounded-xl mb-4">
        you're viewing{" "}
        <span className="font-semibold">@{artist.username}</span>'s portfolio
      </div>
    )}


    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-pink-dark">@{username}</h2>

      {isOwnProfile && (
        <button
          onClick={() => navigate("/dashboard/profile/edit")}
          className="bg-blue-main text-white px-4 py-2 rounded-pill hover:bg-blue-dark transition text-sm"
        >
          edit profile
        </button>
      )}
    </div>

    <div className="max-w-5xl mx-auto">
      <div className="text-right p-1 "></div>
      <div className="bg-white border border-neutral-border rounded-2xl p-6 mb-6">
        
        <div className="flex items-start justify-between mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-neutral-border flex-shrink-0">
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
        </div>

        <h1 className="text-xl font-bold text-blue-dark">
          {artist.fullName}
        </h1>

        <p className="text-sm text-blue-mid mb-2">{artist.bio}</p>
        {artist.profileLink && (
          <a
            href={artist.profileLink}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-pink-main hover:underline"
          >
            {artist.profileLink}
          </a>
        )}
      </div>
    </div>

    <div className="mb-4">
      <select
        onChange={(event) => setSelectedTag(parseInt(event.target.value))}
        className="border border-neutral-border rounded-pill px-5 py-1 text-sm text-blue-dark bg-white"
      >
        <option value={0}>All</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {filteredCommissions.length > 0 ? (
        filteredCommissions.map((commissionObj) => (
          <CommissionCard
            key={commissionObj.id}
            commissionObj={commissionObj}
            tags={tags}
            navigate={navigate}
          />
        ))
      ) : (
        <p className="text-blue-mid text-sm">No commissions found</p>
      )}
    </div>
  </div>
) 

email edit-

<div className="mb-4">
            <label className="text-sm text-blue-mid">Email</label>
            <input
              type="email"
              value={artist.email || ""}
              onChange={(e) => setArtist({ ...artist, email: e.target.value })}
              className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-1 outline-none focus:border-pink-main"
            />
          </div>


*/}






























