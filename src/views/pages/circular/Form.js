import {useEffect,useState} from 'react';
import axios from "axios";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SERVER_URL } from '../../../services/helper';
import ybackground from './images/y-background.png'
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import {
    CAvatar,
    CButton,
    CCol,
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
  } from '@coreui/react'

const Form = () => {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [university, setUniversity] = useState("");
    const [subject, setSubject] = useState("");
    const [degree, setDegree] = useState("");
    const [cgpa, setCgpa] = useState("");
    const [uniPassingYear, setUniPassingYear] = useState("");
    const [isFresher, setIsFresher] = useState(false);
    const [employerName, setEmployerName] = useState("");
    const [workExperience, setWorkExperience] = useState("");
    const [currentDesignation, setCurrentDesignation] = useState("");
    const [currentSalary, setCurrentSalary] = useState("");
    const [resume, setResume] = useState("");
    const [coverLetter, setCoverLetter] = useState(""); 
    const [knowingMedia, setKnowingMedia] = useState("");
    const [expectedSalary, setExpectedSalary] = useState("");
    
    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState(""); //Status
    const [record,setRecord] = useState([]) //Record stores data fetched from server



    const navigate = useNavigate();
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
    const GoBack = async (id) =>{
        navigate(`/jobDetails/${id}`);
    }

    //Line break
    const ColoredLine = ({ color }) => (
        <hr
            style = {{
                color: color,
                backgroundColor: color,
                height: 3
            }}
        />
    );

    //Email Validator
    const validateEmail = () => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailRegex.test(email)) {
            setError('Please enter your valid BYLC email');
        } else {
            setError('');
        }
    };
    useEffect(() => {
        validateEmail();
    }, [email]);

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid]     = useState(false);
    const [error, setError]     = useState(null);
    const [loading, setLoading] = useState(false);

    async function checkFresher(e){
        let isChecked = e.target.checked;
        if(isChecked){
            setIsFresher(true);
            setEmployerName('N/A');
            setWorkExperience('0');
            setCurrentDesignation('N/A');
            setCurrentSalary('N/A');
        }
        setChecked(!checked)
    }

    async function FormSubmit(e) {
        e.preventDefault();
        
        if(fullname && email && phone && dob && gender && address && university && subject && degree && cgpa && uniPassingYear && resume && coverLetter && expectedSalary && knowingMedia){
            setValid(true);
            //setLoading(true);
            const formData = new FormData();
            let jobId = params.id; //Job ID taken from url
            let position = record.designation; //fetched data
            let department = record.department; //fetched data
    
            if(isFresher==true){
                setIsFresher('Yes');
            }
            
            formData.append("jobId", jobId);
            formData.append("position", position);
            formData.append("department", department);
            formData.append("fullname", fullname);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("dob", dob);
            formData.append("gender", gender);
            formData.append("address", address);
            formData.append("university", university);
            formData.append("subject", subject);
            formData.append("degree", degree);
            formData.append("cgpa", cgpa);
            formData.append("uniPassingYear", uniPassingYear);
            formData.append("isFresher", isFresher);
            formData.append("employerName", employerName);
            formData.append("workExperience", workExperience);
            formData.append("currentDesignation", currentDesignation);
            formData.append("currentSalary", currentSalary);
            formData.append("resume", resume);
            formData.append("coverLetter", coverLetter);
            formData.append("expectedSalary", expectedSalary);
            formData.append("knowingMedia", knowingMedia);

            await axios.post(
                "http://localhost:4000/api/jobApplication",
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
            );

        }
        //Set Form submitted true
        setSubmitted(true);
        //setLoading(false);
    } 

    

  return (
    <div>
        <Navbar/>

        <div style={{ backgroundImage: `url(${ybackground})` , backgroundRepeat: 'no-repeat', backgroundAttachment:'fixed', backgroundSize: '40% 70%' , backgroundPosition: 'top right'}}>
            <div class="container-sm mt-3 mb-5" >    

                {!valid && (
                    <CButton color='secondary' style={{color:'black', fontWeight:'bold'}} variant="outline" shape="rounded-pill" onClick={(e)=>GoBack(record._id)}>Go Back</CButton>
                )}

                {!valid && (
                <div class="d-flex justify-content-center mt-5 mb-2">
                    <h2 style={{color:'green', fontWeight:'bold'}}>Apply here</h2>
                </div>
                )}
                
                <div class='d-flex justify-content-center mb-5'>
                    <h3 style={{color:'darkgreen', fontWeight:'bold'}}>{record.designation}, {record.department}</h3>
                </div>

                <CForm onSubmit={FormSubmit}>
                <div class="container-sm mt-3 border shadow" >

                    {submitted && valid && (
                        <div class='d-flex justify-content-center mt-5'>
                            <div >   
                                <center>
                                    <h1 class='mb-3' style={{fontWeight:'bold' }}>{" "}Thank You {fullname} ! {" "}</h1>
                                    
                                    <div class='mb-2'> Your application has been submitted. </div>
                                    <div class='mb-2'> Please wait for the response. </div>
                                    <div class='mb-3'> Check your email for details and follow-up. </div>
                                    <div class='mb-3'>
                                        <Link to='/'><a style={{color:'darkgreen', fontWeight:'bold'}}>View all opportunities at BYLC</a></Link>
                                    </div>
                                    <CButton target="_blank" href='http://www.bylc.org' color='success' style={{color:'white', fontWeight:'bold'}} >Visit BYLC website</CButton>
                                </center>
                            </div>
                        </div>
                    )}

                    {!valid && (
                        <h3 class='mt-3' style={{color:'green', fontWeight:'bold'}}>Basic Information</h3>  
                    )}

                    <div className="row g-3 mt-2">
                        {!valid && (
                            <CCol md={6} style={{fontWeight:'bold'}}>
                                <CFormInput  type="text" label="Full Name *" name="fullname" value={fullname} onChange={e => setFullname(e.target.value)}/>
                            </CCol>
                        )}
                        {submitted && !fullname && (
                            <span id="name-error" style={{color:'red'}}>Please enter your name</span>
                        )}
                        <CCol md={6} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormInput type="email" id="email" label="Email *" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                            )}
                            {submitted && !email && (
                                <span id="email-error" style={{color:'red'}}>Please enter your email</span>
                            )}
                            {submitted && email && error && (
                                <span id="email-error">{error}</span>
                            )}
                        </CCol>

                        <CCol md={4} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormInput type="phone" id="phone" label="Phone *" name="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                            )}
                            {submitted && !phone && (
                                <span id="email-error" style={{color:'red'}}>Please enter your phone number</span>
                            )}
                        </CCol>
                        <CCol md={4} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormInput type="date" id="dob" label="Date of birth *" name="dob" value={dob} onChange={e => setDob(e.target.value)}/>
                            )}
                            {submitted && !dob && (
                                <span id="email-error" style={{color:'red'}}>Please select your date of birth</span>
                            )}
                        </CCol>
                        <CCol md={4} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormSelect id="gender" label="Gender *" name="gender" value={gender} onChange={e => setGender(e.target.value)}>
                                    <option selected>-- Select gender --</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </CFormSelect>
                            )}
                            {submitted && !gender && (
                                <span id="email-error" style={{color:'red'}}>Please select your gender</span>
                            )}
                        </CCol>

                        <CCol xs={12} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormInput id="address" label="Present Address *" placeholder="Mirpur, Dhaka" name="address" value={address} onChange={e => setAddress(e.target.value)}/>
                            )}
                            {submitted && !address && (
                                <span id="email-error" style={{color:'red'}}>Please enter your address</span>
                            )}
                        </CCol>

                        {!valid && (
                        <>
                            <div class='mt-4'> <ColoredLine color="black" /></div>
                            <h3 class='mt-4' style={{color:'green', fontWeight:'bold'}}>Education (Last Academic Information)</h3>
                        </>
                        )}

                        <CCol md={12} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormInput type="text" label="University name *" placeholder='Dhaka University' name="university" value={university} onChange={e => setUniversity(e.target.value)}/>
                            )}
                            {submitted && !university && (
                                <span id="email-error" style={{color:'red'}}>Please enter your university name</span>
                            )}
                        </CCol>
                        <CCol md={4} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormInput type="text" label="Subject/Major *" placeholder='Computer Science' name="subject" value={subject} onChange={e => setSubject(e.target.value)}/>
                            )}
                            {submitted && !subject && (
                                <span id="email-error" style={{color:'red'}}>Please enter your subect</span>
                            )}
                        </CCol>
                        <CCol md={4} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormSelect label="Degree *" name="degree" value={degree} onChange={e => setDegree(e.target.value)}>
                                <option selected>-- Select degree --</option>
                                <option>BA</option>
                                <option>BBA</option>
                                <option>BSc</option>
                                <option>BBA</option>
                                <option>MA</option>
                                <option>MBA</option>
                                <option>MSc</option>
                                <option>Other Bachalors</option>
                                <option>Other Masters</option>
                                <option>HSC</option>
                                <option>SSC</option>
                                <option>N/A</option>
                                </CFormSelect>
                            )}
                            {submitted && !degree && (
                                <span id="degree-error" style={{color:'red'}}>Please select your degree</span>
                            )}
                        </CCol>

                        {!valid && (
                            <CCol md={4} style={{fontWeight:'bold'}}>
                                <CFormInput type="text" label="CGPA *" placeholder='3.50' name="cgpa" value={cgpa} onChange={e => setCgpa(e.target.value)}/>
                            </CCol>
                        )}
                        {submitted && !cgpa && (
                            <span id="cgpa-error" style={{color:'red'}}>Please select your CGPA</span>
                        )}

                        {!valid && (
                            <CCol md={6} style={{fontWeight:'bold'}}>
                                <CFormInput type="text" label="Passing Year *" placeholder='2020' name="uniPassingYear" value={uniPassingYear} onChange={e => setUniPassingYear(e.target.value)}/>
                            </CCol>
                        )}
                        {submitted && !uniPassingYear && (
                            <span id="uniPassingYear-error" style={{color:'red'}}>Please enter your passing year</span>
                        )}

                        {!valid && (
                        <>
                        <div class='mt-4'> <ColoredLine color="black" /></div>

                        <h3 class='mt-4' style={{color:'green', fontWeight:'bold'}}>Work Experience</h3>
                        
                            <CCol xs={12} style={{fontWeight:'bold'}}>
                                <CFormCheck type="checkbox" checked={checked} label="I am a fresher" onChange={e => checkFresher(e)} />
                            </CCol>

                            <CCol md={12} style={{fontWeight:'bold'}}>
                                <CFormInput disabled={checked} type='number' label="Total years of work experience *" placeholder='10' name="workExperience" value={workExperience} onChange={e => setWorkExperience(e.target.value)}/>
                            </CCol>

                            <CCol md={6} style={{fontWeight:'bold'}}>
                                <CFormInput disabled={checked} type='text' label="Current/Last employer name *" placeholder='Google' name="employerName" value={employerName} onChange={e => setEmployerName(e.target.value)}/>
                            </CCol>
                            <CCol md={6} style={{fontWeight:'bold'}}>
                                <CFormInput disabled={checked} type='text' label="Current/Last designation *" placeholder='Manager' name="currentDesignation" value={currentDesignation} onChange={e => setCurrentDesignation(e.target.value)}/>
                            </CCol>

                            <CCol md={6} style={{fontWeight:'bold'}}>
                                <CFormInput disabled={checked} type='number' label="Current Salary *" name="currentSalary" value={currentSalary} onChange={e => setCurrentSalary(e.target.value)}/>
                            </CCol>
                        </>
                        )}

                        {!valid && (<div class='mt-4'> <ColoredLine color="black" /></div>)}

                        {!valid && (
                        <h3 class='mt-4' style={{color:'green', fontWeight:'bold'}}>CV/Resume</h3>
                        )}

                        <CCol xs={12} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormLabel htmlFor="formFile">Upload CV/Resume * (PDF file only & size should be less than 1MB)</CFormLabel>
                            )}
                            {!valid && (
                                <CFormInput type="file" accept='application/pdf' id="resumeFile" onChange={(e) => setResume(e.target.files[0])}/>
                            )}
                            {submitted && !resume && (
                                <span id="resume-error" style={{color:'red'}}>Please upload your CV</span>
                            )}    
                        </CCol>
                        <CCol xs={12} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormLabel htmlFor="formFile">Write a cover letter *</CFormLabel>
                            )}
                            {!valid && (
                                <CFormTextarea type="text" rows="4" placeholder='Write your qualifications, experience and interests for the postion' value={coverLetter} id="coverLetter" onChange={(e) => setCoverLetter(e.target.value)}/>
                            )}
                            {submitted && !coverLetter && (
                                <span id="coverLetter-error" style={{color:'red'}}>Please write the cover Letter</span>
                            )}      
                        </CCol>

                        {!valid && (
                            <CCol md={6} style={{fontWeight:'bold'}}>
                                <CFormSelect id="knowing_media" label="How do know about us *" name="knowingMedia" value={knowingMedia} onChange={e => setKnowingMedia(e.target.value)}>
                                    <option selected>-- Select one --</option>
                                    <option>LinkedIn</option>
                                    <option>BDJobs</option>
                                    <option>Facebook</option>
                                    <option>BYLC Website</option>
                                    <option>Internal Reference</option>
                                </CFormSelect>
                            </CCol>
                        )}
                        {submitted && !knowingMedia && (
                            <span id="knowingMedia-error" style={{color:'red'}}>Please select a media</span>
                        )} 

                        <CCol md={6} style={{fontWeight:'bold'}}>
                            {!valid && (
                                <CFormInput type='text' label="Expected Salary *" name="expectedSalary" value={expectedSalary} onChange={e => setExpectedSalary(e.target.value)}/>
                            )}
                            {submitted && !expectedSalary && (
                                <span id="expectedSalary-error" style={{color:'red'}}>Please enter your expected salary</span>
                            )}  
                        </CCol>

                        {!valid && (
                            <CCol xs={12}>
                                <CFormCheck type="checkbox" id="gridCheck" label="Check to confirm" required/>
                            </CCol>
                        )}

                        {!valid && (
                            <CCol xs={12} class="mb-4 mt-4">
                                <center><CButton type="submit" color="success" style={{color:'white',fontWeight:'bold'}}> Confirm and Apply</CButton></center>
                            </CCol>
                        )}
                    </div>
                    
                </div>
                </CForm>
            </div>
        </div>

        <Footer/>

    </div>
  )
}

export default Form