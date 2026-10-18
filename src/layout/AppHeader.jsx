import React, { useEffect  } from 'react';
import { CHeader, CContainer, CHeaderNav, CHeaderToggler,CNavItem,CNavLink,
  CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem,CDropdownHeader,
  CAvatar, CBadge
  } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import {
  cilMenu, cibApache, cilBug, cilCalculator, cilChartLine, cilChartPie, cilCloud, cilDescription, 
  cilDevices, cilExternalLink, cilHd, cilHeadphones, cilLockLocked, cilNotes,
  cilObjectGroup, cilPuzzle, cilScreenDesktop, cilShieldAlt, cilSpeedometer, cilStar,
  cilEducation,
  cilAccountLogout,
  cilUser,
  cilLaptop,
  cilContrast,
  cilSun,
  cilBell,
  cilExitToApp,
  cilApplications,
} from '@coreui/icons'

import defAvatar from '../assets/avatars/def.jpg'

// Terima props setSidebarShow dan sidebarShow dari parent
const AppHeader = ({ sidebarShow, setSidebarShow }) => {
  const onLogout =()=>{
    if (!window.confirm('LOGOUT, apakah Anda yakin?')) return;
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('coreUIuid');
    // Karena app memakai HashRouter, arahkan ke hash route yang benar.
    window.location.hash = '#/forms/login';
  }
  
  useEffect(() => {
  }, []);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer className="px-4" fluid>
        <CHeaderToggler style={{ marginInlineStart: '-14px' }}
          onClick={() => setSidebarShow(!sidebarShow)}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <span className="fw-bold ms-2">Dashboard</span>
        <CHeaderNav className="ms-auto">
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          
          <CDropdown variant="nav-item" className="d-flex align-items-end">
            <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
              <CAvatar src={defAvatar} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end" style={{width:"250px"}}>
              <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
              <CDropdownItem href="/">
                <CIcon icon={cilScreenDesktop} className="me-2" />
                Dashboard
              </CDropdownItem> 
              <CDropdownItem href="#/forms/profile">
                <CIcon icon={cilDevices} className="me-2" />
                Profile
              </CDropdownItem>   
              <CDropdownItem onClick={onLogout}>
                <CIcon icon={cilExitToApp} className="me-2" />
                Logout
              </CDropdownItem>               
            </CDropdownMenu>         
          </CDropdown>
        </CHeaderNav>       
      </CContainer>
    </CHeader>
  )
}

export default React.memo(AppHeader)