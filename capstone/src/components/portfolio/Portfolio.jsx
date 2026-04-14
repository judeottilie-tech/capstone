import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArtistByUsername } from "../../services/artistService"
import { getCommissionsByArtist } from "../../services/commissionService"
import { getTags } from "../../services/tagService"
import "./Portfolio.css"

export const Portfolio = ({ currentArtist }) => {
  const [artist, setArtist] = useState({})
  const [commissions, setCommissions] = useState([])
  const [selectedTag, setSelectedTag] = useState(0)
  const [tags, setTags] = useState([])

  const { username } = useParams()
  const navigate = useNavigate()

  const isOwnProfile = currentArtist?.id === artist.id

  useEffect(() => {
    getArtistByUsername(username).then((artistArray) => {
      if (artistArray.length > 0) {
        const artistObj = artistArray[0]
        setArtist(artistObj)

        getCommissionsByArtist(artistObj.id).then(setCommissions)
      }
    })
  }, [username])

  useEffect(() => {
    getTags().then(setTags)
  }, [])

  const filteredCommissions =
    selectedTag === 0
      ? commissions
      : commissions.filter((commission) => {
          if (!commission.commissionTags) return false

          for (const commissionTag of commission.commissionTags) {
            if (commissionTag.tagId === selectedTag) {
              return true
            }
          }

          return false
        })

  return (
    <div className="portfolio">

      <div className="portfolio-header">
        <div className="portfolio-avatar">{artist.fullName?.charAt(0)}</div>

        <div className="portfolio-info">
          <h1 className="portfolio-name">{artist.fullName}</h1>
          <p className="portfolio-bio">{artist.bio}</p>

          {artist.profileLink && (
            <a href={artist.profileLink}
              target="_blank"
              rel="noreferrer"
              className="portfolio-link"
            >
              {artist.profileLink}
            </a>
          )}
        </div>

        {isOwnProfile && (
          <button
            className="btn-secondary"
            onClick={() => navigate("/dashboard/profile/edit")}
          >
            Edit Profile
          </button>
        )}
      </div>

      <select onChange={(e) => setSelectedTag(parseInt(e.target.value))}>
        <option value={0}>All</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      <div className="gallery">
        {filteredCommissions.length > 0 ? (
          filteredCommissions.map((commissionObj) => {
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
          <p className="no-commissions">No commissions found</p>
        )}
      </div>
    </div>
  )
}
/* 
slots

<p className="gallery-price">${commissionObj.price}</p>
                  <p className="gallery-slots">
                    {isClosed ? "CLOSED" : `${commissionObj.slots} slots open`}
                  </p>

*/
