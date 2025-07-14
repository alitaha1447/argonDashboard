export const printTableData = (Title) => {
  const printContent = document.getElementById("printable-table");
  // if (!printContent) return;

  // Clone the table so we don't modify the original DOM
  const tableClone = printContent.cloneNode(true);

  // Remove last column (Action) from header
  const theadRow = tableClone.querySelector("thead tr");
  if (theadRow) {
    theadRow.removeChild(theadRow.lastElementChild);
  }

  // Remove last column from each row in tbody
  const rows = tableClone.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    row.removeChild(row.lastElementChild);
  });
  // Open print window
  const printWindow = window.open("", "", "height=800,width=1000");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Table</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h3>${Title}</h3>
        ${tableClone.outerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};
