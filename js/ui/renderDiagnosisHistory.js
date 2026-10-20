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

  // Draw a lightweight line chart without an external Chart.js dependency.
  if (canvas) drawBloodPressureChart(canvas, labels, systolicData, diastolicData);

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

  // Update heart rate icon based on status
  const heartRateIcon = document.getElementById("heartRateIcon");
  if (heartRateIcon && latest?.heart_rate?.levels) {
    const status = latest.heart_rate.levels.toLowerCase();
    if (status.includes("higher") || status.includes("above")) {
      heartRateIcon.src = "./assets/icons/ArrowUp.png";
    } else if (status.includes("lower") || status.includes("below")) {
      heartRateIcon.src = "./assets/icons/ArrowDown.png";
    }
  }
}
function drawBloodPressureChart(canvas, labels, systolic, diastolic) {
  const width = Math.max(canvas.parentElement.clientWidth || 420, 260);
  const height = 245;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  const bounds = { left: 40, right: width - 16, top: 22, bottom: height - 35 };
  const yMin = 60, yMax = 180;
  const y = v => bounds.bottom - (v - yMin) / (yMax - yMin) * (bounds.bottom - bounds.top);
  const x = i => bounds.left + (labels.length === 1 ? 0 : i / (labels.length - 1) * (bounds.right - bounds.left));
  ctx.font = "11px Manrope, sans-serif";
  ctx.textAlign = "right";
  ctx.strokeStyle = "#e1daee";
  ctx.fillStyle = "#667085";
  [60, 90, 120, 150, 180].forEach(tick => {
    ctx.beginPath(); ctx.moveTo(bounds.left, y(tick)); ctx.lineTo(bounds.right, y(tick)); ctx.stroke();
    ctx.fillText(String(tick), bounds.left - 8, y(tick) + 4);
  });
  ctx.textAlign = "center";
  labels.forEach((label, i) => {
    if (i % 2 === 0 || i === labels.length - 1) ctx.fillText(label.slice(0,3), x(i), height - 12);
  });
  [[systolic,"#E66FD2"],[diastolic,"#8C6FE6"]].forEach(([values,color]) => {
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineJoin = "round";
    ctx.beginPath(); values.forEach((value,i) => i ? ctx.lineTo(x(i),y(value)) : ctx.moveTo(x(i),y(value))); ctx.stroke();
    ctx.fillStyle = color;
    values.forEach((value,i) => {ctx.beginPath();ctx.arc(x(i),y(value),3.5,0,Math.PI*2);ctx.fill();});
  });
}
