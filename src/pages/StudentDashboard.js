// src/pages/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { getJobs, applyForJob } from '../services/studentServices'; 
import axios from 'axios';

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching job postings', err);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/jobs/${jobId}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application submitted!');
    } catch (err) {
      console.error('Error applying for job', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Student Dashboard</h2>
      <h3>Available Jobs</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>
            <button onClick={() => handleApply(job._id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
