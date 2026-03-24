import Chart from "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.5.0/chart.min.js"; 

export function renderDiagnosisHistory(patient) { // Render the diagnosis history chart for the patient.
  const container = document.getElementById("renderDiagnosisHistory"); // Get the container element for rendering the diagnosis history.
  const dataState = container.querySelector(".data-state"); // Get the data state element for rendering the diagnosis history chart.
  const canvas = dataState.querySelector("#bloodPressureChart"); // Get the canvas element for rendering the chart.

  if (!patient.diagnosis_history || patient.diagnosis_history.length === 0) { // If there is no diagnosis history, show the error state.
    container.querySelector(".error-state").style.display = "block";
    return;
  }

  container.querySelector(".loading-state").style.display = "none";

  const labels = patient.diagnosis_history.map(d => `${d.month} ${d.year}`); 
  const systolicData = patient.diagnosis_history.map(d => d.blood_pressure.systolic.value);
  const diastolicData = patient.diagnosis_history.map(d => d.blood_pressure.diastolic.value);

  new Chart(canvas, { // Create a new chart instance using Chart.js.
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Systolic",
          data: systolicData,
          borderColor: "red",
          fill: false
        },
        {
          label: "Diastolic",
          data: diastolicData,
          borderColor: "blue",
          fill: false
        }
      ]
    },
    options: { // Set the options for the chart, including responsiveness and legend position.
      responsive: true,
      plugins: {
        legend: { position: "top" },
      },
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}