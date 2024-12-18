import {
  setBiologyCount,
  setChemistryCount,
  setMathsCount,
  setPhysicsCount,
} from "@/Redux/Reducers/TestCounterSlice";
import { RootState } from "@/Redux/Store";
import { addSelectTypeQuestion } from "@/server/tests";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;

    if (type === "file") {
      const input = e.target as HTMLInputElement;
      const files = input.files;

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
  };
  // console.log(formData);

  const testId = useSelector((state: RootState) => state.testCounter.testId);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form data without image files, assume images are base64 encoded
    // const requestData = {
    //   subject: formData.subject,
    //   topic: formData.topic,
    //   subtopic: formData.subtopic,
    //   level: formData.level,
    //   type: type,
    //   description: formData.description,
    //   optionType: formData.optionType,
    //   correctAnswer: formData.correctAnswer,
    //   textOptionsA: formData.textOptionsA,
    //   textOptionsB: formData.textOptionsB,
    //   textOptionsC: formData.textOptionsC,
    //   textOptionsD: formData.textOptionsD,
    //   imageOptionsA: formData.imageOptionsA,
    //   imageOptionsB: formData.imageOptionsB,
    //   imageOptionsC: formData.imageOptionsC,
    //   imageOptionsD: formData.imageOptionsD,
    //   descriptionImage: formData.descriptionImage, // Send base64 or image URL
    // };

    // console.log(requestData);
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

  // const getFieldStyle = (fieldName: string) =>
  //   adminMarkedFields[fieldName] ? { border: "2px solid green" } : {};

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
          defaultValue={"physics"}
          required
          // style={getFieldStyle("subject")}
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
          // style={getFieldStyle("topic")}
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
          // style={getFieldStyle("subtopic")}
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
          // style={getFieldStyle("level")}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Type Field */}
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type
        </label>
        <input
          id="text"
          name="type"
          className="form-control"
          value={type}
          onChange={handleChange}
          contentEditable="false"
          required
          // style={getFieldStyle("type")}
        >
          {/* <option value="single select">Single Select</option>
          <option value="multi select">Multi Select</option> */}
        </input>
      </div>

      {/* Description Field */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          required
          // style={getFieldStyle("description")}
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
          // style={getFieldStyle("descriptionImage")}
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
            <input
              type="text"
              name={`textOptions${option}`}
              className="form-control"
              value={formData[`textOptions${option}`]}
              onChange={handleChange}
              placeholder={`Option ${option}`}
              required
              // style={getFieldStyle(`textOptions${option}`)}
            />
            <input
              type="file"
              name={`imageOptions${option}`}
              className="form-control mt-2"
              onChange={handleChange}
              accept="image/*"
              // style={getFieldStyle(`imageOptions${option}`)}
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
              // required
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
