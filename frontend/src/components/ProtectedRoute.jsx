import React from 'react'
import { useAuth } from '../store/authStore'
import { loadingClass } from '../styles/common';
import { Navigate } from 'react-router';

function ProtectedRoute({ children, allowedRoles }) {
    const currentUser = useAuth(state => state.currentUser);
    const isAuthenticated = useAuth(state => state.isAuthenticated);
    const loading = useAuth(state => state.loading);
    const logout = useAuth(state => state.logout);

    //loading state
    if(loading) return <p className={loadingClass}>Loading...</p>
    //if user not loggedin
    if(!isAuthenticated) {
        //redirect to login
        return <Navigate to="/login" replace />
    }
    //check roles
    if(allowedRoles && !allowedRoles.includes(currentUser.role)) {
        //redirect to login
        return <Navigate to="/login" replace />
    }
  return children;
}

export default ProtectedRoute;
