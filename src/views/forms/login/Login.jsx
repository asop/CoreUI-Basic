import { Link } from 'react-router-dom'
import {
  CButton,CCard, CCardBody,CCol,CRow,
  CContainer,CSpinner, CForm, CFormCheck, CFormInput, 
  CFormLabel, CInputGroup, CInputGroupText, CTooltip, CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { apple } from '../../../assets/brand/apple'
import { google } from '../../../assets/brand/google'
import { logo } from '../../../assets/brand/logo'
import { eye } from '../../../assets/icons/eye'

import React, { useState, useEffect } from 'react';
import api from '../../../services/netcoreapi';
import bgImage from '../../../assets/images/bg.jpg' 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [onConnecting, setConnection]   = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate                        = useNavigate();
  const [rememberMe, setRememberMe]     = useState(false);

  const handleRemember = ()=>{
    const storageA = localStorage.getItem('remembereda');
    const storageB = localStorage.getItem('rememberedb');
    if (storageA && storageB) {
        setUsername(storageA);
        setPassword(storageB);
        setRememberMe(true);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); setConnection(true);

    if (rememberMe) {
        localStorage.setItem('remembereda', username);
        localStorage.setItem('rememberedb', password);
    } else {
        localStorage.removeItem('remembereda');
        localStorage.removeItem('rememberedb');
    }

    try {
      const response = await api.post('/auth/login', { username, password });      
      const token = response.data.token || response.data.Token;
      if (token) {
          localStorage.setItem('coreUIuid', username);
          localStorage.setItem('jwt_token', token);
          setConnection(false);
          // Karena app memakai HashRouter, redirect harus menuju '#/dashboard'.
          window.location.hash = '#/dashboard';
      } else {
          setConnection(false);
          setErrorMessage('Token tidak ditemukan dari respons server.');
          return;  
          //throw new Error('Token tidak ditemukan dari respons server.');
      }
    } catch (error) {
      const statusCode = error.status; 
      const errorMsg   = (statusCode==401)? "Autentikasi tidak valid.": error.message || 'Terjadi gangguan koneksi.';
      setConnection(false);
      setErrorMessage(errorMsg);
      navigate('/forms/login');
    }
  };

  useEffect(() => {
    handleRemember();
  }, [])

  return (
    <div
  className="min-vh-100 d-flex flex-row table-responsive pt-5"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6} xl={5}>
            <div className="d-flex flex-column gap-4">
              <div className="text-center">
                <CIcon icon={logo} height={48} />
              </div>
              <CCard className="p-4">
                <CCardBody className="d-flex flex-column gap-4">
                  <h2 className={`h5 text-center ${onConnecting ? 'd-none' : ''}`}>Login to your account</h2>
                  
                  {onConnecting ?(
                    <div className="d-flex align-items-center gap-2 py-2">
                        <CSpinner component="span" size="smax" aria-hidden="true" />
                        <div disabled>Menghubungkan ke server...</div>
                    </div>
                  ):(
                  <>    
                  {errorMessage ? (
                    <CAlert color="danger" className="py-2 mb-0">
                      {errorMessage}
                    </CAlert>
                  ): null}

                  <CForm className="row gy-3" onSubmit={(e)=>handleLogin(e)} target="forms/login">
                    <CCol xs={12}>
                      <CFormLabel htmlFor="edUser">Username</CFormLabel>
                      <CFormInput
                        id="edUser"
                        type="text"
                        placeholder="Username"
                        value={username}
                        autoComplete="username"
                        onChange={(e) => {setUsername(e.target.value); setErrorMessage('')}}
                      />
                    </CCol>
                    <CCol xs={12}>
                      <div className="d-flex justify-content-between">
                        <CFormLabel htmlFor="password">Password</CFormLabel>
                      </div>
                      <CInputGroup>
                        <CFormInput
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Your password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => {setPassword(e.target.value); setErrorMessage('')}}
                        />
                        <CInputGroupText>
                          <CTooltip content="Show password">
                            <CButton
                              type="button"
                              color="link"
                              className="p-0 link-secondary"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              onClick={(e)=>setShowPassword(!showPassword)}
                            >
                              <CIcon icon={eye} size="sm" />
                            </CButton>
                          </CTooltip>
                        </CInputGroupText>
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12}>
                      <CFormCheck id="rememberMe" label="Remember me on this device" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    </CCol>
                    <CCol xs={12}>
                      <CButton color="primary" type="submit" className="w-100">
                        <CIcon icon={apple} className="me-1" />
                        Sign in
                      </CButton>
                    </CCol>
                  </CForm>
                  </>
                  )}
                </CCardBody>
              </CCard>
              <div className={`text-center text-body-secondary ${onConnecting ? 'd-none' : ''}`}>
                Need an account? <Link to="/forms/register">Sign up</Link>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login