import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCommissionsByArtist, deleteCommission, updateCommission } from "../../services/commissionService"

export const Dashboard = ({ currentArtist }) => {
  const [commissions, setCommissions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentArtist?.id) return

    getCommissionsByArtist(currentArtist.id).then(setCommissions)
  }, [currentArtist])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const handleDelete = (commissionId) => {
    deleteCommission(commissionId).then(() => {
      getCommissionsByArtist(currentArtist.id).then((commissionsArray) => {
        setCommissions(commissionsArray)
      })
    })
  }

 /*const handleToggleActive = (commission) => {
    const updatedCommission = {
      ...commission,
      isActive: !commission.isActive,
    }

    updateCommission(updatedCommission).then(fetchCommissions)
  }

  const handleToggleClosed = (commission) => {
    const updatedCommission = {
      ...commission,
      isClosed: !commission.isClosed,
    }

    updateCommission(updatedCommission).then(fetchCommissions)
  }
    */

  return (
    <div className="min-h-screen bg-neutral-soft p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-dark">
            my commission types
          </h2>

          <button
            onClick={() => navigate("/dashboard/add")}
            className="bg-pink-main border-neutral-border rounded-pill px-4 text-white py-1 rounded-pill hover:bg-pink-mid transition"
          >
            + new
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {commissions.map((commission) => {
            return (
              <div
                key={commission.id}
                className="bg-white border border-neutral-border rounded-xl p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  
                  {commission.imageUrl && (
                    <img
                      src={commission.imageUrl}
                      alt={commission.title}
                      className="w-12 h-12 rounded-lg object-cover border border-neutral-border flex-shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-blue-dark font-medium">
                      {commission.title}
                    </p>
                    <p className="text-sm text-blue-mid">${commission.price}</p>
                  </div>
                </div>
                

                <div className="flex gap-2 flex-wrap justify-end">
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
            )
          })}
        </div>
      </div>
    </div>
  )
}


/*add later-



<button
onClick={() => handleToggleActive(commission)}
className="text-xs bg-yellow-light text-yellow-dark px-3 py-1 rounded-pill hover:bg-yellow-mid"
>
{commission.isActive ? "set inactive" : "set active"}
</button>*/