import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SERVER_URL } from '../../../services/helper';
import HashLoader from 'react-spinners/HashLoader';

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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

// Exporting the component at the top level
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
        setError('Please enter both email and password');
        return;
    }

    setError(null);
    setLoading(true);

    try {
        const response = await fetch(`${SERVER_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error || 'Login failed');
            return;
        }

        const data = await response.json();

        if (data.user) {
          navigate('/dashboard');
            localStorage.setItem('token', data.user);
            
        } else {
            setError('Unexpected error occurred. Please try again.');
        }
    } catch (err) {
        console.error('Error during login:', err);
        setError('Something went wrong. Please try again later.');
    } finally {
        setLoading(false);
    }
};

return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
            <CRow className="justify-content-center">
                <CCol md={8}>
                    <CCardGroup>
                        <CCard className="p-4 shadow">
                            <CCardBody>
                                <CForm onSubmit={loginSubmit}>
                                    <h1>Login</h1>
                                    <p className="text-medium-emphasis">Sign in to your account</p>

                                    {error && <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>}

                                    {loading ? (
                                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                            <HashLoader color="#36d7b7" loading={loading} size={75} />
                                        </div>
                                    ) : (
                                        <>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    placeholder="Email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    placeholder="Password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CButton type="submit" color="primary" className="px-4">
                                                        Login
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </>
                                    )}
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
    </div>
);
};

export default Login;
