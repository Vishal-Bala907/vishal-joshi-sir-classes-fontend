"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { setTestDetails } from "@/Redux/Reducers/LiveTestSlice";
import { addTestMetaData } from "@/server/tests";
import { setTestId } from "@/Redux/Reducers/TestCounterSlice";

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
  setcreatedTest: React.Dispatch<React.SetStateAction<any>>;
}

interface FormDataType {
  testName: string;
  description: string;
  timeDuration: string;
  time: string;
  date: string;
  category: string;
  instructions: string;
  positiveMarking: string;
  negativeMarking: string;
}

const LiveTestForm: React.FC<LiveTestFormProps> = ({
  setTest,
  setcreatedTest,
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    testName: "",
    description: "",
    timeDuration: "",
    time: "",
    date: "",
    category: "",
    instructions: "",
    positiveMarking: "",
    negativeMarking: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, description: value }));
  };

  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // const data = new FormData();
    // for (const key in formData) {
    //   data.append(key, formData[key as keyof typeof formData]);
    // }
    // console.log(data);
    dispatch(setTestDetails(formData));

    addTestMetaData(formData)
      .then((data) => {
        console.log(data.message._id);
        dispatch(setTestId(data.message._id));
      })
      .catch((err) => {
        console.error(err);
      });
    setcreatedTest(formData);
    // console.log("Form Data Submitted:", Object.fromEntries(data.entries()));
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
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="Enter Test Description"
          />
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
            <option value="JEE">JEE</option>
            <option value="JEE Advance">JEE Advance</option>
            <option value="NEET">NEET</option>
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

        {/* Positive Marking */}
        <div className="mb-3">
          <label htmlFor="positiveMarking" className="form-label">
            Positive Marking (per question)
          </label>
          <input
            type="number"
            className="form-control"
            id="positiveMarking"
            name="positiveMarking"
            placeholder="Enter Positive Marks"
            value={formData.positiveMarking}
            onChange={handleChange}
            required
          />
        </div>

        {/* Negative Marking */}
        <div className="mb-3">
          <label htmlFor="negativeMarking" className="form-label">
            Negative Marking (per question)
          </label>
          <input
            type="number"
            className="form-control"
            id="negativeMarking"
            name="negativeMarking"
            placeholder="Enter Negative Marks"
            value={formData.negativeMarking}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
          <button
            className="btn mx-4 btn-danger"
            onClick={() => {
              setTest("TEST-LIST");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveTestForm;
