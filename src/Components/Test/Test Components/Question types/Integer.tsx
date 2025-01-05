import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { addIntegerQuestion } from "@/server/tests";
import {
  setBiologyCount,
  setChemistryCount,
  setMathsCount,
  setPhysicsCount,
} from "@/Redux/Reducers/TestCounterSlice";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS

interface Props {
  type: string;
}

const TestQuestionForm = ({ type }: Props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    level: "easy",
    type: type,
    description: "",
    correctAnswer: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, description: value }));
  };

  const testId = useSelector((state: RootState) => state.testCounter.testId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addIntegerQuestion(formData, testId)
      .then((data) => {
        if (formData.subject === "physics") {
          dispatch(setPhysicsCount());
        } else if (formData.subject === "chemistry") {
          dispatch(setChemistryCount());
        } else if (formData.subject === "maths") {
          dispatch(setMathsCount());
        } else if (formData.subject === "biology") {
          dispatch(setBiologyCount());
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // Reset form fields
    setFormData({
      subject: "",
      topic: "",
      subtopic: "",
      level: "easy",
      type: "integer",
      description: "",
      correctAnswer: "",
    });
  };

  return (
    <div className="w-100">
      <div className="d-flex flex-row justify-content-center align-items-center">
        <form className="w-100 container mt-4" onSubmit={handleSubmit}>
          {/* Type */}
          <div className="mb-3 w-75">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <input
              id="type"
              name="type"
              className="form-select w-100"
              value={type}
              type="text"
              readOnly
              required
            />
          </div>

          {/* Subject */}
          <div className="mb-3 w-75">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="form-select"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select Subject</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="maths">Maths</option>
              <option value="biology">Biology</option>
            </select>
          </div>

          {/* Topic */}
          <div className="mb-3 w-75">
            <label htmlFor="topic" className="form-label">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              className="form-control"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Enter topic"
              required
            />
          </div>

          {/* Subtopic */}
          <div className="mb-3 w-75">
            <label htmlFor="subtopic" className="form-label">
              Subtopic
            </label>
            <input
              type="text"
              id="subtopic"
              name="subtopic"
              className="form-control"
              value={formData.subtopic}
              onChange={handleChange}
              placeholder="Enter subtopic"
            />
          </div>

          {/* Level */}
          <div className="mb-3 w-75">
            <label htmlFor="level" className="form-label">
              Level
            </label>
            <select
              id="level"
              name="level"
              className="form-select"
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-3 w-75">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Enter detailed description with formulas"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [
                    { script: "sub" }, // Subscript
                    { script: "super" }, // Superscript
                  ],
                  ["link", "formula"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "list",
                "bullet",
                "script",
                "link",
                "formula",
              ]}
            />
          </div>

          {/* Correct Answer */}
          <div className="mb-3 w-75">
            <label htmlFor="correctAnswer" className="form-label">
              Correct Answer
            </label>
            <input
              type="text"
              id="correctAnswer"
              name="correctAnswer"
              className="form-control"
              value={formData.correctAnswer}
              onChange={handleChange}
              placeholder="Enter correct answer"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestQuestionForm;
