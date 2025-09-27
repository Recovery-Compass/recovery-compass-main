/* Minimal MCP client to call the "summarize" tool using stdio */
const { spawn } = require('child_process');
const { Client } = require('@modelcontextprotocol/sdk/client');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio');

(async () => {
  const cmd = '/Users/ericjones/Projects/recovery-compass/recovery-compass-main/tools/mcp-claude/run-mcp-claude.sh';
  const child = spawn(cmd, { stdio: ['pipe', 'pipe', 'pipe'] });

  child.stderr.on('data', (d) => {
    // Forward server stderr for visibility (no secrets)
    process.stderr.write(d);
  });

  const transport = new StdioClientTransport(child.stdout, child.stdin);
  const client = new Client({ name: 'smoke-test', version: '0.1.0' }, transport);

  await client.initialize();

  const tools = await client.listTools();
  console.log('Tools:', tools);

  const result = await client.callTool({
    name: 'summarize',
    arguments: { text: 'This is a short sentence to summarize.', max_sentences: 1 }
  });

  console.log('Result:', JSON.stringify(result, null, 2));
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
