import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/student/jobs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Requirements:</strong> {job.requirements}</p>
            <p><strong>Recruiter:</strong> {job.recruiterId.name} ({job.recruiterId.email})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
