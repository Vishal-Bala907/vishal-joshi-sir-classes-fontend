import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import {
  attendTestNow,
  getAllAttendedTests,
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

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

const TestLists: React.FC<LiveTestFormProps> = ({ setTest }) => {
  const USER = useSelector((state: RootState) => state.user);
  const [tests, setTests] = useState<LiveTestFormData[]>([]);
  const [attendedTest, setAttendedTest] = useState<AttendedTest[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTests(USER.role)
      .then((data) => {
        setTests(data || []);
      })
      .catch((err) => console.error("Error fetching tests:", err));

    if (USER.role === "student") {
      getAllAttendedTests(USER._id)
        .then((data) => setAttendedTest(data?.data || []))
        .catch((err) => console.error("Error fetching attended tests:", err));
    }
  }, [USER.role, USER._id]);

  const attendTest = (test: LiveTestFormData) => {
    // Assuming `test.time` and `test.timeDuration` are provided
    /*
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Today's 12:00 AM timestamp
    const TODAYTIMESTAMP = today.getTime();

    // Get the current time (in minutes since midnight)
    const currentTime = new Date();
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();

    // Test start time in minutes since midnight
    const testStartTime = test.time.split(":");
    const testStartMinutes =
      parseInt(testStartTime[0], 10) * 60 + parseInt(testStartTime[1], 10);

    // Calculate test end time in minutes since midnight
    const testEndMinutes = testStartMinutes + parseInt(test.timeDuration, 10);

    // Calculate the time difference between current time and test end time
    const timeDifference = testEndMinutes - currentMinutes;

    // Convert the time difference to hours and minutes
    const diffHours = Math.floor(timeDifference / 60);
    const diffMinutes = timeDifference % 60;

    // Log debugging information
    console.log(
      `Test Start: ${Math.floor(testStartMinutes / 60)}:${
        testStartMinutes % 60
      }`
    );
    console.log(
      `Current Time: ${currentTime.getHours()}:${currentTime.getMinutes()}`
    );
    console.log(
      `Test End: ${Math.floor(testEndMinutes / 60)}:${testEndMinutes % 60}`
    );
    console.log(
      `Time Difference: ${diffHours} hours and ${diffMinutes} minutes`
    );

    // Check if the test is for today
    if (TODAYTIMESTAMP !== +test.timestamp) {
      toast.error("Can't Attend right now", {
        position: "top-left",
      });
      return;
    }

    // Check if the current time is before the test start time
    if (currentMinutes < testStartMinutes) {
      toast.error("Can't Attend right now", {
        position: "top-left",
      });
      return;
    }

    // Check if the current time is after the test end time
    if (currentMinutes > testEndMinutes) {
      toast.error("Can't Attend right now", {
        position: "top-left",
      });
      return;
    }
      */

    dispatch(setAttendTestDetails(test));
    setTest("ATTENDING");
    attendTestNow(test._id, USER._id);
  };
  function getTestData(_id: string): void {
    const userId = USER._id;
    getTestDataFromBackend(_id, userId)
      .then((data) => {
        dispatch(setChartData(data?.data));
        setTest("RESULT");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // console.log(tests);
  return (
    <div className="w-100">
      <div className="accordion w-100" id="accordionExample">
        {tests.length === 0 ? (
          <div>No Tests available</div>
        ) : (
          tests.map((test, index) => {
            const collapseId = `collapse${index}`;
            const headerId = `heading${index}`;
            const attendedDetails = attendedTest.find(
              (attended) => attended.liveTestId === test._id
            );

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
                    ) : attendedDetails ? (
                      <div>
                        <h5>Test Attended Details:</h5>
                        <p>
                          <b>Start Time:</b>{" "}
                          {new Date(attendedDetails.startTime).toLocaleString()}
                        </p>
                        <p>
                          <b>End Time:</b>{" "}
                          {new Date(attendedDetails.endTime).toLocaleString()}
                        </p>
                        <p>
                          <b>Student ID:</b> {attendedDetails.studentId}
                        </p>
                        <button
                          className="btn btn-danger"
                          // onClick={() => {
                          //   getTestData(test._id);
                          // }}
                          onClick={() => attendTest(test)}
                        >
                          View Result
                        </button>
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
    </div>
  );
};

export default TestLists;
