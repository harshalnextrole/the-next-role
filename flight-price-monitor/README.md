# Flight Price Monitor

Automated agent that monitors business class flight prices from **YYZ (Toronto) to DEL (New Delhi)** and sends email alerts when prices drop.

## What It Does

- Searches Google Flights (via SerpAPI) for business class flights across 15 date combinations (Oct–Dec 2026)
- Filters for: ≤1 stop, ≤26h total travel time, ≤6h layover
- Tracks the lowest price seen per date pair
- Emails you via Resend whenever a price drops below the previous lowest
- Runs daily via GitHub Actions, checking 3 dates per run (rotates through all 15 over 5 days)
- Free tier: 100 SerpAPI searches/month (~3/day)

## Setup

### 1. SerpAPI

1. Sign up at [serpapi.com](https://serpapi.com)
2. Get your API key from the dashboard
3. Free tier includes 100 searches/month

### 2. Resend Email

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. (Optional) Verify a custom sender domain

### 3. GitHub Secrets

Add these secrets in your repo → Settings → Secrets → Actions:

| Secret | Value |
|---|---|
| `SERPAPI_KEY` | Your SerpAPI key |
| `RESEND_API_KEY` | Your Resend API key |
| `NOTIFICATION_EMAIL` | Email address for alerts |
| `EMAIL_FROM` | (Optional) Sender email address |

### 4. Run Locally

```bash
npm install

# Set env vars
export SERPAPI_KEY=your_key
export NOTIFICATION_EMAIL=you@example.com

# Run once
npx tsx src/index.ts
```

## Configuration

Edit `src/config.ts` to adjust:

- `ORIGIN` / `DESTINATION` — airport codes
- `TRIP_DURATION_DAYS` — length of trip (default: 21)
- `SEARCH_START` / `SEARCH_END_DEPARTURE` — travel window
- `DATE_INTERVAL_DAYS` — days between each search date (default: 5)
- `MAX_TRAVEL_TIME_MINUTES` — max travel time per direction (default: 26h)
- `MAX_STOPS` — max stopovers per direction (default: 1)
- `MAX_LAYOVER_MINUTES` — max layover at connecting airport (default: 6h)
- `DATES_PER_RUN` — dates to check per run (default: 3)

## How It Works

```
Every day:
  1. Pick the next batch of 3 dates (rotates through 15 total)
  2. For each date, search Google Flights for business class YYZ→DEL
  3. Filter: ≤1 stop, ≤26h travel, ≤6h layover
  4. Compare cheapest against stored lowest price
  5. If lower → email alert + update records
  6. Commit updated price data to repo
```

## Cost

| Component | Monthly Cost |
|---|---|
| SerpAPI (~90 searches/month) | $0 (free tier) |
| Resend emails (~10–20/month) | $0 (free tier) |
| GitHub Actions (~30 min/month) | $0 (free tier) |
| **Total** | **$0/month** |
