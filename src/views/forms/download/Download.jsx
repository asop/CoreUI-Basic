import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
} from '@coreui/react'

const downloadList = [
  {
    filename: 'CoreUI-Setup.exe',
    fileSize: '24.5 MB',
    version: 'v1.8.2',
    serverUrl: 'https://cdn.example.com/files/CoreUI-Setup.exe',
  },
  {
    filename: 'SDK-Installer.msi',
    fileSize: '18.1 MB',
    version: 'v2.0.1',
    serverUrl: 'https://cdn.example.com/files/SDK-Installer.msi',
  },
  {
    filename: 'Patch-Update.zip',
    fileSize: '9.8 MB',
    version: 'v3.4.0',
    serverUrl: 'https://cdn.example.com/files/Patch-Update.zip',
  },
  {
    filename: 'Security-Tool.pkg',
    fileSize: '12.3 MB',
    version: 'v5.1.0',
    serverUrl: 'https://cdn.example.com/files/Security-Tool.pkg',
  },
]

const Download = () => {
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Download Center</strong>
        <CBadge color="success">{downloadList.length} Files</CBadge>
      </CCardHeader>
      <CCardBody>
        <CTable responsive striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Filename</CTableHeaderCell>
              <CTableHeaderCell scope="col">File Size</CTableHeaderCell>
              <CTableHeaderCell scope="col">Version</CTableHeaderCell>
              <CTableHeaderCell scope="col">Server URL</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {downloadList.map((item, index) => (
              <CTableRow key={`${item.filename}-${index}`}>
                <CTableDataCell>{item.filename}</CTableDataCell>
                <CTableDataCell>{item.fileSize}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="primary">{item.version}</CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <small className="text-muted">{item.serverUrl}</small>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    color="success"
                    size="sm"
                    href={item.serverUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Download
