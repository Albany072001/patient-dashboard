export function renderDiagnosisHistory(patient) { // Render the diagnosis history for the patient.
  const container = document.getElementById("renderDiagnosisHistory"); // Get the container element for the diagnosis history section.
  if (!container) return;

  const loading = container.querySelector(".loading-state"); // Get the loading state element within the diagnosis history container.
  const error = container.querySelector(".error-state");
  const dataState = container.querySelector(".data-state");

  const history = patient?.diagnosis_history; // Access the diagnosis history from the patient object, using optional chaining to avoid errors if the property is missing.

  if (!Array.isArray(history) || history.length === 0) { // If the diagnosis history is not an array or is empty, log an error.
    loading.style.display = "none";
    error.style.display = "block";
    dataState.style.display = "none";
    return;
  }

  loading.style.display = "none";
  error.style.display = "none";
  dataState.style.display = "block";

  // ---------------- CHART ----------------
  const canvas = container.querySelector("#bloodPressureChart"); // Get the canvas element for the blood pressure chart within the diagnosis history section.

  const labels = history.map(d => `${d.month} ${d.year}`); // Create an array of labels for the chart by mapping over the diagnosis history and formatting the month and year for each entry.
  const systolicData = history.map(d => d.blood_pressure.systolic.value); // Create an array of systolic blood pressure values from the diagnosis history for the chart.
  const diastolicData = history.map(d => d.blood_pressure.diastolic.value); // Create an array of diastolic blood pressure values from the diagnosis history for the chart.

  if (canvas.chartInstance) { // If a chart instance already exists on the canvas, destroy it before creating a new one.
  }

  canvas.chartInstance = new Chart(canvas, { // Create a new Chart.js instance on the canvas element, specifying the type of chart and the data to be displayed.
    type: "line", // Specify the type of chart to create (line chart in this case).
    data: {
      labels,
      datasets: [ // Define the datasets for the chart
        {
          label: "Systolic",
          data: systolicData,
          borderColor: "#E66FD2",
          tension: 0.4
        },
        {
          label: "Diastolic",
          data: diastolicData,
          borderColor: "#8C6FE6",
          tension: 0.4
        }
      ]
    },
    options: { // Configure the options for the chart, including responsiveness and legend display.
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
    }
  });

  // ---------------- VITALS ----------------
  const latest = history.at(-1); // Get the most recent diagnosis entry for displaying current vitals.

  const setText = (id, value) => { // Helper function to set text content of an element by ID, with a check for element existence.
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  // Blood Pressure ledgend values
  document.getElementById("systolicValue").textContent =
    latest?.blood_pressure?.systolic?.value ?? "--";

  document.getElementById("diastolicValue").textContent =
    latest?.blood_pressure?.diastolic?.value ?? "--";

  // Respiratory
  setText( // Set the respiratory rate value, formatting it with "bpm" if available, or showing "N/A" if not.
    "respiratoryRateValue",
    latest?.respiratory_rate?.value != null
      ? `${latest.respiratory_rate.value} bpm`
      : "N/A"
  );

  setText( // Set the respiratory rate status based on the levels provided in the latest diagnosis entry, or show an empty string if not available.
    "respiratoryRateStatus",
    latest?.respiratory_rate?.levels ?? ""
  );

  // Temperature 
  setText( // Set the temperature value, formatting it with "°F" if available, or showing "N/A" if not.
    "temperatureValue",
    latest?.temperature?.value != null
      ? `${latest.temperature.value} °F`
      : "N/A"
  );

  setText( // Set the temperature status based on the levels provided in the latest diagnosis entry, or show an empty string if not available.
    "temperatureStatus",
    latest?.temperature?.levels ?? ""
  );

  // Heart Rate
  setText( // Set the heart rate value, formatting it with "bpm" if available, or showing "N/A" if not.
    "heartRateValue",
    latest?.heart_rate?.value != null
      ? `${latest.heart_rate.value} bpm`
      : "N/A"
  );

  setText( // Set the heart rate status based on the levels provided in the latest diagnosis entry, or show an empty string if not available.
    "heartRateStatus",
    latest?.heart_rate?.levels ?? ""
  );
}