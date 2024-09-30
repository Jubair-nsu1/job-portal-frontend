import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {SERVER_URL} from '../../../services/helper'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function loginSubmit(event) {
    event.preventDefault();
        //setLoading(true);

        if(!email && !password){
            setError("Please enter your email and password")
        }
        else if(!email){
            setError("Please enter your email")
        }
        else if(!password){
            setError("Please enter your password")
        }
        else{
          setError('')
          
          const userData = {
            email,
            password,
          }
                    
          // Send login request to backend
          try{
              const response = await fetch(`${SERVER_URL}/api/login`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(userData),
                });
              
                const data = await response.json()
              //   setSuccess(false);
                if (data.user) {
                    localStorage.setItem('token', data.user)
                    console.log('Login Success')
                    console.log(data.name)
                    console.log(data.user)
  
                    window.location = "/dashboard";
                    // navigate('/dashboard');
                    // setSuccess(true);
                    // setLoading(false);
                } 
                else {
                  //   alert('Please check your username and password')
                  //  setError(data.error);
                  setError('Wrong Credentials!');
                }  
          } 
          catch (error) {
              console.log(error);
          }
        }



  }
  
  // pass: Bylcjob@2024

  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              
              <CCard className="p-4 shadow" >
                <CCardBody>
                  
                  <CForm onSubmit={loginSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                
                    {error && (
                      <span style={{fontWeight:'bold'}}>{error}</span>
                    )}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Username" 
                        autoComplete="username" 
                        type='email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Password"
                        autoComplete="current-password"
                        type="password"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton style={{fontWeight:'bold'}} type='submit' color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>

                </CCardBody>
              </CCard>
              
              <CCard className="text-white bg-primary py-5">
                <CCardBody className="text-center">
                  <div>
                    <h2 style={{fontFamily:'cursive', fontWeight:'bolder'}}>BYLC JOB PORTAL</h2>
                    <p>
                      Developed by BYLC IT @ 2024
                    </p>
                    <Link to="/career">
                      <CButton style={{fontWeight:'bold', color:'blue'}} color="light" className="mt-3" >
                        Visit BYLC Career
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
