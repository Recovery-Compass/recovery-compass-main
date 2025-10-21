import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { read, utils } from 'xlsx';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useComplianceStore } from '@/stores/complianceStore';
import { ClientRecord, UploadValidation } from '@/types/compliance';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const REQUIRED_COLUMNS = [
  'ClientID',
  'ProgramName',
  'IntakeDate',
  'ExitDate',
  'ExitDestination',
  'HousingPlacementDate',
  'LengthOfStay'
];

export function FileUploadInterface() {
  const [validation, setValidation] = useState<UploadValidation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const setClientRecords = useComplianceStore(state => state.setClientRecords);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setIsProcessing(true);
    const file = acceptedFiles[0];

    try {
      // Read file
      const arrayBuffer = await file.arrayBuffer();
      const workbook = read(arrayBuffer);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = utils.sheet_to_json(worksheet) as any[];

      // Validate columns
      if (data.length === 0) {
        setValidation({
          isValid: false,
          error: 'File is empty. Please upload a file with client data.',
        });
        setIsProcessing(false);
        return;
      }

      const headers = Object.keys(data[0]);
      const missingColumns = REQUIRED_COLUMNS.filter(col => !headers.includes(col));

      if (missingColumns.length > 0) {
        setValidation({
          isValid: false,
          error: `Missing required columns: ${missingColumns.join(', ')}`,
          missingColumns,
        });
        setIsProcessing(false);
        return;
      }

      // Parse records
      const records: ClientRecord[] = data.map(row => ({
        ClientID: row.ClientID?.toString() || '',
        ProgramName: row.ProgramName || '',
        IntakeDate: row.IntakeDate || null,
        ExitDate: row.ExitDate || null,
        ExitDestination: row.ExitDestination || null,
        HousingPlacementDate: row.HousingPlacementDate || null,
        LengthOfStay: row.LengthOfStay ? Number(row.LengthOfStay) : null,
      }));

      // Store in state
      setClientRecords(records, file.name);

      setValidation({
        isValid: true,
        recordCount: records.length,
      });

    } catch (error) {
      setValidation({
        isValid: false,
        error: `Failed to parse file: ${(error as Error).message}`,
      });
    } finally {
      setIsProcessing(false);
    }
  }, [setClientRecords]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragActive ? 'border-wfd-blue bg-blue-50' : 'border-gray-300 hover:border-wfd-blue'}
          ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          {isProcessing ? (
            <>
              <FileSpreadsheet className="w-16 h-16 text-wfd-blue animate-pulse" />
              <p className="text-lg font-medium text-gray-700">Processing file...</p>
            </>
          ) : (
            <>
              <Upload className="w-16 h-16 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {isDragActive ? 'Drop file here...' : 'Drag & drop Excel/CSV file here'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  or click to browse • Accepts .xlsx, .xls, .csv
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Validation Messages */}
      {validation && (
        validation.isValid ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              ✅ Successfully uploaded {validation.recordCount} client records
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {validation.error}
            </AlertDescription>
          </Alert>
        )
      )}

      {/* Required Columns Guide */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Required Columns:</p>
        <div className="flex flex-wrap gap-2">
          {REQUIRED_COLUMNS.map(col => (
            <span key={col} className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-mono">
              {col}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
