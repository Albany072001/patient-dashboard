# Patient Dashboard — Vanilla JavaScript Demo

A responsive patient dashboard built as the **Coalition Technologies Front-End Developer Skills Test**. The original implementation used the Coalition Technologies Patient Data API. This portfolio version replaces that retired API dependency with **local, entirely synthetic demonstration records**.

## Features

- Patient profile (Jessica Taylor)
- Blood pressure history chart drawn with the Canvas API
- Respiratory rate, body temperature, and heart rate cards
- Diagnostic list and lab-results display
- Original project images, icons, and responsive CSS

The left-side patient list and lab download icons are **visual-only**; they do not switch the displayed record or download files. The primary dashboard intentionally shows Jessica Taylor, matching the original skills-test requirements.

## Run locally

Requirements: a modern browser and a local static HTTP server. No API credentials, package manager, or build step required.

```bash
python -m http.server 8000
```

Open <http://localhost:8000>. You can also use VS Code's Live Server extension.

**Do not rely on opening `index.html` with `file://`:** ES modules may be restricted by the browser's local-file security model.

## Project structure

```text
index.html
css/                   # Original styling
assets/icons/          # Original PNG icons
assets/images/         # Original PNG illustrations
js/main.js             # Dashboard initialization
js/api/patientApi.js   # Offline data adapter; returns mock patients
js/data/patients.js    # Synthetic fixtures matching the old API format
js/ui/                 # Dashboard renderers
```

## Offline-demo changes

- Replaced the remote API `fetch` with a local fixture import while preserving the existing asynchronous `fetchPatients()` function boundary.
- Removed the unused Basic Authentication module and its hard-coded credentials.
- Replaced Chart.js CDN dependency with a local Canvas-based line chart.
- Removed Google Fonts network dependency; the UI falls back to system fonts where Manrope isn't installed.
- Kept original layout, styles, and local graphic assets.

**Data disclaimer:** Every patient profile, measurement, diagnosis, contact number, and lab result is fictional demo data. Nothing displayed should be treated as real medical information or advice.

## Attribution

Developed for the Coalition Technologies Front-End Developer Skills Test. This repository is an independent portfolio demonstration, not a clinical product.
