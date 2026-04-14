import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  getCommissionById,
  updateCommission,
} from "../../services/commissionService"
import { getTags } from "../../services/tagService"
import {
  createCommissionTag,
  deleteCommissionTag,
  getCommissionTags,
} from "../../services/commissionTagService"

export const EditCommission = ({ currentArtist }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [tags, setTags] = useState([])
  const [selectedTagIds, setSelectedTagIds] = useState([])

  const [commission, setCommission] = useState({
    title: "",
    price: 0,
    imageUrl: "",
  })

  useEffect(() => {
    getTags().then(setTags)

    getCommissionById(id).then((commissionData) => {
      setCommission(commissionData)

      if (commissionData.commissionTags) {
        const existingTagIds = commissionData.commissionTags.map(
          (commissionTag) => commissionTag.tagId,
        )
        setSelectedTagIds(existingTagIds)
      }
    })
  }, [id])

  const handleSave = (event) => {
    event.preventDefault()

    const commissionId = parseInt(id)

    const updatedCommission = {
      ...commission,
      price: parseFloat(commission.price),
    }

    updateCommission(updatedCommission).then(() => {
      getCommissionTags().then((allCommissionTags) => {
        const existingLinks = allCommissionTags.filter(
          (commissionTag) => commissionTag.commissionId === commissionId,
        )

        Promise.all(
          existingLinks.map((commissionTag) =>
            deleteCommissionTag(commissionTag.id),
          ),
        ).then(() => {
          const uniqueTagIds = [...new Set(selectedTagIds)]

          const tagPromises = uniqueTagIds.map((tagId) => {
            return createCommissionTag({
              commissionId: commissionId,
              tagId: tagId,
            })
          })

          Promise.all(tagPromises).then(() => {
            navigate("/dashboard")
          })
        })
      })
    })
  }

  return (
    <div className="min-h-screen bg-neutral-soft p-6 flex justify-center">
      <div className="w-full max-w-md bg-white border border-neutral-border rounded-3xl p-6">
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-blue-dark">Edit Commission</h2>

          {/* TITLE */}
          <div>
            <label className="text-sm font-semibold text-blue-mid">Title</label>
            <input
              type="text"
              value={commission.title || ""}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  title: event.target.value,
                })
              }
              className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-1 outline-none placeholder:text-blue-mid text-blue-dark focus:border-pink-main"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-semibold text-blue-mid">
              Price ($)
            </label>
            <input
              type="number"
              value={commission.price || ""}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  price: event.target.value,
                })
              }
              className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-1 outline-none placeholder:text-blue-mid text-blue-dark focus:border-pink-main"
            />
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="text-sm font-semibold text-blue-mid">
              Image URL
            </label>
            <input
              type="text"
              value={commission.imageUrl || ""}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  imageUrl: event.target.value,
                })
              }
              className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-1 outline-none placeholder:text-blue-mid text-blue-dark focus:border-pink-main"
            />
            {commission.imageUrl && (
              <img
                src={commission.imageUrl}
                alt="Preview"
                className="mt-2 rounded-xl max-h-48 object-cover"
              />
            )}
          </div>

          {/* TAGS */}
          <div>
            <label className="text-sm font-semibold text-blue-mid">Tags</label>

            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => {
                return (
                  <label
                    key={tag.id}
                    className={`px-3 py-1 rounded-pill text-sm cursor-pointer border transition ${
                      selectedTagIds.includes(tag.id)
                        ? "bg-blue-main text-white border-blue-main"
                        : "bg-white text-blue-mid border-neutral-border hover:bg-blue-light"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={tag.id}
                      checked={selectedTagIds.includes(tag.id)}
                      onChange={(event) => {
                        const tagId = parseInt(event.target.value)

                        if (event.target.checked) {
                          setSelectedTagIds((previousTagIds) => {
                            if (previousTagIds.includes(tagId))
                              return previousTagIds
                            return [...previousTagIds, tagId]
                          })
                        } else {
                          setSelectedTagIds((previousTagIds) =>
                            previousTagIds.filter(
                              (existingTagId) => existingTagId !== tagId,
                            ),
                          )
                        }
                      }}
                      className="hidden"
                    />

                    {tag.name}
                  </label>
                )
              })}
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-pink-main text-white rounded-pill px-4 py-2 hover:bg-pink-mid transition mt-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
