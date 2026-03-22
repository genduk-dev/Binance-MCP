// src/binance.ts
// Central registration file for all Binance modules
// Genduk fork: stripped down to essential modules only (spot trading + simple earn + market data + account info)

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

// Import module registration functions — KEEP ONLY ESSENTIAL MODULES
import { registerBinanceSpotTools } from "./modules/spot/index.js"
import { registerBinanceSimpleEarnTools } from "./modules/simple-earn/index.js"

// REMOVED MODULES (see CHANGES.md for full list):
// - algo (TWAP/algo trading)
// - c2c (C2C/P2P trading)
// - convert
// - copy-trading
// - dual-investment
// - fiat (fiat deposit/withdraw)
// - gift-card
// - mining
// - nft
// - pay (Binance Pay)
// - portfolio-margin
// - rebate
// - staking (use simple-earn instead)
// - sub-account
// - vip-loan
// - wallet (withdrawals/deposits — HIGH RISK, removed intentionally)

// NOTE: The following modules were already disabled upstream due to missing/incompatible npm packages:
// - Margin (@binance/margin doesn't exist)
// - Options (@binance/options doesn't exist)
// - Auto-Invest (API methods mismatch)
// - Crypto Loans (API methods mismatch)
// - Futures USD-M / COIN-M (@binance/futures doesn't exist)

/**
 * Register essential Binance modules with the MCP server.
 *
 * Scope: market data, account info, spot trading, simple earn.
 *
 * NOTE: Trade confirmation (buy/sell) is handled at the Genduk integration layer,
 * NOT inside this MCP server. The MCP server exposes raw Binance API calls.
 * Genduk will intercept spot order placement tools and require explicit owner
 * confirmation before executing. Do not add confirmation logic here.
 */
export function registerBinance(server: McpServer) {
  // Spot trading: market data, trade API, account API, general API
  // Includes: place order, cancel order, get order, open orders, trade history,
  //           price ticker, order book, klines/candlesticks, account balance
  registerBinanceSpotTools(server)

  // Simple Earn: flexible product list, positions, subscribe, redeem
  registerBinanceSimpleEarnTools(server)
}

