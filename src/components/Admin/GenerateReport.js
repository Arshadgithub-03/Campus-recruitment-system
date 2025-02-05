import React, { useState } from "react";
import { generateReport } from "../../services/adminServices";

const GenerateReport = () => {
  const [reportData, setReportData] = useState({
    type: "",
    startDate: "",
    endDate: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await generateReport(reportData, token);
      setMessage("Report generated successfully");
      setError(null);
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Generate Report</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Report Type:
          <input
            type="text"
            name="type"
            value={reportData.type}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={reportData.startDate}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={reportData.endDate}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Generate</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default GenerateReport;
