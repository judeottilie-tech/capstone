/*
this is a click thru for the commission images to show each commissions details. will eventually need more images, which means ill need to make the imageUrl an array, and add this:
commission.images.map((imageUrl) => {
  return <img src={imageUrl} />
})
  to make the page a gallery.

  or a horizontal scroll gallery:

  <div style={{ display: "flex", overflowX: "scroll" }}>
  {commission.images.map((imageUrl) => {
    return <img src={imageUrl} style={{ width: "300px" }} />
  })}
</div>

will need to add to portfolio.jsx:

<div
  key={commissionObj.id}
  className="gallery-card"
  onClick={() => navigate(`/commission/${commissionObj.id}`)}
>










import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCommissionById } from "../../services/commissionService"

export const CommissionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [commission, setCommission] = useState(null)

  useEffect(() => {
    getCommissionById(id).then((commissionData) => {
      setCommission(commissionData)
    })
  }, [id])

  if (!commission) {
    return <p>Loading...</p>
  }

  return (
    <div className="commission-detail">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{commission.title}</h2>

      <img
        src={commission.imageUrl}
        alt={commission.title}
        className="detail-image"
      />

      <p>
        <strong>Price:</strong> ${commission.price}
      </p>

      {commission.commissionTags && commission.commissionTags.length > 0 && (
        <div className="tag-list">
          <strong>Tags:</strong>
          <ul>
            {commission.commissionTags.map((commissionTag) => {
              return (
                <li key={commissionTag.id}>Tag ID: {commissionTag.tagId}</li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
*/