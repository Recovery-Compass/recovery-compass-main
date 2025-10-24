/**
 * Comprehensive Admin Dashboard
 * Central hub for platform monitoring and management
 * Integrates all power user features
 */

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import AIUsageDashboard from '@/components/ai/AIUsageDashboard';
import WorkflowManager from '@/components/workflows/WorkflowManager';
import {
  Activity,
  Bell,
  Zap,
  DollarSign,
  Settings,
  Database,
  Shield,
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Recovery Compass Admin</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive platform monitoring and management
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="ai-usage" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              AI Usage
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('analytics')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
                  <Activity className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">95/100</div>
                  <p className="text-xs text-muted-foreground">Excellent performance</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('notifications')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <Bell className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">2 compliance, 1 performance</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('ai-usage')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Cost (30d)</CardTitle>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45.32</div>
                  <p className="text-xs text-muted-foreground">Within budget</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('workflows')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
                  <Zap className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">100% success rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div
                    className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => setActiveTab('analytics')}
                  >
                    <Activity className="w-8 h-8 mb-2 text-primary" />
                    <div className="font-medium">View Analytics</div>
                    <p className="text-sm text-muted-foreground">Real-time platform metrics</p>
                  </div>

                  <div
                    className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => setActiveTab('workflows')}
                  >
                    <Zap className="w-8 h-8 mb-2 text-primary" />
                    <div className="font-medium">Manage Workflows</div>
                    <p className="text-sm text-muted-foreground">Automation & compliance</p>
                  </div>

                  <div
                    className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Bell className="w-8 h-8 mb-2 text-primary" />
                    <div className="font-medium">Review Alerts</div>
                    <p className="text-sm text-muted-foreground">3 unacknowledged alerts</p>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <Database className="w-8 h-8 mb-2 text-primary" />
                    <div className="font-medium">Database Status</div>
                    <p className="text-sm text-muted-foreground">Supabase connection healthy</p>
                  </div>

                  <div
                    className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => setActiveTab('ai-usage')}
                  >
                    <DollarSign className="w-8 h-8 mb-2 text-primary" />
                    <div className="font-medium">Monitor AI Costs</div>
                    <p className="text-sm text-muted-foreground">Track usage & spending</p>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <Shield className="w-8 h-8 mb-2 text-primary" />
                    <div className="font-medium">Security Audit</div>
                    <p className="text-sm text-muted-foreground">Review access logs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">API Services</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Operational</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">Database</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Connected</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">Workflow Engine</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Running</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-sm">Notification Service</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Limited (Email only)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">MCP Server</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <AnalyticsDashboard />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <NotificationCenter />
          </TabsContent>

          {/* AI Usage Tab */}
          <TabsContent value="ai-usage" className="mt-6">
            <AIUsageDashboard />
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="mt-6">
            <WorkflowManager />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Notification Channels</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure email, Slack, Telegram, and webhook notifications
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">AI Configuration</h3>
                      <p className="text-sm text-muted-foreground">
                        Set cost limits, model preferences, and usage thresholds
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Workflow Automation</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage automated workflows and schedules
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">MCP Server</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure Model Context Protocol server settings
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Sub-Agent System</h3>
                      <p className="text-sm text-muted-foreground">
                        Customize AI agent roles and expertise
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Integration Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Supabase</div>
                        <div className="text-sm text-muted-foreground">Database & Authentication</div>
                      </div>
                      <div className="text-green-600 font-medium">Connected</div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Google Analytics 4</div>
                        <div className="text-sm text-muted-foreground">Enhanced tracking with geo data</div>
                      </div>
                      <div className="text-green-600 font-medium">Active</div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Make.com</div>
                        <div className="text-sm text-muted-foreground">Webhook integrations</div>
                      </div>
                      <div className="text-green-600 font-medium">Configured</div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Cloudflare Pages</div>
                        <div className="text-sm text-muted-foreground">Hosting & CDN</div>
                      </div>
                      <div className="text-green-600 font-medium">Deployed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
