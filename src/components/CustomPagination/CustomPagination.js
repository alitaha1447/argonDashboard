import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Select from "react-select";

const CustomPagination = ({
  pageStart,
  setPageStart,
  totalPages,
  setPageNumber,
  fetchPaginatedData,
  pageNumber,
  pageNumDropDown,
  setPageNumDropDown,
  pageNum,
  pageSize,
  activeFilters, // 👈 Add this
}) => {
  const handlePageChange = (page) => {
    setPageNumber(page);
    // fetchPaginatedData(page);
    fetchPaginatedData(page, pageSize, activeFilters); // 👈 Use activeFilters
  };

  const handleNext = () => {
    if (pageStart + 2 < totalPages) {
      setPageStart((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (pageStart > 1) {
      setPageStart((prev) => prev - 1);
    }
  };

  const visiblePages = [];
  for (let i = pageStart; i <= Math.min(pageStart + 2, totalPages); i++) {
    visiblePages.push(i);
  }

  return (
    <>
      <div className="pagination justify-content-end mb-0">
        <Pagination className="">
          <PaginationItem disabled={pageStart === 1}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
            >
              <i className="fas fa-angle-left" />
            </PaginationLink>
          </PaginationItem>

          {visiblePages.map((page) => (
            <PaginationItem key={page} active={page === pageNumber}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              <i className="fas fa-angle-right" />
            </PaginationLink>
          </PaginationItem>
        </Pagination>
        <div style={{ width: "80px", marginLeft: "10px" }}>
          <Select
            options={pageNum}
            value={pageNumDropDown}
            onChange={(prev) => setPageNumDropDown(prev)}
          />
        </div>
      </div>
    </>
  );
};

export default CustomPagination;
