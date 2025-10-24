import { useComplianceStore } from '@/stores/complianceStore';
import { ClientDataTable } from '@/components/compliance/ClientDataTable';
import { WFDComplianceLayout } from '@/components/wfd-suite/WFDComplianceLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ClientList() {
  const clientRecords = useComplianceStore(state => state.clientRecords);

  return (
    <WFDComplianceLayout
      title="Client Data"
      description="Detailed view of all client records with filtering and export options"
    >
      {clientRecords.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Data Uploaded</CardTitle>
            <CardDescription>
              Upload a Housing Tracker file to view client data
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
        <ClientDataTable />
      )}
    </WFDComplianceLayout>
  );
}
