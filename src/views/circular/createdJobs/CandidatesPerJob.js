import { useState , useEffect , useRef  } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {SERVER_URL} from '../../../services/helper'
const moment = require('moment');
import CIcon from '@coreui/icons-react'

import {
  cilChartPie,
  cilPeople
} from '@coreui/icons'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CWidgetStatsF,
} from '@coreui/react'


const CandidatesPerJob = () => {
  const navigate = useNavigate();
  const params = useParams(); // Get ID from URL
  const [record,setRecord] = useState([])
  const [totalCandidates, setTotalCandidates] = useState();
  const [experiences, setExperiences] = useState(["Any", "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]);
  const [experienceSelected, setExperienceSelected] = useState("Any");

    //Get All Candidates data 
    const getAllCandidatesData = async () =>{
      await fetch(`${SERVER_URL}/api/viewCandidatesPerJob/${params.id}`)
        .then(resposne=> resposne.json())
        .then(res=>setRecord(res))
    }


    //Count Number of Candidates
    const getTotalCandidates = async () =>{
      await fetch(`${SERVER_URL}/api/totalCandidatesPerJob/${params.id}`)
        .then(resposne=> resposne.json())
        .then(res=>setTotalCandidates(res))
    }
    useEffect(() => {
      getAllCandidatesData(params.id);
      getTotalCandidates(params.id);
    },[params.id])  

    //Find cuurent age from Date of birth
    function getAge(dateString) 
    {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
          age--;
      }
      return age;
    }

    //Back Page
    const GoBack = async () =>{
        navigate(`/circular/createdJobs`);
    }
    
    //Takes to specific candidate details page
    const candidateDetails = async (id) => {
      navigate(`/circular/jobApplication/${id}`);
    } 

    //--- Department/Position/Experience Filter
    const handleExpChange = e => {
      setExperienceSelected(e.target.value)
    }
    let filteredCandidates = record;
    if (experienceSelected !== "Any") {
      filteredCandidates = record.filter(rec => Number(rec.work_experience) <= Number(experienceSelected));
    }


  return (
    <div>
      <CButton color='secondary' style={{color:'black', fontWeight:'bold'}} variant="outline" shape="rounded-pill" onClick={(e)=>GoBack()}>Go Back</CButton>
      <center><h3>View Applied Candidates</h3></center>

      <div class="container border shadow row mt-3 ">
      <h5 class="mt-3 text-secondary" style={{fontWeight:'bold'}}>
      Total Candidates 
      </h5>
      <CCol xs={4}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CIcon icon={cilPeople} height={24} />}
          padding={false}
          title="Total Candidates"
          value={totalCandidates}
        />
      </CCol>

      {/* Filter Options */}

      <div class="d-flex justify-content-start mt-3">
        {/* <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 ">
          <div class="col">
            Departments
            <select
              onChange={e => handleDeptChange(e)}>
              {departments.map(department =>
                <option key={department} value={department} > {department} </option>
              )}
            </select>
          </div>
        </div>

        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 ">
          <div class="col">
            Positions
            <select
              onChange={e => handlePositionChange(e)}>
              {positions.map(position =>
                <option key={position} value={position} > {position} </option>
              )}
            </select>
          </div>
        </div> */}

        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 ">
          <div class="col">
            Experience
            <select
              onChange={e => handleExpChange(e)}>
              {experiences.map(experience =>
                <option key={experience} value={experience} > {experience}</option>
              )}
            </select>
          </div>
        </div>

      </div>



        <div class="mt-4">
          <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead class="thead-light">
                  <tr>
                    <th style={{fontWeight:'bold'}}>ID</th>
                    <th style={{fontWeight:'bold'}}>Department</th>
                    <th style={{fontWeight:'bold'}}>Position</th>
                    <th style={{fontWeight:'bold'}}>Name</th>
                    <th style={{fontWeight:'bold'}}>University</th>
                    <th style={{fontWeight:'bold'}}>Experience</th>
                    <th style={{fontWeight:'bold'}}>Age</th>
                    <th style={{fontWeight:'bold'}}>Applied On</th>
                    <th style={{fontWeight:'bold'}}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {record.length > 0 ?
                  
                    filteredCandidates.map((item,index)=>
                      <tr key={index}> 
                        <td>{index + 1}</td>
                        <td>{item.department}</td>
                        <td>{item.position}</td>
                        <td>{item.fullname}</td>
                        <td>{item.university}</td>
                        <td>{item.work_experience}</td>
                        <td>{getAge(item.dob)}</td>
                        <td>{moment(item.apply_date).format('DD MMM YYYY')}</td>
                        <td>
                          <button target="_blank" class="btn btn-info" onClick={(e)=>candidateDetails(item._id)} >Details</button>
                        </td>
                      </tr>
                    )
                    :
                    <div class='d-flex justify-content-center mt-3 mb-3'><a style={{fontWeight:'bold', color:'red'}}>No Data Found</a></div>
                    
                  }
                </tbody>
                
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidatesPerJob