export function renderLabResults(patient) { // Render the lab results for the patient.
  const container = document.getElementById("renderLabResults"); // Get the container element for rendering the lab results.
  if (!container) return; // If the container is not found, exit the function.

  const dataState = container.querySelector(".data-state"); // Get the data state element.

  if (!patient.lab_results || patient.lab_results.length === 0) { 
    container.querySelector(".error-state").style.display = "block";
    container.querySelector(".loading-state").style.display = "none";
    return;
  }

  container.querySelector(".loading-state").style.display = "none";
  container.querySelector(".error-state").style.display = "none";

  const html = patient.lab_results
    .map(result => `<div class="lab-result-item">${result}</div>`) // Map the lab results to HTML elements.
    .join("");

  dataState.innerHTML = html;
  dataState.style.display = "block";
}