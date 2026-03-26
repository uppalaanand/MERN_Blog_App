import React, { useEffect } from 'react'
import {Outlet} from 'react-router'
import Header from './Header'
import Footer from './Footer'
import { useAuth } from '../store/authStore'
import { loadingClass } from '../styles/common'

function RootLayout() {
  const refreshPage = useAuth(state=>state.refreshPage);
  const loading = useAuth(state=>state.loading);
  
  useEffect(() => {
    refreshPage();
  }, []);

  if(loading) return <p className={loadingClass}>Loading...</p>
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout
