import React from "react"
import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Portfolio } from "../components/portfolio/Portfolio"
import { CommissionDetail } from "../components/commission/CommissionDetail"
import { Dashboard } from "../components/dashboard/Dashboard"
import { Upload } from "../components/dashboard/Upload"
import { EditCommission } from "../components/dashboard/EditCommission"
import { EditProfile } from "../components/dashboard/EditProfile"

export const ApplicationViews = () => {
  const [currentArtist, setCurrentArtist] = useState(null)

  useEffect(() => {
    const localArtist = localStorage.getItem("portfolio_artist")
    const artistObject = JSON.parse(localArtist)
    setCurrentArtist(artistObject)
  }, [])

  if (!currentArtist) return null

  return (
    <Routes>
      <Route path="portfolio/:username" element={<Portfolio />} />

      <Route
        path="/portfolio/:username/commission/:id"
        element={<CommissionDetail />}
      />
      <Route
        path="/"
        element={
          <>
            <NavBar currentArtist={currentArtist} />
            <Outlet />
          </>
        }
      >
        <Route index element={<Dashboard currentArtist={currentArtist} />} />

        <Route
          path="dashboard"
          element={<Dashboard currentArtist={currentArtist} />}
        />

        <Route
          path="dashboard/upload"
          element={<Upload currentArtist={currentArtist} />}
        />

        <Route
          path="dashboard/profile/edit"
          element={<EditProfile currentArtist={currentArtist} />}
        />
      </Route>
    </Routes>
  )
}
