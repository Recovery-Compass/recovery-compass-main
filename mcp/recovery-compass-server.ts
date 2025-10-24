/**
 * Recovery Compass MCP Server
 * Exposes Recovery Compass data and APIs to AI agents via Model Context Protocol
 * Inspired by power user patterns for GitHub repos to MCP servers
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Types
interface JourneyData {
  id: string;
  userId: string;
  type: 'personal' | 'organizational';
  status: 'active' | 'completed' | 'paused';
  progress: number;
  startedAt: number;
  completedAt?: number;
}

interface ComplianceRecord {
  id: string;
  fileName: string;
  uploadedAt: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  metrics?: Record<string, any>;
  alerts?: string[];
}

interface AnalyticsSnapshot {
  timestamp: number;
  activeUsers: number;
  totalJourneys: number;
  completionRate: number;
  complianceUploads: number;
}

class RecoveryCompassMCPServer {
  private server: Server;
  private journeys: Map<string, JourneyData> = new Map();
  private complianceRecords: Map<string, ComplianceRecord> = new Map();
  private analyticsHistory: AnalyticsSnapshot[] = [];

  constructor() {
    this.server = new Server(
      {
        name: 'recovery-compass',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupHandlers();
    this.loadMockData();
  }

  private loadMockData(): void {
    // Load mock journey data
    this.journeys.set('journey_1', {
      id: 'journey_1',
      userId: 'user_123',
      type: 'personal',
      status: 'active',
      progress: 45,
      startedAt: Date.now() - 86400000 * 7,
    });

    this.journeys.set('journey_2', {
      id: 'journey_2',
      userId: 'user_456',
      type: 'organizational',
      status: 'completed',
      progress: 100,
      startedAt: Date.now() - 86400000 * 30,
      completedAt: Date.now() - 86400000 * 5,
    });

    // Load mock compliance records
    this.complianceRecords.set('compliance_1', {
      id: 'compliance_1',
      fileName: 'Q4_2024_Report.xlsx',
      uploadedAt: Date.now() - 86400000,
      status: 'completed',
      metrics: {
        totalRecords: 150,
        complianceRate: 94.5,
        issuesFound: 8,
      },
      alerts: ['Missing field in row 23', 'Invalid date format in row 87'],
    });

    // Load mock analytics
    this.analyticsHistory.push({
      timestamp: Date.now(),
      activeUsers: 12,
      totalJourneys: 45,
      completionRate: 67.5,
      complianceUploads: 23,
    });
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_journey',
          description: 'Get details of a specific recovery journey',
          inputSchema: {
            type: 'object',
            properties: {
              journeyId: {
                type: 'string',
                description: 'The ID of the journey to retrieve',
              },
            },
            required: ['journeyId'],
          },
        },
        {
          name: 'list_journeys',
          description: 'List all recovery journeys with optional filters',
          inputSchema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['active', 'completed', 'paused', 'all'],
                description: 'Filter journeys by status',
              },
              type: {
                type: 'string',
                enum: ['personal', 'organizational', 'all'],
                description: 'Filter journeys by type',
              },
            },
          },
        },
        {
          name: 'get_compliance_record',
          description: 'Get details of a specific compliance record',
          inputSchema: {
            type: 'object',
            properties: {
              recordId: {
                type: 'string',
                description: 'The ID of the compliance record',
              },
            },
            required: ['recordId'],
          },
        },
        {
          name: 'list_compliance_records',
          description: 'List compliance records with optional filters',
          inputSchema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['pending', 'processing', 'completed', 'failed', 'all'],
                description: 'Filter by processing status',
              },
              since: {
                type: 'number',
                description: 'Timestamp to filter records after',
              },
            },
          },
        },
        {
          name: 'get_analytics',
          description: 'Get current analytics snapshot',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'generate_ai_prompt',
          description: 'Generate contextual AI prompts for recovery insights',
          inputSchema: {
            type: 'object',
            properties: {
              category: {
                type: 'string',
                enum: ['strength', 'challenge', 'vision', 'action'],
                description: 'Category of prompt to generate',
              },
              context: {
                type: 'string',
                description: 'Additional context for prompt generation',
              },
            },
            required: ['category'],
          },
        },
        {
          name: 'analyze_compliance_data',
          description: 'Analyze compliance data and generate insights',
          inputSchema: {
            type: 'object',
            properties: {
              recordId: {
                type: 'string',
                description: 'The compliance record to analyze',
              },
            },
            required: ['recordId'],
          },
        },
        {
          name: 'get_journey_recommendations',
          description: 'Get AI-powered recommendations for a journey',
          inputSchema: {
            type: 'object',
            properties: {
              journeyId: {
                type: 'string',
                description: 'The journey to get recommendations for',
              },
            },
            required: ['journeyId'],
          },
        },
      ],
    }));

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'compass://journeys/active',
          mimeType: 'application/json',
          name: 'Active Journeys',
          description: 'All currently active recovery journeys',
        },
        {
          uri: 'compass://compliance/recent',
          mimeType: 'application/json',
          name: 'Recent Compliance Records',
          description: 'Recent compliance uploads and analyses',
        },
        {
          uri: 'compass://analytics/current',
          mimeType: 'application/json',
          name: 'Current Analytics',
          description: 'Current platform analytics and metrics',
        },
        {
          uri: 'compass://config/prompts',
          mimeType: 'application/json',
          name: 'AI Prompt Templates',
          description: 'Available AI prompt templates',
        },
      ],
    }));

    // Read resource
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;

      switch (uri) {
        case 'compass://journeys/active':
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(
                  this.getJourneys({ status: 'active' }),
                  null,
                  2
                ),
              },
            ],
          };

        case 'compass://compliance/recent':
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(
                  this.getComplianceRecords({ since: Date.now() - 86400000 * 7 }),
                  null,
                  2
                ),
              },
            ],
          };

        case 'compass://analytics/current':
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(
                  this.getCurrentAnalytics(),
                  null,
                  2
                ),
              },
            ],
          };

        case 'compass://config/prompts':
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(
                  this.getPromptTemplates(),
                  null,
                  2
                ),
              },
            ],
          };

        default:
          throw new Error(`Unknown resource: ${uri}`);
      }
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'get_journey':
          return this.handleGetJourney(args.journeyId);

        case 'list_journeys':
          return this.handleListJourneys(args);

        case 'get_compliance_record':
          return this.handleGetComplianceRecord(args.recordId);

        case 'list_compliance_records':
          return this.handleListComplianceRecords(args);

        case 'get_analytics':
          return this.handleGetAnalytics();

        case 'generate_ai_prompt':
          return this.handleGeneratePrompt(args);

        case 'analyze_compliance_data':
          return this.handleAnalyzeCompliance(args.recordId);

        case 'get_journey_recommendations':
          return this.handleGetRecommendations(args.journeyId);

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  // Tool handlers
  private handleGetJourney(journeyId: string) {
    const journey = this.journeys.get(journeyId);
    if (!journey) {
      throw new Error(`Journey not found: ${journeyId}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(journey, null, 2),
        },
      ],
    };
  }

  private handleListJourneys(filters: { status?: string; type?: string }) {
    const journeys = this.getJourneys(filters);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(journeys, null, 2),
        },
      ],
    };
  }

  private handleGetComplianceRecord(recordId: string) {
    const record = this.complianceRecords.get(recordId);
    if (!record) {
      throw new Error(`Compliance record not found: ${recordId}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(record, null, 2),
        },
      ],
    };
  }

  private handleListComplianceRecords(filters: { status?: string; since?: number }) {
    const records = this.getComplianceRecords(filters);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(records, null, 2),
        },
      ],
    };
  }

  private handleGetAnalytics() {
    const analytics = this.getCurrentAnalytics();
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(analytics, null, 2),
        },
      ],
    };
  }

  private handleGeneratePrompt(args: { category: string; context?: string }) {
    const prompts = this.getPromptTemplates();
    const categoryPrompts = prompts[args.category] || [];

    if (categoryPrompts.length === 0) {
      throw new Error(`No prompts found for category: ${args.category}`);
    }

    // Select a random prompt and optionally customize with context
    const prompt = categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
    const customized = args.context
      ? `${prompt}\n\nContext: ${args.context}`
      : prompt;

    return {
      content: [
        {
          type: 'text',
          text: customized,
        },
      ],
    };
  }

  private handleAnalyzeCompliance(recordId: string) {
    const record = this.complianceRecords.get(recordId);
    if (!record) {
      throw new Error(`Compliance record not found: ${recordId}`);
    }

    const analysis = {
      summary: `Analysis of ${record.fileName}`,
      status: record.status,
      insights: [
        `Processed ${record.metrics?.totalRecords || 0} records`,
        `Compliance rate: ${record.metrics?.complianceRate || 0}%`,
        `Found ${record.metrics?.issuesFound || 0} issues requiring attention`,
      ],
      recommendations: [
        'Review flagged entries for data quality',
        'Update validation rules for better accuracy',
        'Schedule follow-up for unresolved issues',
      ],
      alerts: record.alerts || [],
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(analysis, null, 2),
        },
      ],
    };
  }

  private handleGetRecommendations(journeyId: string) {
    const journey = this.journeys.get(journeyId);
    if (!journey) {
      throw new Error(`Journey not found: ${journeyId}`);
    }

    const recommendations = {
      journey: journeyId,
      status: journey.status,
      progress: journey.progress,
      suggestions: [
        {
          type: 'next_step',
          title: 'Continue with strength discovery',
          description: 'Identify 2-3 key strengths from your experiences',
          priority: 'high',
        },
        {
          type: 'reflection',
          title: 'Weekly reflection exercise',
          description: 'Take time to reflect on your progress this week',
          priority: 'medium',
        },
        {
          type: 'community',
          title: 'Connect with peer support',
          description: 'Join a group session to share insights',
          priority: 'medium',
        },
      ],
      resources: [
        'Environmental Response Design™ Framework',
        'Strength Discovery Workbook',
        'Community Guidelines',
      ],
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(recommendations, null, 2),
        },
      ],
    };
  }

  // Helper methods
  private getJourneys(filters: { status?: string; type?: string }): JourneyData[] {
    let result = Array.from(this.journeys.values());

    if (filters.status && filters.status !== 'all') {
      result = result.filter(j => j.status === filters.status);
    }

    if (filters.type && filters.type !== 'all') {
      result = result.filter(j => j.type === filters.type);
    }

    return result;
  }

  private getComplianceRecords(filters: { status?: string; since?: number }): ComplianceRecord[] {
    let result = Array.from(this.complianceRecords.values());

    if (filters.status && filters.status !== 'all') {
      result = result.filter(r => r.status === filters.status);
    }

    if (filters.since) {
      result = result.filter(r => r.uploadedAt >= filters.since);
    }

    return result;
  }

  private getCurrentAnalytics(): AnalyticsSnapshot {
    return this.analyticsHistory[this.analyticsHistory.length - 1] || {
      timestamp: Date.now(),
      activeUsers: 0,
      totalJourneys: 0,
      completionRate: 0,
      complianceUploads: 0,
    };
  }

  private getPromptTemplates(): Record<string, string[]> {
    return {
      strength: [
        'What personal strengths have helped you overcome similar challenges in the past?',
        'Reflect on a time when you successfully adapted to change. What qualities did you demonstrate?',
        'What skills or abilities do others frequently recognize in you?',
      ],
      challenge: [
        'What environmental or systemic factors are contributing to this challenge?',
        'How has this challenge affected different areas of your life?',
        'What resources or support systems do you currently have access to?',
      ],
      vision: [
        'Imagine your ideal environment for growth and recovery. What does it look like?',
        'What would meaningful progress look like for you in the next 3-6 months?',
        'How would you like to see your community or organization transformed?',
      ],
      action: [
        'What is one small, concrete step you can take this week toward your goal?',
        'Who in your network could support or collaborate with you on this journey?',
        'What existing resources or opportunities could you leverage for change?',
      ],
    };
  }

  public async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Recovery Compass MCP server running on stdio');
  }
}

// Start the server
const server = new RecoveryCompassMCPServer();
server.run().catch(console.error);
