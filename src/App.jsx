import React from 'react'
import RouteComponent from './Routes/Route'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <RouteComponent/>
    </AuthProvider>
  )
}

export default App