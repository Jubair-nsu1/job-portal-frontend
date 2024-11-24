import { useState , useEffect , useRef  } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const moment = require('moment');
import CIcon from '@coreui/icons-react'
import {SERVER_URL} from '../../../services/helper'
import {SERVER_URL_JOBS} from '../../../services/helper'


import {
  cilLifeRing,
  cilDelete,
  cilHighlighter
} from '@coreui/icons'
import {
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'

const CreatedJobs = () => {
  const navigate = useNavigate();
  const params = useParams(); // Get ID from URL
  const [record,setRecord] = useState([])
  const [candidateRecord,setCandidateRecord] = useState([])
  const [totalCandidates, setTotalCandidates] = useState();
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

    //Get All Jobs data 
    const getAllJobsData = async () =>{
      await fetch(`${SERVER_URL}/api/viewJobs`)
        .then(resposne=> resposne.json())
        .then(res=>setRecord(res))
    }

    //Get All Candidates data 
    const getAllCandidatesData = async () =>{
      await fetch(`${SERVER_URL}/api/viewCandidates`)
        .then(resposne=> resposne.json())
        .then(res=>setCandidateRecord(res))
    }
    useEffect(() => {
        getAllJobsData();
    },[])  


    //Delete a Job
    const handleClickDelete = async (id) => { 
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (userConfirmed) {
        await fetch(`${SERVER_URL}/api/deleteJob/${id}`)
          .then(resposne=> resposne.json())
          .then( setRecord(record.filter(item => item._id !== id)) )
          .then(setMessage("Job Deleted!"))
          
      }
      else{
        console.log("Delete operation canceled by the user.");
        //Toast Message
      }
    } 

    //Count total Candidates per job
    const CountTotalCandidates = async (id) => { 
      await fetch(`${SERVER_URL}/api/totalCandidatesPerJob/${id}`)
        .then(resposne=> resposne.json())
        .then(res=>setTotalCandidates(res))
    } 

    //Update a Update Job Page
    const handleClickUpdate = async (id) => { 
      navigate(`/circular/updateJob/${id}`);
    } 

    //View Specific candidates
    const ViewCandidates = async (id) => { 
      navigate(`/circular/createdJobs/candidates/${id}`);
    }

    //Takes to Job Page
    const handleClickViewJob = async (id) => { 
      window.open(`${SERVER_URL_JOBS}/jobDetails/${id}`)
    } 

    //Custom CSS
    function changeBackground(e) {
      e.target.style.background = 'red';
    }

    
  return (
    <div>
      <center><h3>Manage Jobs</h3></center>
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

      <div class="container border shadow row mt-3 mb-5">
          <h5 class="mt-3 mb-3 text-secondary" style={{fontWeight:'bold'}}>
            View Created Jobs 
          </h5>


          {record.map((item,index)=> 
            
            <div class="card mt-2 mb-2">
              <div class="card-body">
                <div class='d-flex justify-content-between'>
                  <h6 style={{fontWeight:'bold'}}>{item.designation}, {item.department}</h6>
                  <div>
                    <span class="badge rounded-pill text-bg-success shadow-sm border border-success"><a style={{color:'white'}}>Active</a></span>
                  </div>
                  <div>  
                    <CIcon icon={cilHighlighter} height={18} style={{ cursor: 'pointer' , color:'blue'}} onClick={(e)=>handleClickUpdate(item._id)} />&nbsp;&nbsp;
                    <CIcon icon={cilDelete} height={18} style={{ cursor: 'pointer' , color:'red'}} onClick={(e)=>handleClickDelete(item._id)} />
                  </div>
                </div>
                
                <a style={{fontWeight:'bold', fontSize:'12px', color:'gray'}}>{item.job_location} | Application deadline: {moment(item.application_deadline).format('DD MMM YY')}</a><br/><br/>
                
                <div class='d-flex justify-content-between'>
                  <div>
                    <a style={{fontWeight:'bold', fontSize:'14px', color:'red'}}> {totalCandidates} </a>
                    <a style={{fontWeight:'bold', fontSize:'12px'}}>Candidates | </a>
                    <span class="badge badge-sm rounded-pill text-bg-light shadow-sm border" style={{ cursor: 'pointer' , color:'green', }}  onClick={(e)=>ViewCandidates(item._id)}> VIEW CANDIDATES</span>
                  </div>
                  <div>
                    <span class="badge rounded-pill text-bg-primary shadow border" style={{ cursor: 'pointer' , color:'green'}} onClick={(e)=>handleClickViewJob(item._id)}><CIcon icon={cilLifeRing} height={14}/> Live Preview</span>
                  </div>
                  <div>
                    <a style={{fontWeight:'bold', fontSize:'12px', color:'gray'}}>Date Posted: {moment(item.postDate).format('DD MMM YY')}</a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
      </div>

    </div>
  )
}

export default CreatedJobs
