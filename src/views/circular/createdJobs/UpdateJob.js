import { useState , useEffect , useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import {SERVER_URL} from '../../../services/helper'

import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CFormTextarea,
  CDatePicker,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'

const UpdateJob = () => {
    const navigate = useNavigate();
    const params = useParams(); // Get ID from URL
    const [message, setMessage] = useState("");

    //Get Specific Job Details
    const JobDetailById = async () =>
    {
      await fetch(`${SERVER_URL}/api/viewJob/${params.id}`)
        .then(resposne=> resposne.json())
        .then(res=>setInput(res))
    }
    useEffect(()=> {
        JobDetailById(params.id);
    }, [params.id])


    //Values & Set Values
    const [input, setInput] = useState({
      designation: '',
      department: '',
      employment_type:'',
      job_nature:'',
      job_location:'',
      experience_year:'',
      age_limit:'',
      application_deadline:'',
      job_description:'',
      major_responsibilities:'',
      education_requirement:'',
      experience_details:'',
      technical_skills:'',
      soft_skills:'',
      duration:'',
      benefit:''
    });

    const onInputChange = e => {
      const { name, value } = e.target;
      //setInput(prev => ({...prev,[name]: value}));
      setInput({...input,[name]: value});
    }    


    async function handleUpdate(e){
      e.preventDefault();
      
      await axios.put(
        `${SERVER_URL}/api/updateJob/${params.id}`, 
        input,
        {
          headers: { "Content-Type": " application/json" },
        } 
      )
      .then(setMessage('Updated Successfully'))
      .catch(error => console.error(error));

    }


    //Back Page
    const GoBack = async () =>{
        navigate(`/circular/createdJobs`);
    }
    


  return (
    <div>
      <CButton color='secondary' style={{color:'black', fontWeight:'bold'}} variant="outline" shape="rounded-pill" onClick={(e)=>GoBack()}>Go Back</CButton>
      <center><h3>Update Job</h3></center>

      <div class="container border mt-4 mb-2 d-flex justify-content-between">
        <h5 class="mt-3" style={{fontWeight:'bold', color:'darkblue'}}>
          {input.designation} 
        </h5>
        <h5 class="mt-3" style={{fontWeight:'bold', color:'darkblue'}}>
          {input.department} 
        </h5>
      </div>

      <div class="container-sm  mb-5 border shadow">  
        <div class="mt-3"><h5>Basic Requirements</h5></div>        
        <CForm className="row g-3 mt-3" onSubmit={handleUpdate}>
          <CCol md={6}>
            <CFormInput type="text" id="inputEmail4" label="Define Designation" name="designation" value={input.designation} onChange={onInputChange} required/>
          </CCol>

          <CCol md={6}>
            <CFormInput type="text" id="dept" label="Department" name="department" value={input.department} onChange={onInputChange} required/>
          </CCol>

          <CCol md={4}>
            <CFormSelect id="emp_type" label="Employment type" name="employment_type" value={input.employment_type} onChange={onInputChange}>
              <option selected>Choose...</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contractual">Contractual</option>
            </CFormSelect>
          </CCol>
          <CCol md={4}>
            <CFormSelect id="job_nature" label="Job Nature" name="job_nature" value={input.job_nature} onChange={onInputChange}>
              <option>Choose...</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </CFormSelect>
          </CCol>
          
          <CCol md={4}>
            <CFormSelect id="job_location" label="Job Location" name="job_location" value={input.job_location} onChange={onInputChange}>
              <option value="Dhaka">Dhaka (HQ)</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Manikganj">Manikganj</option>
              <option value="Gazipur">Gazipur</option>
              <option value="Dinajpur">Dinajpur</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Cox Bazar">Cox Bazar</option>
            </CFormSelect>
          </CCol>

          <CCol md={4}>
            <CFormInput type="number" id="exp_year" label="Total Year of Experience" name="experience_year" value={input.experience_year} onChange={onInputChange} required/>
          </CCol>
          <CCol md={4}>
            <CFormInput type="text" id="ageLimit" label="Age Limit" name="age_limit" value={input.age_limit} onChange={onInputChange}/>
          </CCol>
          <CCol md={4}> 
            <CFormInput type="date" id="appl_deadline" label="Application Deadline" name="application_deadline" value={input.application_deadline} onChange={onInputChange}/>
          </CCol>

          {/* Required fields */}
          <CCol xs={12}>
            <CFormTextarea  id="job_description" label="Purpose" placeholder="Write here.." name="job_description" value={input.job_description} onChange={onInputChange}/>
          </CCol>
          <CCol xs={12}>
            <CFormTextarea  id="major_responsibilities" label="Major Responsibilities" placeholder="Write here.." name="major_responsibilities" value={input.major_responsibilities} onChange={onInputChange}/>
          </CCol>
          <CCol xs={12}>
            <CFormTextarea  id="educational_req" label="Education Requirements" placeholder="Write here.." name="educational_requirement" value={input.education_requirement} onChange={onInputChange}/>
          </CCol>
          <CCol xs={12}>
            <CFormTextarea  id="exp_details" label="Experience Details" placeholder="Write here.." name="experience_details" value={input.experience_details} onChange={onInputChange}/>
          </CCol>

          {/* Optional fields */}
          <div class="mt-5"><h5>Additional Requirements</h5></div>

          <CCol xs={12}>
            <CFormTextarea  id="tech_skill" label="Required technical skills" placeholder="Write here.." name="technical_skills" value={input.technical_skills} onChange={onInputChange}/>
          </CCol>
          <CCol xs={12}>
            <CFormTextarea  id="soft_skill" label="Required soft skills" placeholder="Write here.." name="soft_skills" value={input.soft_skills} onChange={onInputChange}/>
          </CCol>

          <CCol md={6}>
            <CFormInput type="text" id="duration" label="Duration" name="duration" value={input.duration} onChange={onInputChange} />
          </CCol>

          {/* Optional fields */}
          <div class="mt-5"><h5>Benefits</h5></div>
          <CCol xs={12}>
            <CFormTextarea  id="benefits" label="Salary/Benefits" placeholder="Write here.." name="benefit" value={input.benefit} onChange={onInputChange}/>
          </CCol>


          <CCol xs={12}>
            <CFormCheck type="checkbox" id="gridCheck" label="Check to confirm"/>
          </CCol>
          <CCol xs={12} class="mb-3">
            <center><CButton type="submit">Update</CButton></center>
          </CCol>
          <center>
            {message && 
              <CToast autohide={true} visible={true} color="primary" className="text-white align-items-center">
                <div className="d-flex">
                  <CToastBody>{message}</CToastBody>
                  <CToastClose className="me-2 m-auto" white />
                </div>
              </CToast>
            }
          </center>

        </CForm>

      </div>

    </div>
    
  )
}

export default UpdateJob