import React from "react"
import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Portfolio } from "../components/portfolio/Portfolio"
import { Dashboard } from "../components/dashboard/Dashboard"
import { AddCommission } from "../components/dashboard/AddCommission"
import { EditCommission } from "../components/dashboard/EditCommission"
import { EditProfile } from "../components/dashboard/EditProfile"
import { Authorized } from "../views/Authorized"
import { ScrollToTop } from "../views/ScrollToTop"

export const ApplicationViews = () => {
  const [currentArtist, setCurrentArtist] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const localArtist = localStorage.getItem("portfolio_artist")

    if (localArtist) {
      setCurrentArtist(JSON.parse(localArtist))
    }

    setIsLoading(false)
  }, [])

  if (isLoading) return null

  console.log("currentArtist", currentArtist)

  //if (!currentArtist) return null

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <ScrollToTop />
            {currentArtist && <NavBar currentArtist={currentArtist} />}
            <Outlet />
          </>
        }
      >
        <Route
          path="portfolio/:username"
          element={<Portfolio currentArtist={currentArtist} />}
        />

        <Route
          path="dashboard"
          element={
            <Authorized>
              <Dashboard currentArtist={currentArtist} />
            </Authorized>
          }
        />

        <Route
          path="dashboard/add"
          element={
            <Authorized>
              <AddCommission currentArtist={currentArtist} />
            </Authorized>
          }
        />

        <Route
          path="dashboard/commission/:id/edit"
          element={
            <Authorized>
              <EditCommission currentArtist={currentArtist} />
            </Authorized>
          }
        />

        <Route
          path="dashboard/profile/edit"
          element={
            <Authorized>
              <EditProfile currentArtist={currentArtist} />
            </Authorized>
          }
        />
      </Route>
    </Routes>
  )
}
