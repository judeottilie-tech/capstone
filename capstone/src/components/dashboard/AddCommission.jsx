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
            <div>
              <label className="text-xs text-pink-mid mb-1 block">
                commission title
              </label>
              <input
                type="text"
                value={commission.title}
                onChange={(e) =>
                  setCommission({ ...commission, title: e.target.value })
                }
                placeholder="add commission title"
                className="w-full border border-neutral-border rounded-pill px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-pink-main"
              />
            </div>

            <div>
              <label className="text-xs text-pink-mid mb-1 block">
                price $
              </label>
              <input
                type="number"
                value={commission.price}
                onChange={(e) =>
                  setCommission({ ...commission, price: e.target.value })
                }
                placeholder="base price"
                className="w-full border border-neutral-border rounded-pill px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-pink-main"
              />
            </div>

            <div>
              <label className="text-xs text-pink-mid mb-1 block">
                description
              </label>
              <textarea
                value={commission.description}
                onChange={(e) =>
                  setCommission({ ...commission, description: e.target.value })
                }
                placeholder="describe this commission type..."
                rows={3}
                className="w-full border border-neutral-border rounded-xl px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-pink-main resize-none"
              />
            </div>

            <div>
              <label className="text-xs text-pink-mid mb-1 block">
                image urls
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageInputValue}
                  onChange={(e) => setImageInputValue(e.target.value)}
                  placeholder="https://..."
                  className="w-full border border-neutral-border rounded-pill px-4 py-2 text-sm outline-none text-blue-dark placeholder:text-blue-mid focus:border-pink-main"
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
                  className="bg-pink-main text-white px-4 rounded-pill text-sm hover:bg-pink-dark transition flex-shrink-0"
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
                              (_, i) => i !== index,
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

            <div className="bg-neutral-soft border border-neutral-border rounded-xl p-4 flex flex-col gap-3">
              <p className="text-xs text-pink-mid font-semibold">
                pricing add-ons
              </p>
              <div>
                <label className="text-xs text-blue-mid mb-1 block">
                  extra character %
                </label>
                <input
                  type="number"
                  value={commission.pricingOptions.extraCharacterPercent}
                  onChange={(e) =>
                    setCommission({
                      ...commission,
                      pricingOptions: {
                        ...commission.pricingOptions,
                        extraCharacterPercent: parseFloat(e.target.value),
                      },
                    })
                  }
                  className="w-full border border-neutral-border rounded-pill px-4 py-2 text-sm outline-none text-blue-dark focus:border-pink-main"
                />
              </div>
              <div>
                <label className="text-xs text-blue-mid mb-1 block">
                  background %
                </label>
                <input
                  type="number"
                  value={commission.pricingOptions.backgroundPercent}
                  onChange={(e) =>
                    setCommission({
                      ...commission,
                      pricingOptions: {
                        ...commission.pricingOptions,
                        backgroundPercent: parseFloat(e.target.value),
                      },
                    })
                  }
                  className="w-full border border-neutral-border rounded-pill px-4 py-2 text-sm outline-none text-blue-dark focus:border-pink-main"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-pink-mid mb-1 block">tags</label>
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
                            setSelectedTagIds((prev) =>
                              prev.filter((id) => id !== tag.id),
                            )
                          } else {
                            setSelectedTagIds((prev) => [...prev, tag.id])
                          }
                        }}
                        className="hidden"
                      />
                      <span
                        className={`px-3 py-1 rounded-pill text-sm border transition ${
                          isSelected
                            ? "bg-pink-main text-white border-pink-main"
                            : "bg-white text-pink-mid border-neutral-border hover:bg-pink-light"
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
              className="bg-pink-main text-white rounded-pill px-4 py-2 text-sm hover:bg-pink-dark transition mt-2"
            >
              create commission
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
