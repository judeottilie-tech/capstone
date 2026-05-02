import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  getCommissionsByArtist,
  deleteCommission,
  updateCommission,
} from "../../services/commissionService"
import { Proposals } from "./Proposals"

const DashboardImage = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-neutral-border flex-shrink-0 bg-pink-light">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-pink-mid animate-pulse text-lg">·</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}

export const Dashboard = ({ currentArtist }) => {
  const [commissions, setCommissions] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const fetchCommissions = () => {
    getCommissionsByArtist(currentArtist.id).then((data) => {
      setCommissions(data.sort((a, b) => a.order - b.order))
    })
  }

  useEffect(() => {
    if (location.state?.refresh) {
      fetchCommissions()
    }
  }, [location])

  useEffect(() => {
    if (!currentArtist?.id) return
    fetchCommissions()
  }, [currentArtist])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleDelete = (commissionId) => {
    deleteCommission(commissionId).then(fetchCommissions)
  }

  const handleToggleActive = (commission) => {
    updateCommission({
      ...commission,
      isActive: !commission.isActive,
    }).then(fetchCommissions)
  }

  const handleMoveUp = (index) => {
    if (index === 0) return

    const above = commissions[index - 1]
    const current = commissions[index]

    Promise.all([
      updateCommission({ ...current, order: above.order }),
      updateCommission({ ...above, order: current.order }),
    ]).then(fetchCommissions)
  }

  const handleMoveDown = (index) => {
    if (index === commissions.length - 1) return

    const below = commissions[index + 1]
    const current = commissions[index]

    Promise.all([
      updateCommission({ ...current, order: below.order }),
      updateCommission({ ...below, order: current.order }),
    ]).then(fetchCommissions)
  }

  return (
    <div className="min-h-screen bg-neutral-soft p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-dark">
            my commission types
          </h2>
          <button
            onClick={() => navigate("/dashboard/add")}
            className="bg-pink-main rounded-pill px-4 text-white py-1 hover:bg-pink-mid transition"
          >
            + new
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {commissions.map((commission, index) => (
            <div
              key={commission.id}
              className="bg-white border border-neutral-border rounded-xl p-4 flex justify-between items-center gap-3"
            >

              <div className="flex items-center gap-3 flex-1 min-w-0">

                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="text-blue-mid hover:text-blue-dark disabled:opacity-20 text-xs leading-none"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === commissions.length - 1}
                    className="text-blue-mid hover:text-blue-dark disabled:opacity-20 text-xs leading-none"
                  >
                    ▼
                  </button>
                </div>

                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/commission/${commission.id}`)}
                >
                  {commission.images?.[0] && (
                    <DashboardImage
                      src={commission.images?.[0]}
                      alt={commission.title}
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-blue-dark font-medium truncate">
                    {commission.title}
                  </p>
                  <p className="text-sm text-blue-mid">${commission.price}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggleActive(commission)}
                  className={`text-xs px-3 py-1 rounded-pill transition ${
                    commission.isActive
                      ? "bg-blue-light text-blue-dark hover:bg-blue-mid"
                      : "bg-neutral-border text-blue-mid hover:bg-blue-light"
                  }`}
                >
                  {commission.isActive ? "active" : "inactive"}
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/commission/${commission.id}/edit`)
                  }
                  className="text-xs bg-blue-light text-blue-dark px-3 py-1 rounded-pill hover:bg-blue-mid"
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(commission.id)}
                  className="text-xs bg-pink-light text-pink-dark px-3 py-1 rounded-pill hover:bg-pink-mid"
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Proposals currentArtist={currentArtist} />
        </div>
      </div>
    </div>
  )
}
