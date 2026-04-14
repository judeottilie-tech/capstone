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
          existingLinks
            .filter((commissionTag) => commissionTag.id)
            .map((commissionTag) => deleteCommissionTag(commissionTag.id)),
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
    <form>
      <h2>Edit Commission</h2>

      <fieldset>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={commission.title || ""}
            onChange={(event) => {
              setCommission({
                ...commission,
                title: event.target.value,
              })
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
            value={commission.price || ""}
            onChange={(event) => {
              setCommission({
                ...commission,
                price: event.target.value,
              })
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
            value={commission.imageUrl || ""}
            onChange={(event) => {
              setCommission({
                ...commission,
                imageUrl: event.target.value,
              })
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Commission Types</label>

          {tags.map((tag) => {
            return (
              <div key={tag.id}>
                <input
                  type="checkbox"
                  value={tag.id}
                  checked={selectedTagIds.includes(tag.id)}
                  onChange={(event) => {
                    const tagId = parseInt(event.target.value)

                    if (event.target.checked) {
                      setSelectedTagIds((prev) => [...prev, tagId])
                    } else {
                      setSelectedTagIds((prev) =>
                        prev.filter((id) => id !== tagId),
                      )
                    }
                  }}
                />
                <label>{tag.name}</label>
              </div>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-info" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </fieldset>
    </form>
  )
}
