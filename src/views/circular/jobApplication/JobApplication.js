import { useState , useEffect , useRef  } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const moment = require('moment');
import CIcon from '@coreui/icons-react'
import {SERVER_URL} from '../../../services/helper'

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
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsF,
} from '@coreui/react'


const JobApplication = () => {

  const navigate = useNavigate();
  const [record,setRecord] = useState([])
  const [totalCandidates, setTotalCandidates] = useState();
  const [departments, setDepartments] = useState(["All", "Ventures", "Procurement", "Marketing", "Finance & Accounts", "OPD", "LDT","RME","Grants","BYLCx"]);
  const [deptSelected, setDeptSelected] = useState("All");
  const [positions, setPositions] = useState(["All", "Intern", "Project Assistant", "Executive", "Senior Executive", "Assistant Manager", "Deputy Manager", "Manager","Senior Manager"]);
  const [positionSelected, setPositionSelected] = useState("All");
  const [experiences, setExperiences] = useState(["Any", "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]);
  const [experienceSelected, setExperienceSelected] = useState("Any");

    //Get All Jobs data 
    const getAllCandidates = async () =>{
      await fetch(`${SERVER_URL}/api/viewCandidates`)
        .then(resposne=> resposne.json())
        .then(res=>setRecord(res))
    }

    //Count Number of Candidates
    const getTotalCandidates = async () =>{
      await fetch(`${SERVER_URL}/api/totalCandidates`)
        .then(resposne=> resposne.json())
        .then(res=>setTotalCandidates(res))
    }

    useEffect(() => {
      getAllCandidates();
      getTotalCandidates();
    },[])  


    //Takes to specific candidate details page
    const candidateDetails = async (id) => {
      navigate(`/circular/jobApplication/${id}`);
    } 

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

    //--- Department/Position/Experience Filter
    const handleDeptChange = e => {
      setDeptSelected(e.target.value)
    }
    const handlePositionChange = e => {
      setPositionSelected(e.target.value)
    }
    const handleExpChange = e => {
      setExperienceSelected(e.target.value)
    }

    let filteredCandidatesbyDept = record;
    if (deptSelected !== "All") {
      filteredCandidatesbyDept = record.filter(rec => rec.department == deptSelected);
    }
    let filteredCandidatesbyPosition = filteredCandidatesbyDept;
    if (positionSelected !== "All") {
      filteredCandidatesbyPosition = filteredCandidatesbyDept.filter(rec => rec.position == positionSelected);
    }
    let filteredCandidatesbyExp = filteredCandidatesbyPosition;
    if (experienceSelected !== "Any") {
      filteredCandidatesbyExp = filteredCandidatesbyPosition.filter(rec => Number(rec.work_experience) <= Number(experienceSelected));
    }
    let filteredCandidates = filteredCandidatesbyExp;
    //--- End of Department Filter
    


  return (
    <div>
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

              <div class="d-flex justify-content-start">
                <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 ">
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
                </div>

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
                <CTable align="middle" className="mb-0 border" hover responsive >
                  <CTableHead color="primary">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CIcon icon={cilPeople} />
                      </CTableHeaderCell>
                      <CTableHeaderCell>Department</CTableHeaderCell>
                      <CTableHeaderCell >Position</CTableHeaderCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell >University</CTableHeaderCell>
                      <CTableHeaderCell>Experience</CTableHeaderCell>
                      <CTableHeaderCell>Age</CTableHeaderCell>
                      <CTableHeaderCell>Applied On</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      {filteredCandidates.length > 0 ?
                            
                            filteredCandidates.map((item,index)=>
                              <CTableRow v-for="item in tableItems" key={index}> 
                                <CTableDataCell>{index + 1}</CTableDataCell>
                                <CTableDataCell>{item.department}</CTableDataCell>
                                <CTableDataCell>{item.position}</CTableDataCell>
                                <CTableDataCell>{item.fullname}</CTableDataCell>
                                <CTableDataCell>{item.university}</CTableDataCell>
                                <CTableDataCell>{item.work_experience}</CTableDataCell>
                                <CTableDataCell>{getAge(item.dob)}</CTableDataCell>
                                <CTableDataCell>{moment(item.apply_date).format('DD MMM YYYY')}</CTableDataCell>
                                <CTableDataCell>
                                  <button target="_blank" class="btn btn-info" onClick={(e)=>candidateDetails(item._id)} >Details</button>
                                </CTableDataCell>
                              </CTableRow>
                            )
                            :
                            <div class='d-flex justify-content-center mt-3 mb-3'><a style={{fontWeight:'bold', color:'red'}}>No Data Found</a></div>
                          }
                  </CTableBody>
                </CTable>
              </div>

          </div>
    </div>
  )
}

export default JobApplication