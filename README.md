# Patient Dashboard – Coalition Technologies FED Skills Test

## Project Overview

This project is a **Front-End Developer Skills Test** provided by Coalition Technologies.  
The goal is to build a responsive patient dashboard using vanilla JavaScript, integrating data from the provided patient data API and matching the UI designs from the provided mockups.

The application retrieves patient information from the API, filters the results to display **Jessica Taylor**, and renders various medical data sections including:

- Patient Profile
- Diagnosis History
- Diagnostic List
- Lab Results

The project focuses on **API integration, data manipulation, UI rendering, and clean code organization**.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- Basic Authentication

No frameworks were used in order to demonstrate core front-end development skills.

---

## API Information

The project uses the **Coalition Technologies Patient Data API**, which provides static test data for front-end development scenarios.

### Important Notes

- The API returns **static data** for testing purposes.
- The data is **not real patient data**.
- The application only displays information for:

```
Jessica Taylor
```

Displaying other patient records is unnecessary for this test.

---

## Authentication

The API requires **Basic Authentication**.

Authentication credentials are encoded dynamically.

## Project Structure

```
patient-dashboard/
│
├── index.html
├── README.md
├── .gitignore
│
├── css/
│   ├── reset.css
│   ├── variables.css
│   └── styles.css
│
├── js/
│   ├── main.js
│   │
│   ├── api/
│   │   └── patientApi.js
│   │
│   ├── services/
│   │   └── auth.js
│   │
│   ├── utils/
│   │   ├── formatDate.js
│   │   └── helpers.js
│   │
│   └── ui/
│       ├── renderPatientProfile.js
│       ├── renderDiagnosisHistory.js
│       ├── renderDiagnosticList.js
│       └── renderLabResults.js
│
└── assets/
    ├── images/
    └── icons/
```

### Folder Responsibilities

- **api/** – Handles communication with the external API  
- **services/** – Authentication logic and reusable services  
- **utils/** – Helper functions and formatting utilities  
- **ui/** – DOM rendering and UI components  
- **css/** – Styling and layout  
- **assets/** – Images and static resources  

---

## Application Features

### Patient Profile

Displays key information about Jessica Taylor, including:

- Name
- Age
- Gender
- Profile details

---

### Diagnosis History

Shows historical diagnosis data retrieved from the API.

Some data formatting is performed to better match the provided design mockups.

---

### Diagnostic List

Displays diagnostic records in a structured table.

---

### Lab Results

Lists lab result entries provided by the API.

---

## Data Manipulation

The API data does not perfectly match the design mockups.

To align with the UI designs, the application performs some data transformations such as:

- Formatting dates
- Adjusting values for display
- Mapping API fields to UI components

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/patient-dashboard.git
```

### 2. Navigate to the project directory

```bash
cd patient-dashboard
```

### 3. Open the project

You can open `index.html` directly in your browser or run a local development server.

Example using VS Code Live Server:

```
Right click → Open with Live Server
```

---

## Deployment

The project can be deployed using **GitHub Pages**.

Steps:

1. Push the project to GitHub
2. Navigate to **Repository Settings**
3. Enable **GitHub Pages**
4. Select the `main` branch

---

## Author

Developed as part of the **Coalition Technologies Front-End Developer Skills Test**.

---

## Disclaimer

The patient data used in this project is **synthetic and generated for testing purposes only**.  
It does not represent real patient information.