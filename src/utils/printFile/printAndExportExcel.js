// utils/printFile/printAndExportExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const printAndExportExcel = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    alert("No data available to export");
    return;
  }

  // ✅ Prepare data
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Batch Students");

  // ✅ Generate Excel buffer and save
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "batch-students.xlsx");

  // ✅ Optional: Print
  window.print();
};
