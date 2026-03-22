// src/config/client.ts
// Genduk fork: algo removed, credentials from shared loader
import { Spot } from '@binance/connector-typescript';
import { API_KEY, API_SECRET } from './credentials.js';
const BASE_URL = 'https://api.binance.com';

export const spotClient = new Spot(API_KEY, API_SECRET, { baseURL: BASE_URL });
