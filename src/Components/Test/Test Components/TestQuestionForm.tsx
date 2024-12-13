import React, { useEffect, useState } from "react";
import Integer from "./Question types/Integer";
import SingleSelect from "./Question types/SingleSelect";
import MultiSelect from "./Question types/MultiSelect";
import MatchTheColumn from "./Question types/MatchTheColumn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { setTestId } from "@/Redux/Reducers/TestCounterSlice";

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
  setcreatedTest: React.Dispatch<React.SetStateAction<any>>;
}

const TestQuestionForm: React.FC<LiveTestFormProps> = ({
  setTest,
  setcreatedTest,
}) => {
  console.log("RENDERING COMPONENT");

  const [type, setType] = useState("select");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Type:", type);
    // Add your submission logic here if needed
  };

  const [questionNumber, setQuestionNumber] = useState(0);

  const bio = useSelector((state: RootState) => state.testCounter.biology);
  const chem = useSelector((state: RootState) => state.testCounter.chemistry);
  const maths = useSelector((state: RootState) => state.testCounter.maths);
  const phys = useSelector((state: RootState) => state.testCounter.physics);

  useEffect(() => {
    setQuestionNumber(bio + chem + maths + phys);
  }, [bio, chem, maths, phys]);

  const dispatch = useDispatch();
  function finishUploadTest() {
    setTest("TEST-LIST");
    setcreatedTest(null);
    dispatch(setTestId(null));
  }

  // useEffect(() => {
  //   const num = questionNumber + 1;
  //   setQuestionNumber(num);
  // }, [bio, chem, phys, maths, questionNumber]);

  return (
    <div className="w-100">
      <h3 className="text-center">Create Test Question</h3>
      <div className=" d-flex flex-row justify-content-center align-items-center ">
        <form
          style={{ placeSelf: "baseline" }}
          className="w-50 container mt-4 place-self-baseline"
          onSubmit={handleSubmit}
        >
          {/* Type */}
          <div className="mb-3 w-75">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="form-select"
              value={type}
              onChange={handleTypeChange}
              required
            >
              <option value="select">Select</option>
              <option value="integer">Integer</option>
              <option value="match the column">Match the Column</option>
            </select>
          </div>

          <div>
            <div>
              <p>
                Maths : <b>{maths}</b>
              </p>
            </div>
            <div>
              <p>
                Biology : <b>{bio}</b>
              </p>
            </div>
            <div>
              <p>
                Physics : <b>{phys}</b>
              </p>
            </div>
            <div>
              <p>
                Chemistry : <b>{chem}</b>
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-danger"
            onClick={(e) => {
              finishUploadTest();
            }}
          >
            Finish
          </button>
        </form>
        {/* Conditional Question Type Components */}
        {type === "integer" ? (
          <Integer type={type} />
        ) : type === "select" ? (
          <MultiSelect type={type} />
        ) : (
          <MatchTheColumn type={"match"} />
        )}
      </div>
    </div>
  );
};

export default TestQuestionForm;
