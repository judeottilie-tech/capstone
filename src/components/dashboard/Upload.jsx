//also similar to newpost, needs tags though

//list of artist commission types w edit/delete/toggle, list of incoming proposals, base on MyPosts and delete on deletePost

import { useState } from "react"
import { createCommission } from "../../services/commissionService"
import { createTag, getTagByName } from "../../services/tagService"
import { createCommissionTag } from "../../services/commissionTagService"
import { useNavigate } from "react-router-dom"

export const Upload = ({ currentArtist }) => {
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

  const navigate = useNavigate()

  const handleSave = (event) => {
    event.preventDefault()

    if (
      commission.title &&
      commission.description &&
      commission.price &&
      commission.imageUrl &&
      commission.slots
    ) {
      const newCommission = {
        title: commission.title,
        description: commission.description,
        price: parseFloat(commission.price),
        imageUrl: commission.imageUrl,
        slots: parseInt(commission.slots),
        isActive: true,
        isClosed: false,
        artistId: currentArtist.id,
      }

      createCommission(newCommission).then((createdCommission) => {
        // splits the tags by commas
        const tagArray = tagsInput
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "")

        // Promise.all waits ALL tag operations to finish. use map to create array of promises for all tags
        Promise.all(
          tagArray.map((tagName) => {
            // checks if tag exists
            return getTagByName(tagName)
              .then((existingTags) => {
                if (existingTags.length > 0) {
                  // use existing tag
                  return existingTags[0]
                } else {
                  // tag DOESNT exist, make new tag
                  return createTag({ name: tagName })
                }
              })
              .then((tag) => {
                // now create the commissionTag linking this tag to the commission
                return createCommissionTag({
                  commissionTypeId: createdCommission.id,
                  tagId: tag.id,
                })
              })
          }),
        ).then(() => {
          //go back to dash
          navigate("/dashboard")
        })
      })
    } else {
      window.alert("Please fill out all fields!")
    }
  }

  return (
    <form>
      <h2>Upload Commission</h2>
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
        <div className="form-group">
          <label>Available slots</label>
          <input
            type="number"
            className="form-control"
            placeholder="How many commissions will you accept?"
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
            placeholder="e.g. digital, character design, anime"
            onChange={(event) => {
              setTagsInput(event.target.value)
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-info" onClick={handleSave}>
            Upload Commission
          </button>
        </div>
      </fieldset>
    </form>
  )
}
