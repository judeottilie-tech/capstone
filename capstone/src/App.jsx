//base on learningmoments app
import React from "react"
import { Login } from "../capstone/src/components/auth/Login"
import { Register } from "../capstone/src/components/auth/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ApplicationViews } from "../capstone/src/views/ApplicationViews"
import { Authorized } from "../capstone/src/views/Authorized"
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
