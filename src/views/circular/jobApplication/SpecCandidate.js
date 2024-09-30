import {useEffect,useState} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import {SERVER_URL} from '../../../services/helper'
const moment = require('moment');
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import pdf2 from '../images/pdf_2.png'
// import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.js",
//     import.meta.url
//   ).toString();

import {
    CButton,
  } from '@coreui/react'

const SpecCandidate = () => {
    const navigate = useNavigate();
    const[record,setRecord] = useState([])
    const params = useParams(); // Get ID from URL
    const [pdfFile, setPdfFile] = useState(null);

    //Get Specific Candidate Details
    const CandidateDetailById = async () =>
    {
        await fetch(`${SERVER_URL}/api/viewCandidate/${params.id}`)
            .then(resposne=> resposne.json())
            .then(res=>setRecord(res))
    }
    useEffect(()=> {
        CandidateDetailById(params.id);
    }, [params.id])

    const showPdf = (pdf) => {
        window.open(`${SERVER_URL}/files/resumes/${pdf}`)
        //setPdfFile(`http://localhost:4000/files/resumes/${pdf}`)
    };

    //Back Page
    const GoBack = async () =>{
        navigate(`/circular/jobApplication/allCandidates`);
    }


    return (
        <div> 
        <CButton color='secondary' style={{color:'black', fontWeight:'bold'}} variant="outline" shape="rounded-pill" onClick={(e)=>GoBack()}>Go Back</CButton> 
        <center><h3>View Candidate Details</h3></center>

            <div class="container border shadow row mt-3 mb-5">
                    <div class="container border mt-4 mb-2 d-flex justify-content-between">
                        <h5 class="mt-3" style={{fontWeight:'bold', color:'darkblue'}}>
                            {record.fullname} 
                        </h5>
                        <h5 class="mt-3" style={{fontWeight:'bold', color:'darkblue'}}>
                        {record.position}, {record.department} 
                        </h5>
                    </div>


                    <div class="container border mt-4 mb-4">
                        <Tabs style={{fontWeight:'bold',fontFamily:'arial'}} defaultActiveKey="personal" id="fill-tab-example" className="mb-3" fill justify>
                            <Tab eventKey="personal" title="Personal Info">
                                <div class="container mb-4">
                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <tbody style={{fontWeight:'bold'}}>
                                            <tr >
                                                <td >Full Name</td>
                                                <td >{record.fullname}</td>
                                            </tr>
                                            <tr>
                                                <td >Gender</td>
                                                <td>{record.gender}</td>
                                            </tr>
                                            <tr>
                                                <td >Date of Birth</td>
                                                <td>{moment(record.dob).format('DD MMM YYYY')}</td>
                                            </tr>
                                            <tr>
                                                <td >Phone</td>
                                                <td>{record.phone}</td>
                                            </tr>
                                            <tr>
                                                <td >Email</td>
                                                <td>{record.email}</td>
                                            </tr>
                                            <tr>
                                                <td >Address</td>
                                                <td>{record.address}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="education" title="Education">
                                <div class="container mb-4">
                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <tbody style={{fontWeight:'bold'}}>
                                            <tr >
                                                <td >University Name</td>
                                                <td >{record.university}</td>
                                            </tr>
                                            <tr>
                                                <td >Subject/Major</td>
                                                <td>{record.subject}</td>
                                            </tr>
                                            <tr>
                                                <td >Degree</td>
                                                <td>{record.degree}</td>
                                            </tr>
                                            <tr>
                                                <td >CGPA</td>
                                                <td>{record.cgpa}</td>
                                            </tr>
                                            <tr>
                                                <td >University Passing Year</td>
                                                <td>{record.uni_passing_year}</td>
                                            </tr>
                                            <tr>
                                                <td >HSC Passing Year</td>
                                                <td>{record.hsc_passing_year}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="professional" title="Professional">
                                <div class="container mb-4">
                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <tbody style={{fontWeight:'bold'}}>
                                            <tr >
                                                <td>Current/Last employer name</td>
                                                <td>{record.current_employer}</td>
                                            </tr>
                                            <tr>
                                                <td>Relevant work experience</td>
                                                <td>{record.work_experience} years</td>
                                            </tr>
                                            <tr>
                                                <td >Current/Last designation</td>
                                                <td>{record.current_designation}</td>
                                            </tr>
                                            <tr>
                                                <td >Current Salary</td>
                                                <td>{record.current_salary}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="resume" title="Resume">
                                <div class="container mb-4">
                                    <center><h6>File Name: {record.resume_file}</h6></center>
                                    <div class='d-flex justify-content-center'>
                                        <div class="card" style={{width:'10rem', cursor: 'pointer'}} onClick={(e)=>showPdf(record.resume_file)}>
                                            <img class="card-img-top mt-2 mb-2" src={pdf2} alt="Card image cap"/>
                                            <div class="card-body bg-black">
                                                <center><p class="card-text" style={{color:'white', fontWeight:'bold', fontSize:'14px'}}>CV of {record.fullname}</p></center>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* <iframe
                                        src="https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0"
                                        height="100%"
                                        width="100%"
                                    ></iframe> */}
                                </div>    
                            </Tab>
                            <Tab eventKey="coverLetter" title="Cover Letter">
                                <div class="container mb-4">
                                    <p style={{whiteSpace:'pre-wrap', fontFamily:'arial', color:'black'}}>{record.cover_letter}</p>
                                </div>
                            </Tab>
                            
                        </Tabs>
                        
                    </div>
            </div>

        </div>
    )
}

export default SpecCandidate