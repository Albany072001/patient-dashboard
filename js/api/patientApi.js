import { getAuthHeader } from "../services/auth.js"; 

const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev"; 

export async function fetchPatients() { // Fetch patients from the API with authentication
  const response = await fetch(API_URL, { // Use GET method and include authentication header
    method: "GET",
    headers: getAuthHeader()
  });

  if (!response.ok) { // If the response is not successful, throw an error
    throw new Error("Failed to fetch patients"); // This will be caught in the UI layer to display an error message
  }

  return response.json();
}