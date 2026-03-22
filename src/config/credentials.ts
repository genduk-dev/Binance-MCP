// src/config/credentials.ts
// Credential loader: file-based (via BINANCE_CREDENTIALS_FILE env var) with env var fallback

import { readFileSync } from "fs";
import { resolve } from "path";

interface BinanceCredentials {
    apiKey: string;
    apiSecret: string;
}

function loadCredentials(): BinanceCredentials {
    const credFile = process.env.BINANCE_CREDENTIALS_FILE;

    if (credFile) {
        try {
            const filePath = resolve(credFile);
            const raw = readFileSync(filePath, "utf-8");
            const parsed = JSON.parse(raw);
            return {
                apiKey: parsed.api_key ?? "",
                apiSecret: parsed.api_secret ?? "",
            };
        } catch (err: any) {
            console.error(`[binance-mcp] Failed to load credentials from ${credFile}: ${err.message}`);
            // Fall through to env var fallback
        }
    }

    // Fallback: direct env vars
    return {
        apiKey: process.env.BINANCE_API_KEY ?? "",
        apiSecret: process.env.BINANCE_API_SECRET ?? "",
    };
}

const creds = loadCredentials();

export const API_KEY = creds.apiKey;
export const API_SECRET = creds.apiSecret;
