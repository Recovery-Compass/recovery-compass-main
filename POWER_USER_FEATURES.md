# Recovery Compass - Power User Features

This document describes the advanced features implemented based on Claude Code power user patterns.

## Overview

We've implemented 7 major feature sets that add significant signal value to Recovery Compass:

1. **Enhanced Analytics Dashboard** - Real-time metrics and monitoring
2. **Multi-Channel Notification System** - Compliance alerts and critical events
3. **MCP Server** - AI agent integration via Model Context Protocol
4. **AI Usage Tracking** - Cost monitoring and token usage analytics
5. **Workflow Automation** - n8n-style automation for compliance
6. **Sub-Agent System** - Contextual AI with specialized agents
7. **Admin Dashboard** - Centralized platform management

## 1. Enhanced Analytics Dashboard

### Features

- **Real-time Metrics**
  - Active users and session tracking
  - Events per minute monitoring
  - Top pages analysis

- **Compliance Tracking**
  - Upload statistics
  - Processing queue status
  - Average processing times
  - Pending alerts monitoring

- **User Engagement**
  - Journey completion rates
  - Session duration analytics
  - Returning user metrics

- **AI Usage Metrics**
  - Prompt generation statistics
  - Token consumption tracking
  - Cost estimation
  - Response time monitoring

- **Performance Monitoring**
  - Page load times
  - API response times
  - Error rates
  - Uptime tracking

### Usage

```typescript
import AnalyticsDashboardService from '@/services/AnalyticsDashboardService';

const dashboard = AnalyticsDashboardService.getInstance();

// Get current metrics
const metrics = dashboard.getDashboardMetrics();

// Track compliance upload
dashboard.trackComplianceUpload();

// Track journey events
dashboard.trackJourneyEvent('start');

// Track AI usage
dashboard.trackAIPrompt('strength', 1500, 850);

// Get health score
const health = dashboard.getHealthScore();

// Export metrics
const csvData = dashboard.exportMetrics('csv');
```

### Component

```tsx
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

function App() {
  return <AnalyticsDashboard />;
}
```

## 2. Multi-Channel Notification System

### Supported Channels

- **Email** - SMTP integration
- **Slack** - Webhook notifications
- **Telegram** - Bot API integration
- **Webhooks** - Custom HTTP endpoints
- **Push Notifications** - Browser notifications

### Features

- Priority-based routing (low, medium, high, critical)
- Rule-based notification triggers
- Throttling and rate limiting
- Escalation workflows
- Notification acknowledgment tracking

### Usage

```typescript
import NotificationService from '@/services/NotificationService';

const notificationService = NotificationService.getInstance();

// Send notification
await notificationService.send(
  'compliance',
  'high',
  'Compliance Alert',
  'Critical compliance issue detected',
  { recordId: 'comp_123', issueCount: 5 },
  ['email', 'slack']
);

// Convenience methods
await notificationService.sendComplianceAlert(
  'Data Quality Issue',
  'Missing fields detected in row 23'
);

await notificationService.sendSecurityAlert(
  'Unauthorized Access Attempt',
  'Failed login attempts from unknown IP'
);

// Configure notification channels
notificationService.updateConfig({
  channels: {
    slack: {
      enabled: true,
      webhookUrl: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
      channel: '#compliance-alerts',
    },
  },
});

// Get notifications
const unread = notificationService.getNotifications({
  acknowledged: false,
  priorities: ['high', 'critical'],
});

// Acknowledge notification
notificationService.acknowledge('notif_123', 'admin_user');
```

### Component

```tsx
import NotificationCenter from '@/components/notifications/NotificationCenter';

function App() {
  return <NotificationCenter />;
}
```

## 3. MCP Server

### Overview

Exposes Recovery Compass data and APIs to AI agents via Model Context Protocol.

### Available Tools

- `get_journey` - Get journey details
- `list_journeys` - List journeys with filters
- `get_compliance_record` - Get compliance record
- `list_compliance_records` - List compliance records
- `get_analytics` - Get analytics snapshot
- `generate_ai_prompt` - Generate contextual prompts
- `analyze_compliance_data` - AI-powered analysis
- `get_journey_recommendations` - AI recommendations

### Available Resources

- `compass://journeys/active` - Active journeys
- `compass://compliance/recent` - Recent compliance records
- `compass://analytics/current` - Current analytics
- `compass://config/prompts` - AI prompt templates

### Setup

```bash
cd mcp
npm install
npm run build
```

### Claude Desktop Integration

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "recovery-compass": {
      "command": "node",
      "args": ["/path/to/recovery-compass-main/mcp/dist/recovery-compass-server.js"]
    }
  }
}
```

### Usage in Claude

```
Use recovery-compass MCP server to:
- Get active journeys
- Analyze compliance data
- Generate recovery prompts
- Get platform analytics
```

## 4. AI Usage Tracking

### Features

- Real-time token consumption tracking
- Cost calculation for multiple AI models
- Usage limits with alerts
- Per-model and per-prompt-type analytics
- Cost projections
- Export to JSON/CSV

### Supported Models

- Claude 3.5 Sonnet
- Claude 3.5 Haiku
- Claude 3 Opus
- GPT-4 Turbo
- GPT-4
- GPT-3.5 Turbo

### Usage

```typescript
import AIUsageTracker from '@/services/AIUsageTracker';

const tracker = AIUsageTracker.getInstance();

// Track AI usage
tracker.trackUsage(
  'claude-3-5-sonnet-20241022',
  'strength_prompt',
  1200, // input tokens
  800,  // output tokens
  850,  // latency ms
  true  // success
);

// Get statistics
const stats = tracker.getStats({
  since: Date.now() - 86400000, // last 24 hours
});

// Set cost limits
tracker.updateLimit('daily', 50, 0.8); // $50/day, alert at 80%

// Get cost projection
const projection = tracker.getCostProjection(30); // 30 days

// Wrap AI calls for automatic tracking
const result = await tracker.trackAICall(
  'claude-3-5-sonnet-20241022',
  'compliance_analysis',
  async () => {
    // Your AI call here
    return {
      result: analysisResult,
      inputTokens: 1500,
      outputTokens: 900,
    };
  }
);
```

### Component

```tsx
import AIUsageDashboard from '@/components/ai/AIUsageDashboard';

function App() {
  return <AIUsageDashboard />;
}
```

## 5. Workflow Automation

### Features

- Visual workflow builder
- Multiple trigger types (schedule, webhook, file_upload, event, manual)
- Action nodes (email, webhook, database, AI analysis, notifications)
- Condition nodes for branching logic
- Transform nodes for data processing
- Execution logging and monitoring

### Default Workflows

1. **Compliance Data Auto-Processing**
   - Trigger: File upload
   - Actions: Validate → Transform → AI Analysis → Save → Notify

2. **Daily Analytics Report**
   - Trigger: Daily at 9 AM
   - Actions: Fetch data → Generate report → Email

3. **Compliance Alert System**
   - Trigger: Hourly
   - Actions: Check metrics → Alert if thresholds exceeded

### Usage

```typescript
import WorkflowAutomation from '@/services/WorkflowAutomation';

const automation = WorkflowAutomation.getInstance();

// Create workflow
const workflow = automation.createWorkflow({
  name: 'Weekly Compliance Review',
  description: 'Automated weekly compliance check',
  enabled: true,
  trigger: 'schedule',
  nodes: [
    {
      type: 'trigger',
      name: 'Weekly Schedule',
      config: { schedule: '0 9 * * 1' }, // Monday 9 AM
      nextNodes: ['fetch_1'],
    },
    {
      type: 'action',
      name: 'Fetch Records',
      config: { action: 'database', query: 'SELECT * FROM compliance' },
      nextNodes: ['analyze_1'],
    },
    {
      type: 'action',
      name: 'AI Analysis',
      config: { action: 'ai_analysis', model: 'claude-3-5-sonnet' },
      nextNodes: ['notify_1'],
    },
    {
      type: 'action',
      name: 'Send Report',
      config: { action: 'notification', channels: ['email'] },
      nextNodes: [],
    },
  ],
});

// Execute workflow
const execution = await automation.executeWorkflow(workflow.id);

// List workflows
const workflows = automation.listWorkflows();

// Enable/disable workflow
automation.enableWorkflow(workflow.id);
automation.disableWorkflow(workflow.id);

// Get execution logs
const executions = automation.listExecutions(workflow.id);
```

### Component

```tsx
import WorkflowManager from '@/components/workflows/WorkflowManager';

function App() {
  return <WorkflowManager />;
}
```

## 6. Sub-Agent System

### Available Agents

1. **Compliance Analyst**
   - Expertise: WFD compliance, data analysis, risk assessment
   - Use for: Compliance data analysis, issue identification

2. **Recovery Coach**
   - Expertise: ERD methodology, strength discovery, personal transformation
   - Use for: Journey guidance, reflection prompts, supportive coaching

3. **Data Analyst**
   - Expertise: Statistical analysis, metrics tracking, trend analysis
   - Use for: Platform analytics, data insights, reporting

4. **Content Generator**
   - Expertise: Prompt generation, personalized content, reflection questions
   - Use for: Creating recovery prompts, educational content

5. **Workflow Optimizer**
   - Expertise: Process automation, efficiency optimization, integration
   - Use for: Workflow design, process improvements

6. **Support Advisor**
   - Expertise: User support, troubleshooting, feature guidance
   - Use for: User assistance, documentation, help desk

### Usage

```typescript
import SubAgentSystem from '@/services/SubAgentSystem';

const agents = SubAgentSystem.getInstance();

// Chat with specific agent
const response = await agents.chat(
  'recovery_coach',
  'I want to start my recovery journey',
  { userLevel: 'beginner' }
);

// Switch agents
const message = agents.switchAgent('compliance_analyst');

// Convenience methods
const complianceAnalysis = await agents.analyzeCompliance(data);
const recoveryPrompt = await agents.generateRecoveryPrompt('strength');
const metricsInsights = await agents.analyzeMetrics(metrics);
const workflowAdvice = await agents.optimizeWorkflow(workflow);

// Multi-agent coordination
const responses = await agents.coordinateAgents(
  'Analyze user journey and compliance data',
  ['recovery_coach', 'compliance_analyst', 'data_analyst']
);

// Agent handoff
const handoffResponse = await agents.handoff(
  'support_advisor',
  'compliance_analyst',
  conversationId,
  'User needs compliance data analysis'
);

// List all agents
const allAgents = agents.listAgents();

// Get conversation history
const conversation = agents.getConversation(conversationId);
```

## 7. Admin Dashboard

### Features

- Unified platform overview
- Quick access to all admin functions
- System status monitoring
- Integration health checks
- Quick action shortcuts

### Usage

```tsx
import AdminDashboard from '@/components/admin/AdminDashboard';

function App() {
  return <AdminDashboard />;
}
```

### Tabs

- **Overview** - Platform health, quick actions, system status
- **Analytics** - Full analytics dashboard
- **Notifications** - Notification center
- **AI Usage** - AI cost and usage monitoring
- **Workflows** - Workflow automation manager
- **Settings** - Platform configuration

## Integration Guide

### 1. Add to Your App

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import AIUsageDashboard from '@/components/ai/AIUsageDashboard';
import WorkflowManager from '@/components/workflows/WorkflowManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
        <Route path="/admin/notifications" element={<NotificationCenter />} />
        <Route path="/admin/ai-usage" element={<AIUsageDashboard />} />
        <Route path="/admin/workflows" element={<WorkflowManager />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 2. Initialize Services

```typescript
import AnalyticsDashboardService from '@/services/AnalyticsDashboardService';
import NotificationService from '@/services/NotificationService';
import AIUsageTracker from '@/services/AIUsageTracker';
import WorkflowAutomation from '@/services/WorkflowAutomation';
import SubAgentSystem from '@/services/SubAgentSystem';

// Initialize on app startup
const analytics = AnalyticsDashboardService.getInstance();
const notifications = NotificationService.getInstance();
const aiUsage = AIUsageTracker.getInstance();
const workflows = WorkflowAutomation.getInstance();
const agents = SubAgentSystem.getInstance();

// Configure notification channels
notifications.updateConfig({
  channels: {
    slack: {
      enabled: true,
      webhookUrl: process.env.SLACK_WEBHOOK_URL,
    },
  },
});

// Set AI cost limits
aiUsage.updateLimit('monthly', 500, 0.8);
```

### 3. Track Events

```typescript
// Track page views
analytics.trackPageView('/dashboard');

// Track compliance events
analytics.trackComplianceUpload();
analytics.trackComplianceProcessing('complete', 5000);

// Track journey events
analytics.trackJourneyEvent('start');

// Track AI usage
analytics.trackAIPrompt('strength', 1500, 850);

// Send notifications
await notifications.sendComplianceAlert(
  'High Priority Issue',
  'Compliance threshold exceeded'
);

// Track AI costs
aiUsage.trackUsage(
  'claude-3-5-sonnet-20241022',
  'analysis',
  1200,
  800,
  900,
  true
);
```

## Environment Variables

```bash
# Notification Services
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_IDS=chat_id_1,chat_id_2

# Email Configuration (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password

# Webhook URLs for Make.com or other services
WEBHOOK_COMPLIANCE_URL=https://hook.make.com/your_webhook
WEBHOOK_ANALYTICS_URL=https://hook.make.com/your_webhook

# AI Cost Limits
AI_COST_LIMIT_DAILY=50
AI_COST_LIMIT_MONTHLY=500
```

## Best Practices

### Analytics

- Track all major user actions
- Use consistent event naming
- Include relevant context in metadata
- Review health score regularly
- Export metrics for deeper analysis

### Notifications

- Set appropriate priority levels
- Configure multiple channels for critical alerts
- Use throttling to prevent alert fatigue
- Acknowledge notifications promptly
- Review notification rules periodically

### AI Usage

- Set realistic cost limits
- Monitor usage trends
- Use appropriate models for different tasks
- Track usage by feature/prompt type
- Export data for budget planning

### Workflows

- Start with simple workflows
- Test workflows with sample data
- Monitor execution logs
- Set up error notifications
- Document workflow purposes

### Sub-Agents

- Use the right agent for each task
- Provide sufficient context
- Leverage multi-agent coordination for complex tasks
- Track conversation history
- Use agent handoffs for seamless transitions

## Troubleshooting

### Services not initializing

```typescript
// Check if services are initialized
console.log(AnalyticsDashboardService.getInstance());
console.log(NotificationService.getInstance());
```

### Notifications not sending

- Verify channel configuration
- Check webhook URLs
- Review notification rules
- Check browser console for errors

### Workflows not executing

- Verify workflow is enabled
- Check trigger configuration
- Review execution logs
- Ensure all nodes are properly connected

### High AI costs

- Review usage patterns in AI Usage Dashboard
- Adjust cost limits
- Optimize prompt length
- Consider using smaller models for simple tasks

## Support

For issues or questions:
1. Check this documentation
2. Review component source code
3. Check browser console for errors
4. Review service logs

## License

MIT
