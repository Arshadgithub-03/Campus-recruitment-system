// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users', err);
      }
    };
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/admin/reports');
        setReports(response.data);
      } catch (err) {
        console.error('Error fetching reports', err);
      }
    };
    fetchUsers();
    fetchReports();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} ({user.role})</li>
        ))}
      </ul>

      <h3>Reports</h3>
      <ul>
        {reports.map((report) => (
          <li key={report._id}>{report.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
