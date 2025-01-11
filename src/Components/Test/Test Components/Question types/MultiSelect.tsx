import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill"; // Import ReactQuill
import {
  setBiologyCount,
  setChemistryCount,
  setMathsCount,
  setPhysicsCount,
} from "@/Redux/Reducers/TestCounterSlice";
import { RootState } from "@/Redux/Store";
import { addSelectTypeQuestion } from "@/server/tests";

interface TestQuestionFormData1 {
  subject: string;
  topic: string;
  subtopic: string;
  level: "easy" | "medium" | "hard";
  type: "select";
  description: string;
  descriptionImage: string | null; // Base64 string or URL
  optionType: "text" | "textImage";
  textOptionsA: string;
  textOptionsB: string;
  textOptionsC: string;
  textOptionsD: string;
  imageOptionsA: string | null; // Base64 string or URL
  imageOptionsB: string | null;
  imageOptionsC: string | null;
  imageOptionsD: string | null;
  correctAnswer: string[];
}

interface Props {
  type: string;
}

const MultiSelectWithCheckboxes = ({ type }: Props) => {
  const [formData, setFormData] = useState<TestQuestionFormData1>({
    subject: "physics",
    topic: "",
    subtopic: "",
    level: "easy",
    type: "select",
    description: "",
    descriptionImage: null,
    optionType: "text",
    textOptionsA: "",
    textOptionsB: "",
    textOptionsC: "",
    textOptionsD: "",
    imageOptionsA: null,
    imageOptionsB: null,
    imageOptionsC: null,
    imageOptionsD: null,
    correctAnswer: [],
  });

  const dispatch = useDispatch();
  const testId = useSelector((state: RootState) => state.testCounter.testId);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Check if the event target is an HTMLInputElement
    if (e.target instanceof HTMLInputElement) {
      const { checked } = e.target;

      if (type === "file") {
        const files = e.target.files;

        if (files && files[0]) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result as string;
            setFormData((prev) => ({ ...prev, [name]: base64Image }));
          };
          reader.readAsDataURL(files[0]);
        }
      } else if (name === "correctAnswer") {
        const updatedCorrectAnswers = checked
          ? [...formData.correctAnswer, value]
          : formData.correctAnswer.filter((answer) => answer !== value);
        setFormData((prev) => ({
          ...prev,
          correctAnswer: updatedCorrectAnswers,
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      // Handle non-input elements (select, textarea, etc.)
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addSelectTypeQuestion(formData, testId)
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
        setFormData({
          subject: "physics",
          topic: "",
          subtopic: "",
          level: "easy",
          type: "select",
          description: "",
          descriptionImage: null,
          optionType: "text",
          textOptionsA: "",
          textOptionsB: "",
          textOptionsC: "",
          textOptionsD: "",
          imageOptionsA: null,
          imageOptionsB: null,
          imageOptionsC: null,
          imageOptionsD: null,
          correctAnswer: [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      {/* Subject Field */}
      <div className="mb-3">
        <label htmlFor="subject" className="form-label">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="form-control"
          value={formData.subject}
          onChange={handleChange}
          required
        >
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="maths">Mathematics</option>
          <option value="biology">Biology</option>
        </select>
      </div>

      {/* Topic Field */}
      <div className="mb-3">
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
          required
        />
      </div>

      {/* Subtopic Field */}
      <div className="mb-3">
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
          required
        />
      </div>

      {/* Level Field */}
      <div className="mb-3">
        <label htmlFor="level" className="form-label">
          Level
        </label>
        <select
          id="level"
          name="level"
          className="form-control"
          value={formData.level}
          onChange={handleChange}
          required
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Description Field */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <ReactQuill
          theme="snow"
          value={formData.description}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, description: value }))
          }
          placeholder="Enter detailed description"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              ["link", "formula"],
            ],
          }}
          formats={[
            "header", // Headers
            "bold",
            "italic",
            "underline",
            "strike", // Text styles
            "list",
            "bullet", // Lists
            "script", // Subscript/Superscript
            "link",
            "formula", // Links and formulas
          ]}
        />
      </div>

      {/* Description Image Field */}
      <div className="mb-3">
        <label htmlFor="descriptionImage" className="form-label">
          Description Image
        </label>
        <input
          type="file"
          id="descriptionImage"
          name="descriptionImage"
          className="form-control"
          onChange={handleChange}
          accept="image/*"
        />
      </div>

      {/* Options Fields */}
      <div className="mb-3">
        <label className="form-label bg-primary py-2 rounded-3 w-100 text-center">
          Options (images are optional)
        </label>
        {["A", "B", "C", "D"].map((option, index) => (
          <div key={index} className="mb-2">
            <h6>Option {index + 1}</h6>
            <ReactQuill
              theme="snow"
              value={formData[`textOptions${option}`]}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  [`textOptions${option}`]: value,
                }))
              }
              placeholder={`Option ${option}`}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ script: "sub" }, { script: "super" }],
                  ["link", "formula"],
                ],
              }}
              formats={[
                "header", // Headers
                "bold",
                "italic",
                "underline",
                "strike", // Text styles
                "list",
                "bullet", // Lists
                "script", // Subscript/Superscript
                "link",
                "formula", // Links and formulas
              ]}
            />
            <input
              type="file"
              name={`imageOptions${option}`}
              className="form-control mt-2"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
        ))}
      </div>

      {/* Correct Answer Checkbox Fields */}
      <div className="mb-3">
        <label className="form-label">Correct Answer</label>
        {["A", "B", "C", "D"].map((option) => (
          <div key={option} className="form-check">
            <input
              type="checkbox"
              id={`correctAnswer${option}`}
              name="correctAnswer"
              value={option}
              checked={formData.correctAnswer.includes(option)}
              onChange={handleChange}
              className="form-check-input"
            />
            <label
              htmlFor={`correctAnswer${option}`}
              className="form-check-label"
            >
              Option {option}
            </label>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  );
};

export default MultiSelectWithCheckboxes;
