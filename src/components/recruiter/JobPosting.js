import React, { useState } from 'react';
import axios from 'axios';

const JobPosting = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/recruiter/jobs',
        { title, description, requirements },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Job created successfully!');
      setTitle('');
      setDescription('');
      setRequirements('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating job');
    }
  };

  return (
    <div>
      <h2>Create Job Posting</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Requirements:</label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default JobPosting;
