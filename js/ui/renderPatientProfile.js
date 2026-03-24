export function renderPatientProfile(patient) { // Render the patient profile information in the UI.
  const container = document.getElementById("renderPatientProfile"); // Get the container element for rendering the patient profile.

  if (!container) { // If the container is not found, log an error and exit the function.
    console.error("Patient profile container not found");
    return;
  }

  const dataState = container.querySelector(".data-state"); // Get the data state element for rendering the patient profile information.
  if (!dataState) {
    console.error(".data-state element not found in patient profile container");
    return;
  }

  // Generate HTML for patient profile information
  const html = ` 
    <img src="${patient.profile_picture}" alt="${patient.name}"> 
    <h3>${patient.name}</h3>
    <p>Age: ${patient.age}</p>
    <p>Phone: ${patient.phone_number}</p>
    <p>Insurance: ${patient.insurance_type}</p>
  `;

  // Hide loading/error and render data
  container.querySelector(".loading-state").style.display = "none";
  container.querySelector(".error-state").style.display = "none";

  dataState.innerHTML = html;
  dataState.style.display = "block";
}