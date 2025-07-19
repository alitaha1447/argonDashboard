export const printTableData = (title, columns = [], data = []) => {
  if (!Array.isArray(data) || data.length === 0) {
    alert("No data available to print!");
    return;
  }

  if (!Array.isArray(columns) || columns.length === 0) {
    alert("No columns defined for print!");
    return;
  }

  // Create table headers
  const tableHeaders = `<tr>${columns
    .map((col) => `<th>${col.label}</th>`)
    .join("")}</tr>`;

  // Create table rows
  const tableRows = data
    .map((item) => {
      return `<tr>${columns
        .map((col) => `<td>${item[col.accessor] ?? ""}</td>`)
        .join("")}</tr>`;
    })
    .join("");

  // const printContent = document.getElementById("printable-table");
  // if (!printContent) return;

  // Clone the table so we don't modify the original DOM
  // const tableClone = printContent.cloneNode(true);

  // Remove last column (Action) from header
  // const theadRow = tableClone.querySelector("thead tr");
  // if (theadRow) {
  //   theadRow.removeChild(theadRow.lastElementChild);
  // }

  // Remove last column from each row in tbody
  // const rows = tableClone.querySelectorAll("tbody tr");
  // rows.forEach((row) => {
  //   row.removeChild(row.lastElementChild);
  // });
  // Open print window
  const printWindow = window.open("", "", "height=800,width=1000");
  printWindow.document.write(`
    <html>
      <head>
       <title>${title}</title>
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
         <h3>${title}</h3>
       <table>
          <thead>${tableHeaders}</thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};
