
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/useToast';
import { 
  Webhook, 
  FileSpreadsheet, 
  BarChart3, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Upload
} from 'lucide-react';

interface WebhookData {
  id: string;
  timestamp: string;
  source: 'google-sheets' | 'csv-upload' | 'excel-file';
  data: any[];
  status: 'pending' | 'processing' | 'completed' | 'error';
  recordCount: number;
}

const MakeIntegration = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [recentWebhooks, setRecentWebhooks] = useState<WebhookData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Load saved webhook URL from localStorage
  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem('make_webhook_url');
    if (savedWebhookUrl) {
      setWebhookUrl(savedWebhookUrl);
      setIsConnected(true);
    }

    // Load recent webhook data
    const savedWebhooks = localStorage.getItem('make_webhook_history');
    if (savedWebhooks) {
      setRecentWebhooks(JSON.parse(savedWebhooks));
    }
  }, []);

  const handleWebhookSave = () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a valid Make webhook URL",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('make_webhook_url', webhookUrl);
    setIsConnected(true);
    
    toast({
      title: "Webhook Connected",
      description: "Make webhook URL has been saved successfully",
    });
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "No webhook URL configured",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        source: 'recovery-compass-test',
        data: [
          { client_id: 'TEST001', housing_status: 'Housed', services_received: 5 },
          { client_id: 'TEST002', housing_status: 'Transitional', services_received: 3 }
        ]
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(testData),
      });

      toast({
        title: "Test Sent",
        description: "Test data sent to Make webhook. Check your Make scenario for results.",
      });
    } catch (error) {
      console.error('Webhook test error:', error);
      toast({
        title: "Test Failed",
        description: "Failed to send test data to Make webhook",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateDataReceive = () => {
    const newWebhook: WebhookData = {
      id: `webhook_${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: 'google-sheets',
      data: [
        { client_id: 'RC001', housing_placement: 'Permanent', engagement_days: 45, services: 'Case Management, Mental Health' },
        { client_id: 'RC002', housing_placement: 'Transitional', engagement_days: 23, services: 'Substance Treatment' },
        { client_id: 'RC003', housing_placement: 'Emergency Shelter', engagement_days: 12, services: 'Crisis Intervention' }
      ],
      status: 'completed',
      recordCount: 3
    };

    const updatedWebhooks = [newWebhook, ...recentWebhooks.slice(0, 9)];
    setRecentWebhooks(updatedWebhooks);
    localStorage.setItem('make_webhook_history', JSON.stringify(updatedWebhooks));

    toast({
      title: "Data Received",
      description: `Processed ${newWebhook.recordCount} records from Google Sheets`,
    });
  };

  const complianceTemplates = [
    {
      name: 'HUD Annual Performance Report',
      description: 'Housing outcomes and client demographics',
      fields: ['client_id', 'housing_status', 'exit_destination', 'income_change'],
      status: 'active'
    },
    {
      name: 'SAMHSA Block Grant Report',
      description: 'Substance abuse treatment services and outcomes',
      fields: ['client_id', 'treatment_type', 'completion_status', 'follow_up_status'],
      status: 'active'
    },
    {
      name: 'County Contract Metrics',
      description: 'Service delivery and performance indicators',
      fields: ['service_date', 'service_type', 'duration', 'outcome_score'],
      status: 'draft'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Make Integration Hub</h1>
          <p className="text-gray-600">Automate nonprofit compliance reporting and dashboard updates</p>
        </div>

        <Tabs defaultValue="webhooks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="webhooks">Webhook Setup</TabsTrigger>
            <TabsTrigger value="templates">Compliance Templates</TabsTrigger>
            <TabsTrigger value="history">Data History</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          {/* Webhook Setup Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="w-5 h-5" />
                  Make Webhook Configuration
                </CardTitle>
                <CardDescription>
                  Connect your Make scenario to receive data from Google Sheets and trigger dashboard updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="webhook-url">Make Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    type="url"
                    placeholder="https://hook.integromat.com/your-webhook-id"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Copy this URL from your Make scenario webhook trigger
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleWebhookSave}>
                    Save Webhook
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleTestWebhook}
                    disabled={!isConnected || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      'Test Connection'
                    )}
                  </Button>
                </div>

                {isConnected && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Webhook configured successfully</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Demo Data Simulation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  Data Source Simulation
                </CardTitle>
                <CardDescription>
                  Simulate receiving data from Google Sheets for demonstration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={simulateDataReceive} variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Simulate Google Sheets Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-4">
              {complianceTemplates.map((template, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                      <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                        {template.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Required Fields:</Label>
                      <div className="flex flex-wrap gap-2">
                        {template.fields.map((field, fieldIndex) => (
                          <Badge key={fieldIndex} variant="outline">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Data History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Webhook Activity</CardTitle>
                <CardDescription>
                  Data received from Make scenarios and processing status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentWebhooks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No webhook data received yet</p>
                    <p className="text-sm">Configure your Make scenario to start receiving data</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentWebhooks.map((webhook) => (
                      <div key={webhook.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">
                              {webhook.source === 'google-sheets' ? 'Google Sheets' : 
                               webhook.source === 'csv-upload' ? 'CSV Upload' : 'Excel File'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(webhook.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <Badge variant={webhook.status === 'completed' ? 'default' : 'secondary'}>
                            {webhook.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Processed {webhook.recordCount} records
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-teal" />
                    Data Processing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-teal">
                    {recentWebhooks.reduce((sum, w) => sum + w.recordCount, 0)}
                  </div>
                  <p className="text-sm text-gray-600">Total records processed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {recentWebhooks.length > 0 ? 
                      Math.round((recentWebhooks.filter(w => w.status === 'completed').length / recentWebhooks.length) * 100) : 0}%
                  </div>
                  <p className="text-sm text-gray-600">Successful processing</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    Active Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">
                    {complianceTemplates.filter(t => t.status === 'active').length}
                  </div>
                  <p className="text-sm text-gray-600">Compliance templates</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MakeIntegration;
