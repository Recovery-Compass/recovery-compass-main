/* Minimal MCP client to call the "summarize" tool using stdio */
const { spawn } = require('child_process');
const clientPath = "/Users/ericjones/Projects/recovery-compass/recovery-compass-main/tools/mcp-claude/node_modules/@modelcontextprotocol/sdk/dist/cjs/client/index.js";
const stdioPath = "/Users/ericjones/Projects/recovery-compass/recovery-compass-main/tools/mcp-claude/node_modules/@modelcontextprotocol/sdk/dist/cjs/client/stdio.js";
const { Client } = require(clientPath);
const { StdioClientTransport } = require(stdioPath);

(async () => {
  const cmd = '/Users/ericjones/Projects/recovery-compass/recovery-compass-main/tools/mcp-claude/run-mcp-claude.sh';
  const child = spawn(cmd, { stdio: ['pipe', 'pipe', 'pipe'] });

  child.stderr.on('data', (d) => {
    // Forward server stderr for visibility (no secrets)
    process.stderr.write(d);
  });

const transport = new StdioClientTransport({
  command: cmd,
  stderr: 'pipe'
});
if (transport.stderr) {
  transport.stderr.on('data', (d) => process.stderr.write(d));
}
const client = new Client({ name: 'smoke-test', version: '0.1.0' });

await client.connect(transport);

  const tools = await client.listTools();
  console.log('Tools:', tools);

  const result = await client.callTool({
    name: 'summarize',
    arguments: { text: 'This is a short sentence to summarize.', max_sentences: 1 }
  });

  console.log('Result:', JSON.stringify(result, null, 2));
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
