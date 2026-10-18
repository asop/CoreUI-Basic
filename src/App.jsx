import React, { Suspense, useState, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { CSpinner, useColorModes } from '@coreui/react'
import { BrowserRouter, Navigate, useLocation } from 'react-router-dom'
import '../src/css/global.css'

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login         = React.lazy(() => import('./views/forms/login/Login'))
const Register      = React.lazy(() => import('./views/forms/register/Register'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
        setColorMode(theme)
    }
    if (isColorModeSet()) {
        return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <HashRouter>
            <Suspense
              fallback={
                <div className="pt-3 text-center">
                  <CSpinner color="primary" variant="grow" />
                </div>
              }
            >
                  
          <Routes>
            <Route exact path="/forms/login" name="Login Page" element={<Login />} />
            <Route exact path="/forms/register" name="Register Page" element={<Register />}/>
            <Route path="*" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  )
}

export default App
