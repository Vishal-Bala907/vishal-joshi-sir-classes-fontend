"use client";
import React, { useState, useMemo, useCallback } from "react";
import { debounce } from "lodash";
import ReactPaginate from "react-paginate";
// import "bootstrap/dist/css/bootstrap.min.css";
import categorized_data from "./categorized_data.json";
import RankSlider from "./RankSlider";

// Debounced input handler
const useDebouncedInput = (initialValue = "", delay = 300) => {
  const [value, setValue] = useState(initialValue);
  const debouncedSetValue = useMemo(
    () => debounce((val: string) => setValue(val), delay),
    [delay]
  );

  return [value, (val: string) => debouncedSetValue(val)] as const;
};

const CollegeFinder: React.FC = React.memo(() => {
  const [loading, setLoading] = useState(false);
  const [examType, setExamType] = useState<string>("");
  const [institute, setInstitute] = useDebouncedInput("");
  const [program, setProgram] = useDebouncedInput("");
  const [quota, setQuota] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<string>("");
  const [rank, setRank] = useState<string>("1");
  const [seatType, setSeatType] = useState<string>(""); // New state for seat type
  const [currentPage, setCurrentPage] = useState<number>(0);

  const colleges = useMemo(() => Object.values(categorized_data).flat(), []);

  const getAllowedCollegeTypes = useCallback((exam: string) => {
    if (exam === "JEE Advanced") return ["IIT"];
    if (exam === "JEE Mains") return ["NIT"];
    return [];
  }, []);

  const allowedCollegeTypes = useMemo(
    () => getAllowedCollegeTypes(examType),
    [examType, getAllowedCollegeTypes]
  );

  const filteredColleges = useMemo(() => {
    const userRank = Number(rank);
    return colleges.filter(
      (college) =>
        (!examType || allowedCollegeTypes.includes(college.type)) &&
        (!institute ||
          (typeof institute === "string" &&
            college.institute
              .toLowerCase()
              .includes(institute.toLowerCase()))) &&
        (!program ||
          (typeof program === "string" &&
            college.program.toLowerCase().includes(program.toLowerCase()))) &&
        (!quota || college.quota.toLowerCase() === quota.toLowerCase()) &&
        (!category ||
          college.category.toLowerCase() === category.toLowerCase()) &&
        (!courseDuration ||
          college.courseDuration.toLowerCase() ===
            courseDuration.toLowerCase()) &&
        (!rank || userRank <= college.closingRank) &&
        (!seatType || college.seat.toLowerCase() === seatType.toLowerCase()) // New filter for seat type
    );
  }, [
    colleges,
    examType,
    allowedCollegeTypes,
    institute,
    program,
    quota,
    category,
    courseDuration,
    rank,
    seatType,
  ]);

  // Pagination logic
  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredColleges.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentColleges = filteredColleges.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container mt-5">
      <RankSlider rank={rank} setRank={setRank} />
      <h2 className="mb-4">VJ Nucleus College Finder</h2>
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
          >
            <option value="">Select Exam Type</option>
            <option value="JEE Mains">JEE Mains</option>
            <option value="JEE Advanced">JEE Advanced</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Institute Name"
            onChange={(e) => setInstitute(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Program"
            onChange={(e) => setProgram(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
          >
            <option value="">Select Quota</option>
            <option value="AI">All India</option>
            <option value="HS">Home State</option>
            <option value="OS">Other State</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="GEN">General</option>
            <option value="GEN-PWD">GEN-PWD</option>
            <option value="GEN-EWS">GEN-EWS</option>
            <option value="OBC-NCL">OBC-NCL</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>
        {/* <div className="col-md-4 mb-2">
          <label htmlFor="rankSlider" className="form-label">
            Rank: {rank}
          </label>
          <input
            type="range"
            className="form-range"
            id="rankSlider"
            min="1"
            max="900000"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          />
        </div> */}
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
          >
            <option value="">Select Course Duration</option>
            <option value="4 Years">4 Years</option>
            <option value="5 Years">5 Years</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={seatType}
            onChange={(e) => setSeatType(e.target.value)}
          >
            <option value="">Select Seat Type</option>
            <option value="Gender-Neutral">Gender-Neutral</option>
            <option value="Female-Only">Female-Only</option>
          </select>
        </div>
      </div>

      {currentColleges.length > 0 ? (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Institute</th>
                <th>Program</th>
                <th>Quota</th>
                <th>Category</th>
                <th>Course Duration</th>
                <th>Seat Type</th>
                <th>Opening Rank</th>
                <th>Closing Rank</th>
              </tr>
            </thead>
            <tbody>
              {currentColleges.map((college, index) => (
                <tr key={index}>
                  <td>{college.institute}</td>
                  <td>{college.program}</td>
                  <td>
                    {college.quota === "AI"
                      ? "All India"
                      : college.quota === "HS"
                      ? "Home State"
                      : college.quota === "OS"
                      ? "Other State"
                      : college.quota}
                  </td>
                  <td>{college.category}</td>
                  <td>{college.courseDuration}</td>
                  <td>{college.seat}</td>
                  <td>{college.openingRank}</td>
                  <td>{college.closingRank}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
          />
        </>
      ) : (
        <div className="alert alert-warning">No colleges found</div>
      )}
    </div>
  );
});

export default CollegeFinder;
