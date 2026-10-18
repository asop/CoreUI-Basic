import React, { Suspense } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { Routes, Route, Navigate, replace } from 'react-router-dom'
import Dashboard from '../views/dashboard/Dashboard'
import Profile from '../views/forms/profile/Profile'
import Download from '../views/forms/download/Download'
import Setting from '../views/forms/setting/Setting'

const AppContent = () => {
  return (
    <CContainer className="px-4">
      <Suspense fallback={<CSpinner color="primary" />}>
        <div className="container-lg px-4 responsive">
          <Routes>
            {/* Route default layout hanya untuk dashboard agar tidak tertangkap by wildcard route yang mengarahkan ulang */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forms/profile" element={<Profile />} />
            <Route path="/forms/download" element={<Download />} />
            <Route path="/forms/setting" element={<Setting />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)