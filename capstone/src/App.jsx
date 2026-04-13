//base on learningmoments app
import React from "react"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Authorized } from "./views/Authorized"
import { Portfolio } from "./components/portfolio/Portfolio"
import { ApplicationViews } from "./views/ApplicationViews"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio/:username" element={<Portfolio />} />
        

        <Route
          path="*"
          element={
            <Authorized>
              <ApplicationViews />
            </Authorized>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
