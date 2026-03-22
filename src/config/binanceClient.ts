// src/config/binanceClient.ts
// Genduk fork: stripped to spot + simple-earn only
import { Spot } from "@binance/spot";
import { Spot as ConnectorSpot } from "@binance/connector-typescript";
import { SimpleEarn } from "@binance/simple-earn";
import crypto from "crypto";
import { API_KEY, API_SECRET } from "./credentials.js";
const BASE_URL = "https://api.binance.com";

const configurationRestAPI = {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    basePath: BASE_URL
};

// Spot Trading
export const spotClient = new Spot({ configurationRestAPI });

// Connector-typescript client (used by account info, order tools)
export const connectorClient = new ConnectorSpot(API_KEY, API_SECRET, { baseURL: BASE_URL });

// Simple Earn
export const simpleEarnClient = new SimpleEarn({ configurationRestAPI });

// Helper: check if API credentials are configured
export function hasApiCredentials(): boolean {
    return API_KEY !== "" && API_SECRET !== "";
}

// Generic signed REST client (used by spot modules that call sapi endpoints directly)
function generateSignature(queryString: string): string {
    return crypto.createHmac("sha256", API_SECRET).update(queryString).digest("hex");
}

export async function makeSignedRequest(
    method: "GET" | "POST" | "DELETE",
    endpoint: string,
    params: Record<string, any> = {}
): Promise<any> {
    const timestamp = Date.now();
    const queryParams = { ...params, timestamp };
    const queryString = new URLSearchParams(
        Object.fromEntries(Object.entries(queryParams).map(([k, v]) => [k, String(v)]))
    ).toString();
    const signature = generateSignature(queryString);
    const url = `${BASE_URL}${endpoint}?${queryString}&signature=${signature}`;

    const response = await fetch(url, {
        method,
        headers: {
            "X-MBX-APIKEY": API_KEY,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Binance API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    return response.json();
}
