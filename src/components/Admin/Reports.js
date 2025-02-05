import React, { useEffect, useState } from "react";
import { getReports } from "../../services/adminServices";

const Reports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getReports(token);
      setReports(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>System Reports</h2>
      {reports && (
        <ul>
          <li>Students: {reports.students}</li>
          <li>Recruiters: {reports.recruiters}</li>
          <li>Jobs: {reports.jobs}</li>
        </ul>
      )}
    </div>
  );
};

export default Reports;
