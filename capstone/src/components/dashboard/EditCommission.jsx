import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  getCommissionById,
  updateCommission,
} from "../../services/commissionService"
import {
  getCommissionTagsByCommission,
  createCommissionTag,
  deleteCommissionTag,
} from "../../services/commissionTagService"
import { getTags } from "../../services/tagService"

export const EditCommission = ({ currentArtist }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [commission, setCommission] = useState(null)
  const [tags, setTags] = useState([])
  const [selectedTagIds, setSelectedTagIds] = useState([])
  const [existingCommissionTags, setExistingCommissionTags] = useState([])
  const [imageInputValue, setImageInputValue] = useState("")

  useEffect(() => {
    Promise.all([
      getCommissionById(id),
      getTags(),
      getCommissionTagsByCommission(id),
    ]).then(([commissionData, tagsData, commissionTagsData]) => {
      const normalizedCommission = {
        id: commissionData.id,
        title: commissionData.title || "",
        price: commissionData.price ?? "",
        description: commissionData.description || "",
        images: Array.isArray(commissionData.images)
          ? commissionData.images
          : commissionData.imageUrl
            ? [commissionData.imageUrl]
            : [],
        artistId: commissionData.artistId,
        isActive: commissionData.isActive,
        slots: commissionData.slots,
        order: commissionData.order,
      }

      setCommission(normalizedCommission)
      setTags(tagsData)
      setExistingCommissionTags(commissionTagsData)
      setSelectedTagIds(
        commissionTagsData.map((commissionTag) => commissionTag.tagId),
      )
    })
  }, [id])

  if (!commission) {
    return <p className="p-6">loading...</p>
  }

  const handleSave = (event) => {
    event.preventDefault()

    if (
      !commission.title ||
      commission.price === "" ||
      commission.images.length === 0
    ) {
      window.alert("please fill out title, price, and at least one image")
      return
    }

    const updatedCommission = {
      ...commission,
      price: parseFloat(commission.price),
    }

    updateCommission(updatedCommission).then(() => {
      const deletePromises = existingCommissionTags.map((commissionTag) =>
        deleteCommissionTag(commissionTag.id),
      )

      Promise.all(deletePromises).then(() => {
        const uniqueTagIds = [...new Set(selectedTagIds)]

        const createPromises = uniqueTagIds.map((tagId) =>
          createCommissionTag({
            commissionId: commission.id,
            tagId: tagId,
          }),
        )

        Promise.all(createPromises).then(() => {
          navigate("/dashboard")
        })
      })
    })
  }

  return (
    <div className="min-h-screen bg-neutral-soft p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-blue-mid hover:text-blue-dark mb-6 flex items-center gap-1 transition"
        >
          ← back to dashboard
        </button>

        <div className="bg-white border border-neutral-border rounded-2xl p-6">
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-blue-mid mb-1 block">title</label>
              <input
                type="text"
                value={commission.title}
                onChange={(event) =>
                  setCommission({ ...commission, title: event.target.value })
                }
                className="w-full border border-neutral-border rounded-pill px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-blue-main"
              />
            </div>

            <div>
              <label className="text-xs text-blue-mid mb-1 block">price</label>
              <input
                type="number"
                value={commission.price}
                onChange={(event) =>
                  setCommission({ ...commission, price: event.target.value })
                }
                className="w-full border border-neutral-border rounded-pill px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-blue-main"
              />
            </div>

            <div>
              <label className="text-xs text-blue-mid mb-1 block">
                description
              </label>
              <textarea
                value={commission.description}
                onChange={(event) =>
                  setCommission({
                    ...commission,
                    description: event.target.value,
                  })
                }
                rows={3}
                className="w-full border border-neutral-border rounded-xl px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-blue-main resize-none"
              />
            </div>

            <div>
              <label className="text-xs text-blue-mid mb-1 block">
                image urls
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageInputValue}
                  onChange={(event) => setImageInputValue(event.target.value)}
                  className="w-full border border-neutral-border rounded-pill px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-blue-main"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!imageInputValue) return
                    setCommission({
                      ...commission,
                      images: [...commission.images, imageInputValue],
                    })
                    setImageInputValue("")
                  }}
                  className="bg-blue-main text-white px-4 rounded-pill text-sm hover:bg-blue-dark transition flex-shrink-0"
                >
                  add
                </button>
              </div>

              {commission.images.length > 0 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {commission.images.map((imageUrl, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <img
                        src={imageUrl}
                        alt="preview"
                        className="h-24 w-24 object-cover rounded-lg border border-neutral-border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCommission({
                            ...commission,
                            images: commission.images.filter(
                              (_, imageIndex) => imageIndex !== index,
                            ),
                          })
                        }}
                        className="absolute top-1 right-1 bg-black/60 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs text-blue-mid mb-1 block">tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const isSelected = selectedTagIds.includes(tag.id)
                  return (
                    <label key={tag.id} className="cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          if (isSelected) {
                            setSelectedTagIds((previousTagIds) =>
                              previousTagIds.filter(
                                (existingTagId) => existingTagId !== tag.id,
                              ),
                            )
                          } else {
                            setSelectedTagIds((previousTagIds) => [
                              ...previousTagIds,
                              tag.id,
                            ])
                          }
                        }}
                        className="hidden"
                      />
                      <span
                        className={`px-3 py-1 rounded-pill text-sm border transition ${
                          isSelected
                            ? "bg-blue-main text-white border-blue-main"
                            : "bg-white text-blue-mid border-neutral-border hover:bg-blue-light"
                        }`}
                      >
                        {tag.name}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-main text-white rounded-pill px-4 py-2 text-sm hover:bg-blue-dark transition mt-2"
            >
              save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
