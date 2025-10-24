import { useComplianceStore } from '@/stores/complianceStore';
import { FileUploadInterface } from '@/components/compliance/FileUploadInterface';
import { OverviewMetrics } from '@/components/compliance/OverviewMetrics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WFDComplianceLayout } from '@/components/wfd-suite/WFDComplianceLayout';
import { Button } from '@/components/ui/button';

export default function ComplianceDashboard() {
  const clientRecords = useComplianceStore(state => state.clientRecords);
  const fileName = useComplianceStore(state => state.fileName);
  const uploadDate = useComplianceStore(state => state.uploadDate);
  const clearData = useComplianceStore(state => state.clearData);

  const hasData = clientRecords.length > 0;

  return (
    <WFDComplianceLayout
      title="WFD Compliance Dashboard"
      description="Dynamic data upload and analysis for Whittier First Day programs"
    >
      <div className="space-y-6">
        {hasData && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Current file: <span className="font-medium text-gray-900">{fileName}</span> •{' '}
                    Uploaded:{' '}
                    <span className="font-medium text-gray-900">
                      {uploadDate?.toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <Button variant="outline" onClick={clearData}>
                  Upload New File
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!hasData ? (
          <Card>
            <CardHeader>
              <CardTitle>Upload Housing Tracker Data</CardTitle>
              <CardDescription>
                Upload your Excel or CSV file containing client data to begin analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadInterface />
            </CardContent>
          </Card>
        ) : (
          <>
            <OverviewMetrics />

            <Card>
              <CardHeader>
                <CardTitle>Need to upload new data?</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUploadInterface />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </WFDComplianceLayout>
  );
}
