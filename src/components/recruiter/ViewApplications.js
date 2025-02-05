import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewApplications = ({ token, jobId }) => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`/api/recruiter/jobs/${jobId}/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching applications');
      }
    };

    fetchApplications();
  }, [jobId, token]);

  return (
    <div>
      <h2>Applications for Job ID: {jobId}</h2>
      {error && <p>{error}</p>}
      {applications.length > 0 ? (
        <ul>
          {applications.map((app) => (
            <li key={app.studentId._id}>
              <p>
                <strong>Name:</strong> {app.studentId.name}
              </p>
              <p>
                <strong>Email:</strong> {app.studentId.email}
              </p>
              <p>
                <strong>Skills:</strong> {app.studentId.skills.join(', ')}
              </p>
              <p>
                <a href={app.studentId.resumeUrl} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default ViewApplications;
