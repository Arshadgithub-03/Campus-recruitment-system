import React, { useState } from 'react';
import axios from 'axios';

const UpdateApplication = ({ token, jobId, studentId }) => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/recruiter/jobs/${jobId}/applications/${studentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating application status');
    }
  };

  return (
    <div>
      <h2>Update Application Status</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Select Status</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button type="submit">Update Status</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateApplication;
