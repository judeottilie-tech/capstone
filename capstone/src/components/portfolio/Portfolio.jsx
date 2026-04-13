import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getArtistByUsername } from "../../services/artistService"
import { getCommissionsByArtist } from "../../services/commissionService"

export const Portfolio = () => {
  const [artist, setArtist] = useState({})
  const [commissions, setCommissions] = useState([])
  const { username } = useParams()

  useEffect(() => {
    getArtistByUsername(username).then((artistData) => {
      setArtist(artistData)
      getCommissionsByArtist(artistData.id).then((commissionArray) => {
        setCommissions(commissionArray)
      })
    })
  }, [username])

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


        <div className="gallery">

            return (
              <div
                key={commissionObj.id}
                className={`gallery-card`}
              >
                <img
                  src={commissionObj.imageUrl}
                  alt={commissionObj.title}
                  className="gallery-img"
                />
                <div className="gallery-info">
                  <Link
                    to={`/portfolio/${username}/commission/${commissionObj.id}`}
                    className="gallery-title"
                  >
                    {commissionObj.title}
                  </Link>
                </div>
              </div>
            )
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