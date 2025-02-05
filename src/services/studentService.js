// src/services/studentServices.js
import axios from 'axios';

const API_URL = '/api/students';

// Get job postings
const getJobs = async () => {
  try {
    const response = await axios.get('/api/jobs');
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error fetching jobs');
  }
};

// Apply for a job
const applyForJob = async (jobId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/apply/${jobId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error applying for job');
  }
};

// Update student profile
const updateProfile = async (profileData, token) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error updating profile');
  }
};

export { getJobs, applyForJob, updateProfile };
