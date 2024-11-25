import React, { useEffect, useState } from 'react';
import slide1 from './images/pic1.jpg';
import slide2 from './images/pic1.jpg';
import HashLoader from 'react-spinners/HashLoader';
import { SERVER_URL } from '../../../services/helper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CCol,
  CImage,
  CCarousel,
  CCarouselItem,
} from '@coreui/react';

const Total = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  // Navigate to Job Details Page
  const JobDetails = (id) => {
    navigate(`/jobDetails/${id}`);
  };

  // Fetch All Jobs Data
  const getAllJobsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/api/viewJobs`);
      const data = await response.json();
      setRecord(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobsData();
  }, []);

  return (
    <div>
      <Navbar />

      <CCarousel controls indicators>
        <CCarouselItem>
          <CImage className="d-block w-100" src={slide1} alt="slide 1" />
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" src={slide2} alt="slide 2" />
        </CCarouselItem>
      </CCarousel>

      <div className="d-flex justify-content-center mt-5">
        <div>
          <h1 style={{ color: 'darkgreen', fontWeight: 'bold' }}>JOIN OUR TEAM</h1>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-5">
        <div>
          <h3 style={{ color: 'green', fontWeight: 'bold' }}>VACANCIES</h3>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <HashLoader color="#36d7b7" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container-sm mt-5 shadow">
          {record.length > 0 ? (
            <CAccordion flush>
              {record.map((item, index) => (
                <CAccordionItem key={index}>
                  <CAccordionHeader>
                    <strong style={{ color: 'darkgreen' }}>
                      {item.designation}, {item.department}
                    </strong>
                  </CAccordionHeader>
                  <CAccordionBody style={{ cursor: 'pointer' }} onClick={() => JobDetails(item._id)}>
                    <div className="row g-3 mb-3">
                      <CCol md={4}>
                        <div>
                          <strong>Job Nature:</strong> {item.job_nature}
                        </div>
                      </CCol>
                      <CCol md={4}>
                        <div>
                          <strong>Job Location:</strong> {item.job_location}
                        </div>
                      </CCol>
                      <CCol md={4}>
                        <div>
                          <strong>Application Deadline:</strong> {moment(item.application_deadline).format('DD MMM YYYY')}
                        </div>
                      </CCol>
                    </div>
                    <div className="row g-3">
                      <CCol md={4}>
                        <div>
                          <strong>Employment Type:</strong> {item.employment_type}
                        </div>
                      </CCol>
                      <CCol md={4}>
                        <div>
                          <strong>Experience Needed:</strong> {item.experience_year} years
                        </div>
                      </CCol>
                      <CCol md={4}>
                        <div>
                          <strong style={{ color: 'blue', fontFamily: 'cursive' }}>Click to view details</strong>
                        </div>
                      </CCol>
                    </div>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          ) : (
            <div className="container-sm border d-flex justify-content-center mt-5 mb-5">
              <h2 style={{ color: 'red', fontWeight: 'bold' }}>No Jobs Available</h2>
            </div>
          )}
        </div>
      )}

      <div className="d-flex justify-content-center mt-5">
        <div>
          <h3 style={{ color: 'green', fontWeight: 'bold' }}>ADDITIONAL INFORMATION</h3>
        </div>
      </div>
      <div className="container-sm mt-3 mb-5">
        <ul style={{ color: 'black' }}>
          <li>
            Bangladesh Youth Leadership Center (BYLC) tries to ensure a diverse workforce by providing equal opportunities to
            everyone, irrespective of race, age, gender, sexual orientation, HIV status, class, ethnicity, disability, location,
            and religion.
          </li>
          <li>BYLC follows a strict zero-tolerance on any type of abuse towards children and vulnerable adults.</li>
          <li>All applications will be treated with the strictest confidentiality.</li>
          <li>BYLC does not charge any fee at any stage of the recruitment process (application, interview meeting, or processing).</li>
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default Total;
