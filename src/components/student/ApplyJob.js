import React, { useState } from 'react';
import axios from 'axios';

const ApplyJob = ({ jobId }) => {
  const [message, setMessage] = useState('');

  const handleApply = async () => {
    try {
      const response = await axios.post(`/api/student/jobs/${jobId}/apply`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying for job:', error);
      setMessage('Failed to apply for the job.');
    }
  };

  return (
    <div className="apply-job">
      <button onClick={handleApply}>Apply for Job</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplyJob;
