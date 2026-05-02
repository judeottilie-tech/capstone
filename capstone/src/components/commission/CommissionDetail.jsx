import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCommissionById } from "../../services/commissionService"
import { ProposalForm } from "./ProposalForm"
import { getTags } from "../../services/tagService"

export const CommissionDetail = ({ currentArtist }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lightboxImage, setLightboxImage] = useState(null)
  const [commission, setCommission] = useState(null)
  const [tags, setTags] = useState([])

  useEffect(() => {
    Promise.all([getCommissionById(id), getTags()]).then(([data, tagsData]) => {
      setTags(tagsData)
      // normalize data so it never breaks
      const normalized = {
        ...data,
        images:
          data.images && data.images.length > 0
            ? data.images
            : data.imageUrl
              ? [data.imageUrl]
              : [],
      }

      setCommission(normalized)
    })
  }, [id])

  if (!commission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-mid animate-pulse">loading...</p>
      </div>
    )
  }

  const slotsRemaining = commission.slots - (commission.proposals?.length || 0)

  return (
    <div className="min-h-screen bg-neutral-soft p-6">
      <div className="max-w-3xl mx-auto">
        {/* back button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-mid hover:text-blue-dark flex items-center gap-1 transition"
          >
            ← back
          </button>

          {currentArtist?.id === commission.artistId && (
            <button
              onClick={() =>
                navigate(`/dashboard/commission/${commission.id}/edit`)
              }
              className="text-xs flex grid grid-cols-1 md:grid-cols-1 bg-blue-light text-blue-dark px-3 py-1 rounded-pill hover:bg-blue-mid transition"
            >
              edit this commission
            </button>
          )}
        </div>

        <div className="bg-white border border-neutral-border rounded-2xl overflow-hidden">
          {commission.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 bg-pink-light">
              {commission.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="commission example"
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                  onClick={() => setLightboxImage(img)}
                />
              ))}
            </div>
          )}

          {/* content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-blue-dark">
                {commission.title}
              </h1>

              <span className="text-pink-main font-semibold text-lg">
                ${commission.price}
              </span>
            </div>

            {/* description */}
            {commission.description && (
              <p className="text-sm text-blue-dark mb-6 whitespace-pre-line">
                {commission.description}
              </p>
            )}

            {/* proposal section */}
            <div className="border-t border-neutral-border pt-6">
              {currentArtist?.id === commission.artistId ? (
                <p className="text-sm text-blue-mid text-center">
                  this is your commission listing
                </p>
              ) : !commission.isActive ? (
                <p className="text-sm text-pink-dark text-center">
                  this commission is currently closed
                </p>
              ) : slotsRemaining <= 0 ? (
                <p className="text-sm text-pink-dark text-center">
                  no slots available
                </p>
              ) : (
                <ProposalForm commission={commission} />
              )}
            </div>
          </div>
        </div>
      </div>
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="full size"
            className="max-w-full max-h-full rounded-xl object-contain"
          />
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white text-2xl bg-black/40 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60 transition"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
