/**
 * Workflow Automation Engine
 * Build n8n-style automation workflows for compliance and operations
 * Inspired by power user patterns #21 and #23
 */

export type WorkflowTrigger = 'schedule' | 'webhook' | 'file_upload' | 'manual' | 'event';
export type ActionType = 'email' | 'webhook' | 'data_transform' | 'ai_analysis' | 'notification' | 'database';

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'transform';
  name: string;
  config: Record<string, any>;
  nextNodes: string[];
  position?: { x: number; y: number };
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  trigger: WorkflowTrigger;
  nodes: WorkflowNode[];
  createdAt: number;
  updatedAt: number;
  lastRun?: number;
  runCount: number;
  successCount: number;
  failureCount: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  startTime: number;
  endTime?: number;
  status: 'running' | 'success' | 'failed' | 'cancelled';
  error?: string;
  logs: Array<{
    timestamp: number;
    nodeId: string;
    level: 'info' | 'warn' | 'error';
    message: string;
    data?: any;
  }>;
  context: Record<string, any>;
}

class WorkflowAutomation {
  private static instance: WorkflowAutomation;
  private workflows: Map<string, Workflow> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();
  private scheduledJobs: Map<string, NodeJS.Timeout> = new Map();
  private maxExecutionHistory = 100;

  private constructor() {
    this.loadWorkflows();
    this.setupDefaultWorkflows();
    this.startScheduledWorkflows();
  }

  public static getInstance(): WorkflowAutomation {
    if (!WorkflowAutomation.instance) {
      WorkflowAutomation.instance = new WorkflowAutomation();
    }
    return WorkflowAutomation.instance;
  }

  private loadWorkflows(): void {
    try {
      const stored = localStorage.getItem('workflows');
      if (stored) {
        const workflowsArray = JSON.parse(stored);
        this.workflows = new Map(workflowsArray.map((w: Workflow) => [w.id, w]));
      }
    } catch (error) {
      console.warn('Failed to load workflows:', error);
    }
  }

  private saveWorkflows(): void {
    try {
      const workflowsArray = Array.from(this.workflows.values());
      localStorage.setItem('workflows', JSON.stringify(workflowsArray));
    } catch (error) {
      console.warn('Failed to save workflows:', error);
    }
  }

  private setupDefaultWorkflows(): void {
    if (this.workflows.size === 0) {
      // Compliance Data Processing Workflow
      this.createWorkflow({
        name: 'Compliance Data Auto-Processing',
        description: 'Automatically process uploaded compliance files',
        enabled: true,
        trigger: 'file_upload',
        nodes: [
          {
            id: 'trigger_1',
            type: 'trigger',
            name: 'File Upload Trigger',
            config: {
              fileTypes: ['xlsx', 'csv', 'json'],
            },
            nextNodes: ['validate_1'],
          },
          {
            id: 'validate_1',
            type: 'condition',
            name: 'Validate File Format',
            config: {
              checks: ['file_size', 'file_type', 'headers'],
            },
            nextNodes: ['transform_1', 'notify_error_1'],
          },
          {
            id: 'transform_1',
            type: 'transform',
            name: 'Extract Compliance Metrics',
            config: {
              operations: ['parse', 'normalize', 'calculate_metrics'],
            },
            nextNodes: ['ai_analysis_1'],
          },
          {
            id: 'ai_analysis_1',
            type: 'action',
            name: 'AI-Powered Analysis',
            config: {
              action: 'ai_analysis',
              model: 'claude-3-5-sonnet-20241022',
              prompt: 'Analyze this compliance data and identify issues',
            },
            nextNodes: ['save_db_1'],
          },
          {
            id: 'save_db_1',
            type: 'action',
            name: 'Save to Database',
            config: {
              action: 'database',
              table: 'compliance_records',
            },
            nextNodes: ['notify_success_1'],
          },
          {
            id: 'notify_success_1',
            type: 'action',
            name: 'Send Success Notification',
            config: {
              action: 'notification',
              channels: ['email', 'slack'],
              priority: 'medium',
            },
            nextNodes: [],
          },
          {
            id: 'notify_error_1',
            type: 'action',
            name: 'Send Error Notification',
            config: {
              action: 'notification',
              channels: ['email'],
              priority: 'high',
            },
            nextNodes: [],
          },
        ],
      });

      // Daily Analytics Report Workflow
      this.createWorkflow({
        name: 'Daily Analytics Report',
        description: 'Generate and send daily analytics report',
        enabled: true,
        trigger: 'schedule',
        nodes: [
          {
            id: 'trigger_1',
            type: 'trigger',
            name: 'Daily Schedule',
            config: {
              schedule: '0 9 * * *', // 9 AM daily
            },
            nextNodes: ['fetch_data_1'],
          },
          {
            id: 'fetch_data_1',
            type: 'action',
            name: 'Fetch Analytics Data',
            config: {
              action: 'database',
              query: 'SELECT * FROM analytics WHERE date >= NOW() - INTERVAL 1 DAY',
            },
            nextNodes: ['transform_1'],
          },
          {
            id: 'transform_1',
            type: 'transform',
            name: 'Generate Report',
            config: {
              format: 'html',
              template: 'daily_analytics',
            },
            nextNodes: ['email_1'],
          },
          {
            id: 'email_1',
            type: 'action',
            name: 'Send Email Report',
            config: {
              action: 'email',
              to: ['team@recoverycompass.org'],
              subject: 'Daily Analytics Report',
            },
            nextNodes: [],
          },
        ],
      });

      // Compliance Alert Workflow
      this.createWorkflow({
        name: 'Compliance Alert System',
        description: 'Monitor compliance thresholds and send alerts',
        enabled: true,
        trigger: 'schedule',
        nodes: [
          {
            id: 'trigger_1',
            type: 'trigger',
            name: 'Hourly Check',
            config: {
              schedule: '0 * * * *', // Every hour
            },
            nextNodes: ['check_1'],
          },
          {
            id: 'check_1',
            type: 'condition',
            name: 'Check Compliance Metrics',
            config: {
              thresholds: {
                compliance_rate: 95,
                pending_alerts: 10,
                processing_time: 60000,
              },
            },
            nextNodes: ['alert_1', 'log_1'],
          },
          {
            id: 'alert_1',
            type: 'action',
            name: 'Send Critical Alert',
            config: {
              action: 'notification',
              channels: ['email', 'slack', 'telegram'],
              priority: 'critical',
            },
            nextNodes: [],
          },
          {
            id: 'log_1',
            type: 'action',
            name: 'Log Status',
            config: {
              action: 'database',
              table: 'compliance_logs',
            },
            nextNodes: [],
          },
        ],
      });
    }
  }

  private startScheduledWorkflows(): void {
    this.workflows.forEach(workflow => {
      if (workflow.enabled && workflow.trigger === 'schedule') {
        this.scheduleWorkflow(workflow);
      }
    });
  }

  private scheduleWorkflow(workflow: Workflow): void {
    const triggerNode = workflow.nodes.find(n => n.type === 'trigger');
    if (!triggerNode?.config.schedule) return;

    // Parse cron-like schedule (simplified for demo)
    const schedule = triggerNode.config.schedule;
    const interval = this.parseSchedule(schedule);

    if (this.scheduledJobs.has(workflow.id)) {
      clearInterval(this.scheduledJobs.get(workflow.id)!);
    }

    const job = setInterval(() => {
      this.executeWorkflow(workflow.id);
    }, interval);

    this.scheduledJobs.set(workflow.id, job);
  }

  private parseSchedule(schedule: string): number {
    // Simplified cron parser - just handle basic intervals
    // In production, use a proper cron library
    if (schedule === '0 9 * * *') return 86400000; // Daily at 9 AM
    if (schedule === '0 * * * *') return 3600000; // Hourly
    if (schedule === '*/15 * * * *') return 900000; // Every 15 minutes
    return 3600000; // Default to hourly
  }

  public createWorkflow(config: {
    name: string;
    description: string;
    enabled: boolean;
    trigger: WorkflowTrigger;
    nodes: Omit<WorkflowNode, 'id'>[];
  }): Workflow {
    const workflow: Workflow = {
      id: this.generateId(),
      name: config.name,
      description: config.description,
      enabled: config.enabled,
      trigger: config.trigger,
      nodes: config.nodes.map((node, index) => ({
        ...node,
        id: node.id || `node_${index}`,
      })) as WorkflowNode[],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      runCount: 0,
      successCount: 0,
      failureCount: 0,
    };

    this.workflows.set(workflow.id, workflow);
    this.saveWorkflows();

    if (workflow.enabled && workflow.trigger === 'schedule') {
      this.scheduleWorkflow(workflow);
    }

    return workflow;
  }

  public async executeWorkflow(workflowId: string, context?: Record<string, any>): Promise<WorkflowExecution> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    if (!workflow.enabled) {
      throw new Error(`Workflow is disabled: ${workflow.name}`);
    }

    const execution: WorkflowExecution = {
      id: this.generateId(),
      workflowId,
      startTime: Date.now(),
      status: 'running',
      logs: [],
      context: context || {},
    };

    this.executions.set(execution.id, execution);

    try {
      // Find trigger node
      const triggerNode = workflow.nodes.find(n => n.type === 'trigger');
      if (!triggerNode) {
        throw new Error('No trigger node found');
      }

      // Execute workflow
      await this.executeNode(workflow, triggerNode, execution);

      execution.status = 'success';
      execution.endTime = Date.now();

      workflow.runCount++;
      workflow.successCount++;
      workflow.lastRun = Date.now();
      this.saveWorkflows();

    } catch (error) {
      execution.status = 'failed';
      execution.endTime = Date.now();
      execution.error = error instanceof Error ? error.message : 'Unknown error';

      workflow.runCount++;
      workflow.failureCount++;
      workflow.lastRun = Date.now();
      this.saveWorkflows();

      this.addLog(execution, 'error', 'workflow', `Workflow failed: ${execution.error}`);
    }

    return execution;
  }

  private async executeNode(
    workflow: Workflow,
    node: WorkflowNode,
    execution: WorkflowExecution
  ): Promise<any> {
    this.addLog(execution, 'info', node.id, `Executing node: ${node.name}`);

    let result: any;

    try {
      switch (node.type) {
        case 'trigger':
          result = await this.executeTrigger(node, execution);
          break;
        case 'action':
          result = await this.executeAction(node, execution);
          break;
        case 'condition':
          result = await this.executeCondition(node, execution);
          break;
        case 'transform':
          result = await this.executeTransform(node, execution);
          break;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }

      // Store result in context
      execution.context[node.id] = result;

      // Execute next nodes
      for (const nextNodeId of node.nextNodes) {
        const nextNode = workflow.nodes.find(n => n.id === nextNodeId);
        if (nextNode) {
          await this.executeNode(workflow, nextNode, execution);
        }
      }

      return result;
    } catch (error) {
      this.addLog(execution, 'error', node.id, `Node failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private async executeTrigger(node: WorkflowNode, execution: WorkflowExecution): Promise<any> {
    this.addLog(execution, 'info', node.id, 'Trigger executed');
    return { triggered: true, timestamp: Date.now() };
  }

  private async executeAction(node: WorkflowNode, execution: WorkflowExecution): Promise<any> {
    const { action } = node.config;

    switch (action) {
      case 'email':
        return await this.sendEmail(node.config, execution);

      case 'webhook':
        return await this.callWebhook(node.config, execution);

      case 'notification':
        return await this.sendNotification(node.config, execution);

      case 'database':
        return await this.databaseOperation(node.config, execution);

      case 'ai_analysis':
        return await this.aiAnalysis(node.config, execution);

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }

  private async executeCondition(node: WorkflowNode, execution: WorkflowExecution): Promise<boolean> {
    // Simplified condition evaluation
    const { thresholds } = node.config;

    if (thresholds) {
      // Check if any threshold is exceeded
      const exceeded = Object.entries(thresholds).some(([key, value]) => {
        const currentValue = execution.context[key];
        return currentValue !== undefined && currentValue > value;
      });

      this.addLog(execution, 'info', node.id, `Condition result: ${exceeded}`);
      return exceeded;
    }

    return true;
  }

  private async executeTransform(node: WorkflowNode, execution: WorkflowExecution): Promise<any> {
    const { operations } = node.config;

    let data = execution.context;

    for (const operation of operations || []) {
      switch (operation) {
        case 'parse':
          // Parse input data
          this.addLog(execution, 'info', node.id, 'Parsing data');
          break;
        case 'normalize':
          // Normalize data
          this.addLog(execution, 'info', node.id, 'Normalizing data');
          break;
        case 'calculate_metrics':
          // Calculate metrics
          data = {
            ...data,
            metrics: {
              totalRecords: 100,
              complianceRate: 95.5,
              issuesFound: 5,
            },
          };
          this.addLog(execution, 'info', node.id, 'Calculated metrics');
          break;
      }
    }

    return data;
  }

  private async sendEmail(config: Record<string, any>, execution: WorkflowExecution): Promise<any> {
    this.addLog(execution, 'info', 'email', `Sending email to ${config.to}`);
    // Integration point with email service
    return { sent: true, to: config.to };
  }

  private async callWebhook(config: Record<string, any>, execution: WorkflowExecution): Promise<any> {
    this.addLog(execution, 'info', 'webhook', `Calling webhook: ${config.url}`);

    try {
      const response = await fetch(config.url, {
        method: config.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        body: JSON.stringify(execution.context),
      });

      return await response.json();
    } catch (error) {
      throw new Error(`Webhook failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async sendNotification(config: Record<string, any>, execution: WorkflowExecution): Promise<any> {
    this.addLog(execution, 'info', 'notification', `Sending notification via ${config.channels.join(', ')}`);
    // Integration point with NotificationService
    return { sent: true, channels: config.channels };
  }

  private async databaseOperation(config: Record<string, any>, execution: WorkflowExecution): Promise<any> {
    this.addLog(execution, 'info', 'database', `Database operation: ${config.table || config.query}`);
    // Integration point with Supabase
    return { success: true };
  }

  private async aiAnalysis(config: Record<string, any>, execution: WorkflowExecution): Promise<any> {
    this.addLog(execution, 'info', 'ai', `AI analysis with ${config.model}`);
    // Integration point with AI service
    return {
      analysis: 'AI analysis results',
      insights: ['Insight 1', 'Insight 2'],
      recommendations: ['Recommendation 1', 'Recommendation 2'],
    };
  }

  private addLog(
    execution: WorkflowExecution,
    level: 'info' | 'warn' | 'error',
    nodeId: string,
    message: string,
    data?: any
  ): void {
    execution.logs.push({
      timestamp: Date.now(),
      nodeId,
      level,
      message,
      data,
    });
  }

  private generateId(): string {
    return `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public API methods

  public getWorkflow(workflowId: string): Workflow | undefined {
    return this.workflows.get(workflowId);
  }

  public listWorkflows(): Workflow[] {
    return Array.from(this.workflows.values());
  }

  public updateWorkflow(workflowId: string, updates: Partial<Workflow>): Workflow {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    const updated = { ...workflow, ...updates, updatedAt: Date.now() };
    this.workflows.set(workflowId, updated);
    this.saveWorkflows();

    // Reschedule if needed
    if (updated.trigger === 'schedule') {
      this.scheduleWorkflow(updated);
    }

    return updated;
  }

  public deleteWorkflow(workflowId: string): void {
    const job = this.scheduledJobs.get(workflowId);
    if (job) {
      clearInterval(job);
      this.scheduledJobs.delete(workflowId);
    }

    this.workflows.delete(workflowId);
    this.saveWorkflows();
  }

  public getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  public listExecutions(workflowId?: string): WorkflowExecution[] {
    const executions = Array.from(this.executions.values());
    if (workflowId) {
      return executions.filter(e => e.workflowId === workflowId);
    }
    return executions;
  }

  public enableWorkflow(workflowId: string): void {
    this.updateWorkflow(workflowId, { enabled: true });
  }

  public disableWorkflow(workflowId: string): void {
    this.updateWorkflow(workflowId, { enabled: false });

    const job = this.scheduledJobs.get(workflowId);
    if (job) {
      clearInterval(job);
      this.scheduledJobs.delete(workflowId);
    }
  }

  public triggerWebhookWorkflow(webhookId: string, data: Record<string, any>): Promise<WorkflowExecution> {
    const workflow = Array.from(this.workflows.values()).find(
      w => w.trigger === 'webhook' && w.enabled
    );

    if (!workflow) {
      throw new Error('No webhook workflow found');
    }

    return this.executeWorkflow(workflow.id, data);
  }
}

export default WorkflowAutomation;
