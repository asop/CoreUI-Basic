import { Link } from 'react-router-dom'
import {
  CButton,
  CCard, CCardBody,
  CTable, CTableBody, CTableRow, CCol,CRow,
  CContainer,CSpinner,
  CForm, CFormCheck, CFormInput, CFormLabel, CInputGroup, CInputGroupText,
  CTooltip,CPlaceholder,
  CAlert, // <-- Tambahkan CAlert untuk menampilkan pesan gagal tanpa merusak form
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { apple } from '../../../assets/brand/apple'
import { eye } from '../../../assets/icons/eye'
import { logo } from '../../../assets/brand/logo'

import React, { useState } from 'react';
import api from '../../../services/netcoreapi'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [password2, setPassword2]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [onConnecting, setConnection]   = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate                        = useNavigate();
  
  const isValidPassKey = ()=>{
    if(username=="" || password =="") return false;
    if(password != password2) return false;
    return true;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidPassKey()) {
      setErrorMessage("Invalid Username or Password.");
      return;
    }

    setErrorMessage(''); setConnection(true);
    try {
      const response = await api.post('/auth/register', { username, password });      
      const token = response.data.token || response.data.Token;
      if (token) {
          //navigate('/forms/login');
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
      navigate('/forms/register');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row table-responsive pt-5" 
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
                  <h2 className={`h5 text-center ${onConnecting ? 'd-none' : ''}`}>Register new account</h2>
                  
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
                              onClick={(e)=>setShowPassword(!showPassword)}>
                              <CIcon icon={eye} size="sm" />
                            </CButton>
                          </CTooltip>
                        </CInputGroupText>
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12}>
                      
                      <div className="d-flex justify-content-between">
                        <CFormLabel htmlFor="password2">Retype Password</CFormLabel>
                      </div>
                      <CInputGroup>
                        <CFormInput
                          id="password2"
                          type={showPassword2 ? 'text' : 'password'}
                          placeholder="Retype your password"
                          autoComplete="current-password"
                          value={password2}
                          onChange={(e) => {setPassword2(e.target.value); setErrorMessage('')}}
                        />
                        <CInputGroupText>
                          <CTooltip content="Show password">
                            <CButton
                              type="button"
                              color="link"
                              className="p-0 link-secondary"
                              aria-label={showPassword2 ? "Hide password" : "Show password"}
                              onClick={(e)=>setShowPassword2(!showPassword2)}>
                              <CIcon icon={eye} size="sm" />
                            </CButton>
                          </CTooltip>
                        </CInputGroupText>
                      </CInputGroup>                      
                    </CCol>
                    <div className="position-relative"><hr /></div>                    
                    <CCol xs={12}>
                      <CButton color="primary" type="submit" className="w-100">
                        <CIcon icon={apple} className="me-1" />
                        Register
                      </CButton>
                    </CCol>
                  </CForm>
                  </>
                  )}
                </CCardBody>
              </CCard>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register