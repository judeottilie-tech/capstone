//same as learningmoments

import { Navigate } from "react-router-dom"

export const Authorized = ({ children }) => {
  if (localStorage.getItem("portfolio_artist")) {
    return children
  }
  return <Navigate to="/login" />
}
