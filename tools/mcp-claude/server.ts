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
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

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

// Build MCP server (high-level) and register tool
const mcp = new McpServer(
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

// Zod schema for tool input
const SummarizeInput = z.object({
  text: z.string().min(1, "text is required"),
  style: z.string().optional(),
  max_sentences: z.number().min(1).max(8).optional(),
});

mcp.registerTool(
  "summarize",
  {
    title: "Summarize text",
    description:
      "Summarize input text concisely using Claude with safety guardrails.",
    inputSchema: SummarizeInput,
  },
  async ({ text, style, max_sentences }) => {
    // Defensive checks
    const input = (text || "").trim();
    if (!input) {
      return {
        content: [
          { type: "text", text: "Input is empty; nothing to summarize." },
        ],
      };
    }
    if (input.length > MAX_INPUT_CHARS) {
      return {
        content: [
          {
            type: "text",
            text: `Input too long (${input.length} chars). Limit is ${MAX_INPUT_CHARS}.`,
          },
        ],
      };
    }

    // Style and length hints
    const styleHint = (style || "bullets").toLowerCase();
    const maxSentences = Math.max(
      1,
      Math.min(8, Number(max_sentences || (IS_PROD ? 4 : 6)))
    );

    // Build user content prompt
    const userPrompt = [
      `Summarize the following text in at most ${maxSentences} sentences.`,
      `Style: ${styleHint}.`,
      `Be precise and neutral; do not invent facts.`,
      "",
      "TEXT:",
      input,
    ].join("\n");

    // Call Claude
    const response = await anthropic.messages.create({
      model: DEFAULT_MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_INSTRUCTION,
      messages: [{ role: "user", content: userPrompt }],
    });

    // Extract text segments
    const textParts = (response.content || [])
      .filter((p: any) => p && p.type === "text" && typeof p.text === "string")
      .map((p: any) => p.text) || [];

    const summary = textParts.length > 0 ? textParts.join("\n\n") : "[No text returned]";

    // Return MCP tool result
    return {
      content: [{ type: "text", text: summary }],
    };
  }
);

// Start stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await mcp.connect(transport);

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
