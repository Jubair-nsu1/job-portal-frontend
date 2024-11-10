import {useEffect,useState} from 'react';
import slide1 from './images/pic1.jpg'
import slide2 from './images/pic1.jpg'

import { SERVER_URL } from '../../../services/helper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Link, Navigate, useNavigate } from "react-router-dom";
const moment = require('moment');

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

    CNavbar,
    CContainer,
    CNavbarBrand,
    CImage,
    CCarousel,
    CCarouselItem,
    CFooter,
    CLink,
  } from '@coreui/react'

const Total = () => {
    const navigate = useNavigate();
    const[record,setRecord] = useState([])

    //Takes to Job Details Page when the clicking the Job Title
    const JobDetails = async (id) =>{
        navigate(`/jobDetails/${id}`);
    }

    //Get All Jobs data 
    const getAllJobsData = async () =>{
      await fetch(`${SERVER_URL}/api/viewJobs`)
        .then(resposne=> resposne.json())
        .then(res=>setRecord(res))
    }

    useEffect(() => {
        getAllJobsData();
      },[])
  
    return (
        <div>
        <Navbar/>

        <CCarousel controls indicators>
            <CCarouselItem>
                <CImage className="d-block w-100" src={slide1} alt="slide 1" />
            </CCarouselItem>
            <CCarouselItem>
                <CImage className="d-block w-100" src={slide2} alt="slide 2" />
            </CCarouselItem>
        </CCarousel>

        <div class="d-flex justify-content-center mt-5">
            <div><h1 style={{color:'darkgreen', fontWeight:'bold'}}>JOIN OUR TEAM</h1></div>
        </div>
        <div class="d-flex justify-content-center mt-3 mb-5">
            <div><h3 style={{color:'green', fontWeight:'bold'}}>VACANCIES</h3></div>
        </div>
        
        <div class="container-sm mt-5 shadow">
        <CAccordion flush>
        
        {record.length>0
            ? 
            record.map((item,index)=>
                        <CAccordionItem itemKey={index}>
                            <CAccordionHeader ><strong style={{color:'darkgreen'}} >{item.designation}, {item.department}</strong></CAccordionHeader>
                            <CAccordionBody style={{ cursor: 'pointer' }} onClick={(e)=>JobDetails(item._id)}>

                                    <div class='row g-3 mb-3'>
                                        <CCol md={4}>
                                            <div><a style={{fontWeight:'bold'}}>Job Nature: </a><a>{item.job_nature}</a></div>        
                                        </CCol>
                                        <CCol md={4}>
                                            <div><a style={{fontWeight:'bold'}}>Job Location: </a><a>{item.job_location}</a></div>
                                        </CCol>
                                        <CCol md={4}>
                                            <div><a style={{fontWeight:'bold'}}>Application Deadline: </a><a>{moment(item.application_deadline).format('DD MMM YYYY')}</a></div>
                                        </CCol>
                                    </div>
                                    <div class='row g-3'>
                                        <CCol md={4}>
                                            <div><a style={{fontWeight:'bold'}}>Employment Type: </a><a>{item.employment_type}</a></div>    
                                        </CCol>
                                        <CCol md={4}>
                                            <div><a style={{fontWeight:'bold'}}>Experience Needed: </a><a>{item.experience_year} years</a></div>
                                        </CCol>
                                        <CCol md={4}>
                                            <div><a style={{fontWeight:'bold', color:'blue', fontFamily:'cursive'}}>Click to view details </a></div>
                                        </CCol>
                                    </div>
                                    
                            </CAccordionBody>
                        </CAccordionItem>
            )
            : 
            <div class="container-sm border d-flex justify-content-center mt-5 mb-5 ">
                <h2 style={{color:'red', fontWeight:'bold'}}>No Jobs Available</h2>
            </div>
            
        }
        
        
        </CAccordion>
        </div>

        <div class="d-flex justify-content-center mt-5">
            <div><h3 style={{color:'green', fontWeight:'bold'}}>ADDITIONAL INFORMATION</h3></div>
        </div>
        <div class="container-sm mt-3 mb-5">
            <ul style={{color:'black'}}>
                <li>Bangladesh Youth Leadership Center (BYLC) tries to ensure a diverse workforce by providing equal  opportunities to everyone, irrespective of race, age, gender, sexual orientation, HIV status, class, ethnicity, disability, location, and religion</li>
                <li>BYLC follows a strict zero-tolerance on any type of abuse towards children and vulnerable adults</li>
                <li>All applications will be treated with the strictest confidentiality</li>
                <li>BYLC does not charge any fee at any stage of the recruitment process (application, interview meeting, or processing)</li>
            </ul>
        </div>
        
        <Footer/>

        </div>
        
    )
}

export default Total