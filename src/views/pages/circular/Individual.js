import {useEffect,useState} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
const moment = require('moment');
import { SERVER_URL } from '../../../services/helper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CForm,
    CFormInput,
    CFormSelect,
    CFormCheck,
    CFormLabel,
    CNavbar,
    CContainer,
    CNavbarBrand,
    CImage,
    CFormTextarea,
    CCarouselItem,
    CFooter,
    CLink,
  } from '@coreui/react'

const individual = () => {
    const navigate = useNavigate();
    const[record,setRecord] = useState([])
    const params = useParams(); // Get ID from URL

    //Get Specific Job Details
    const JobDetailById = async () =>
    {
      await fetch(`${SERVER_URL}/api/viewJob/${params.id}`)
      .then(resposne=> resposne.json())
          .then(res=>setRecord(res))
    }

    useEffect(()=> {
      JobDetailById(params.id);
    }, [params.id])


    //Takes to Apply Form Page when the clicking the button
    const ApplyForm = async (id) =>{
        navigate(`/jobDetails/form/${id}`);
    }

    const ColoredLine = ({ color }) => (
      <hr
          style={{
              color: color,
              backgroundColor: color,
              height: 3
          }}
      />
    );



  return (
    <div>
      <Navbar/>

      <div class="container-sm mt-3">        
        <Link to='/'><CButton color='secondary' style={{color:'black', fontWeight:'bold'}} variant="outline" shape="rounded-pill">Go Back</CButton></Link>

        <CRow>
          <CCol md={9}>
            <div class="mt-5" >
              <div style={{color:'darkgreen', fontWeight:'bold', fontSize:'48px'}}>{record.designation}</div>      
            </div>

            <div class=" mt-5">
              <div><h4 style={{color:'black', fontWeight:'bold'}}>About BYLC</h4></div>
              <div style={{color:'black', fontFamily:'revert'}}>Bangladesh Youth Leadership Center (BYLC), the country’s first leadership institute, exists to build leadership skills in youth from diverse backgrounds, instill values of empathy, tolerance, and inclusiveness in them to jobs and entrepreneurial opportunities. Our goal is to enable our alumni to have a high impact in the public, private and civil sectors. All of BYLC’s efforts aim to strengthen prosperity, justice, and inclusiveness in societies worldwide.</div>         
            </div>

            <div class=" mt-5">
              <div><h4 style={{color:'black', fontWeight:'bold'}}>Purpose</h4></div>
              <div style={{color:'black', fontFamily:'revert'}}>{record.job_description}</div>   
            </div>
          </CCol>
          <CCol md={3}>
            <div class="container-sm mt-4 mb-3 border shadow" >
              <div class="container-sm ">
                <div class="d-grid mt-4">
                  <CButton size="lg" color="primary" style={{fontWeight:'bold', fontSize:'16px'}} onClick={(e)=>ApplyForm(record._id)}>Apply Now</CButton>
                </div>
                <div class="mt-4">
                    <a style={{color:'red', fontWeight:'bold'}}>Application Deadline:</a><br/>
                    <a>{moment(record.application_deadline).format('DD MMM YYYY')}</a>
                </div>
                <div class="mt-3">
                  <a style={{color:'red', fontWeight:'bold'}}>Department:</a><br/>
                  <a style={{color:'black', fontFamily:'revert'}}>{record.department}</a>
                </div>
                <div class="mt-3">
                  <a style={{color:'red', fontWeight:'bold'}}>Employment Type:</a><br/>
                  <a style={{color:'black', fontFamily:'revert'}}>{record.employment_type}</a>
                </div>
                <div class="mt-3">
                  <a style={{color:'red', fontWeight:'bold'}}>Location:</a><br/>
                  <a style={{color:'black', fontFamily:'revert'}}>{record.job_location}</a>
                </div>
                <div class="mt-3">
                  <a style={{color:'red', fontWeight:'bold'}}>Workplace Type:</a><br/>
                  <a style={{color:'black', fontFamily:'revert'}}>{record.job_nature}</a>
                </div>
                <div class="mt-3 mb-4">
                  <a style={{color:'red', fontWeight:'bold'}}>Compentation:</a><br/>
                  <a style={{color:'black', fontFamily:'revert'}}>Negotiable</a>
                </div>
              </div>
            </div>
            
          </CCol>

          
          <CCol md={9}>
            <div class=" mt-5">
                <div><h4 style={{color:'black', fontWeight:'bold'}}>Major responsibilities (detailed job description will be available for short listed candidates)</h4></div>
                <a style={{color:'black', fontFamily:'revert', whiteSpace: 'pre-wrap'}}><div dangerouslySetInnerHTML={{ __html: record.major_responsibilities }}></div></a>
            </div>

            <div class=" mt-5">
                <div><h4 style={{color:'black', fontWeight:'bold'}}>Education</h4></div>
                <div style={{color:'black', fontFamily:'revert', whiteSpace: 'pre-wrap'}}>{record.education_requirement}</div> 
            </div>

            <div class=" mt-5">
                <div><h4 style={{color:'black', fontWeight:'bold'}}>Experience</h4></div>
                <div style={{color:'black', fontFamily:'revert', whiteSpace: 'pre-wrap'}}>{record.experience_details}</div>
            </div>

            <div class=" mt-5">
                <div><h4 style={{color:'black', fontWeight:'bold'}}>Required Technical Skills</h4></div>
                <div style={{color:'black', fontFamily:'revert', whiteSpace: 'pre-wrap'}}>{record.technical_skills}</div>
            </div>

            <div class=" mt-5">
                <div><h4 style={{color:'black', fontWeight:'bold'}}>Required Soft Skills</h4></div>
                <div style={{color:'black', fontFamily:'revert', whiteSpace: 'pre-wrap'}}>{record.soft_skills}</div>
            </div>
          </CCol>

          <CCol xs={12} class="mb-4 mt-4">
              <center><CButton color='info' style={{color:'black', fontWeight:'bold'}} variant="outline" shape="rounded-pill" onClick={(e)=>ApplyForm(record._id)}>Apply Now</CButton></center>
          </CCol>
          <div class='mb-3'>
              <center><Link to='/career'><a style={{color:'darkgreen', fontWeight:'bold'}}>View all opportunities at BYLC</a></Link></center>
          </div>

        </CRow>

        <div class='mt-5 mb-5'> <ColoredLine color="darkgreen" /></div>
      </div>

      <Footer/>

    </div>
  )
}

export default individual