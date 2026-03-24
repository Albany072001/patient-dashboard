import { fetchPatients } from "./api/patientApi.js";

import { renderPatientProfile } from "./ui/renderPatientProfile.js";
import { renderDiagnosisHistory } from "./ui/renderDiagnosisHistory.js";
import { renderDiagnosticList } from "./ui/renderDiagnosticList.js";
import { renderLabResults } from "./ui/renderLabResults.js";

async function initDashboard() { // Initialize the patient dashboard by fetching patient data and rendering all sections of the dashboard.
  // Show all loading states first
  const sections = [
    "renderPatientProfile",
    "renderDiagnosisHistory",
    "renderDiagnosticList",
    "renderLabResults"
  ];

  sections.forEach(id => { // Loop through each section and show the loading state while hiding error and data states.
    const container = document.getElementById(id); // Get the container element for the current section.
    if (!container) return; // If the container is not found, skip to the next iteration.

    container.querySelector(".loading-state").style.display = "block"; // Show the loading state.
    container.querySelector(".error-state").style.display = "none";
    container.querySelector(".data-state").innerHTML = ""; // Clear any existing data state content.
  });

  try {
    const patients = await fetchPatients(); // Fetch the list of patients from the API.

    if (!Array.isArray(patients) || patients.length === 0) { // If the API response is not an array or is empty, log an error and show the error state for all sections.
      console.error("No patients returned from API"); // Log an error message if the API response is not valid.
      sections.forEach(id => {
        const container = document.getElementById(id); // Get the container element for the current section.
        if (!container) return; // If the container is not found, skip to the next iteration.
        container.querySelector(".loading-state").style.display = "none";
        container.querySelector(".error-state").style.display = "block";
      });
      return;
    }

    // Select a specific patient
    const patient = patients.find(p => p.name === "Jessica Taylor"); // Find the patient with the name "Jessica Taylor" from the list of patients.

    if (!patient) { // If the patient is not found, log an error and show the error state for all sections.
      console.error("Patient not found"); // Log an error message if the specified patient is not found in the API response.
      sections.forEach(id => {
        const container = document.getElementById(id);
        if (!container) return;
        container.querySelector(".loading-state").style.display = "none";
        container.querySelector(".error-state").style.display = "block";
      });
      return;
    }

    // Render all sections
    renderPatientProfile(patient);
    renderDiagnosisHistory(patient);
    renderDiagnosticList(patient);
    renderLabResults(patient);

  } catch (error) {
    console.error("Dashboard failed to load", error);

    // Show error for all sections
    sections.forEach(id => {
      const container = document.getElementById(id);
      if (!container) return;
      container.querySelector(".loading-state").style.display = "none";
      container.querySelector(".error-state").style.display = "block";
    });
  }
}

initDashboard();