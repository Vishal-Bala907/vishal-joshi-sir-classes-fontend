import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import {
  attendTestNow,
  getAllAttendedTests,
  getTestById,
  getTestDataFromBackend,
  getTests,
} from "@/server/tests";
import { setAttendTestDetails } from "@/Redux/Reducers/AttendSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { setChartData } from "@/Redux/Reducers/ChartData";
import { toast } from "react-toastify";

interface LiveTestFormData {
  _id: string;
  testName: string;
  description: string;
  timeDuration: string;
  time: string;
  date: string;
  category: string;
  instructions: string;
  positiveMarking: string;
  negativeMarking: string;
  timestamp: string;
  Questions: any[];
}

interface AttendedTest {
  liveTestId: string;
  studentId: string;
  startTime: string;
  endTime: string;
  _id: string;
  __v?: number;
}

interface ATTENDED {
  category: string;
  description: string;
  date: string;
  testName: string;
  time: string;
  timeDuration: string;
  _id: string;
}

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

const TestLists: React.FC<LiveTestFormProps> = ({ setTest }) => {
  const USER = useSelector((state: RootState) => state.user);
  const [tests, setTests] = useState<LiveTestFormData[]>([]);
  const [attendedTest, setAttendedTest] = useState<AttendedTest[]>([]);
  const [selectedType, setSelectedType] = useState<string>("AVAILABLE");
  const [attendedTestDetails, setattendedTestDetails] = useState<ATTENDED[]>(
    []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch available tests based on user role
    getTests(USER.role)
      .then((data) => {
        setTests(data || []);
      })
      .catch((err) => console.error("Error fetching tests:", err));

    if (USER.role === "student") {
      // Fetch attended tests for students
      getAllAttendedTests(USER._id)
        .then((data) => {
          setAttendedTest(data?.data || []);
          console.log(data);
          if (data?.data && data?.data.length > 0) {
            data?.data.map((t, ind) => {
              getTestById(t.liveTestId)
                .then((data) => {
                  console.log(data.data);
                  const obj = {
                    category: data.data.category,
                    description: data.data.description,
                    date: data.data.date,
                    testName: data.data.testName,
                    time: data.data.time,
                    timeDuration: data.data.timeDuration,
                    _id: data.data._id,
                  };
                  setattendedTestDetails((prev) => [...prev, obj]);
                })
                .catch((err) => {
                  console.error(err);
                });
            });
          }
        })
        .catch((err) => console.error("Error fetching attended tests:", err));
    }

    return () => {
      setAttendTestDetails([]);
    };
  }, [USER._id, USER.role]);

  const attendTest = (test: LiveTestFormData) => {
    dispatch(setAttendTestDetails(test));
    setTest("ATTENDING");
    attendTestNow(test._id, USER._id);
  };

  const getTestData = (_id: string) => {
    const userId = USER._id;

    // getTestById(_id)
    //   .then((data) => {
    //     const obj = {
    //       category: data.data.category,
    //       description: data.data.description,
    //       date: data.data.date,
    //       testName: data.data.testName,
    //       time: data.data.time,
    //       timeDuration: data.data.timeDuration,
    //     };

    //     setAttendTestDetails(obj);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    getTestDataFromBackend(_id, userId)
      .then((data) => {
        dispatch(setChartData(data?.data));
        setTest("RESULT");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log(attendedTestDetails);
  return (
    <div className="w-100">
      {/* Dropdown for selecting Available/Attended Tests */}
      <div className="btn-group">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedType === "AVAILABLE" ? "Available Tests" : "Attended Tests"}
        </button>
        <ul className="dropdown-menu">
          <li
            onClick={() => {
              setSelectedType("AVAILABLE");
            }}
          >
            <a className="dropdown-item" href="#">
              Available
            </a>
          </li>
          <li
            onClick={() => {
              setSelectedType("ATTENDED");
            }}
          >
            <a className="dropdown-item" href="#">
              Attended
            </a>
          </li>
        </ul>
      </div>

      {/* Render Available Tests or Attended Tests based on selection */}
      {selectedType === "AVAILABLE" ? (
        <div className="accordion w-100" id="accordionExample">
          {tests.length === 0 ? (
            <div>No Tests available</div>
          ) : (
            tests.map((test, index) => {
              const collapseId = `collapse${index}`;
              const headerId = `heading${index}`;
              return (
                <div
                  key={test._id || index}
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
                      <b>Test:</b> {test.testName} &nbsp; | &nbsp;
                      <b>Time:</b> {test.time} &nbsp; | &nbsp;
                      <b>Duration:</b> {test.timeDuration} mins &nbsp; | &nbsp;
                      <b>Date:</b> {test.date ? test.date.split("T")[0] : "N/A"}
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
                        <button
                          className="btn btn-primary"
                          onClick={() => attendTest(test)}
                        >
                          Attend Test
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="accordion w-100" id="accordionExample">
          {attendedTestDetails.length === 0 ? (
            <div>No Tests attended</div>
          ) : (
            attendedTestDetails.map((test, index) => {
              const collapseId = `collapse${index}`;
              const headerId = `heading${index}`;
              return (
                <div
                  key={test._id || index}
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
                      {test?.testName}
                    </button>
                  </h2>
                  <div
                    id={collapseId}
                    className="accordion-collapse collapse"
                    aria-labelledby={headerId}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <button
                        className="btn btn-danger"
                        onClick={() => getTestData(test._id)}
                      >
                        View Result
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default TestLists;
