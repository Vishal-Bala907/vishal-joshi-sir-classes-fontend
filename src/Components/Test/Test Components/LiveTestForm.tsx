import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LiveTestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    testName: "",
    description: "",
    timeDuration: "",
    time: "",
    date: "",
    category: "",
    instructions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your submission logic here
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Create a Live Test</h2>
      <form onSubmit={handleSubmit}>
        {/* Test Name */}
        <div className="mb-3">
          <label htmlFor="testName" className="form-label">
            Test Name
          </label>
          <input
            type="text"
            className="form-control"
            id="testName"
            name="testName"
            placeholder="Enter Test Name"
            value={formData.testName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Test Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Time Duration */}
        <div className="mb-3">
          <label htmlFor="timeDuration" className="form-label">
            Time Duration (in minutes)
          </label>
          <input
            type="number"
            className="form-control"
            id="timeDuration"
            name="timeDuration"
            placeholder="Enter Time Duration"
            value={formData.timeDuration}
            onChange={handleChange}
            required
          />
        </div>

        {/* Time */}
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="time"
            className="form-control"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Maths">Maths</option>
          </select>
        </div>

        {/* Instructions */}
        <div className="mb-3">
          <label htmlFor="instructions" className="form-label">
            Instructions
          </label>
          <textarea
            className="form-control"
            id="instructions"
            name="instructions"
            placeholder="Enter Instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Create Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveTestForm;
