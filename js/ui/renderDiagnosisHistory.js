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
  dataState.innerHTML = `
    <div class="history-chart-wrapper"><canvas id="bloodPressureChart"></canvas></div>
    <div class="vitals-cards-grid" id="diagnosisVitalsCards"></div>
  `; // Add chart wrapper + vitals cards container.
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

  canvas.chartInstance = new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Systolic",
          data: systolicData,
          borderColor: "#D977EF", // soft pink/purple
          borderWidth: 2,
          tension: 0.45,
          pointRadius: 2.5,
          pointHoverRadius: 4
        },
        {
          label: "Diastolic",
          data: diastolicData,
          borderColor: "#7C83FD", // soft blue/purple
          borderWidth: 2,
          tension: 0.45,
          pointRadius: 2.5,
          pointHoverRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      layout: {
        padding: {
          top: 6,
          right: 6,
          bottom: 0,
          left: 0
        }
      },


      plugins: {
        legend: {
          position: "top",
          align: "end", 
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 6,
            boxHeight: 10,
            padding: 16,
            font: {
              size: 11,
              weight: "500"
            },
            color: "#6B7280" // subtle gray
          }
        },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#111",
          bodyColor: "#111",
          borderColor: "#E5E7EB",
          borderWidth: 1
        }
      },

      scales: {
        x: {
          grid: {
            display: false //
          },
          ticks: {
            color: "#9CA3AF",
            font: {
              size: 10
            }
          }
        },
        y: {
          grid: {
            color: "#E9E6F7", // 👈 very soft grid
            drawBorder: false
          },
          ticks: {
            color: "#9CA3AF",
            font: {
              size: 10
            },
            padding: 6
          }
        }
      }
    }
  });

  // Render latest vitals cards (respiratory rate, temperature, heart rate).
  const latestEntry = patient.diagnosis_history[patient.diagnosis_history.length - 1]; 
  const vitalsContainer = document.getElementById("diagnosisVitalsCards");

  if (vitalsContainer && latestEntry) {
    const respiratoryRate = latestEntry.respiratory_rate ?? latestEntry.vitals?.respiratory_rate ?? "N/A";
    const temperature = latestEntry.temperature ?? latestEntry.vitals?.temperature ?? "N/A";
    const heartRate = latestEntry.heart_rate ?? latestEntry.vitals?.heart_rate ?? "N/A";

    vitalsContainer.innerHTML = `
      <div class="vitals-card">
        <h3>Respiratory Rate</h3>
        <p>${respiratoryRate} bpm</p>
      </div>
      <div class="vitals-card">
        <h3>Temperature</h3>
        <p>${temperature} °F</p>
      </div>
      <div class="vitals-card">
        <h3>Heart Rate</h3>
        <p>${heartRate} bpm</p>
      </div>
    `;
  }
}