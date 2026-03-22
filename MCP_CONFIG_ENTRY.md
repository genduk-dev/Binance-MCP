# MCP Config Entry for Genduk

This is the `.mcp.json` entry to add when ready to enable the Binance MCP server.

**Prerequisites:**
1. Fill in real API key/secret in `~/.genduk/credentials/binance/config.json`
2. Run `npm install && npm run build` in this directory if not already done
3. Review the enabled tools in `src/binance.ts` before enabling

## Entry to add to `.mcp.json`

```json
"binance": {
  "type": "stdio",
  "command": "node",
  "args": ["../../mcp-servers/binance-mcp/build/index.js"],
  "env": {
    "BINANCE_API_KEY": "YOUR_BINANCE_API_KEY",
    "BINANCE_API_SECRET": "YOUR_BINANCE_API_SECRET"
  }
}
```

**Important:** Replace `YOUR_BINANCE_API_KEY` and `YOUR_BINANCE_API_SECRET` with actual values
from `~/.genduk/credentials/binance/config.json`. Do NOT commit the actual `.mcp.json` with
real credentials — it is already gitignored in the workspace.

## API Key Permissions Required

When creating the Binance API key, enable ONLY:
- **Read info** (required for market data, account balance, order status)
- **Spot & Margin Trading** (required for placing/cancelling spot orders)
- **Simple Earn** (required for subscribe/redeem flexible products)

Do NOT enable:
- Withdrawals (never needed — wallet module removed)
- Transfers
- Universal Transfer
- Futures
- Options

## Relative Path Note

The path `../../mcp-servers/binance-mcp/build/index.js` is relative to the workspace directory
`~/.genduk/workspaces/<chat_id>/`. Claude Code sets `cwd` to the workspace dir when spawning MCP
servers, so relative paths work correctly. Do NOT use `~` tilde paths — they are not expanded.
