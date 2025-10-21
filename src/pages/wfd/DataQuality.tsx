import React from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import { DataQualityDashboard } from '@/components/compliance/DataQualityDashboard';
import { WFDComplianceLayout } from '@/components/wfd-suite/WFDComplianceLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DataQuality() {
  const clientRecords = useComplianceStore(state => state.clientRecords);

  return (
    <WFDComplianceLayout
      title="Data Quality"
      description="MOU compliance validation and field coverage analysis"
    >
      {clientRecords.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Data to Validate</CardTitle>
            <CardDescription>
              Upload a Housing Tracker file to run data quality checks
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
        <DataQualityDashboard />
      )}
    </WFDComplianceLayout>
  );
}
