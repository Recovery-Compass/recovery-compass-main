/**
 * Workflow Manager Component
 * Visual workflow builder and manager
 */

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import WorkflowAutomation, { Workflow, WorkflowExecution } from '@/services/WorkflowAutomation';
import {
  Play,
  Pause,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Settings,
} from 'lucide-react';

interface WorkflowCardProps {
  workflow: Workflow;
  onExecute: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
  onDelete: (id: string) => void;
}

function WorkflowCard({ workflow, onExecute, onToggle, onDelete }: WorkflowCardProps) {
  const successRate = workflow.runCount > 0
    ? (workflow.successCount / workflow.runCount) * 100
    : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {workflow.name}
              <Badge variant={workflow.enabled ? 'default' : 'secondary'}>
                {workflow.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {workflow.trigger}
              </Badge>
            </CardTitle>
            <CardDescription className="mt-2">
              {workflow.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Total Runs</div>
            <div className="text-2xl font-bold">{workflow.runCount}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Success Rate</div>
            <div className="text-2xl font-bold text-green-600">
              {successRate.toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Nodes</div>
            <div className="text-2xl font-bold">{workflow.nodes.length}</div>
          </div>
        </div>

        {workflow.lastRun && (
          <div className="text-xs text-muted-foreground">
            Last run: {new Date(workflow.lastRun).toLocaleString()}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onExecute(workflow.id)}
            disabled={!workflow.enabled}
          >
            <Play className="w-4 h-4 mr-2" />
            Run
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onToggle(workflow.id, !workflow.enabled)}
          >
            {workflow.enabled ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Disable
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Enable
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(workflow.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface ExecutionLogProps {
  execution: WorkflowExecution;
}

function ExecutionLog({ execution }: ExecutionLogProps) {
  const duration = execution.endTime
    ? execution.endTime - execution.startTime
    : Date.now() - execution.startTime;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Execution {execution.id.slice(-8)}
            {execution.status === 'success' && (
              <Badge className="bg-green-600">Success</Badge>
            )}
            {execution.status === 'failed' && (
              <Badge variant="destructive">Failed</Badge>
            )}
            {execution.status === 'running' && (
              <Badge variant="secondary">Running</Badge>
            )}
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {duration}ms
          </span>
        </div>
        <CardDescription>
          {new Date(execution.startTime).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {execution.error && (
          <Alert variant="destructive" className="mb-4">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{execution.error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <div className="text-sm font-medium">Execution Logs:</div>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {execution.logs.map((log, i) => (
              <div
                key={i}
                className={`text-xs p-2 rounded ${
                  log.level === 'error' ? 'bg-red-100 dark:bg-red-900' :
                  log.level === 'warn' ? 'bg-yellow-100 dark:bg-yellow-900' :
                  'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="font-medium">{log.nodeId}</span>
                  <span>{log.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function WorkflowManager() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const automation = WorkflowAutomation.getInstance();

  const loadData = () => {
    setWorkflows(automation.listWorkflows());
    setExecutions(
      selectedWorkflow
        ? automation.listExecutions(selectedWorkflow)
        : automation.listExecutions().slice(-10)
    );
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [selectedWorkflow]);

  const handleExecute = async (workflowId: string) => {
    try {
      await automation.executeWorkflow(workflowId);
      loadData();
    } catch (error) {
      console.error('Failed to execute workflow:', error);
    }
  };

  const handleToggle = (workflowId: string, enabled: boolean) => {
    if (enabled) {
      automation.enableWorkflow(workflowId);
    } else {
      automation.disableWorkflow(workflowId);
    }
    loadData();
  };

  const handleDelete = (workflowId: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      automation.deleteWorkflow(workflowId);
      loadData();
    }
  };

  const activeWorkflows = workflows.filter(w => w.enabled).length;
  const totalRuns = workflows.reduce((sum, w) => sum + w.runCount, 0);
  const totalSuccess = workflows.reduce((sum, w) => sum + w.successCount, 0);
  const successRate = totalRuns > 0 ? (totalSuccess / totalRuns) * 100 : 0;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Zap className="w-8 h-8" />
          Workflow Automation
        </h1>
        <p className="text-muted-foreground mt-1">
          Automate compliance processing and operations
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <Settings className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeWorkflows} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
            <Play className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRuns}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {successRate.toFixed(0)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Executions</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executions.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Workflows */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Workflows</h2>
        <div className="grid gap-4">
          {workflows.map(workflow => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onExecute={handleExecute}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Executions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Executions</h2>
        {executions.length === 0 ? (
          <Alert>
            <AlertDescription>No executions yet</AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-4">
            {executions.map(execution => (
              <ExecutionLog key={execution.id} execution={execution} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
