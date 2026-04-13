import React from "react"
import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Portfolio } from "../components/portfolio/Portfolio"
import { Dashboard } from "../components/dashboard/Dashboard"
import { AddCommission } from "../components/dashboard/AddCommission"
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
          path="dashboard/add"
          element={<AddCommission currentArtist={currentArtist} />}
        />

        <Route
          path="dashboard/commission/:id/edit"
          element={<EditCommission currentArtist={currentArtist} />}
        />
      </Route>

      <Route
        path="dashboard/profile/edit"
        element={<EditProfile currentArtist={currentArtist} />}
      />

      <Route path="portfolio/:username" element={<Portfolio />} />

    </Routes>
  )
}
