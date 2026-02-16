import React from 'react'
import RouteComponent from './Routes/Route'
import { AuthProvider } from './context/AuthContext'
import { TodoProvider } from './context/TodoContext'

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <RouteComponent/>
      </TodoProvider>
    </AuthProvider>
  )
}

export default App