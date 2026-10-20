# Patient Dashboard

**Vanilla JavaScript · REST API Integration (Original) · Local Mock Data (Current)**

A responsive patient dashboard developed as part of the **Coalition Technologies Front-End Developer Skills Test**.

The application was originally built to retrieve patient information from an external REST API using JavaScript's Fetch API and Basic Authentication. When the original API was no longer available, the project was adapted to run on locally stored, synthetic patient records while preserving the original interface and modular rendering structure.

**Current status:** Functional front-end demonstration using local mock data.

## Project Overview

The Patient Dashboard presents patient information through a responsive three-column layout. It includes:

- Patient directory
- Patient profile and contact details
- Blood pressure history chart
- Respiratory rate, body temperature, and heart rate
- Diagnostic records and status
- Laboratory test list

The dashboard displays the fictional patient **Jessica Taylor** by default, consistent with the original skills-test scope.

## Technology Stack

### Core

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- JavaScript modules
- DOM manipulation
- Responsive web design

### Original API-Based Implementation

- REST API integration
- Fetch API and HTTP GET requests
- Basic Authentication
- JSON response processing
- Chart.js data visualization

### Current Offline Implementation

- Locally stored JavaScript mock data
- Asynchronous data-access interface
- Native Canvas-based blood pressure chart
- Modular UI rendering

The current version requires no API credentials, build system, or front-end framework.

## Project Evolution

### Version 1 — External REST API

The original implementation consumed synthetic patient records from the Coalition Technologies Patient Data API. A dedicated API module used `fetch()` and an authorization header to retrieve JSON, then passed the selected patient record to reusable UI rendering functions.

```text
Coalition Technologies API
          |
          v
 Basic Authentication
          |
          v
 Fetch API (patientApi.js)
          |
          v
    JSON Patient Data
          |
          v
        main.js
          |
          v
      UI Renderers
          |
          v
   Patient Dashboard
```

The original blood pressure visualization used Chart.js. The original API integration is preserved in the repository's Git history, but it is no longer active in the deployed application.

### Version 2 — Local Mock Data

After the external API became unavailable, the data source was replaced with a local JavaScript module containing fictional records structured for the existing UI.

```text
Local Mock Data (patients.js)
          |
          v
 Data Adapter (patientApi.js)
          |
          v
        main.js
          |
          v
      UI Renderers
          |
          v
   Patient Dashboard
```

The `fetchPatients()` interface remains asynchronous, allowing the dashboard initialization code to consume data without depending on an HTTP endpoint.

The migration also:

- Removed the external API request and authentication dependency
- Added local synthetic patient records
- Replaced the Chart.js dependency with native Canvas rendering
- Retained the original layout, image assets, and component structure
- Updated documentation for a self-contained portfolio demonstration

**Important:** The current version does **not** make REST API requests. REST integration describes work completed in the original version, not an active capability of the offline demo.

## Project Structure

```text
patient-dashboard/
├── index.html
├── README.md
├── .gitignore
├── css/
│   ├── reset.css
│   ├── variables.css
│   └── styles.css
├── js/
│   ├── main.js
│   ├── api/
│   │   └── patientApi.js
│   ├── data/
│   │   └── patients.js
│   └── ui/
│       ├── renderPatientProfile.js
│       ├── renderDiagnosisHistory.js
│       ├── renderDiagnosticList.js
│       └── renderLabResults.js
└── assets/
    ├── images/
    └── icons/
```

| File | Responsibility |
| --- | --- |
| `js/main.js` | Initializes the dashboard and coordinates rendering |
| `js/api/patientApi.js` | Exposes the asynchronous patient-data interface |
| `js/data/patients.js` | Stores local synthetic patient records |
| `js/ui/renderPatientProfile.js` | Renders the selected patient's profile |
| `js/ui/renderDiagnosisHistory.js` | Renders vital signs and blood pressure history |
| `js/ui/renderDiagnosticList.js` | Populates the diagnostic table |
| `js/ui/renderLabResults.js` | Displays laboratory result entries |

## Features

### Patient Profile

Displays the selected patient's name, profile image, date of birth, gender, contact information, emergency contact, and insurance provider.

### Diagnosis History

Displays historical blood pressure measurements and the latest available respiratory rate, temperature, and heart rate.

### Diagnostic List

Renders diagnostic names, descriptions, and statuses in a table.

### Lab Results

Lists available laboratory test names.

### Responsive Layout

Uses HTML and CSS to arrange the dashboard across different viewport sizes.

## Run Locally

**Requirements:** A modern browser and a local HTTP server (such as Python 3 or VS Code Live Server).

```bash
git clone https://github.com/Albany072001/patient-dashboard.git
cd patient-dashboard
python -m http.server 8000
```

Open <http://localhost:8000>.

On Windows, `py -m http.server 8000` may work if `python` is not available.

A local HTTP server is recommended because ES modules may not load correctly when opening `index.html` directly via `file://`.

## Modify the Demo Data

Synthetic patient records are defined in `js/data/patients.js`. You can change the mock data without restoring the external API, provided the objects keep the fields expected by the UI modules.

For example, the data model contains fields such as:

```js
{
  name: "Example Patient",
  gender: "Female",
  diagnosis_history: [],
  diagnostic_list: [],
  lab_results: []
}
```

This is a **partial example**, not the complete required record schema. Review the existing entries in `patients.js` before adding records.

## Limitations

- The dashboard intentionally selects Jessica Taylor; patient-switching behavior is not implemented.
- The patient directory is primarily presentational.
- Laboratory download icons are presentational and do not generate files.
- There is no back-end database or persistent patient storage.
- All records are synthetic; the project is not suitable for clinical use.
- The original API integration is historical and is not used by the current application.

## Development History

The Git history documents the transition from an authenticated API-dependent dashboard to a standalone demonstration with local mock data. This preserves the original API-integration work while keeping the current portfolio project usable without external credentials or service availability.

## Disclaimer and Attribution

All patient records, measurements, contact information, diagnoses, and laboratory entries are fictional demonstration data. The dashboard is not intended for medical decision-making.

Developed by [Albany072001](https://github.com/Albany072001) for the Coalition Technologies Front-End Developer Skills Test. This repository is a personal portfolio project and is not an official Coalition Technologies product.
