import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertTriangle, CheckCircle, Clock, Users, FileText, TrendingUp, Download, Mail, Calendar, UserCheck, BarChart3, Bell, Home, Timer, Target, Award } from "lucide-react";

const WhittierDashboard = () => {
  const [activeModule, setActiveModule] = useState('compliance');
  const [selectedManager, setSelectedManager] = useState('all');
  const [storyMode, setStoryMode] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', message: 'Assessment due today for Maria S.', time: '2 hours ago' },
    { id: 2, type: 'warning', message: 'John D. approaching 90-day limit (85 days)', time: '4 hours ago' },
    { id: 3, type: 'info', message: 'Monthly report due in 3 days', time: '1 day ago' },
    { id: 4, type: 'critical', message: 'Emergency Shelter KPI below threshold (45%)', time: '6 hours ago' }
  ]);

  // Enhanced comprehensive data
  const kpiData = {
    overallCompliance: 65,
    targetCompliance: 95,
    managerDataUsage: { current: 20, target: 80 },
    participantOutcomes: { improvement: 40 },
    daysRemaining: 67,
    historicalTrend: { sixMonthsAgo: 35, current: 65, projected: 95 },
    culturalImprovement: { turnoverReduction: 45, leadershipSatisfaction: 78 }
  };

  // 90-Day Shelter Stay Tracking Data (Feature 1)
  const longStayParticipants = [
    { name: "Maria S.", days: 187, status: "critical", program: "Emergency Shelter" },
    { name: "John D.", days: 85, status: "warning", program: "Emergency Shelter" },
    { name: "Angela M.", days: 134, status: "critical", program: "Transitional Housing" },
    { name: "Robert K.", days: 96, status: "warning", program: "Emergency Shelter" },
    { name: "Linda C.", days: 203, status: "critical", program: "Emergency Shelter" },
    { name: "Carlos R.", days: 67, status: "good", program: "Emergency Shelter" }
  ];

  // 5x5 Acuity Assessment Data (Feature 2)
  const acuityAssessments = {
    totalRequired: 346,
    completed: 245,
    overdue: 23,
    pending: 78,
    overdueParticipants: [
      { name: "Maria S.", daysOverdue: 15, manager: "Sarah Johnson" },
      { name: "David P.", daysOverdue: 8, manager: "Mike Chen" },
      { name: "Jennifer L.", daysOverdue: 22, manager: "Lisa Rodriguez" },
      { name: "Thomas W.", daysOverdue: 5, manager: "David Kim" },
      { name: "Michelle B.", daysOverdue: 12, manager: "Sarah Johnson" }
    ]
  };

  // Manager Data (Feature 3) - All 15 managers
  const allManagers = [
    { id: 'sarah-johnson', name: "Sarah Johnson", program: "Emergency Shelter", dataUsage: 85, outcomes: 78, lastLogin: "2 hours ago", assessmentsComplete: 45, assessmentsOverdue: 3, engagementScore: 82 },
    { id: 'mike-chen', name: "Mike Chen", program: "Transitional Housing", dataUsage: 72, outcomes: 82, lastLogin: "1 day ago", assessmentsComplete: 38, assessmentsOverdue: 2, engagementScore: 75 },
    { id: 'lisa-rodriguez', name: "Lisa Rodriguez", program: "Rapid Rehousing", dataUsage: 91, outcomes: 89, lastLogin: "30 min ago", assessmentsComplete: 52, assessmentsOverdue: 1, engagementScore: 93 },
    { id: 'david-kim', name: "David Kim", program: "Prevention Services", dataUsage: 45, outcomes: 65, lastLogin: "3 days ago", assessmentsComplete: 28, assessmentsOverdue: 5, engagementScore: 58 },
    { id: 'jennifer-martinez', name: "Jennifer Martinez", program: "Case Management", dataUsage: 78, outcomes: 84, lastLogin: "4 hours ago", assessmentsComplete: 41, assessmentsOverdue: 2, engagementScore: 79 },
    { id: 'robert-wilson', name: "Robert Wilson", program: "Mental Health", dataUsage: 82, outcomes: 76, lastLogin: "1 hour ago", assessmentsComplete: 47, assessmentsOverdue: 1, engagementScore: 85 },
    { id: 'amanda-davis', name: "Amanda Davis", program: "Substance Abuse", dataUsage: 88, outcomes: 91, lastLogin: "3 hours ago", assessmentsComplete: 49, assessmentsOverdue: 0, engagementScore: 92 },
    { id: 'carlos-gonzalez', name: "Carlos Gonzalez", program: "Youth Services", dataUsage: 67, outcomes: 73, lastLogin: "2 days ago", assessmentsComplete: 35, assessmentsOverdue: 4, engagementScore: 71 },
    { id: 'natasha-brown', name: "Natasha Brown", program: "Family Services", dataUsage: 93, outcomes: 87, lastLogin: "1 hour ago", assessmentsComplete: 53, assessmentsOverdue: 1, engagementScore: 89 },
    { id: 'thomas-anderson', name: "Thomas Anderson", program: "Veterans Affairs", dataUsage: 76, outcomes: 81, lastLogin: "6 hours ago", assessmentsComplete: 42, assessmentsOverdue: 3, engagementScore: 77 },
    { id: 'maria-lopez', name: "Maria Lopez", program: "Housing Placement", dataUsage: 84, outcomes: 88, lastLogin: "2 hours ago", assessmentsComplete: 46, assessmentsOverdue: 2, engagementScore: 86 },
    { id: 'kevin-taylor', name: "Kevin Taylor", program: "Outreach", dataUsage: 59, outcomes: 68, lastLogin: "4 days ago", assessmentsComplete: 31, assessmentsOverdue: 6, engagementScore: 63 },
    { id: 'sophia-white', name: "Sophia White", program: "Data Coordination", dataUsage: 95, outcomes: 92, lastLogin: "15 min ago", assessmentsComplete: 55, assessmentsOverdue: 0, engagementScore: 96 },
    { id: 'james-miller', name: "James Miller", program: "Intake Services", dataUsage: 71, outcomes: 74, lastLogin: "1 day ago", assessmentsComplete: 39, assessmentsOverdue: 3, engagementScore: 72 },
    { id: 'rachel-garcia', name: "Rachel Garcia", program: "Benefits Coordination", dataUsage: 89, outcomes: 85, lastLogin: "3 hours ago", assessmentsComplete: 48, assessmentsOverdue: 1, engagementScore: 88 }
  ];

  // Survey Integration Data (Feature 4)
  const surveyData = {
    baseline: {
      confidenceScores: { pre: 4.2, post: 7.8, improvement: 85 },
      responseRate: 87,
      completionRate: 92
    },
    managerEngagement: {
      dailyLogins: 78,
      weeklyDataEntry: 85,
      monthlyGoalAchievement: 73
    }
  };

  // County Transition Scorecard (Feature 6)
  const countyScorecard = [
    { requirement: "HMIS Data Quality", current: 78, target: 95, status: "warning", priority: "high" },
    { requirement: "Assessment Completion", current: 67, target: 95, status: "critical", priority: "critical" },
    { requirement: "Housing Outcomes", current: 84, target: 90, status: "warning", priority: "medium" },
    { requirement: "Service Documentation", current: 91, target: 95, status: "good", priority: "low" },
    { requirement: "Financial Reporting", current: 88, target: 95, status: "warning", priority: "medium" },
    { requirement: "Staff Training", current: 95, target: 95, status: "good", priority: "low" }
  ];

  const complianceMetrics = [
    { program: "Emergency Shelter", status: "critical", compliance: 45, deadline: "3 days" },
    { program: "Transitional Housing", status: "warning", compliance: 72, deadline: "10 days" },
    { program: "Rapid Rehousing", status: "good", compliance: 88, deadline: "25 days" },
    { program: "Prevention Services", status: "critical", compliance: 52, deadline: "5 days" },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, "destructive" | "secondary" | "default" | "outline"> = {
      critical: "destructive",
      warning: "secondary",
      good: "default"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  // Helper functions
  const getFilteredManagers = () => {
    return selectedManager === 'all' ? allManagers : allManagers.filter(m => m.id === selectedManager);
  };

  const getCurrentAlert = () => {
    const currentIndex = Math.floor(Date.now() / 5000) % alerts.length;
    return alerts[currentIndex];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Story Mode Toggle & Manager Filter */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-navy">Whittier First Day KPI Dashboard</h1>
              <p className="text-muted-foreground mt-1">County Transition Readiness & Performance Monitoring</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4" />
                <span>Culture Transformation: {kpiData.culturalImprovement.turnoverReduction}% turnover reduction since new leadership</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{kpiData.daysRemaining}</div>
                <div className="text-sm text-muted-foreground">Days Remaining</div>
              </div>
              {/* Story Mode Toggle (Feature 7) */}
              <Button 
                variant={storyMode ? "default" : "outline"} 
                size="sm"
                onClick={() => setStoryMode(!storyMode)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {storyMode ? "Data View" : "Story Mode"}
              </Button>
              {/* Critical Export Button (Feature 10) */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="cta" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export for County Audit
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Export County Audit Report</AlertDialogTitle>
                    <AlertDialogDescription>
                      Generate comprehensive compliance report for county review including all KPI metrics, assessment completion rates, and transformation evidence.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Generate PDF Report</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          {/* Manager Selection (Feature 3) */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Manager View:</label>
            <Select value={selectedManager} onValueChange={setSelectedManager}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Managers (15)</SelectItem>
                {allManagers.map(manager => (
                  <SelectItem key={manager.id} value={manager.id}>
                    {manager.name} - {manager.program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Real-Time Alerts Bar (Feature 8) */}
      <div className="bg-orange-50 border-b border-orange-200">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-700">
              <Bell className="w-4 h-4 animate-pulse" />
              <span className="font-medium">{getCurrentAlert().message}</span>
              <span className="text-xs opacity-75">• {getCurrentAlert().time}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Mail className="w-3 h-3 mr-1" />
                Email Managers
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                Schedule Review
              </Button>
            </div>
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

          {/* KPI Compliance Tracker with County Scorecard (Feature 6) */}
          <TabsContent value="compliance" className="space-y-6">
            {/* County Transition Scorecard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  County Transition Scorecard
                </CardTitle>
                <CardDescription>Progress toward 95% compliance goal across all county requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {countyScorecard.map((requirement, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{requirement.requirement}</h4>
                        <p className="text-sm text-muted-foreground">Priority: {requirement.priority}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{requirement.current}% / {requirement.target}%</div>
                        <Progress value={requirement.current} className="w-24 mt-1" />
                        <StatusBadge status={requirement.status} />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* What's needed for compliance checklist */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">What's needed for compliance:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span>Complete 101 pending 5x5 assessments (Priority: Critical)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-warning" />
                      <span>Improve HMIS data quality to 95% (17% gap remaining)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-warning" />
                      <span>Increase housing outcomes success rate by 6%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Compliance Status */}
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

          {/* Manager Performance with Survey Integration (Features 3 & 4) */}
          <TabsContent value="managers" className="space-y-6">
            {/* Survey Integration Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Baseline Survey Results
                </CardTitle>
                <CardDescription>Pre/post data usage confidence and manager engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{surveyData.baseline.confidenceScores.improvement}%</div>
                    <div className="text-sm text-muted-foreground">Confidence Improvement</div>
                    <div className="text-xs mt-1">Pre: {surveyData.baseline.confidenceScores.pre}/10 → Post: {surveyData.baseline.confidenceScores.post}/10</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-success">{surveyData.baseline.responseRate}%</div>
                    <div className="text-sm text-muted-foreground">Response Rate</div>
                    <div className="text-xs mt-1">13 of 15 managers</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-success">{surveyData.managerEngagement.weeklyDataEntry}%</div>
                    <div className="text-sm text-muted-foreground">Weekly Data Entry</div>
                    <div className="text-xs mt-1">Up from 23% baseline</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Manager Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Individual Manager Dashboards ({selectedManager === 'all' ? '15' : '1'} shown)</CardTitle>
                <CardDescription>Personalized accountability and improvement suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getFilteredManagers().map((manager, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{manager.name}</h4>
                          <p className="text-sm text-muted-foreground">{manager.program}</p>
                          <p className="text-xs text-muted-foreground">Last active: {manager.lastLogin}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{manager.engagementScore}%</div>
                          <div className="text-xs text-muted-foreground">Engagement Score</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-sm font-medium">Data Usage</div>
                          <div className="text-lg font-bold">{manager.dataUsage}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">Outcomes</div>
                          <div className="text-lg font-bold">{manager.outcomes}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">Assessments</div>
                          <div className="text-lg font-bold">{manager.assessmentsComplete}</div>
                          {manager.assessmentsOverdue > 0 && (
                            <div className="text-xs text-destructive">{manager.assessmentsOverdue} overdue</div>
                          )}
                        </div>
                      </div>
                      
                      {/* Personalized suggestions */}
                      {manager.dataUsage < 70 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-3">
                          <p className="text-sm text-orange-700">
                            💡 <strong>Suggestion:</strong> Increase daily HMIS usage. Target: 10 min daily. 
                            {manager.name === "David Kim" && " Consider data entry training refresher."}
                            {manager.name === "Kevin Taylor" && " Schedule 1:1 with data coordinator."}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced 5x5 Acuity Assessment Tracker (Feature 2) */}
          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  5x5 Acuity Assessment Tracker
                </CardTitle>
                <CardDescription>Critical for county funding - completion rates and overdue tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 border rounded-lg">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
                    <div className="text-2xl font-bold">{acuityAssessments.completed}</div>
                    <div className="text-sm text-muted-foreground">Assessments Complete</div>
                    <div className="text-xs mt-1">{Math.round((acuityAssessments.completed / acuityAssessments.totalRequired) * 100)}% of total</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-warning" />
                    <div className="text-2xl font-bold">{acuityAssessments.pending}</div>
                    <div className="text-sm text-muted-foreground">Pending Review</div>
                    <div className="text-xs mt-1">Within deadline</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-destructive" />
                    <div className="text-2xl font-bold">{acuityAssessments.overdue}</div>
                    <div className="text-sm text-muted-foreground">Overdue - URGENT</div>
                    <div className="text-xs mt-1">Risking county funding</div>
                  </div>
                </div>

                {/* Overdue Assessments with Quick Actions */}
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4 text-destructive">Overdue Assessments Requiring Immediate Action:</h4>
                  <div className="space-y-3">
                    {acuityAssessments.overdueParticipants.map((participant, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div>
                          <span className="font-medium">{participant.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            • {participant.daysOverdue} days overdue • Manager: {participant.manager}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="destructive">
                            <Timer className="w-3 h-3 mr-1" />
                            Complete Assessment
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Mail className="w-3 h-3 mr-1" />
                                Email Manager
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Email Manager About Overdue Assessment</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Send urgent notification to {participant.manager} about {participant.name}'s overdue 5x5 assessment ({participant.daysOverdue} days overdue).
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Send Email</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completion by Manager */}
                <div className="border-t pt-6 mt-6">
                  <h4 className="font-medium mb-4">Completion Rate by Manager:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allManagers.slice(0, 8).map((manager, index) => {
                      const completionRate = Math.round((manager.assessmentsComplete / (manager.assessmentsComplete + manager.assessmentsOverdue)) * 100);
                      return (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span className="font-medium">{manager.name}</span>
                            <div className="text-sm text-muted-foreground">{manager.program}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{completionRate}%</div>
                            <div className="text-xs text-muted-foreground">{manager.assessmentsComplete} complete</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 90-Day Shelter Stay Tracking (Feature 1) */}
          <TabsContent value="participants" className="space-y-6">
            {/* 90-Day Tracking - TOP PRIORITY */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Home className="w-5 h-5" />
                  90-Day Shelter Stay Violations - URGENT
                </CardTitle>
                <CardDescription>Critical: Participants exceeding 90-day limit (addressing the woman who was there 1.5 years)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 border-2 border-red-500 rounded-lg bg-red-50">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-destructive" />
                    <div className="text-2xl font-bold text-destructive">
                      {longStayParticipants.filter(p => p.status === 'critical').length}
                    </div>
                    <div className="text-sm text-destructive font-medium">Over 120 Days (Critical)</div>
                  </div>
                  <div className="text-center p-6 border-2 border-orange-500 rounded-lg bg-orange-50">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-warning" />
                    <div className="text-2xl font-bold text-warning">
                      {longStayParticipants.filter(p => p.status === 'warning').length}
                    </div>
                    <div className="text-sm text-warning font-medium">90-120 Days (Warning)</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
                    <div className="text-2xl font-bold text-success">
                      {longStayParticipants.filter(p => p.status === 'good').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Under 90 Days</div>
                  </div>
                </div>

                {/* Individual Participants Over Limit */}
                <div className="space-y-3">
                  <h4 className="font-medium text-destructive mb-3">Participants Requiring Immediate Housing Placement:</h4>
                  {longStayParticipants
                    .filter(p => p.status === 'critical' || p.status === 'warning')
                    .sort((a, b) => b.days - a.days)
                    .map((participant, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                      participant.status === 'critical' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'
                    }`}>
                      <div>
                        <span className="font-bold text-lg">{participant.name}</span>
                        <span className={`ml-3 text-sm ${participant.status === 'critical' ? 'text-red-700' : 'text-orange-700'}`}>
                          {participant.days} days in {participant.program}
                        </span>
                        {participant.days > 120 && (
                          <span className="ml-2 text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                            {participant.days - 120} days over critical threshold
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant={participant.status === 'critical' ? 'destructive' : 'outline'}>
                          <Home className="w-3 h-3 mr-1" />
                          Place in Housing
                        </Button>
                        <Button size="sm" variant="outline">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Case Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Historical Trend */}
                <div className="border-t pt-6 mt-6">
                  <h4 className="font-medium mb-4">Historical Trend - Long-Stay Reduction Progress:</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-xl font-bold text-destructive">18</div>
                      <div className="text-sm text-muted-foreground">3 Months Ago</div>
                      <div className="text-xs">Over 90 days</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-xl font-bold text-warning">12</div>
                      <div className="text-sm text-muted-foreground">Last Month</div>
                      <div className="text-xs">Over 90 days</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-xl font-bold text-warning">8</div>
                      <div className="text-sm text-muted-foreground">Current</div>
                      <div className="text-xs">Over 90 days</div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-success">
                    ✅ 56% reduction in long-stay participants over 3 months
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traditional Participant Flow */}
            <Card>
              <CardHeader>
                <CardTitle>Participant Flow Overview</CardTitle>
                <CardDescription>Average lengths of stay and placement success rates</CardDescription>
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

          {/* Enhanced Research & Reports (Feature 5) */}
          <TabsContent value="research" className="space-y-6">
            {/* Story Mode Display */}
            {storyMode && (
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Transformation Story Mode - Funder Narrative
                  </CardTitle>
                  <CardDescription>Auto-generated impact statements for grant applications and board presentations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border">
                      <h4 className="font-bold text-blue-800 mb-2">Executive Summary:</h4>
                      <p className="text-sm leading-relaxed">
                        "Under new leadership, Whittier First Day has achieved a transformational 56% reduction in long-term shelter stays, 
                        demonstrating measurable progress toward county compliance. Our data-driven approach has increased manager 
                        engagement by 85% and improved participant outcomes by 40%, positioning WFD as a model for sustainable 
                        homeless services delivery in LA County."
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <h4 className="font-bold text-blue-800 mb-2">Key Impact Metrics:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Culture Transformation:</strong> 45% reduction in staff turnover since leadership change</li>
                        <li>• <strong>Data Engagement:</strong> Manager confidence increased from 4.2/10 to 7.8/10</li>
                        <li>• <strong>Compliance Progress:</strong> On track to achieve 95% county compliance by deadline</li>
                        <li>• <strong>Participant Outcomes:</strong> 74% permanent housing placement success rate</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <h4 className="font-bold text-blue-800 mb-2">Success Story Highlight:</h4>
                      <p className="text-sm leading-relaxed italic">
                        "Through enhanced assessment protocols and manager accountability, we successfully placed Maria S., 
                        who had been in emergency shelter for over 6 months, into permanent supportive housing within 30 days 
                        of implementing our new data-driven case management approach."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Research & Export Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Research & Publication Module
                </CardTitle>
                <CardDescription>Export-ready data for Gates Foundation, board presentations, and academic publications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-green-700">📊 Gates Foundation Format</h4>
                    <div className="space-y-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="cta" className="w-full justify-start">
                            <Download className="w-4 h-4 mr-2" />
                            Gates Foundation Format Export
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Export Gates Foundation Report</AlertDialogTitle>
                            <AlertDialogDescription>
                              Generate publication-ready report with academic citation formatting, transformation metrics, and outcome visualization optimized for foundation review.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Generate Report</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        6-Month Comparative Analysis
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Academic Publication Dataset
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-blue-700">📈 Board Presentation Tools</h4>
                    <div className="space-y-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="w-4 h-4 mr-2" />
                            Generate Board Presentation
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Board Presentation Generator</AlertDialogTitle>
                            <AlertDialogDescription>
                              Create executive-ready PowerPoint with transformation story, compliance progress, and future funding projections.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Generate Presentation</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Publication-Ready Charts
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Impact Visualization Suite
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quick Stats for Research */}
                <div className="border-t pt-6 mt-6">
                  <h4 className="font-medium mb-4">Key Research Findings:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-success">65% → 95%</div>
                      <div className="text-sm text-muted-foreground">Compliance Trajectory</div>
                      <div className="text-xs mt-1">6-month improvement</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">85%</div>
                      <div className="text-sm text-muted-foreground">Manager Confidence Gain</div>
                      <div className="text-xs mt-1">Post-training survey</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-success">56%</div>
                      <div className="text-sm text-muted-foreground">Long-Stay Reduction</div>
                      <div className="text-xs mt-1">90+ day participants</div>
                    </div>
                  </div>
                </div>

                {/* Whittier Context Notes */}
                <div className="border-t pt-6 mt-6">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Whittier First Day Transformation Context:
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                    <p><strong>Inherited Challenge:</strong> Organization required significant culture transformation after leadership transition</p>
                    <p><strong>Leadership Impact:</strong> New executive leadership implemented data-driven accountability measures</p>
                    <p><strong>Cultural Indicators:</strong> 45% reduction in staff turnover, 78% leadership satisfaction score</p>
                    <p><strong>Future Readiness:</strong> Positioned to exceed county compliance requirements and serve as model program</p>
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