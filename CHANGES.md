# Genduk Fork — Changes from Upstream

## Purpose

This is a stripped-down fork of [nirholas/Binance-MCP](https://github.com/nirholas/Binance-MCP.git)
for use with Genduk (personal AI companion). Scope is intentionally narrow — only tools needed
for personal crypto portfolio management are enabled.

## Modules KEPT

### Spot Trading (`src/modules/spot/`)
- **market-api**: klines, ticker24hr, depth (order book), aggTrades, tickerTradingDay, uiKlines,
  tickerBookTicker, avgPrice, tickerPrice, ticker, historicalTrades, getTrades
- **trade-api**: newOrder (place buy/sell), deleteOrder (cancel), getOrder, getOpenOrders,
  deleteOpenOrders (cancel all), allOrders (history), openOrderList, orderOco
- **account-api**: getAccount (balance), myTrades (trade history), accountCommission,
  rateLimitOrder, myPreventedMatches, myAllocations
- **general-api**: exchangeInfo, ping, time
- **userdatastream-api**: newUserDataStream, putUserDataStream, deleteUserDataStream

### Simple Earn (`src/modules/simple-earn/`)
- **earn-api**: subscribeFlexibleProduct, redeemFlexibleProduct
- **account-api**: simpleEarnFlexibleProductList, getFlexibleProductPosition

## Modules REMOVED

| Module | Reason |
|--------|--------|
| `algo` | TWAP/algorithmic trading — not needed for manual trading |
| `c2c` | C2C/P2P trading — not used |
| `convert` | Binance Convert — may add later if needed |
| `copy-trading` | Copy trading — not used |
| `dual-investment` | Dual investment product — not used |
| `fiat` | Fiat deposit/withdraw — not used |
| `gift-card` | Gift cards — not used |
| `mining` | Mining pool — not used |
| `nft` | NFT marketplace — not used |
| `pay` | Binance Pay — not used |
| `portfolio-margin` | Portfolio margin — not used |
| `rebate` | Referral rebates — not used |
| `staking` | On-chain staking — use Simple Earn instead |
| `sub-account` | Sub-account management — single account only |
| `vip-loan` | VIP crypto loans — not used |
| `wallet` | **Removed intentionally** — withdrawals/deposits are HIGH RISK operations. Removing this module prevents accidental fund movement via AI. |

## npm Dependencies REMOVED

Removed from `package.json` (no longer needed):
- `@binance/algo`
- `@binance/auto-invest`
- `@binance/c2c`
- `@binance/convert`
- `@binance/copy-trading`
- `@binance/crypto-loan`
- `@binance/dual-investment`
- `@binance/fiat`
- `@binance/mining`
- `@binance/nft`
- `@binance/pay`
- `@binance/rebate`
- `@binance/staking`
- `@binance/sub-account`
- `@binance/vip-loan`
- `@binance/wallet`

## Confirmation Layer Note

Trade confirmation (buy/sell order placement) is intentionally NOT handled inside this MCP server.
The Genduk integration layer will intercept spot order placement tools and require explicit owner
confirmation before executing. See `binance.ts` for the comment marking where this applies.

## Upstream Disabled Modules (not our change)

These were already disabled upstream due to SDK incompatibilities:
- Margin, Options, Auto-Invest, Crypto Loans, Futures USD-M, Futures COIN-M
