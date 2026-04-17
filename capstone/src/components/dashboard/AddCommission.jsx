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
    imageUrl: "",
  })

  const [tags, setTags] = useState([])
  const [selectedTagIds, setSelectedTagIds] = useState([])

  useEffect(() => {
    getTags().then(setTags)
  }, [])

  const handleSave = (event) => {
    event.preventDefault()

    if (!commission.title || !commission.price || !commission.imageUrl) {
      window.alert("Please fill out all fields")
      return
    }

    const newCommission = {
      title: commission.title,
      price: parseFloat(commission.price),
      imageUrl: commission.imageUrl,
      artistId: currentArtist.id,
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
    <div className="min-h-screen bg-neutral-soft p-6 flex justify-center">
      <div className="w-full max-w-md bg-white border border-neutral-border rounded-3xl p-6">
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-pink-dark">add new commission</h2>

          <div>
            <label className="text-sm font-semibold text-pink-mid">title</label>
            <input
              type="text"
              value={commission.title}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  title: event.target.value,
                })
              }
              className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-1 outline-none placeholder:text-pink-mid text-pink-dark focus:border-pink-main"
            />
          </div>

    
          <div>
            <label className="text-sm font-semibold text-pink-mid">
              price ($)
            </label>
            <input
              type="number"
              value={commission.price}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  price: event.target.value,
                })
              }
              className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-1 outline-none placeholder:text-pink-mid text-pink-dark focus:border-pink-main"
            />
          </div>

  
          <div>
            <label className="text-sm font-semibold text-pink-mid">
              image URL
            </label>
            <input
              type="text"
              value={commission.imageUrl}
              onChange={(event) =>
                setCommission({
                  ...commission,
                  imageUrl: event.target.value,
                })
              }
              className="w-full border border-neutral-border rounded-pill px-4 py-2 mt-1 outline-none placeholder:text-pink-mid text-pink-dark focus:border-pink-main"
            />

            {commission.imageUrl && (
              <img
                src={commission.imageUrl}
                alt="Preview"
                className="mt-2 rounded-xl max-h-48 object-cover"
              />
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-pink-mid">tags</label>

            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => {
                return (
                  <label
                    key={tag.id}
                    className={`px-3 py-1 rounded-pill text-sm cursor-pointer border transition ${
                      selectedTagIds.includes(tag.id)
                        ? "bg-pink-main text-white border-pink-main"
                        : "bg-white text-pink-mid border-neutral-border hover:bg-pink-light"
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

          <button
            type="submit"
            className="bg-pink-main text-white rounded-pill px-4 py-2 hover:bg-pink-mid transition mt-2"
          >
            create commission
          </button>
        </form>
      </div>
    </div>
  )
}
/* 
for description 
<fieldset>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            placeholder="Describe what this commission includes..."
            onChange={(event) => {
              setCommission({ ...commission, description: event.target.value })
            }}
          />
        </div>
      </fieldset>
*/
