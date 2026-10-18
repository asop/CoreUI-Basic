
import { useState } from 'react';
import {
  CButton,CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,CRow,CCol,
  CForm, CFormInput, CFormLabel, CFormTextarea, CInputGroup, CFormSelect,
  CHeaderText,
  CTableBody,
  CTableFoot,
  CContainer
} from '@coreui/react'
const Setting = () =>{
    const [visible, setVisible]  = useState(true);
    const onSubmitForm = (e)=>{
        e.preventDefault();
        alert("Submited...");
    }

    return(
        <>
            <div className="table-responsive w-100">
            <CContainer backdrop="static" >
                <CForm className="row g-2" onSubmit={(e)=>onSubmitForm(e)}>
                <CHeaderText>
                <CModalTitle>Setting...</CModalTitle>
                </CHeaderText>
                <CTableBody>
                <CRow>
                    <CCol xs={12}> 
                        <div className="mb-1">
                        <CFormInput type="text" id="edSample" placeholder="Sample" />
                        </div>  
                    </CCol>
                </CRow>
                </CTableBody>
                <CTableFoot>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                    Batal
                </CButton>
                <CButton type="submit" color="primary">Simpan</CButton>
                </CTableFoot>
                </CForm>
            </CContainer>       
            </div>     
        </>
    )
}

export default Setting