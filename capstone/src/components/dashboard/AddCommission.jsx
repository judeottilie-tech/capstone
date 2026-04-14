//also similar to newpost, needs tags though

//list of artist commission types w edit/delete/toggle, list of incoming proposals, base on MyPosts and delete on deletePost

import { useState, useEffect } from "react"
import { createCommission } from "../../services/commissionService"
import { createCommissionTag } from "../../services/commissionTagService"
import { getTags } from "../../services/tagService"
import { useNavigate } from "react-router-dom"

export const AddCommission = ({ currentArtist }) => {
  const navigate = useNavigate()
  const [commission, setCommission] = useState({
    title: "",
    price: 0,
    imageUrl: "",
  })
  const [tags, setTags] = useState([])
  const [selectedTagIds, setSelectedTagIds] = useState([])

  useEffect(() => {
    getTags().then(setTags)
  }, [])

  const handleSave = (event) => {
    event.preventDefault()

    if (commission.title && commission.price && commission.imageUrl) {
      const newCommission = {
        title: commission.title,
        price: parseFloat(commission.price),
        imageUrl: commission.imageUrl,
        artistId: currentArtist.id,
      }

      createCommission(newCommission).then((createdCommission) => {
        const tagPromises = selectedTagIds.map((tagId) => {
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
  }

  return (
    <form>
      <h2>Add New Commission Type</h2>
      <fieldset>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Commission title"
            onChange={(event) => {
              setCommission({ ...commission, title: event.target.value })
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            className="form-control"
            placeholder="0.00"
            onChange={(event) => {
              setCommission({ ...commission, price: event.target.value })
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="Paste image URL here"
            onChange={(event) => {
              setCommission({ ...commission, imageUrl: event.target.value })
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        {tags.map((tag) => {
          return (
            <div key={tag.id}>
              <input
                type="checkbox"
                value={tag.id}
                onChange={(event) => {
                  const tagId = parseInt(event.target.value)

                  if (event.target.checked) {
                    setSelectedTagIds([...selectedTagIds, tagId])
                  } else {
                    setSelectedTagIds(
                      selectedTagIds.filter((id) => id !== tagId),
                    )
                  }
                }}
              />
              <label>{tag.name}</label>
            </div>
          )
        })}
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-info" onClick={handleSave}>
            Submit
          </button>
        </div>
      </fieldset>
    </form>
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
