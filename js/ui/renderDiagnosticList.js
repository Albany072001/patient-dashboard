export function renderDiagnosticList(patient) { // Render the diagnostic list for the patient.
  const container = document.getElementById("renderDiagnosticList"); // Get the container element for rendering the diagnostic list.
  if (!container) return; // If the container is not found, exit the function.

  const loading = container.querySelector(".loading-state"); // Get the loading state element.
  const error = container.querySelector(".error-state"); // Get the error state element.
  const dataState = container.querySelector(".data-state"); // Get the data state element.

  if (!patient.diagnostic_list || patient.diagnostic_list.length === 0) { // If there is no diagnostic list, show the error state.
    loading.style.display = "none"; // Hide the loading state.
    error.style.display = "block"; // Show the error state.
    dataState.style.display = "none"; // Hide the data state.
    return;
  }

  loading.style.display = "none";
  error.style.display = "none";
  dataState.style.display = "block";

  // Get the table body element where rows will be injected
  const tableBody = container.querySelector("#diagnosticListBody");
  if (!tableBody) return;

  // Generate table rows from diagnostic list data
  const rows = patient.diagnostic_list
    .map(d => `
      <tr>
        <td>${d.name || "N/A"}</td>
        <td>${d.description || "N/A"}</td>
        <td>${d.status || "N/A"}</td>
      </tr>
    `)
    .join(""); // Join the array of HTML strings into a single string.

  tableBody.innerHTML = rows; // Set the inner HTML of the table body to the generated rows.
}