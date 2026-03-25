import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../store/authStore'
import { ghostBtn } from '../styles/common';
import toast from 'react-hot-toast';

function Header() {
  const isAuthenticated = useAuth(state=>state.isAuthenticated);
  const user = useAuth(state=>state.currentUser);
  const logout = useAuth(state=>state.logout);

  const navigate = useNavigate();
  
  const onLogout = async () => {
    //logout
    await logout();
    toast.success("Logging Out successfully...");
    //navigate
    navigate('/login');
  }

  return (
    <nav className="bg-gradient-to-r from-amber-400 to-amber-500 shadow-md px-10 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide cursor-pointer">
          MyApp
        </h1>
        {/* Menu */}
        <ul className="flex items-center gap-8 text-white font-medium">
          <li>
            <NavLink to="/" className={({ isActive }) => `hover:text-amber-900 transition ${isActive ? "underline font-semibold" : ""}`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={({ isActive }) => `hover:text-amber-900 transition ${isActive ? "underline font-semibold" : ""}`}>
              Register
            </NavLink>
          </li>

          {isAuthenticated ? (
            <li className="flex items-center gap-4"> 
              {/* Profile */}
              <img 
                src={user?.profileImageUrl} 
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
              />
              {/* Logout Button */}
              <button onClick={onLogout} className="bg-white text-amber-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-amber-100 transition">
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className="bg-white text-amber-600 px-4 py-1.5 rounded-full font-semibold hover:bg-amber-100 transition">
                Login
              </NavLink>
            </li>
          )}

        </ul>
      </div>
    </nav>
  )
}

export default Header
