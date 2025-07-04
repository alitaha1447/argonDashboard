import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (
  data,
  fileName = "Export",
  sheetName = "Sheet1"
) => {
  console.log("Excel save");
  console.log(data);
  // Convert JSON data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Write workbook to binary array
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Create a blob from the buffer
  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  // Save the Excel file
  saveAs(dataBlob, `${fileName}.xlsx`);
};
