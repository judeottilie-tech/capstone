//base on PostDetails
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCommissionById } from "../../services/commissionService"
//import { ProposalForm } from "./ProposalForm"

export const CommissionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [commission, setCommission] = useState({})

  useEffect(() => {
    getCommissionById(id).then((commissionData) => {
      setCommission(commissionData)
    })
  }, [id])


}
