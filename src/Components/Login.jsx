import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        const result = login(email, password);
        if (result.success) {
            toast.success('Login successful!');
            navigate('/');
        } else {
            toast.error(result.message);
        }
    }

  return (
    <div className="h-screen  flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 overflow-hidden"
      >
        {/* <!-- right side --> */}
        <div className="relative">
          <img
            src="/Todo-Login.png"
            alt="img"
            className="w-100 hidden rounded-r-2xl md:block object-cover h-full"
          />
          
        </div>
        {/* <!-- left side --> */}
        <form
          className="flex flex-col justify-center p-8 md:p-14"
          onSubmit={handleLogin}
        >
            <span className="w-full text-text text-5xl text-center font-bold mb-4">
              Task Board
            </span>
          <span className="mb-3 text-4xl font-bold text-text-secondary/50">Login</span>
          <span className="font-light text-gray-400 mb-8">
            Please login to continue
          </span>
          <div className="py-2">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border rounded-2xl border-gray-300 placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="py-2">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder='Password'
              className="w-full p-2 border border-gray-300 rounded-2xl placeholder:font-light placeholder:text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-background text-text p-2 rounded-2xl mb-6 cursor-pointer hover:bg-white hover:text-black hover:border hover:border-gray-300"
            type="submit"
          >
            Log In
          </button>
          <div className="text-center text-gray-400">
            Don't have an account?{' '}
            <button
              type="button"
              className="font-bold text-black hover:underline cursor-pointer"
              onClick={() => toast.info("We're working on hardcoded Credentials!")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login