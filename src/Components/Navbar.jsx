import React from 'react'
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const { logout} = useAuth();
  const navigate = useNavigate();
  
  const handlelogout = () => {
    logout();
    navigate('/login');
  }
  return (
    <div>
        <div className="flex justify-between items-center bg-background text-text p-4 max-w-7xl mx-auto md:border md:border-neutral-200 md:rounded-full md:shadow-harsh md:mt-4 px-5 md:px-24 w-screen fixed top-0 left-0 right-0 z-50">
            <h1 className="text-xl font-bold">Task Board</h1>
            <div onClick={handlelogout} className="flex justify-between items-center gap-2 ml-4 bg-primary text-white px-4 py-2 rounded-2xl hover:bg-text-secondary" >
              <LogOut/>
              <button  >Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar