

/* import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArtistByUsername } from "../../services/artistService"
import { getCommissionsByArtist } from "../../services/commissionService"
import "../../App.css"

export const ArtistProfile = ({ currentArtist }) => {
  const { username } = useParams()
  const navigate = useNavigate()

  const [artist, setArtist] = useState({})
  const [commissions, setCommissions] = useState([])

  useEffect(() => {
    getArtistByUsername(username).then((artistArray) => {
      if (artistArray.length > 0) {
        const artistObj = artistArray[0]
        setArtist(artistObj)

        getCommissionsByArtist(artistObj.id).then((commissionArray) => {
          setCommissions(commissionArray)
        })
      }
    })
  }, [username])

  const isOwnProfile = currentArtist?.id === artist.id

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">{artist.fullName?.charAt(0)}</div>

        <div className="profile-info">
          <h2 className="profile-name">{artist.fullName}</h2>
          <p className="profile-detail">@{artist.username}</p>
          <p className="profile-detail">{artist.bio}</p>

          {artist.profileLink ? (
            <a href={artist.profileLink}
              target="_blank"
              rel="noreferrer"
              className="profile-link"
            >
              {artist.profileLink}
            </a>
          ) : null}
        </div>

        {isOwnProfile ? (
          <button
            className="btn-secondary"
            onClick={() => navigate("/dashboard/profile/edit")}
          >
            Edit Profile
          </button>
        ) : null}
      </div>

      <h3>Commissions</h3>

      <div className="gallery">
        {commissions.length > 0 ? (
          commissions.map((commissionObj) => {
            return (
              <div key={commissionObj.id} className="gallery-card">
                <img
                  src={commissionObj.imageUrl}
                  alt={commissionObj.title}
                  className="gallery-img"
                />
                <div className="gallery-info">
                  <p className="gallery-title">{commissionObj.title}</p>
                  <p className="gallery-price">${commissionObj.price}</p>
                </div>
              </div>
            )
          })
        ) : (
          <p>No commissions yet</p>
        )}
      </div>
    </div>
  )
}

*/