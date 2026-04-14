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

  const isOwnProfile = currentArtist && artist && artist.id === currentArtist.id

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
          <div className="min-h-screen bg-neutral-soft p-6">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white border border-neutral-border rounded-2xl p-6 flex gap-6 items-center mb-6">
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

                <div className="flex-1">
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

                {isOwnProfile && (
                  <button
                    onClick={() => navigate("/dashboard/profile/edit")}
                    className="bg-blue-main text-white px-4 py-2 rounded-pill hover:bg-blue-dark transition"
                  >
                    edit profile
                  </button>
                )}
              </div>

              <div className="mb-4">
                <select
                  onChange={(event) =>
                    setSelectedTag(parseInt(event.target.value))
                  }
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

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredCommissions.length > 0 ? (
                  filteredCommissions.map((commissionObj) => {
                    return (
                      <div
                        key={commissionObj.id}
                        className="bg-white border border-neutral-border rounded-xl p-3 hover:shadow-sm transition"
                      >
                        <img
                          src={commissionObj.imageUrl}
                          alt={commissionObj.title}
                          className="w-full h-48 object-cover rounded-md mb-2"
                        />

                        <p className="text-sm text-blue-dark font-medium">
                          {commissionObj.title}
                        </p>

                        <p className="text-xs text-blue-mid mb-2">
                          ${commissionObj.price}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {commissionObj.commissionTags?.map(
                            (commissionTag) => {
                              const matchingTag = tags.find((tag) => {
                                return tag.id === commissionTag.tagId
                              })

                              if (!matchingTag) return null

                              return (
                                <span
                                  key={commissionTag.id}
                                  className="text-xs bg-pink-light text-pink-dark px-2 py-0.5 rounded-pill"
                                >
                                  {matchingTag.name}
                                </span>
                              )
                            },
                          )}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-blue-mid text-sm">No commissions found</p>
                )}
              </div>
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


                  add line 118 later
                  className="bg-white border border-neutral-border rounded-xl p-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
*/
