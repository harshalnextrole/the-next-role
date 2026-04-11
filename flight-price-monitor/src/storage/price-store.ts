import fs from 'node:fs';
import path from 'node:path';
import type { PriceRecord, LowestPricesMap } from '../types/index.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'price-history.json');
const LOWEST_FILE = path.join(DATA_DIR, 'lowest-prices.json');

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

/**
 * Check if a new price is lower than the stored lowest.
 * Returns the previous lowest price, or null if no previous record exists.
 */
export function getPreviousLowest(departureDate: string): number | null {
  const map = readLowestPrices();
  const entry = map[departureDate];
  return entry ? entry.lowestPrice : null;
}
