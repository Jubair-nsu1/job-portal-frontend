import {useEffect,useState} from 'react';
import axios from "axios";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SERVER_URL } from '../../../services/helper';
import ybackground from './images/y-background.png'
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import HashLoader from 'react-spinners/HashLoader';

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
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    university: '',
    subject: '',
    degree: '',
    cgpa: '',
    uniPassingYear: '',
    isFresher: false,
    employerName: '',
    workExperience: '',
    currentDesignation: '',
    currentSalary: '',
    resume: '',
    coverLetter: '',
    knowingMedia: '',
    expectedSalary: '',
  });

  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  // Get Specific Job Details
  const JobDetailById = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/viewJob/${params.id}`);
      const data = await response.json();
      setRecord(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    JobDetailById(params.id);
  }, [params.id]);

  // Go back to job details
  const GoBack = (id) => {
    navigate(`/jobDetails/${id}`);
  };

  // Line break component
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 3,
      }}
    />
  );

  // Email Validator
  const validateEmail = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter your valid BYLC email');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    validateEmail();
  }, [formData.email]);

  // Handle Fresher checkbox change
  const checkFresher = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    if (isChecked) {
      setFormData((prevState) => ({
        ...prevState,
        isFresher: true,
        employerName: 'N/A',
        workExperience: '0',
        currentDesignation: 'N/A',
        currentSalary: 'N/A',
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        isFresher: false,
      }));
    }
  };

  // Handle form submission
  const FormSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).every((field) => field !== '' && field !== null)) {
      setValid(true);
      const form = new FormData();
      let jobId = params.id;
      let position = record.designation;
      let department = record.department;

      if (formData.isFresher) {
        setFormData((prevState) => ({ ...prevState, isFresher: 'Yes' }));
      }

      Object.keys(formData).forEach((key) => {
        if (key !== 'resume' && key !== 'coverLetter') {
          form.append(key, formData[key]);
        }
      });

      form.append('jobId', jobId);
      form.append('position', position);
      form.append('department', department);

      // Append files
      form.append('resume', formData.resume);
      form.append('coverLetter', formData.coverLetter);

      await axios.post(`${SERVER_URL}/api/jobApplication`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSubmitted(true);
    }
  };

    

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <HashLoader color="#36d7b7" loading={loading} size={150} />
        </div>
        ) : (
        <>
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
        </>
      )}
    </div>
  )
}

export default Form
