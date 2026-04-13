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
    .map(result => {
      // Handle both string and object formats
      if (typeof result === 'string') {
        return `
          <div class="lab-result-item">
            <span class="lab-test-name">${result}</span>
            <img src="./assets/icons/download.png" alt="Download ${result}" class="lab-download-icon">
          </div>
        `;
      } else if (typeof result === 'object' && result !== null) {
        // Assume lab result object has properties like name, value, unit, status
        const name = result.name || result.test || 'Unknown Test';

        return `
          <div class="lab-result-item">
            <span class="lab-test-name">${name}</span>
            <img src="./assets/icons/download.png" alt="Download ${name}" class="lab-download-icon">
          </div>
        `;
      }
      return `<div class="lab-result-item">Invalid lab result format</div>`;
    })
    .join("");

  dataState.innerHTML = html;
  dataState.style.display = "block";
}