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
        return `<div class="lab-result-item">${result}</div>`;
      } else if (typeof result === 'object' && result !== null) {
        // Assume lab result object has properties like name, value, unit, status
        const name = result.name || result.test || 'Unknown Test';
        const value = result.value || 'N/A';
        const unit = result.unit || '';
        const status = result.status || result.levels || '';
        const reference = result.reference || result.range || '';

        return `
          <div class="lab-result-item">
            <div class="lab-test-name">${name}</div>
            <div class="lab-test-value">${value} ${unit}</div>
            ${reference ? `<div class="lab-reference">Reference: ${reference}</div>` : ''}
            ${status ? `<div class="lab-status ${status.toLowerCase().replace(/\s+/g, '-')}">${status}</div>` : ''}
          </div>
        `;
      }
      return `<div class="lab-result-item">Invalid lab result format</div>`;
    })
    .join("");

  dataState.innerHTML = html;
  dataState.style.display = "block";
}