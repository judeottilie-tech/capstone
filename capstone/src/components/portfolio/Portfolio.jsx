import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArtistByUsername } from "../../services/artistService"
import { getCommissionsByArtist } from "../../services/commissionService"
import { getTags } from "../../services/tagService"
import "./Portfolio.css"


const CommissionCard = ({ commissionObj, tags, navigate }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      className="bg-white border border-neutral-border rounded-xl p-3 hover:shadow-sm transition cursor-pointer"
      onClick={() => navigate(`/commission/${commissionObj.id}`)}
    >
      <div className="relative w-full h-48 rounded-md mb-2 overflow-hidden bg-pink-light">
        {!imageLoaded && commissionObj.images?.[0] && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-pink-mid animate-pulse">
              loading...
            </span>
          </div>
        )}

        {commissionObj.images?.[0] ? (
          <img
            src={commissionObj.images[0]}
            alt={commissionObj.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-pink-mid">
            no image
          </div>
        )}
      </div>

      <p className="text-sm text-blue-dark font-medium">
        {commissionObj.title}
      </p>

      <p className="text-xs text-blue-mid mb-2">${commissionObj.price}</p>

      <div className="flex flex-wrap gap-1">
        {commissionObj.commissionTags
          ?.filter(
            (commissionTag, index, self) =>
              index === self.findIndex((t) => t.tagId === commissionTag.tagId),
          )
          .map((commissionTag) => {
            const matchingTag = tags.find(
              (tag) => tag.id === commissionTag.tagId,
            )
            if (!matchingTag) return null
            return (
              <span
                key={`${commissionTag.id}-${commissionTag.tagId}`}
                className="text-xs bg-pink-light text-pink-dark px-2 py-0.5 rounded-pill"
              >
                {matchingTag.name}
              </span>
            )
          })}
      </div>
    </div>
  )
}

export const Portfolio = ({ currentArtist }) => {
  const [artist, setArtist] = useState({})
  const [commissions, setCommissions] = useState([])
  const [selectedTag, setSelectedTag] = useState(0)
  const [tags, setTags] = useState([])

  const { username } = useParams()
  const navigate = useNavigate()

  const isOwnProfile = currentArtist && artist && artist.id === currentArtist.id

  useEffect(() => {
    getArtistByUsername(username).then((artistArray) => {
      if (artistArray.length > 0) {
        const artistObj = artistArray[0]
        setArtist(artistObj)

        getCommissionsByArtist(artistObj.id).then((data) => {
          setCommissions(data.sort((a, b) => a.order - b.order))
        })
      }
    })
  }, [username])

  useEffect(() => {
    getTags().then(setTags)
  }, [])

  const activeCommissions = commissions.filter(
    (commission) => commission.isActive,
  )

  const filteredCommissions =
    selectedTag === 0
      ? activeCommissions
      : activeCommissions.filter((commission) => {
          return commission.commissionTags?.some(
            (commissionTag) => commissionTag.tagId === selectedTag,
          )
        })

  return (
    <div className="min-h-screen bg-neutral-soft p-6">
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
        <div className="bg-white border border-neutral-border rounded-2xl p-6 mb-6">

          <div className="flex items-start justify-between mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-neutral-border">
              {artist.profileImageUrl ? (
                <img
                  src={artist.profileImageUrl}
                  alt="profile"
                  className="w-full h-full object-contain"
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
          <option value={0}>all</option>
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
          <p className="text-blue-mid text-sm">
            no commissions of this type found
          </p>
        )}
      </div>
    </div>
  )
}
