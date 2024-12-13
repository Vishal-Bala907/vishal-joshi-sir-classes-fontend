import { RootState } from "@/Redux/Store";
import { attendTestNow, getAllAttendedTests, getTests } from "@/server/tests";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { setAttendTestDetails } from "@/Redux/Reducers/AttendSlice";

interface LiveTestFormData {
  testName: string;
  description: string;
  timeDuration: string;
  time: string;
  date: string;
  category: string;
  instructions: string;
  positiveMarking: string;
  negativeMarking: string;
  Questions: any[]; // Array of any type to store questions
}

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

const TestLists: React.FC<LiveTestFormProps> = ({ setTest }) => {
  const USER = useSelector((state: RootState) => state.user);
  const [tests, setTests] = useState<LiveTestFormData[]>([]);
  const [attendedTest, setAttendedTest] = useState([]);

  useEffect(() => {
    // Fetch all tests
    getTests(USER.role)
      .then((data) => {
        setTests(data);
      })
      .catch((err) => {
        console.error(err);
      });

    if (USER.role === "student") {
      // Fetch all attended tests
      getAllAttendedTests(USER._id)
        .then((data) => {
          console.log("Attended Tests Data:", data);
          setAttendedTest(data.data || []); // Handle missing or undefined data
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [USER]);

  const dispatch = useDispatch();
  const attendTest = (test: any) => {
    dispatch(setAttendTestDetails(test));
    setTest("ATTENDING");

    // attendTestNow(test._id, USER._id);
  };

  return (
    <div className="w-100">
      <div className="accordion w-100" id="accordionExample">
        {tests.length === 0 ? (
          <div>No Tests available</div>
        ) : (
          tests.map((test, index) => {
            const collapseId = `collapse${index}`;
            const headerId = `heading${index}`;
            let isAttended = null;
            Array.isArray(attendedTest) &&
              attendedTest.forEach((attended) => {
                if (attended.liveTestId === test._id) {
                  isAttended = true;
                  return;
                } else {
                  isAttended = false;
                }
              });

            return (
              <div
                key={test._id}
                className="accordion-item my-3 bg-info-subtle"
              >
                <h2 className="accordion-header" id={headerId}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded="false"
                    aria-controls={collapseId}
                  >
                    <b>Test :</b> {test.testName} &nbsp; | &nbsp;
                    <b>Time :</b> {test.time} &nbsp; | &nbsp;
                    <b>Duration :</b> {test.timeDuration} mins &nbsp; | &nbsp;
                    <b>Date :</b> {test.date.split("T")[0]}
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className="accordion-collapse collapse"
                  aria-labelledby={headerId}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {USER.role === "admin" ? (
                      <div className="container mt-5">
                        <h6 className="mb-4">Reschedule Test</h6>
                        <form>
                          <div className="mb-3">
                            <label
                              htmlFor={`testDate${index}`}
                              className="form-label"
                            >
                              Select Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id={`testDate${index}`}
                              name="testDate"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor={`testTime${index}`}
                              className="form-label"
                            >
                              Select Time
                            </label>
                            <input
                              type="time"
                              className="form-control"
                              id={`testTime${index}`}
                              name="testTime"
                              required
                            />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Reschedule Test
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div>
                        {isAttended ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => console.log("View Result")}
                          >
                            View Result
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() => attendTest(test)}
                          >
                            Attend Test
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TestLists;
