import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { addIntegerQuestion } from "@/server/tests";
import {
  setBiologyCount,
  setChemistryCount,
  setMathsCount,
  setPhysicsCount,
} from "@/Redux/Reducers/TestCounterSlice";

interface Props {
  type: string;
}

const TestQuestionForm = ({ type }: Props) => {
  console.log("RENDERING COMPONENT");

  const dispatch = useDispatch();
  const liveTestFormData = useSelector((state: RootState) => state.liveTest);

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

  //? asdffdsf
  const testId = useSelector((state: RootState) => state.testCounter.testId);
  // console.log(testId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch the question object to the Redux store
    // const questionObject = { ...formData };
    // dispatch(addQuestion(questionObject));

    // Submit the question to the server
    // submitTestQuestion(liveTestFormData);

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
      type: "single select",
      description: "",
      correctAnswer: "",
    });

    // console.log("Question Submitted:", questionObject);
  };

  return (
    <div className="w-100">
      <div className="d-flex flex-row justify-content-center align-items-center">
        <form className="w-100 container mt-4" onSubmit={handleSubmit}>
          {/* Type */}
          <div className="mb-3 w-75">
            <label htmlFor="type" className="form-label">
              {" "}
              Type{" "}
            </label>
            <input
              id="type"
              name="type"
              className="form-select w-100"
              value={type}
              type="text"
              // onChange={handleChange}
              contentEditable="false"
              required
            />
          </div>
          {/* Subject */}
          <div className="mb-3 w-75">
            <label htmlFor="subject" className="form-label">
              {" "}
              Subject{" "}
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
              {" "}
              Topic{" "}
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
              {" "}
              Subtopic{" "}
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
              {" "}
              Level{" "}
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
              {" "}
              Description{" "}
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter detailed description"
              rows={4}
              required
            ></textarea>
          </div>

          {/* Correct Answer */}
          <div className="mb-3 w-75">
            <label htmlFor="correctAnswer" className="form-label">
              {" "}
              Correct Answer{" "}
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
              {" "}
              Add Test{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestQuestionForm;

// import { addQuestion } from "@/Redux/Reducers/LiveTestSlice";
// import { RootState } from "@/Redux/Store";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// interface TestQuestionFormData {
//   description: string;
//   correctAnswer: string;
// }

// // Type definition for testMetaData prop (you can adjust this based on the actual structure of your data)
// interface IntegerProps {
//   testMetaData: {
//     // Adjust these fields based on the structure of testMetaData
//     subject: string;
//     topic: string;
//     subtopic: string;
//     level: string;
//     type: string;
//   };
// }

// const Integer = ({ testMetaData }: IntegerProps) => {
//   const [formData, setFormData] = useState<TestQuestionFormData>({
//     description: "",
//     correctAnswer: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const dispatch = useDispatch();

//   const handleSubmit = () => {
//     // Merging testMetaData and formData
//     const mergedObj = Object.assign({}, testMetaData, formData);
//     dispatch(addQuestion(mergedObj));
//     setFormData({
//       description: "",
//       correctAnswer: "",
//     });
//     console.log(mergedObj);
//     // Add submission logic here
//   };

//   return (
//     <div className="container mt-4">
//       {/* Question Description */}
//       <div className="mb-3">
//         <label htmlFor="description" className="form-label">
//           Description
//         </label>
//         <textarea
//           id="description"
//           name="description"
//           className="form-control"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Enter detailed description"
//           rows={4}
//           required
//         ></textarea>
//       </div>

//       {/* Correct Answer */}
//       <div className="mb-3">
//         <label htmlFor="correctAnswer" className="form-label">
//           Correct Answer
//         </label>
//         <input
//           type="number"
//           id="correctAnswer"
//           name="correctAnswer"
//           className="form-control"
//           value={formData.correctAnswer}
//           onChange={handleChange}
//           placeholder="Enter correct answer"
//           required
//         />
//       </div>

//       {/* Submit Button */}
//       <div className="text-center">
//         <button className="btn btn-primary" onClick={handleSubmit}>
//           Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Integer;
