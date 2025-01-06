import { rescheduleTest } from "@/server/tests";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface ResProps {
  testId: string;
  index: number;
}

const RescheduleTest: React.FC<ResProps> = ({ testId, index }) => {
  const [formData, setFormData] = useState({ testDate: "", testTime: "" });
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear the error when user updates input
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation check
    if (!formData.testDate || !formData.testTime) {
      toast.error("Please fill all the fields", {
        position: "top-left",
      });
      return;
    }

    const payload = { testId, ...formData };
    rescheduleTest(payload)
      .then(() => {
        toast.success("Test Rescheduled...");
      })
      .catch((err) => {
        toast.error("Error Rescheduling Test", {
          position: "top-left",
        });
      });
  };

  const router = useRouter();
  const viewResult = (id: string) => {
    router.push(`/test-result/${id}`);
  };

  return (
    <div className="container mt-5">
      <h6 className="mb-4">Reschedule Test</h6>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor={`testDate${index}`} className="form-label">
            Select Date
          </label>
          <input
            type="date"
            className="form-control"
            id={`testDate${index}`}
            name="testDate"
            value={formData.testDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor={`testTime${index}`} className="form-label">
            Select Time
          </label>
          <input
            type="time"
            className="form-control"
            id={`testTime${index}`}
            name="testTime"
            value={formData.testTime}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Reschedule Test
        </button>
        <button
          onClick={() => {
            viewResult(testId);
          }}
          className="btn btn-primary"
        >
          View Result
        </button>
      </form>
    </div>
  );
};

export default RescheduleTest;
