import React from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import { ProgramPerformanceTable } from '@/components/compliance/ProgramPerformanceTable';
import { WFDComplianceLayout } from '@/components/wfd-suite/WFDComplianceLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProgramPerformance() {
  const clientRecords = useComplianceStore(state => state.clientRecords);

  return (
    <WFDComplianceLayout
      title="Program Performance"
      description="Side-by-side comparison of all WFD programs"
    >
      {clientRecords.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Data Uploaded</CardTitle>
            <CardDescription>
              Upload a Housing Tracker file to view program performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/wfd/compliance">
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <ProgramPerformanceTable />
      )}
    </WFDComplianceLayout>
  );
}
