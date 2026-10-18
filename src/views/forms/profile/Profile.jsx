import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CAvatar,
  CButton,
  CFormInput,
  CFormLabel,
  CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilPencil, cilLockLocked } from '@coreui/icons'

const Profile = () => {
  const user = {
    name    : 'Admin User',
    email   : 'admin@coreui.dev',
    role    : 'Super Admin',
    phone   : '+62 812-3456-7890',
  }

  return (
    <CContainer className="py-4">
      <CRow className="justify-content-center">
        <CCol lg={8}>
          <CCard className="shadow-sm border-0">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Profile</h4>
              </div>
              <CButton color="primary" variant="outline">
                <CIcon icon={cilPencil} className="me-2" />
                Edit
              </CButton>
            </CCardHeader>

            <CCardBody>
              <CRow className="align-items-center mb-4">
                <CCol xs="auto">
                  <CAvatar color="primary" textColor="white" size="xl">
                    <CIcon icon={cilUser} />
                  </CAvatar>
                </CCol>
                <CCol>
                  <h5 className="mb-1">{user.name}</h5>
                  <div className="text-body-secondary">{user.role}</div>
                </CCol>
              </CRow>

              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="fullName">Full Name</CFormLabel>
                  <CFormInput id="fullName" value={user.name} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                  <CFormInput id="email" value={user.email} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">Phone</CFormLabel>
                  <CFormInput id="phone" value={user.phone} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="role">Role</CFormLabel>
                  <CFormInput id="role" value={user.role} readOnly />
                </CCol>
              </CForm>

              <div className="mt-4 d-flex justify-content-end">
                <CButton color="secondary" variant="outline" className="me-2">
                  <CIcon icon={cilLockLocked} className="me-2" />
                  Change Password
                </CButton>
                <CButton color="primary">Save Changes</CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Profile
