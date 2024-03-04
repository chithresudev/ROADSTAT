
import React, { useState } from "react";
import "./DataTable.css";

const DataTable = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's data
  const currentData = data.slice(startIndex, endIndex);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
