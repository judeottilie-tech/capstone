import { useState, useEffect } from "react"
import { createCommission } from "../../services/commissionService"
import { createCommissionTag } from "../../services/commissionTagService"
import { getTags } from "../../services/tagService"
import { useNavigate } from "react-router-dom"

export const AddCommission = ({ currentArtist }) => {
  const navigate = useNavigate()

  const [commission, setCommission] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
    pricingOptions: {
      extraCharacterPercent: 25,
      backgroundPercent: 50,
    },
  })

  const [imageInputValue, setImageInputValue] = useState("")
  const [tags, setTags] = useState([])
  const [selectedTagIds, setSelectedTagIds] = useState([])

  useEffect(() => {
    getTags().then(setTags)
  }, [])

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

    const newCommission = {
      title: commission.title,
      description: commission.description,
      price: parseFloat(commission.price),
      images: commission.images,
      artistId: currentArtist.id,
      isActive: true,
      slots: 3,
      pricingOptions: commission.pricingOptions,
    }

    createCommission(newCommission).then((createdCommission) => {
      const uniqueTagIds = [...new Set(selectedTagIds)]

      const tagPromises = uniqueTagIds.map((tagId) => {
        return createCommissionTag({
          commissionId: createdCommission.id,
          tagId: tagId,
        })
      })

      Promise.all(tagPromises).then(() => {
        navigate("/dashboard")
      })
    })
  }

  return (
    <div className="min-h-screen bg-neutral-soft p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-dark">
            add new commission
          </h2>

          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-blue-mid hover:text-blue-dark transition"
          >
            ← back to dashboard
          </button>
        </div>

        <div className="bg-white border border-neutral-border rounded-2xl p-6">
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <label className="text-xs text-pink-mid block">
              commission title
            </label>
            <input
              type="text"
              value={commission.title}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  title: event.target.value,
                })
              }
              placeholder="add commission title"
              className="w-full border border-neutral-border rounded-pill px-4 py-2"
            />
            <label className="text-xs text-pink-mid block">price $</label>
            <input
              type="number"
              value={commission.price}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  price: event.target.value,
                })
              }
              placeholder="base price"
              className="w-full border border-neutral-border rounded-pill px-4 py-2"
            />
            <label className="text-xs text-pink-mid block">description</label>
            <textarea
              value={commission.description}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  description: event.target.value,
                })
              }
              placeholder="add description here"
              className="w-full border border-neutral-border rounded-xl px-4 py-2"
            />
            <label className="text-xs text-pink-mid block">image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageInputValue}
                onChange={(event) => setImageInputValue(event.target.value)}
                placeholder="https://..."
                className="w-full border border-neutral-border rounded-pill px-4 py-2"
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
                className="bg-pink-main text-white px-3 rounded-pill"
              >
                add
              </button>
            </div>

            {commission.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto">
                {commission.images.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl}
                      alt="preview"
                      className="h-24 w-24 object-cover rounded-lg"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const updatedImages = commission.images.filter(
                          (_, imageIndex) => imageIndex !== index,
                        )

                        setCommission({
                          ...commission,
                          images: updatedImages,
                        })
                      }}
                      className="absolute top-0 right-0 bg-black/60 text-white text-m px-1 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="text-xs text-pink-mid block">
              additional character price percentage %
            </label>
            <input
              type="number"
              value={commission.pricingOptions.extraCharacterPercent}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  pricingOptions: {
                    ...commission.pricingOptions,
                    extraCharacterPercent: parseFloat(event.target.value),
                  },
                })
              }
              placeholder="extra character percent"
              className="w-full border border-neutral-border rounded-pill px-4 py-2"
            />
            <label className="text-xs text-pink-mid block">
              add background price percentage %
            </label>
            <input
              type="number"
              value={commission.pricingOptions.backgroundPercent}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  pricingOptions: {
                    ...commission.pricingOptions,
                    backgroundPercent: parseFloat(event.target.value),
                  },
                })
              }
              placeholder="background percent"
              className="w-full border border-neutral-border rounded-pill px-4 py-2"
            />
            <label className="text-xs text-pink-mid block">
              tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isSelected = selectedTagIds.includes(tag.id)

                return (
                  <label key={tag.id} className="relative group cursor-pointer">
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
                      className={`px-3 py-1 rounded-pill border transition ${
                        isSelected
                          ? "bg-pink-main text-white border-pink-main"
                          : "bg-white text-pink-mid border-neutral-border hover:bg-pink-light"
                      }`}
                    >
                      {tag.name}
                    </span>

                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                      {tag.name}
                    </span>
                  </label>
                )
              })}
            </div>

            <button
              type="submit"
              className="bg-pink-main text-white rounded-pill px-4 py-2 hover:bg-pink-mid transition"
            >
              create commission
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
