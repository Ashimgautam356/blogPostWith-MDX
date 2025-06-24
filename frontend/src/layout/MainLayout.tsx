import Footer from '@/components/other/Footer'
import Nav from '@/components/other/Nav'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <Nav></Nav>
        <div className='pt-14'>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default MainLayout