// Client record from uploaded Excel/CSV
export interface ClientRecord {
  ClientID: string;
  ProgramName: string;
  IntakeDate: string | null;       // ISO date or null
  ExitDate: string | null;          // ISO date or null
  ExitDestination: string | null;
  HousingPlacementDate: string | null;
  LengthOfStay: number | null;      // Auto-calculated if missing
}

// Supported program names
export type ProgramName = 
  | "Ted's Place"
  | "Hondo"
  | "Pathway Home"
  | "Midvale"
  | "A2C"
  | "ICMS";

// Overview metrics calculated from data
export interface OverviewMetrics {
  totalClients: number;              // Unique ClientIDs
  activeEnrollments: number;         // Null ExitDate
  housingPlacements: number;         // ExitDestination = "Permanent Housing"
  avgLengthOfStay: number | null;    // Mean of LengthOfStay
  placementRate: number;             // (placements / exits) * 100
}

// Program-specific performance
export interface ProgramMetrics {
  programName: ProgramName;
  totalClients: number;
  activeEnrollments: number;
  housingPlacements: number;
  avgLengthOfStay: number | null;
  placementRate: number;
}

// Data quality validation
export interface FieldCoverage {
  fieldName: string;
  coverage: number;                  // 0-100 percentage
  status: 'red' | 'yellow' | 'green'; // Based on coverage
  missingCount: number;
  missingRecords: string[];          // ClientIDs with missing values
}

export interface DataQualityReport {
  overallScore: number;              // 0-100
  fieldCoverages: FieldCoverage[];
  criticalIssues: string[];          // Human-readable issues
  isCompliant: boolean;              // ≥80% coverage on critical fields
}

// File upload validation
export interface UploadValidation {
  isValid: boolean;
  error?: string;
  missingColumns?: string[];
  recordCount?: number;
}
