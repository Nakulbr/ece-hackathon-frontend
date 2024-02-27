import React, { useState } from "react";
import "./Form.css"; // Import CSS file for styling
import axiosConfig from "../utils/axiosConfig";

const Form = () => {
  const [formData, setFormData] = useState({
    reason: "to ",
    tutorMail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.post("/createRequest", formData);
      if (response.status == 200) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">New Bonafide Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reason" className="form-label">
            Reason:
          </label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="tutorMail"
            value={formData.tutorMail}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
