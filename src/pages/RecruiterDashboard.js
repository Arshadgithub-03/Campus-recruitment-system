// src/pages/RecruiterDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/recruiter/jobs');
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs', err);
      }
    };
    fetchJobs();
  }, []);

  const handleCreateJob = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/recruiter/jobs',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      alert('Job posted successfully!');
    } catch (err) {
      console.error('Error posting job', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Recruiter Dashboard</h2>
      <h3>Create Job Posting</h3>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreateJob}>Post Job</button>

      <h3>Job Postings</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecruiterDashboard;
