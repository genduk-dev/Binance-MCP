# Binance MCP Server — Fork Guide

Stripped fork of [nirholas/Binance-MCP](https://github.com/nirholas/Binance-MCP). See [CHANGES.md](CHANGES.md) for full diff from upstream.

## Architecture

```
src/
├── binance.ts              # Central registration — controls which modules are active
├── config/
│   ├── credentials.ts      # Credential loader (file-based or env var)
│   ├── binanceClient.ts    # Main API client (spot, simple-earn, signed requests)
│   └── client.ts           # Connector-typescript client (legacy, used by some tools)
├── modules/                # Module implementations (business logic)
│   ├── spot/               # Spot trading (market, trade, account, general)
│   └── simple-earn/        # Simple Earn (flexible products)
├── tools/                  # MCP tool registrations (schema + handler wrappers)
│   ├── binance-spot/       # Spot tool definitions
│   └── binance-simple-earn/# Simple Earn tool definitions
└── server/                 # MCP server setup
```

## Active Modules

| Module | Tools | Description |
|--------|-------|-------------|
| **Spot Trading** | ~25 | Market data (klines, ticker, depth), trade (buy/sell/cancel), account (balance, history) |
| **Simple Earn** | ~6 | Flexible products (list, positions, subscribe, redeem) |

## Credentials

API credentials are loaded by `src/config/credentials.ts` in this order:

1. **File-based** (preferred): Set `BINANCE_CREDENTIALS_FILE` env var to a JSON file path:
   ```json
   {
     "api_key": "your-api-key",
     "api_secret": "your-api-secret"
   }
   ```
2. **Env var fallback**: Set `BINANCE_API_KEY` and `BINANCE_API_SECRET` directly.

## How to Enable a Module

To re-enable a previously removed module (e.g., `convert`):

1. **Get the source files** from [upstream](https://github.com/nirholas/Binance-MCP):
   ```bash
   # Add upstream remote if not already present
   git remote add upstream https://github.com/nirholas/Binance-MCP.git
   git fetch upstream

   # Checkout the module source from upstream
   git checkout upstream/main -- src/modules/<module-name>/
   git checkout upstream/main -- src/tools/binance-<module-name>/
   ```

2. **Install the npm dependency** (if the module needs one):
   ```bash
   npm install @binance/<module-name>
   ```

3. **Register the module** in `src/binance.ts`:
   ```typescript
   import { registerBinance<Module>Tools } from "./modules/<module-name>/index.js"

   // Inside registerBinance():
   registerBinance<Module>Tools(server)
   ```

4. **Add the client** to `src/config/binanceClient.ts` if the module needs its own SDK client:
   ```typescript
   import { <Module> } from "@binance/<module-name>";
   export const <module>Client = new <Module>({ configurationRestAPI });
   ```

5. **Remove from tsconfig.json exclude** — remove the module's entries from the `exclude` array.

6. **Build and test**:
   ```bash
   npm run build
   ```

## How to Disable a Module

1. **Comment out** the import and registration in `src/binance.ts`.
2. **Add to tsconfig.json exclude** — add the module's `src/tools/` and `src/modules/` paths to prevent compilation errors.
3. **Optionally remove** the npm dependency: `npm uninstall @binance/<module-name>`.
4. **Optionally delete** the source files (they can always be restored from upstream).
5. **Rebuild**: `npm run build`.

## Build

```bash
npm install
npm run build    # Compiles TypeScript to build/
```

Entry point: `build/index.js`

## Known Issues

Some upstream modules have TypeScript type mismatches with their SDK packages (e.g., `userDataStream` methods missing from `RestAPI` type, `positionId` type mismatch in simple-earn locked). These are excluded from compilation via `tsconfig.json` and don't affect the active modules.

## MCP Configuration

Add to your `.mcp.json`:

```json
"binance": {
  "type": "stdio",
  "command": "node",
  "args": ["path/to/build/index.js"],
  "env": {
    "BINANCE_CREDENTIALS_FILE": "/path/to/credentials.json"
  }
}
```
