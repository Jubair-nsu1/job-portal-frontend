import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
const moment = require('moment');
import { SERVER_URL } from '../../../services/helper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HashLoader from 'react-spinners/HashLoader';

import {
  CButton,
  CCol,
  CRow,
} from '@coreui/react';

const Individual = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const params = useParams(); // Get ID from URL
  const [loading, setLoading] = useState(true);

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
    JobDetailById();
  }, [params.id]);

  // Takes to Apply Form Page when clicking the button
  const ApplyForm = (id) => {
    navigate(`/jobDetails/form/${id}`);
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 3,
      }}
    />
  );

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <HashLoader color="#36d7b7" loading={loading} size={150} />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="container-sm mt-3">
            <Link to="/">
              <CButton color="secondary" style={{ color: 'black', fontWeight: 'bold' }} variant="outline" shape="rounded-pill">
                Go Back
              </CButton>
            </Link>

            <CRow>
              <CCol md={9}>
                <div className="mt-5">
                  <div style={{ color: 'darkgreen', fontWeight: 'bold', fontSize: '48px' }}>{record.designation}</div>
                </div>

                <div className="mt-5">
                  <div><h4 style={{ color: 'black', fontWeight: 'bold' }}>About BYLC</h4></div>
                  <div style={{ color: 'black', fontFamily: 'revert' }}>
                    Bangladesh Youth Leadership Center (BYLC), the country’s first leadership institute, exists to build leadership skills in youth from diverse backgrounds, instill values of empathy, tolerance, and inclusiveness in them to jobs and entrepreneurial opportunities. Our goal is to enable our alumni to have a high impact in the public, private and civil sectors. All of BYLC’s efforts aim to strengthen prosperity, justice, and inclusiveness in societies worldwide.
                  </div>
                </div>

                <div className="mt-5">
                  <div><h4 style={{ color: 'black', fontWeight: 'bold' }}>Purpose</h4></div>
                  <div style={{ color: 'black', fontFamily: 'revert' }}>{record.job_description}</div>
                </div>
              </CCol>

              <CCol md={3}>
                <div className="container-sm mt-4 mb-3 border shadow">
                  <div className="container-sm">
                    <div className="d-grid mt-4">
                      <CButton size="lg" color="primary" style={{ fontWeight: 'bold', fontSize: '16px' }} onClick={() => ApplyForm(record._id)}>
                        Apply Now
                      </CButton>
                    </div>
                    <div className="mt-4">
                      <a style={{ color: 'red', fontWeight: 'bold' }}>Application Deadline:</a><br />
                      <a>{moment(record.application_deadline).format('DD MMM YYYY')}</a>
                    </div>
                    <div className="mt-3">
                      <a style={{ color: 'red', fontWeight: 'bold' }}>Department:</a><br />
                      <a style={{ color: 'black', fontFamily: 'revert' }}>{record.department}</a>
                    </div>
                    <div className="mt-3">
                      <a style={{ color: 'red', fontWeight: 'bold' }}>Employment Type:</a><br />
                      <a style={{ color: 'black', fontFamily: 'revert' }}>{record.employment_type}</a>
                    </div>
                    <div className="mt-3">
                      <a style={{ color: 'red', fontWeight: 'bold' }}>Location:</a><br />
                      <a style={{ color: 'black', fontFamily: 'revert' }}>{record.job_location}</a>
                    </div>
                    <div className="mt-3">
                      <a style={{ color: 'red', fontWeight: 'bold' }}>Workplace Type:</a><br />
                      <a style={{ color: 'black', fontFamily: 'revert' }}>{record.job_nature}</a>
                    </div>
                    <div className="mt-3 mb-4">
                      <a style={{ color: 'red', fontWeight: 'bold' }}>Compensation:</a><br />
                      <a style={{ color: 'black', fontFamily: 'revert' }}>Negotiable</a>
                    </div>
                  </div>
                </div>
              </CCol>

              <CCol md={9}>
                <div className="mt-5">
                  <div><h4 style={{ color: 'black', fontWeight: 'bold' }}>Major responsibilities (detailed job description will be available for short-listed candidates)</h4></div>
                  <a style={{ color: 'black', fontFamily: 'revert', whiteSpace: 'pre-wrap' }}><div dangerouslySetInnerHTML={{ __html: record.major_responsibilities }}></div></a>
                </div>

                <div className="mt-5">
                  <div><h4 style={{ color: 'black', fontWeight: 'bold' }}>Education</h4></div>
                  <div style={{ color: 'black', fontFamily: 'revert', whiteSpace: 'pre-wrap' }}>{record.education_requirement}</div>
                </div>

                <div className="mt-5">
                  <div><h4 style={{ color: 'black', fontWeight: 'bold' }}>Experience</h4></div>
                  <div style={{ color: 'black', fontFamily: 'revert', whiteSpace: 'pre-wrap' }}>{record.experience_details}</div>
                </div>

                <div className="mt-5">
                  <div><h4 style={{ color: 'black', fontWeight: 'bold' }}>Required Technical Skills</h4></div>
                  <div style={{ color: 'black', fontFamily: 'revert', whiteSpace: 'pre-wrap' }}>{record.technical_skills}</div>
                </div>

                <div className="mt-5">
                  <div><h4 style={{ color: 'black', fontWeight: 'bold' }}>Required Soft Skills</h4></div>
                  <div style={{ color: 'black', fontFamily: 'revert', whiteSpace: 'pre-wrap' }}>{record.soft_skills}</div>
                </div>
              </CCol>

              <CCol xs={12} className="mb-4 mt-4">
                <center>
                  <CButton color="info" style={{ color: 'black', fontWeight: 'bold' }} variant="outline" shape="rounded-pill" onClick={() => ApplyForm(record._id)}>
                    Apply Now
                  </CButton>
                </center>
              </CCol>
              <div className="mb-3">
                <center><Link to="/"><a style={{ color: 'darkgreen', fontWeight: 'bold' }}>View all opportunities at BYLC</a></Link></center>
              </div>

            </CRow>

            <div className="mt-5 mb-5">
              <ColoredLine color="darkgreen" />
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};

export default Individual;
