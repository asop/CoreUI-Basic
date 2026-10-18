import React, { useState,useEffect  } from 'react';
import { CSidebar, CSidebarBrand, CSidebarFooter, CSidebarNav, CSidebarToggler, 
  CSidebarHeader, CCloseButton, CNavItem
} from '@coreui/react'
import {
  cibApache, cilApple,  cilScreenDesktop, cilCloudDownload,
} from '@coreui/icons'
import { logo } from '../assets/brand/logo'
import { apple } from '../assets/brand/apple'
import { sygnet } from '../assets/brand/sygnet'
import CIcon from '@coreui/icons-react'
//import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

const AppSidebar = ({ sidebarShow, setSidebarShow }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const xwidth = parseInt(document.body['clientWidth']);
    setWidth(xwidth);
  }, [])

  return (
    <>
    {sidebarShow && (
      <div
        onClick={() => setSidebarShow(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          zIndex: 1030,
        }}
      />
    )}    
    <CSidebar
      className="border-end" 
      colorScheme="auto" 
      position="fixed" 
      id="sidebr"
      style={{ "--cui-sidebar-width": width <= 500 ? "100%" : "16rem", zIndex: 1040 } }
      unfoldable={false}
      visible={sidebarShow} // <-- Sinkronkan dengan state lokal
      onVisibleChange={(visible) => setSidebarShow(visible)}    
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton className="" onClick={() => setSidebarShow(false)}/>
      </CSidebarHeader>

        <CSidebarNav style={{ height: 'calc(100vh - 60px)' }}>
            {/* Gunakan path yang sama dengan HashRouter. '/dashboard' dan '/forms/login' harus konsisten, bukan '/dashboard/Dashboard' atau '/forms/login/Login'. */}
            <CNavItem href="/">
              <CIcon icon={cilScreenDesktop} height={24} />&nbsp;
              Dashboard
            </CNavItem>
           <CNavItem href="#/forms/login">
              <CIcon icon={apple} height={24} />&nbsp;
              Login
            </CNavItem>
            <CNavItem href="#/forms/register">
              <CIcon icon={cilApple} height={24} />&nbsp;
              Register
            </CNavItem>
            <CNavItem href="#/forms/download"  onClick={() => setSidebarShow(false)}>
              <CIcon icon={cilCloudDownload} height={24} />&nbsp;
              Downloads
            </CNavItem>           
      </CSidebarNav>    

      <CSidebarFooter className="border-top">
        <CSidebarNav className="ms-auto">
          <CNavItem href="#/forms/setting"  onClick={() => setSidebarShow(false)} className="d-lg-flex">
            <CIcon icon={cibApache} height={24} />&nbsp;
              Settings
          </CNavItem>
        </CSidebarNav> 
      </CSidebarFooter>        
    </CSidebar>
    </>
  )
}

export default React.memo(AppSidebar)