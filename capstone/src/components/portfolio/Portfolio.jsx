import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArtistByUsername } from "../../services/artistService"
import { getCommissionsByArtist } from "../../services/commissionService"
import { getTags } from "../../services/tagService"
import "./Portfolio.css"

export const Portfolio = () => {
  const [artist, setArtist] = useState({})
  const [commissions, setCommissions] = useState([])
  const [selectedTag, setSelectedTag] = useState(0)
  const [tags, setTags] = useState([])

  const { username } = useParams()

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

  useEffect(() => {
    console.log("COMMISSIONS:", commissions)
  }, [commissions])


  const filteredCommissions =
    selectedTag === 0
      ? commissions
      : commissions.filter((c) =>
          c.commissionTags?.some((ct) => ct.tagId === selectedTag),
        )

  return (
    <>
      <div className="portfolio">
        <div className="portfolio-header">
          <div className="portfolio-avatar">{artist.fullName?.charAt(0)}</div>

          <div className="portfolio-info">
            <h1 className="portfolio-name">{artist.fullName}</h1>
            <p className="portfolio-bio">{artist.bio}</p>

            {artist.profileLink ? (
              <a
                href={artist.profileLink}
                target="_blank"
                rel="noreferrer"
                className="portfolio-link"
              >
                {artist.profileLink}
              </a>
            ) : (
              ""
            )}
          </div>
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
          {filteredCommissions.map((commissionObj) => {
            return (
              <div key={commissionObj.id} className="gallery-card">
                <img
                  src={commissionObj.imageUrl}
                  alt={commissionObj.title}
                  className="gallery-img"
                />
                <div className="gallery-info">
                  <p className="gallery-title">{commissionObj.title}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
/* 
slots

<p className="gallery-price">${commissionObj.price}</p>
                  <p className="gallery-slots">
                    {isClosed ? "CLOSED" : `${commissionObj.slots} slots open`}
                  </p>

*/
