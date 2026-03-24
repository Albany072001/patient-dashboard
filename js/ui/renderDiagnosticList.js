export function renderDiagnosticList(patient) { // Render the diagnostic list for the patient.
  const container = document.getElementById("renderDiagnosticList"); // Get the container element for rendering the diagnostic list.
  if (!container) return; // If the container is not found, exit the function.

  const dataState = container.querySelector(".data-state"); // Get the data state element.

  if (!patient.diagnostic_list || patient.diagnostic_list.length === 0) { // If there is no diagnostic list, show the error state.
    container.querySelector(".error-state").style.display = "block"; // Show the error state.
    container.querySelector(".loading-state").style.display = "none"; // Hide the loading state.
    return;
  }

  container.querySelector(".loading-state").style.display = "none";
  container.querySelector(".error-state").style.display = "none";

  const html = patient.diagnostic_list // Map the diagnostic list to HTML elements.
    .map(d => `
      <div class="diagnostic-item">
        <h4>${d.name}</h4>
        <p>${d.description}</p>
        <p>Status: ${d.status}</p>
      </div>
    `)
    .join(""); // Join the array of HTML strings into a single string.

  dataState.innerHTML = html; // Set the inner HTML of the data state element to the generated HTML.
  dataState.style.display = "block"; 
}