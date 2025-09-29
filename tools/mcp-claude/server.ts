/**
 * Minimal Claude MCP server for Recovery Compass
 *
 * Tools:
 * - summarize: Summarize input text safely using Claude.
 *
 * Requirements:
 * - Environment: ANTHROPIC_API_KEY must be set
 * - Optional: MCP_CONTEXT=prod|staging (default: staging). In prod, applies stricter limits.
 *
 * Start (once compiled to JS):
 *   node tools/mcp-claude/server.js
 *
 * Notes:
 * - Uses stdio transport for MCP.
 * - Does not log secrets or user-provided content.
 */

import Anthropic from "@anthropic-ai/sdk";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// Context awareness for guardrails
const MCP_CONTEXT = (process.env.MCP_CONTEXT || "staging").toLowerCase();
const IS_PROD = MCP_CONTEXT === "prod" || MCP_CONTEXT === "production";

// Model selection: use a stable alias
const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest";

// Strict secret requirement
if (!process.env.ANTHROPIC_API_KEY) {
  // Fail fast without exposing any secret or user content
  console.error("Missing ANTHROPIC_API_KEY in environment.");
  process.exit(1);
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Safe system instruction to constrain the model behavior
const SYSTEM_INSTRUCTION =
  "You are a safety-focused assistant. Summaries must be concise, factual, and free of sensitive data. " +
  "Do not include secrets, tokens, or personally identifiable information not present in the input. " +
  "If the input is empty or unsafe, respond with a brief explanation.";

// Token and length policies (tighter in PROD)
const MAX_TOKENS = IS_PROD ? 300 : 600;
const MAX_INPUT_CHARS = IS_PROD ? 8000 : 16000;

// Build low-level MCP Server and register tool handlers
const server = new Server(
  {
    name: "recovery-compass-mcp-claude",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tools capability explicitly
server.registerCapabilities({ tools: { listChanged: true } });

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  const toolDefinition = {
    name: "summarize",
    title: "Summarize text",
    description:
      "Summarize input text concisely using Claude with safety guardrails.",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "The text to summarize. Length is limited by server policy.",
          minLength: 1,
        },
        style: {
          type: "string",
          description: "Optional style hint, e.g. 'bullets', 'executive', or 'plain'.",
        },
        max_sentences: {
          type: "number",
          description: "Optional maximum number of sentences in the summary (1-8).",
          minimum: 1,
          maximum: 8,
        },
      },
      required: ["text"],
      additionalProperties: false,
    },
  };
  return { tools: [toolDefinition] };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params as any;
  if (name !== "summarize") {
    return {
      isError: true,
      content: [{ type: "text", text: `Tool ${name} not found` }],
    } as any;
  }
  const input = String((args?.text ?? "")).trim();
  if (!input) {
    return { content: [{ type: "text", text: "Input is empty; nothing to summarize." }] } as any;
  }
  if (input.length > MAX_INPUT_CHARS) {
    return { content: [{ type: "text", text: `Input too long (${input.length} chars). Limit is ${MAX_INPUT_CHARS}.` }] } as any;
  }
  const styleHint = String(args?.style ?? "bullets").toLowerCase();
  const maxSentences = Math.max(1, Math.min(8, Number(args?.max_sentences ?? (IS_PROD ? 4 : 6))));
  const userPrompt = [
    `Summarize the following text in at most ${maxSentences} sentences.`,
    `Style: ${styleHint}.`,
    `Be precise and neutral; do not invent facts.`,
    "",
    "TEXT:",
    input,
  ].join("\n");

  const response = await anthropic.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_INSTRUCTION,
    messages: [{ role: "user", content: userPrompt }],
  });
  const textParts = (response.content || [])
    .filter((p: any) => p && p.type === "text" && typeof p.text === "string")
    .map((p: any) => p.text) || [];
  const summary = textParts.length > 0 ? textParts.join("\n\n") : "[No text returned]";
  return { content: [{ type: "text", text: summary }] } as any;
});

// Start stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Optional structured startup log (no secrets)
  const info = {
    server: "recovery-compass-mcp-claude",
    version: "0.1.0",
    context: IS_PROD ? "prod" : "staging",
    model: DEFAULT_MODEL,
  };
  console.error(JSON.stringify({ event: "server_started", ...info }));
}

main().catch((err) => {
  // Avoid leaking sensitive details
  console.error("Server failed to start.");
  process.exit(1);
});
