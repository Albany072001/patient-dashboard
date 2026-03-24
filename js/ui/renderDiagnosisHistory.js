export function renderDiagnosisHistory(patient) { // Render the diagnosis history chart for the patient.
  const container = document.getElementById("renderDiagnosisHistory"); // Get the container element for rendering the diagnosis history.
  if (!container) return; // If the container is not found, exit the function.

  const loading = container.querySelector(".loading-state"); // Get the loading state element.
  const error = container.querySelector(".error-state"); // Get the error state element.

  if (!patient.diagnosis_history || patient.diagnosis_history.length === 0) { // If there is no diagnosis history, show the error state.
    loading.style.display = "none"; // Hide the loading state.
    error.style.display = "block"; // Show the error state.
    return;
  }

  loading.style.display = "none"; 
  error.style.display = "none";

  const dataState = container.querySelector(".data-state"); // Get the data state element.
  dataState.innerHTML = '<canvas id="bloodPressureChart"></canvas>'; // Set the inner HTML to include a canvas for the chart.
  dataState.style.display = "block"; // Show the data state.

  const canvas = document.getElementById("bloodPressureChart"); // Get the canvas element for rendering the chart.
  if (!canvas) { // If the canvas element is not found, log an error.
    console.error("Canvas element for chart not found!");
    return;
  }

  const labels = patient.diagnosis_history.map(d => `${d.month} ${d.year}`); // Get the labels for the chart.
  const systolicData = patient.diagnosis_history.map(d => d.blood_pressure.systolic.value); // Get the systolic blood pressure data for the chart.
  const diastolicData = patient.diagnosis_history.map(d => d.blood_pressure.diastolic.value); // Get the diastolic blood pressure data for the chart.

  if (canvas.chartInstance) { // If there is an existing chart instance, destroy it before creating a new one.
    canvas.chartInstance.destroy();
  }

  canvas.chartInstance = new Chart(canvas, { // Create a new chart instance using Chart.js.
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "Systolic", data: systolicData, borderColor: "red", fill: false },
        { label: "Diastolic", data: diastolicData, borderColor: "blue", fill: false }
      ]
    },
    options: { // Set the options for the chart, including responsiveness and legend position.
      responsive: true,
      plugins: { legend: { position: "top" } },
      scales: { y: { beginAtZero: false } }
    }
  });
}