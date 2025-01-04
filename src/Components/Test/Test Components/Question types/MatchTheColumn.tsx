import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { addMatchTheColumnQuestion } from "@/server/tests";
import { RootState } from "@/Redux/Store";
import {
  setBiologyCount,
  setChemistryCount,
  setMathsCount,
  setPhysicsCount,
} from "@/Redux/Reducers/TestCounterSlice";
import ReactQuill from "react-quill";

interface MatchColumnFormData1 {
  subject: string;
  topic: string;
  subtopic: string;
  level: string;
  type: string;

  leftOptionsA: string;
  leftOptionsB: string;
  leftOptionsC: string;
  leftOptionsD: string;

  rightOptionsA: string;
  rightOptionsB: string;
  rightOptionsC: string;
  rightOptionsD: string;

  leftImagesA: File | null;
  leftImagesB: File | null;
  leftImagesC: File | null;
  leftImagesD: File | null;

  rightImagesA: File | null;
  rightImagesB: File | null;
  rightImagesC: File | null;
  rightImagesD: File | null;

  correctMatchings: { leftOption: number; rightOption: number }[];
  optionType: "text" | "textImage";
  description: string;

  // New field for description image
  descriptionImage: File | null;
}

interface Props {
  type: string;
}

const MatchColumnsForm = ({ type }: Props) => {
  const [formData, setFormData] = useState<MatchColumnFormData1>({
    subject: "",
    topic: "",
    subtopic: "",
    level: "easy",
    type: "match",
    leftOptionsA: "",
    leftOptionsB: "",
    leftOptionsC: "",
    leftOptionsD: "",
    rightOptionsA: "",
    rightOptionsB: "",
    rightOptionsC: "",
    rightOptionsD: "",
    leftImagesA: null,
    leftImagesB: null,
    leftImagesC: null,
    leftImagesD: null,
    rightImagesA: null,
    rightImagesB: null,
    rightImagesC: null,
    rightImagesD: null,
    correctMatchings: [],
    optionType: "text",
    description: "",
    descriptionImage: null, // Initialize the new descriptionImage field
  });

  // console.log(type);
  const dispatch = useDispatch();

  // Function to convert a file to Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string); // Base64 string
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (
    files: FileList | null,
    key: keyof MatchColumnFormData1
  ) => {
    if (files && files[0]) {
      const file = files[0];
      convertToBase64(file)
        .then((base64Image) => {
          setFormData((prev) => ({
            ...prev,
            [key]: base64Image,
          }));
        })
        .catch((err) => console.error("Error converting file to Base64", err));
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    key: keyof MatchColumnFormData1
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      handleFileChange(target.files, key);
    } else {
      setFormData((prev) => ({ ...prev, [key]: target.value }));
    }
  };

  const handleMatchChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value } = e.target;
    // alert(value);
    setFormData((prev) => {
      const updatedMatchings = [...prev.correctMatchings];
      updatedMatchings[index] = {
        ...updatedMatchings[index],
        rightOption: Number(value),
      };
      return { ...prev, correctMatchings: updatedMatchings };
    });
  };

  const testId = useSelector((state: RootState) => state.testCounter.testId);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // dispatch(addQuestion(formData));

    addMatchTheColumnQuestion(formData, testId)
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
        console.log(err);
      });

    // Reset form after submit
    setFormData({
      subject: "",
      topic: "",
      subtopic: "",
      level: "easy",
      type: "match",
      leftOptionsA: "",
      leftOptionsB: "",
      leftOptionsC: "",
      leftOptionsD: "",
      rightOptionsA: "",
      rightOptionsB: "",
      rightOptionsC: "",
      rightOptionsD: "",
      leftImagesA: null,
      leftImagesB: null,
      leftImagesC: null,
      leftImagesD: null,
      rightImagesA: null,
      rightImagesB: null,
      rightImagesC: null,
      rightImagesD: null,
      correctMatchings: formData.correctMatchings,
      optionType: "text",
      description: "",
      descriptionImage: null, // Reset description image
    });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        {/* Subject Selector */}
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <select
            className="form-select"
            value={formData.subject}
            required
            onChange={(e) => handleChange(e, "subject")}
          >
            <option value="">Select Subject</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="maths">Maths</option>
            <option value="biology">Biology</option>
          </select>
        </div>

        {/* Topic, Subtopic, Type */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Topic"
            required
            value={formData.topic}
            onChange={(e) => handleChange(e, "topic")}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Subtopic"
            value={formData.subtopic}
            onChange={(e) => handleChange(e, "subtopic")}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type"
            value={type}
            contentEditable="false"
            onChange={(e) => handleChange(e, "type")}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                description: value,
              }))
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

        {/* New Description Image Upload */}
        <div className="mb-3">
          <label className="form-label">Upload Description Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) =>
              handleChange(e, "descriptionImage" as keyof MatchColumnFormData1)
            }
          />
        </div>

        {/* Option Type */}
        <div className="mb-3">
          <select
            className="form-select"
            value={formData.optionType}
            onChange={(e) => handleChange(e, "optionType")}
          >
            <option value="text">Text</option>
            <option value="textImage">Text & Image</option>
          </select>
        </div>

        {/* Left and Right Options */}
        <div
          className="wrapper"
          style={{
            maxHeight: "350px",
            overflow: "scroll",
          }}
        >
          {"ABCD".split("").map((option, index) => (
            <div
              className="row mb-3"
              key={option}
              // style={{
              //   width: "1500px",
              // }}
            >
              <div className="col-md-4">
                <b>{option}.</b>
                <ReactQuill
                  theme="snow"
                  value={formData[`leftOptions${option}`]}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      [`leftOptions${option}`]: value,
                    }))
                  }
                  placeholder={`Left Option ${option}`}
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
              <div className="col-md-4">
                <b>{option}.</b>
                <ReactQuill
                  theme="snow"
                  value={formData[`rightOptions${option}`]}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      [`rightOptions${option}`]: value,
                    }))
                  }
                  placeholder={`Right Option ${option}`}
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

              <div className="col-md-4">
                <label className="form-label">
                  Correct Matching : Left {option}
                </label>
                <select
                  className="form-select"
                  required
                  onChange={(e) => handleMatchChange(e, index)}
                >
                  <option value="">Select Right Option</option>
                  {[1, 2, 3, 4].map((num) => (
                    <option
                      key={num}
                      value={num}
                    >{`Right Option ${String.fromCharCode(64 + num)}`}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Image Uploads */}
        <h4 className="text-danger bg-danger-subtle text-center py-2 rounded-3">
          Images are Optional
        </h4>
        {"ABCD".split("").map((option) => (
          <div className="row mb-3" key={option}>
            <div className="col-md-6">
              <label className="form-label">Upload Left Image {option}</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  handleChange(
                    e,
                    `leftImages${option}` as keyof MatchColumnFormData1
                  )
                }
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Upload Right Image {option}</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  handleChange(
                    e,
                    `rightImages${option}` as keyof MatchColumnFormData1
                  )
                }
              />
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary">
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default MatchColumnsForm;
