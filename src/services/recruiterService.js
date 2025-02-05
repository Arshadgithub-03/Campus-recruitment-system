// src/services/recruiterServices.js
import axios from 'axios';

const API_URL = '/api/recruiter';

// Get job applications for a specific job posting
const getApplications = async (jobId, token) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/${jobId}/applications`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error fetching applications');
  }
};

// Create a new job posting
const createJobPost = async (jobData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/jobs`,
      jobData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error posting job');
  }
};

// Update job posting
const updateJobPost = async (jobId, jobData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/jobs/${jobId}`,
      jobData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error updating job post');
  }
};

// Delete job posting
const deleteJobPost = async (jobId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error deleting job post');
  }
};

export { getApplications, createJobPost, updateJobPost, deleteJobPost };
