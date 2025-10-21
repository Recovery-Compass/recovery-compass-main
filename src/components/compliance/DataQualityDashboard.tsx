import React from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DataQualityDashboard() {
  const dataQuality = useComplianceStore(state => state.dataQuality);

  if (!dataQuality) {
    return (
      <div className="text-center py-12 text-gray-500">
        Upload data to view quality validation
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'green': return <CheckCircle2 className="h-4 w-4 text-quality-green" />;
      case 'yellow': return <AlertTriangle className="h-4 w-4 text-quality-yellow" />;
      case 'red': return <XCircle className="h-4 w-4 text-quality-red" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'border-quality-green bg-green-50';
      case 'yellow': return 'border-quality-yellow bg-yellow-50';
      case 'red': return 'border-quality-red bg-red-50';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {dataQuality.isCompliant ? (
                <>
                  <CheckCircle2 className="inline h-6 w-6 text-quality-green mr-2" />
                  MOU Compliant
                </>
              ) : (
                <>
                  <XCircle className="inline h-6 w-6 text-quality-red mr-2" />
                  MOU Non-Compliant
                </>
              )}
            </CardTitle>
            <Badge variant={dataQuality.isCompliant ? 'default' : 'destructive'} className={dataQuality.isCompliant ? 'bg-quality-green' : ''}>
              {dataQuality.isCompliant ? 'PASS' : 'FAIL'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Overall Data Quality Score</span>
              <span className="font-bold">{dataQuality.overallScore.toFixed(1)}%</span>
            </div>
            <Progress value={dataQuality.overallScore} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Critical Issues */}
      {dataQuality.criticalIssues.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Issues Detected</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {dataQuality.criticalIssues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Field Coverage */}
      <Card>
        <CardHeader>
          <CardTitle>Field Coverage Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataQuality.fieldCoverages.map((field) => (
              <div key={field.fieldName} className={`border rounded-lg p-4 ${getStatusColor(field.status)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(field.status)}
                    <span className="font-medium">{field.fieldName}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{field.coverage.toFixed(1)}%</div>
                    {field.missingCount > 0 && (
                      <Badge variant="outline" className="text-xs mt-1">
                        {field.missingCount} missing
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress value={field.coverage} className="h-2 mb-2" />
                {field.missingRecords.length > 0 && (
                  <div className="text-xs text-gray-600 mt-2">
                    Examples: {field.missingRecords.slice(0, 5).join(', ')}
                    {field.missingRecords.length > 5 && '...'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-quality-green"></div>
              <span className="text-sm">≥80% (Compliant)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-quality-yellow"></div>
              <span className="text-sm">60-79% (Warning)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-quality-red"></div>
              <span className="text-sm">&lt;60% (Critical)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
