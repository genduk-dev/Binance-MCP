# Binance MCP Server (Personal Fork)

> **This is a personal fork of [nirholas/Binance-MCP](https://github.com/nirholas/Binance-MCP) for private use.**
>
> If you're looking for the full Binance MCP server with 478+ tools, please use the [upstream repository](https://github.com/nirholas/Binance-MCP) instead.

## What's different

- **Stripped to ~30 tools** — only spot trading and simple earn modules are active
- **14 modules removed** — wallet, algo, C2C, convert, copy-trading, dual-investment, fiat, gift-card, mining, NFT, pay, portfolio-margin, staking, sub-account, VIP-loan
- **Wallet/withdrawal intentionally removed** — prevents accidental fund movement via AI
- **File-based credential loading** — reads API keys from a JSON file via `BINANCE_CREDENTIALS_FILE` env var (with env var fallback)

See [CHANGES.md](CHANGES.md) for full diff from upstream.

## Quick Start

```bash
npm install
npm run build
```

### Credentials

Create a JSON file with your API credentials:

```json
{
  "api_key": "your-api-key",
  "api_secret": "your-api-secret"
}
```

### MCP Configuration

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

Alternatively, set `BINANCE_API_KEY` and `BINANCE_API_SECRET` env vars directly.

## Enabling / Disabling Modules

Modules can be individually toggled. See [CLAUDE.md](CLAUDE.md) for the step-by-step workflow.

**TL;DR:**
- **Enable:** Pull source from upstream → install npm dep → register in `src/binance.ts` → remove from `tsconfig.json` exclude → rebuild
- **Disable:** Comment out in `src/binance.ts` → add to `tsconfig.json` exclude → rebuild

## Not for general use

This fork is tailored for a personal setup. It may break, diverge from upstream, or change without notice. **Do not use this as a dependency.**

## License

Same as upstream — [Apache-2.0](LICENSE).
