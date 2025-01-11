import { addQuestion } from "@/Redux/Reducers/LiveTestSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface TestQuestionFormData {
  description: string;
  descriptionImage: File | null;
  optionType: "text" | "textImage";
  textOptions: string[];
  imageOptions: { text: string; image: File | null }[];
  correctAnswer: string[]; // Array to store selected answers
}

interface TestMetaData {
  subject: string;
  topic: string;
  subtopic: string;
  level: string;
  type: string;
}

interface Props {
  testMetaData: TestMetaData;
}

const SingleSelect: React.FC<Props> = ({ testMetaData }) => {
  const [formData, setFormData] = useState<TestQuestionFormData>({
    description: "",
    descriptionImage: null,
    optionType: "text",
    textOptions: ["", "", "", ""],
    imageOptions: [
      { text: "", image: null },
      { text: "", image: null },
      { text: "", image: null },
      { text: "", image: null },
    ],
    correctAnswer: [], // Initialize as an empty array
  });

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index?: number
  ) => {
    const { name, value, type } = e.target;

    // File handling for descriptionImage and imageOptions
    if (type === "file") {
      const input = e.target as HTMLInputElement; // Narrow to HTMLInputElement
      const { files } = input;

      if (files && files[0]) {
        if (name === "descriptionImage") {
          setFormData((prev) => ({ ...prev, descriptionImage: files[0] }));
        } else if (name === "imageOptions" && index !== undefined) {
          const updatedOptions = [...formData.imageOptions];
          updatedOptions[index].image = files[0];
          setFormData((prev) => ({ ...prev, imageOptions: updatedOptions }));
        }
      }
    }
    // OptionType change handling
    else if (name === "optionType") {
      setFormData((prev) => ({
        ...prev,
        optionType: value as "text" | "textImage",
        correctAnswer: [], // Reset correctAnswer when optionType changes
      }));
    }
    // Handling textOptions with index
    else if (name === "textOptions" && index !== undefined) {
      const updatedOptions = [...formData.textOptions];
      updatedOptions[index] = value;
      setFormData((prev) => ({ ...prev, textOptions: updatedOptions }));
    }
    // Handling imageOptions text fields when it's not a file input
    else if (
      name === "imageOptions" &&
      index !== undefined &&
      type !== "file"
    ) {
      const updatedOptions = [...formData.imageOptions];
      updatedOptions[index].text = value;
      setFormData((prev) => ({ ...prev, imageOptions: updatedOptions }));
    }
    // Handling correctAnswer multi-select
    else if (
      name === "correctAnswer" &&
      e.target instanceof HTMLSelectElement
    ) {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prev) => ({ ...prev, correctAnswer: selectedOptions }));
    }
    // Generic field updates
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const mergedObj = { ...testMetaData, ...formData };
    // dispatch(addQuestion(mergedObj));
    setFormData({
      description: "",
      descriptionImage: null,
      optionType: "text",
      textOptions: ["", "", "", ""],
      imageOptions: [
        { text: "", image: null },
        { text: "", image: null },
        { text: "", image: null },
        { text: "", image: null },
      ],
      correctAnswer: [], // Initialize as an empty array
    });
    console.log("Question added:", mergedObj);
  };

  return (
    <div className="container mt-4">
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
          placeholder="Enter question description"
          rows={3}
        ></textarea>
      </div>

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

      <div className="mb-3">
        <label htmlFor="optionType" className="form-label">
          Option Type
        </label>
        <select
          id="optionType"
          name="optionType"
          className="form-select"
          value={formData.optionType}
          onChange={handleChange}
          required
        >
          <option value="text">Text Only</option>
          <option value="textImage">Text and Image</option>
        </select>
      </div>

      {formData.optionType === "text" &&
        formData.textOptions.map((option, index) => (
          <div key={index} className="mb-3">
            <div className="input-group">
              <span className="input-group-text">Option {index + 1}</span>
              <input
                type="text"
                name="textOptions"
                className="form-control"
                value={option}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Enter option ${index + 1}`}
                required
              />
            </div>
          </div>
        ))}

      {formData.optionType === "textImage" &&
        formData.imageOptions.map((option, index) => (
          <div key={index} className="mb-3">
            <h5> Option {index + 1} </h5>
            <div className="input-group">
              <span className="input-group-text">Option Text</span>
              <input
                type="text"
                name="imageOptions"
                className="form-control"
                value={option.text}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Enter option ${index + 1} text`}
                required
              />
            </div>
            <div className="mt-2">
              <input
                type="file"
                name="imageOptions"
                className="form-control"
                onChange={(e) => handleChange(e, index)}
                accept="image/*"
              />
            </div>
          </div>
        ))}

      <div className="mb-3">
        <label htmlFor="correctAnswer" className="form-label">
          Correct Answer
        </label>
        <select
          id="correctAnswer"
          name="correctAnswer"
          className="form-select"
          multiple
          value={formData.correctAnswer}
          onChange={handleChange}
          required
        >
          {(formData.optionType === "text"
            ? formData.textOptions
            : formData.imageOptions.map((option) => option.text)
          ).map((option, index) => (
            <option key={index} value={option}>
              Option {index + 1}: {option}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default SingleSelect;
