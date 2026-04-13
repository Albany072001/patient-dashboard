export function renderPatientProfile(patient) { // Render the patient profile information in the UI.
  const container = document.getElementById("renderPatientProfile"); // Get the container element for rendering the patient profile.

  if (!container) { // If the container is not found, log an error and exit the function.
    console.error("Patient profile container not found");
    return;
  }

  const dataState = container.querySelector(".data-state"); // Get the data state element for rendering the patient profile information.

  if (!dataState) { // If data-state is missing, log an error and exit.
    console.error(".data-state element not found in patient profile container");
    return;
  }

  // Generate HTML for patient profile information
  const html = ` 
    <div class="profile-header">
      <img src="${patient.profile_picture}" alt="${patient.name}"> 
      <h3>${patient.name}</h3>
    </div>

    <div class="profile-details">

      <div class="profile-item">
        <img src="./assets/icons/BirthIcon.png" class="profile-icon" alt="DOB icon">
        <div>
          <p>Date of Birth</p>
          <p>${patient.date_of_birth ?? "N/A"}</p>
        </div>
      </div>

      <div class="profile-item">
        <img src="./assets/icons/FemaleIcon.png" class="profile-icon" alt="Gender icon">
        <div>
          <p>Gender</p>
          <p>${patient.gender ?? "N/A"}</p>
        </div>
      </div>

      <div class="profile-item">
        <img src="./assets/icons/PhoneIcon.png" class="profile-icon" alt="Contact icon">
        <div>
          <p>Contact Info.</p>
          <p>${patient.phone_number ?? "N/A"}</p>
        </div>
      </div>

      <div class="profile-item">
        <img src="./assets/icons/PhoneIcon.png" class="profile-icon" alt="Emergency icon">
        <div>
          <p>Emergency Contacts</p>
          <p>${patient.emergency_contact ?? "N/A"}</p>
        </div>
      </div>

      <div class="profile-item">
        <img src="./assets/icons/InsuranceIcon.png" class="profile-icon" alt="Insurance icon">
        <div>
          <p>Insurance Provider</p>
          <p>${patient.insurance_type ?? "N/A"}</p>
        </div>
      </div>

    </div>

    <button class="show-all-btn">Show All Information</button>
  `;

  // Hide loading/error and render data
  container.querySelector(".loading-state").style.display = "none";
  container.querySelector(".error-state").style.display = "none";

  dataState.innerHTML = html;
  dataState.style.display = "block"; // Show the data state with the rendered patient profile information.  
}