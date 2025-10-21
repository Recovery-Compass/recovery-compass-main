import { create } from 'zustand';
import { ClientRecord, OverviewMetrics, ProgramMetrics, DataQualityReport } from '@/types/compliance';
import { calculateMetrics, calculateProgramMetrics, validateDataQuality } from '@/lib/complianceCalculations';

interface ComplianceState {
  // Raw data
  clientRecords: ClientRecord[];
  uploadDate: Date | null;
  fileName: string | null;

  // Calculated data
  overviewMetrics: OverviewMetrics | null;
  programMetrics: ProgramMetrics[];
  dataQuality: DataQualityReport | null;

  // Filters
  selectedProgram: string | null;
  searchQuery: string;

  // Actions
  setClientRecords: (records: ClientRecord[], fileName: string) => void;
  setSelectedProgram: (program: string | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredRecords: () => ClientRecord[];
  clearData: () => void;
}

export const useComplianceStore = create<ComplianceState>((set, get) => ({
  // Initial state
  clientRecords: [],
  uploadDate: null,
  fileName: null,
  overviewMetrics: null,
  programMetrics: [],
  dataQuality: null,
  selectedProgram: null,
  searchQuery: '',

  // Set uploaded data and calculate all metrics
  setClientRecords: (records, fileName) => {
    const overviewMetrics = calculateMetrics(records);
    const programMetrics = calculateProgramMetrics(records);
    const dataQuality = validateDataQuality(records);

    set({
      clientRecords: records,
      fileName,
      uploadDate: new Date(),
      overviewMetrics,
      programMetrics,
      dataQuality,
    });
  },

  // Filter controls
  setSelectedProgram: (program) => set({ selectedProgram: program }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Get filtered records based on current filters
  getFilteredRecords: () => {
    const { clientRecords, selectedProgram, searchQuery } = get();

    return clientRecords.filter(record => {
      // Program filter
      if (selectedProgram && record.ProgramName !== selectedProgram) {
        return false;
      }

      // Search filter (ClientID)
      if (searchQuery && !record.ClientID.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  },

  // Clear all data
  clearData: () => set({
    clientRecords: [],
    uploadDate: null,
    fileName: null,
    overviewMetrics: null,
    programMetrics: [],
    dataQuality: null,
    selectedProgram: null,
    searchQuery: '',
  }),
}));
