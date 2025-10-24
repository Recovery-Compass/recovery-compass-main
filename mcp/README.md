# Recovery Compass MCP Server

Model Context Protocol (MCP) server that exposes Recovery Compass data and APIs to AI agents.

## Features

- **Journey Management**: Access and analyze recovery journeys
- **Compliance Data**: Query compliance records and analyses
- **Analytics**: Real-time platform metrics and insights
- **AI Prompts**: Generate contextual recovery prompts
- **Recommendations**: Get AI-powered journey recommendations

## Installation

```bash
cd mcp
npm install
npm run build
```

## Usage

### With Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

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

### Standalone

```bash
npm start
```

## Available Tools

### Journey Tools

- **get_journey** - Get details of a specific journey
- **list_journeys** - List all journeys with filters
- **get_journey_recommendations** - Get AI recommendations for a journey

### Compliance Tools

- **get_compliance_record** - Get compliance record details
- **list_compliance_records** - List compliance records with filters
- **analyze_compliance_data** - Analyze compliance data and generate insights

### Analytics Tools

- **get_analytics** - Get current analytics snapshot

### AI Tools

- **generate_ai_prompt** - Generate contextual prompts for recovery insights

## Available Resources

- `compass://journeys/active` - Active recovery journeys
- `compass://compliance/recent` - Recent compliance records
- `compass://analytics/current` - Current platform analytics
- `compass://config/prompts` - AI prompt templates

## Example Usage

```typescript
// In Claude Code or other MCP client

// List active journeys
const journeys = await use_mcp_tool('recovery-compass', 'list_journeys', {
  status: 'active'
});

// Get AI prompt for strength discovery
const prompt = await use_mcp_tool('recovery-compass', 'generate_ai_prompt', {
  category: 'strength',
  context: 'New user starting personal recovery journey'
});

// Analyze compliance data
const analysis = await use_mcp_tool('recovery-compass', 'analyze_compliance_data', {
  recordId: 'compliance_1'
});
```

## Development

```bash
# Watch mode for development
npm run watch

# Build
npm run build
```

## Integration with Recovery Compass

This MCP server connects to your Recovery Compass instance to:

1. Access user journeys and progress data
2. Query compliance records and metrics
3. Generate contextual AI prompts
4. Provide analytics insights
5. Offer AI-powered recommendations

## Security

- Implement authentication for production use
- Validate all input parameters
- Use environment variables for sensitive config
- Enable CORS appropriately for your environment

## License

MIT
