import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCommissionsByArtist, deleteCommission, updateCommission } from "../../services/commissionService"

export const Dashboard = ({ currentArtist }) => {
  const [commissions, setCommissions] = useState([])
  const navigate = useNavigate()

  const fetchCommissions = () => {
    getCommissionsByArtist(currentArtist.id).then((commissionArray) => {
      setCommissions(commissionArray)
    })
  }

  useEffect(() => {
    fetchCommissions()
  }, [currentArtist])
  
  const handleDelete = (commissionId) => {
    deleteCommission(commissionId).then(() => {
      fetchCommissions()
    })
  }

  const handleToggleActive = (commission) => {
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

  return (
    <div className="dashboard">
      <h2>My Commissions</h2>

      <button className="btn-info" onClick={() => navigate("/dashboard/add")}>
        + New Commission
      </button>

      {commissions.map((commission) => {
        return (
          <div key={commission.id} className="commission-card">
            <div className="commission-info">
              <span className="commission-title">{commission.title}</span>
              <span className="commission-price">${commission.price}</span>

            
              <span className="commission-status">
                {commission.isActive ? "Active" : "Inactive"} |{" "}
                {commission.isClosed ? "Closed" : "Open"}
              </span>
            </div>

            <div className="commission-actions">
              <button
                className="btn-secondary"
                onClick={() =>
                  navigate(`/dashboard/commission/${commission.id}/edit`)
                }
              >
                Edit
              </button>

              <button
                className="btn-warning"
                onClick={() => handleDelete(commission.id)}
              >
                Delete
              </button>

              <button
                className="btn-info"
                onClick={() => handleToggleActive(commission)}
              >
                {commission.isActive ? "Set Inactive" : "Set Active"}
              </button>

              <button
                className="btn-info"
                onClick={() => handleToggleClosed(commission)}
              >
                {commission.isClosed ? "Reopen" : "Close"}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}