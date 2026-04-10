//base on learningmoments app
import React from "react"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"
import "./App.css"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
