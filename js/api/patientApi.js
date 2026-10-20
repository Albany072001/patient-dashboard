// Offline data adapter. Keeps the existing API boundary and return type.
import { patients } from "../data/patients.js";

export async function fetchPatients() {
  return patients;
}
