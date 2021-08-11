import { Patient } from "./entities/patient.entity";

export interface PatientsRO {
  patients: Patient[],
  patientsCount: number
}

export interface PatientRO {
  patient: Patient
}
