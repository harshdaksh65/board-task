import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Dashboard from '../Components/dashboard'
import ProtectedRoute from './ProtectedRoute'

function RouteComponent() {
  return (
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
    </Routes>
  )
}

export default RouteComponent