import React from 'react'
import Navbar from './Navbar'
import ToDo from './ToDo'

function Dashboard() {
  return (
    <div className='flex flex-col items-center '>
        <Navbar/>
        <ToDo/>
    </div>
  )
}

export default Dashboard