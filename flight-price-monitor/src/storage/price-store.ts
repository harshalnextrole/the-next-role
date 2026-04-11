import fs from 'node:fs';
import path from 'node:path';
import type { PriceRecord, LowestPricesMap, SearchState, HistoricalStats } from '../types/index.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'price-history.json');
const LOWEST_FILE = path.join(DATA_DIR, 'lowest-prices.json');
const STATE_FILE = path.join(DATA_DIR, 'search-state.json');

/** Ensure data directory and files exist */
function ensureDataFiles(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, '[]', 'utf-8');
  }
  if (!fs.existsSync(LOWEST_FILE)) {
    fs.writeFileSync(LOWEST_FILE, '{}', 'utf-8');
  }
  if (!fs.existsSync(STATE_FILE)) {
    fs.writeFileSync(
      STATE_FILE,
      JSON.stringify({ lastBatchIndex: -1, lastRunDate: '' }, null, 2),
      'utf-8'
    );
  }
}

/** Read the full price history log */
export function readPriceHistory(): PriceRecord[] {
  ensureDataFiles();
  const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
  return JSON.parse(raw) as PriceRecord[];
}

/** Append a price observation to the history log */
export function appendPriceHistory(record: PriceRecord): void {
  const history = readPriceHistory();
  history.push(record);
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
}

/** Read the lowest prices map */
export function readLowestPrices(): LowestPricesMap {
  ensureDataFiles();
  const raw = fs.readFileSync(LOWEST_FILE, 'utf-8');
  return JSON.parse(raw) as LowestPricesMap;
}

/** Update the lowest price for a specific departure date */
export function updateLowestPrice(
  departureDate: string,
  entry: LowestPricesMap[string]
): void {
  const map = readLowestPrices();
  map[departureDate] = entry;
  fs.writeFileSync(LOWEST_FILE, JSON.stringify(map, null, 2), 'utf-8');
}

/** Get previous lowest price for a date, or null if never seen */
export function getPreviousLowest(departureDate: string): number | null {
  const map = readLowestPrices();
  const entry = map[departureDate];
  return entry ? entry.lowestPrice : null;
}

/**
 * Get historical price stats for a departure date.
 * Returns avg, min, and observation count. Null if fewer than 2 observations.
 */
export function getHistoricalStats(departureDate: string): HistoricalStats | null {
  const history = readPriceHistory();
  const records = history.filter((r) => r.departureDate === departureDate);
  if (records.length < 2) return null;

  const prices = records.map((r) => r.price);
  const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const min = Math.min(...prices);

  return { avg, min, observations: records.length };
}

/** Read the search state (batch rotation tracker) */
export function readSearchState(): SearchState {
  ensureDataFiles();
  const raw = fs.readFileSync(STATE_FILE, 'utf-8');
  return JSON.parse(raw) as SearchState;
}

/** Update the search state after a run */
export function updateSearchState(state: SearchState): void {
  ensureDataFiles();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
}
