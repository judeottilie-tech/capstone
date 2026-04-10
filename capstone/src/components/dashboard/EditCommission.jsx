//similar to editpost, prepopulate form w existing values

import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  getCommissionById,
  updateCommission,
} from "../../services/commissionService"
import { createTag, getTagByName } from "../../services/tagService"
import {
  createCommissionTag,
  deleteCommissionTag,
  getCommissionTags,
} from "../../services/commissionTagService"

export const EditCommission = ({ currentArtist }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [commission, setCommission] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    slots: 0,
    isActive: true,
    isClosed: false,
  })
  const [tagsInput, setTagsInput] = useState("")

  useEffect(() => {
    getCommissionById(id).then((commissionData) => {
      setCommission(commissionData)
      // pre-fill the tags input with existing tags
      // join them back into a comma separated string
      if (commissionData.commissionTags) {
        const existingTags = commissionData.commissionTags
          .map((ct) => ct.tag?.name)
          .filter(Boolean)
          .join(", ")
        setTagsInput(existingTags)
      }
    })
  }, [id])

  const handleSave = (event) => {
    event.preventDefault()

    const updatedCommission = {
      ...commission,
      price: parseFloat(commission.price),
      slots: parseInt(commission.slots),
    }

    updateCommission(updatedCommission).then(() => {
      // delete all existing commissionTags for this commission
      // then recreate them from the new tags input
      getCommissionTags().then((allTags) => {
        const existingLinks = allTags.filter(
          (ct) => ct.commissionTypeId === parseInt(id),
        )

        // delete all existing tag links
        Promise.all(existingLinks.map((ct) => deleteCommissionTag(ct.id))).then(
          () => {
            // split new tags input and recreate
            const tagArray = tagsInput
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag !== "")

            Promise.all(
              tagArray.map((tagName) => {
                return getTagByName(tagName)
                  .then((existingTags) => {
                    if (existingTags.length > 0) {
                      return existingTags[0]
                    } else {
                      return createTag({ name: tagName })
                    }
                  })
                  .then((tag) => {
                    return createCommissionTag({
                      commissionTypeId: parseInt(id),
                      tagId: tag.id,
                    })
                  })
              }),
            ).then(() => {
              navigate("/dashboard")
            })
          },
        )
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
            value={commission.title}
            onChange={(event) => {
              setCommission({ ...commission, title: event.target.value })
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={commission.description}
            onChange={(event) => {
              setCommission({ ...commission, description: event.target.value })
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
            value={commission.price}
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
            value={commission.imageUrl}
            onChange={(event) => {
              setCommission({ ...commission, imageUrl: event.target.value })
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Available slots</label>
          <input
            type="number"
            className="form-control"
            value={commission.slots}
            onChange={(event) => {
              setCommission({ ...commission, slots: event.target.value })
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={tagsInput}
            onChange={(event) => {
              setTagsInput(event.target.value)
            }}
          />
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
