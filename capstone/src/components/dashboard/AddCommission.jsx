//also similar to newpost, needs tags though

//list of artist commission types w edit/delete/toggle, list of incoming proposals, base on MyPosts and delete on deletePost

import { useState } from "react"
import { createCommission } from "../../services/commissionService"
import { createTag, getTagByName } from "../../services/tagService"
import { createCommissionTag } from "../../services/commissionTagService"
import { useNavigate } from "react-router-dom"

export const AddCommission = ({ currentArtist }) => {
  const [commission, setCommission] = useState({
    title: "",
    price: 0,
    imageUrl: "",
  })


  const navigate = useNavigate()

  const handleSave = (event) => {
    event.preventDefault()

    if (
      commission.title &&
      commission.price &&
      commission.imageUrl 
    ) {
      const newCommission = {
        title: commission.title,
        price: parseFloat(commission.price),
        imageUrl: commission.imageUrl,
        artistId: currentArtist.id,
      }
      return handleSave()
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