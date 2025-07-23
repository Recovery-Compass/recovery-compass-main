import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Users, FileText, TrendingUp, Download } from "lucide-react";

const WhittierDashboard = () => {
  const [activeModule, setActiveModule] = useState('compliance');

  // Placeholder data as specified
  const kpiData = {
    overallCompliance: 65,
    targetCompliance: 95,
    managerDataUsage: { current: 20, target: 80 },
    participantOutcomes: { improvement: 40 },
    daysRemaining: 67
  };

  const complianceMetrics = [
    { program: "Emergency Shelter", status: "critical", compliance: 45, deadline: "3 days" },
    { program: "Transitional Housing", status: "warning", compliance: 72, deadline: "10 days" },
    { program: "Rapid Rehousing", status: "good", compliance: 88, deadline: "25 days" },
    { program: "Prevention Services", status: "critical", compliance: 52, deadline: "5 days" },
  ];

  const managerPerformance = [
    { name: "Sarah Johnson", program: "Emergency Shelter", dataUsage: 85, outcomes: 78, lastLogin: "2 hours ago" },
    { name: "Mike Chen", program: "Transitional Housing", dataUsage: 72, outcomes: 82, lastLogin: "1 day ago" },
    { name: "Lisa Rodriguez", program: "Rapid Rehousing", dataUsage: 91, outcomes: 89, lastLogin: "30 min ago" },
    { name: "David Kim", program: "Prevention Services", dataUsage: 45, outcomes: 65, lastLogin: "3 days ago" },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, "destructive" | "secondary" | "default" | "outline"> = {
      critical: "destructive",
      warning: "secondary",
      good: "default"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-navy">Whittier First Day KPI Dashboard</h1>
              <p className="text-muted-foreground mt-1">County Transition Readiness & Performance Monitoring</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{kpiData.daysRemaining}</div>
                <div className="text-sm text-muted-foreground">Days Remaining</div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      <div className="bg-destructive/10 border-b border-destructive/20">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Critical: 2 programs require immediate attention for county compliance</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{kpiData.overallCompliance}%</div>
              <div className="text-xs text-muted-foreground">Target: {kpiData.targetCompliance}%</div>
              <Progress value={kpiData.overallCompliance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Manager Data Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{kpiData.managerDataUsage.current}%</div>
              <div className="text-xs text-muted-foreground">Target: {kpiData.managerDataUsage.target}%</div>
              <Progress value={kpiData.managerDataUsage.current} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Outcome Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">+{kpiData.participantOutcomes.improvement}%</div>
              <div className="text-xs text-muted-foreground">vs. Previous Period</div>
              <div className="flex items-center mt-2 text-success">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-xs">Trending Up</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Audit Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">67%</div>
              <div className="text-xs text-muted-foreground">5x5 Assessments Complete</div>
              <Progress value={67} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Modules */}
        <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="compliance">KPI Compliance</TabsTrigger>
            <TabsTrigger value="managers">Manager Performance</TabsTrigger>
            <TabsTrigger value="audit">Audit Readiness</TabsTrigger>
            <TabsTrigger value="participants">Participant Flow</TabsTrigger>
            <TabsTrigger value="research">Research & Reports</TabsTrigger>
          </TabsList>

          {/* KPI Compliance Tracker */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Compliance Status</CardTitle>
                <CardDescription>Real-time monitoring of county compliance requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceMetrics.map((program, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-medium">{program.program}</h4>
                          <p className="text-sm text-muted-foreground">Deadline: {program.deadline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold">{program.compliance}%</div>
                          <Progress value={program.compliance} className="w-24" />
                        </div>
                        <StatusBadge status={program.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manager Performance */}
          <TabsContent value="managers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manager Performance Dashboard</CardTitle>
                <CardDescription>Individual manager metrics and data engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {managerPerformance.map((manager, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{manager.name}</h4>
                        <p className="text-sm text-muted-foreground">{manager.program}</p>
                        <p className="text-xs text-muted-foreground">Last active: {manager.lastLogin}</p>
                      </div>
                      <div className="flex gap-6">
                        <div className="text-center">
                          <div className="text-sm font-medium">Data Usage</div>
                          <div className="text-lg font-bold">{manager.dataUsage}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">Outcomes</div>
                          <div className="text-lg font-bold">{manager.outcomes}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Readiness */}
          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>5x5 Acuity Assessment Monitor</CardTitle>
                <CardDescription>Track completion rates and audit preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">245</div>
                    <div className="text-sm text-muted-foreground">Assessments Complete</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-warning" />
                    <div className="text-2xl font-bold">78</div>
                    <div className="text-sm text-muted-foreground">Pending Review</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-destructive" />
                    <div className="text-2xl font-bold">23</div>
                    <div className="text-sm text-muted-foreground">Overdue</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Participant Flow */}
          <TabsContent value="participants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Participant Flow Visualization</CardTitle>
                <CardDescription>Track lengths of stay and placement success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Average Length of Stay</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Emergency Shelter</span>
                        <span className="font-bold">23 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transitional Housing</span>
                        <span className="font-bold">127 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rapid Rehousing</span>
                        <span className="font-bold">89 days</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Placement Success Rates</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Permanent Housing</span>
                        <span className="font-bold text-success">74%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Temporary Housing</span>
                        <span className="font-bold text-warning">18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Still Seeking</span>
                        <span className="font-bold text-muted-foreground">8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research & Publication */}
          <TabsContent value="research" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Research & Publication Module</CardTitle>
                <CardDescription>Export-ready data for Gates Foundation and academic publications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Available Reports</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        6-Month Outcome Analysis
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Gates Foundation Format
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Academic Publication Data
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Story Mode Insights</h4>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        "Whittier First Day has demonstrated a remarkable 40% improvement in participant outcomes 
                        through data-driven decision making and enhanced manager engagement, positioning the 
                        organization as a model for sustainable homeless services delivery."
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WhittierDashboard;