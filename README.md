# Binance MCP Server (Personal Fork)

> **This is a personal fork of [nirholas/Binance-MCP](https://github.com/nirholas/Binance-MCP) for private use.**
>
> It has been heavily stripped down and modified for a specific use case. If you're looking for the full Binance MCP server with 478+ tools, please use the [upstream repository](https://github.com/nirholas/Binance-MCP) instead.

## What's different

- **Stripped to ~30 tools** — only spot trading and simple earn modules are active
- **14 modules removed** — wallet, algo, C2C, convert, copy-trading, dual-investment, fiat, gift-card, mining, NFT, pay, portfolio-margin, staking, sub-account, VIP-loan
- **Wallet/withdrawal intentionally removed** — prevents accidental fund movement via AI
- **File-based credential loading** — reads API keys from a JSON file via `BINANCE_CREDENTIALS_FILE` env var (with env var fallback)

See [CHANGES.md](CHANGES.md) for full details.

## Not for general use

This fork is tailored for a personal AI companion setup. It may break, diverge from upstream, or change without notice. **Do not use this as a dependency.**

## License

Same as upstream — [Apache-2.0](LICENSE).
