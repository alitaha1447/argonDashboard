import React, { useEffect } from "react";
import Select from "react-select";
import { Input } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import useStatusEnquiry from "customHookApi/EnquiryDashboardApi/useStatusEnquiry";
import { useSelector } from "react-redux";

const FilterBar = ({
  selectedStatus,
  setSelectedStatus,
  searchText,
  handleUnifiedSearchChange,
  enquiry,
  selectedEnquiryType,
  handleEnquiryTypeChange,
  branch,
  showBranch = true,
  selectedBranch,
  setSelectedBranch,
  startDate,
  endDate,
  setDateRange,
  handleSearchClick,
  showStatus = true,
  showCourseEnquiry,
  showBatch,
  showDatePicker = true,
  showSearchByName = true,
  showSearchByFacultyName,
  fetchBatch,
  batches,
  selectedBatch,
  setSelectedBatch,
  fetchFaculties,
  facultyNameOptions,
  selectedFacultyName,
  setSelectedFacultyName,
  showLeaveType = false,
  leaveTypeOptions,
}) => {
  const { id } = useSelector((state) => state.auth);
  const {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    setBranchSearchText,
    branchSearchText,
  } = useBranchList();

  const { statusOptions, fetchEnquiry } = useStatusEnquiry();

  // useEffect(() => {
  //   if (branchSearchText.length < 3) {
  //     setBranchOptions([]);
  //     return;
  //   }
  //   fetchBranch();
  // }, [branchSearchText]);
  useEffect(() => {
    fetchBranch("", "", id); // sends id to third param
  }, []);

  // useEffect(() => {
  //   if (!branch || selectedBranch) return;

  //   const existsInOptions = branchOptions.some(
  //     (opt) => opt.value === branch.value
  //   );
  //   if (!existsInOptions) {
  //     setBranchOptions((prev) => [...prev, branch]);
  //     setSelectedBranch(branch);
  //   }

  //   // else {
  //   //   const matched = branchOptions.find(
  //   //     (opt) => opt.value === defaultBranch.value
  //   //   );
  //   //   if (matched) setSelectedBranch(matched);
  //   // }
  // }, [branch, branchOptions, selectedBranch]);
  return (
    <div
      className="d-flex flex-column flex-lg-row align-items-center justify-content-between p-2 w-100"
      style={{
        background: "#f7fafc",
        borderRadius: "5px",
        border: "1px solid #d3d3d3",
        gap: "1rem",
      }}
    >
      <div
        className="d-flex flex-wrap justify-content-center align-items-center"
        style={{ gap: "1rem" }}
      >
        {showStatus && (
          <div style={{ width: "170px" }}>
            <Select
              id="status"
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              onMenuOpen={fetchEnquiry}
            />
          </div>
        )}
        {showLeaveType && (
          <Select
            options={leaveTypeOptions}
            // value={selectedFacultyName}
            // onChange={setSelectedFacultyName}
            // onMenuOpen={fetchFaculties}
            placeholder="Leave Type"
            isClearable
          />
        )}
        {showSearchByName && (
          <div style={{ width: "170px" }}>
            <Input
              placeholder="Search by Name or Phone"
              type="text"
              value={searchText}
              onChange={handleUnifiedSearchChange}
            />
          </div>
        )}

        {showCourseEnquiry && (
          <div style={{ width: "170px" }}>
            <Select
              options={enquiry}
              value={selectedEnquiryType}
              onChange={handleEnquiryTypeChange}
            />
          </div>
        )}
        {showBranch && (
          <div style={{ width: "170px" }}>
            <Select
              id="branch-select"
              options={branchOptions}
              value={selectedBranch}
              onChange={(selected) => setSelectedBranch(selected)}
              onInputChange={(text) => setBranchSearchText(text)}
              placeholder="branch"
              isClearable
              isLoading={isLoading}
              noOptionsMessage={({ inputValue }) =>
                inputValue.length < 3
                  ? "Type at least 3 characters to search"
                  : "No branches found"
              }
            />
          </div>
        )}

        {showBatch && (
          <div style={{ width: "170px" }}>
            <Select
              id="branch-select"
              options={batches}
              value={selectedBatch}
              onChange={(selected) => setSelectedBatch(selected)}
              onMenuOpen={fetchBatch}
              placeholder="batch"
              isClearable
            />
          </div>
        )}
        {showSearchByFacultyName && (
          <Select
            options={facultyNameOptions}
            value={selectedFacultyName}
            onChange={setSelectedFacultyName}
            onMenuOpen={fetchFaculties}
            placeholder="faculty name"
            isClearable
          />
        )}
        {showDatePicker && (
          <div className="" style={{ width: "170px" }}>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setDateRange(date)}
              monthsShown={2} // ✅ Show two calendars
              dateFormat="dd/MM/yyyy"
              className="react-datepicker__input-container form-control"
              placeholderText="Select date range"
              isClearable
              // showMonthDropdown
              // showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={50}
              minDate={new Date(1900, 0, 1)}
              maxDate={new Date(2025, 11, 31)}
              popperPlacement="bottom-start" // ✅ Opens dropdown below input
            />
          </div>
        )}
      </div>

      <div
        style={{
          padding: "6px 12px",
          cursor: "pointer",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#5e72e4",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "38px",
          minWidth: "38px",
          // marginLeft: "10px",
        }}
        // onClick={handleUnifiedSearchChange}
        onClick={handleSearchClick}
      >
        <i className="fas fa-search" />
      </div>
    </div>
  );
};

export default FilterBar;
