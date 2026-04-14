import { formatDuration } from '../utils/duration.js';
import type { PriceDropAlert, FlightOption } from '../types/index.js';

const TIER_CONFIG = {
  exceptional: {
    label: 'EXCEPTIONAL DEAL',
    color: '#16a34a',
    bg: '#dcfce7',
    description: 'Rarely seen price — book quickly',
  },
  good: {
    label: 'GOOD DEAL',
    color: '#2563eb',
    bg: '#dbeafe',
    description: 'Below average for this route',
  },
  drop: {
    label: 'PRICE DROP',
    color: '#9333ea',
    bg: '#f3e8ff',
    description: 'New historical low for this date',
  },
  tracking: {
    label: 'NOW TRACKING',
    color: '#6b7280',
    bg: '#f3f4f6',
    description: 'First observation — establishing baseline',
  },
} as const;

/**
 * Send a price drop / deal alert email via Resend.
 * Falls back to console.log if RESEND_API_KEY is not set.
 */
export async function sendPriceDropAlert(alert: PriceDropAlert): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!notificationEmail) {
    console.warn('  NOTIFICATION_EMAIL not set — skipping email');
    return false;
  }

  // Decide which tier label to show
  // Priority: exceptional > good > drop (real drop) > tracking (first obs, not a real drop)
  let tierKey: keyof typeof TIER_CONFIG;
  if (alert.dealTier === 'exceptional') tierKey = 'exceptional';
  else if (alert.dealTier === 'good') tierKey = 'good';
  else if (alert.isFirstObservation) tierKey = 'tracking';
  else tierKey = 'drop';

  const tierCfg = TIER_CONFIG[tierKey];

  const subject = `${tierCfg.label}: ${alert.airline} YYZ→DEL $${alert.newPrice.toLocaleString()} ${alert.currency} — ${alert.departureDate}`;

  // Price change line
  const priceChangeHtml = alert.previousPrice
    ? `<p style="margin: 4px 0; font-size: 16px; color: #555;">
        Was <s style="color: #999;">$${alert.previousPrice.toLocaleString()}</s>
        &rarr; now <strong style="color: ${tierCfg.color};">$${alert.newPrice.toLocaleString()} ${alert.currency}</strong>
        <span style="color: ${tierCfg.color};">(−$${(alert.previousPrice - alert.newPrice).toLocaleString()})</span>
       </p>`
    : `<p style="margin: 4px 0; font-size: 16px;">
        Price: <strong style="color: ${tierCfg.color};">$${alert.newPrice.toLocaleString()} ${alert.currency}</strong>
       </p>`;

  // Historical stats block
  const statsHtml = alert.historicalStats
    ? `<div style="background: #f9fafb; border-radius: 6px; padding: 12px 16px; margin: 16px 0; font-size: 14px; color: #555;">
        <strong>Route history (${alert.historicalStats.observations} checks)</strong><br>
        Average: $${alert.historicalStats.avg.toLocaleString()} ${alert.currency} ·
        Lowest seen: $${alert.historicalStats.min.toLocaleString()} ${alert.currency}<br>
        ${alert.newPrice < alert.historicalStats.avg
          ? `<span style="color: #16a34a;">$${(alert.historicalStats.avg - alert.newPrice).toLocaleString()} below average</span>`
          : `<span style="color: #dc2626;">$${(alert.newPrice - alert.historicalStats.avg).toLocaleString()} above average</span>`
        }
       </div>`
    : '';

  // Alternatives block (top 3 airlines)
  const alternativesHtml = buildAlternativesHtml(alert.alternatives, alert.currency);

  const googleFlightsUrl = buildGoogleFlightsUrl(alert);

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">

      <div style="background: ${tierCfg.bg}; border-left: 4px solid ${tierCfg.color}; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px;">
        <strong style="color: ${tierCfg.color}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
          ${tierCfg.label}
        </strong>
        <span style="color: #555; font-size: 13px; margin-left: 8px;">${tierCfg.description}</span>
      </div>

      <h2 style="margin: 0 0 4px; color: #1e3a5f;">Business Class: YYZ → DEL</h2>
      <p style="margin: 0 0 12px; color: #888; font-size: 14px;">Round trip, 1 adult</p>

      ${priceChangeHtml}

      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #888; width: 140px;">Airline</td>
          <td style="padding: 8px 0; font-weight: 600;">${alert.airline}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #888;">Route</td>
          <td style="padding: 8px 0;">${alert.route}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #888;">Departure</td>
          <td style="padding: 8px 0;">${formatDatePretty(alert.departureDate)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #888;">Return</td>
          <td style="padding: 8px 0;">${formatDatePretty(alert.returnDate)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #888;">Travel time</td>
          <td style="padding: 8px 0;">${formatDuration(alert.totalDuration)}, ${alert.stops} stop(s)</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888;">Max layover</td>
          <td style="padding: 8px 0;">${formatDuration(alert.maxLayoverMinutes)}</td>
        </tr>
      </table>

      ${alternativesHtml}
      ${statsHtml}

      <a href="${googleFlightsUrl}"
         style="display: inline-block; background: #1e3a5f; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
        View on Google Flights
      </a>

      <p style="color: #bbb; font-size: 11px; margin-top: 24px;">
        Checked at ${new Date().toISOString()} · Agent monitors 35 date combinations across Oct–Dec 2026
      </p>
    </div>
  `;

  if (!resendApiKey) {
    console.log(`  [Email Preview] ${subject}`);
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: notificationEmail,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`  Failed to send email: ${response.status} ${errorText}`);
      return false;
    }

    console.log(`  Email sent to ${notificationEmail}`);
    return true;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`  Email error: ${message}`);
    return false;
  }
}

function buildAlternativesHtml(alternatives: FlightOption[], currency: string): string {
  if (alternatives.length <= 1) return '';

  const rows = alternatives.map((opt, i) => {
    const isWinner = i === 0;
    const bg = isWinner ? '#fef3c7' : '#ffffff';
    const weight = isWinner ? '700' : '500';
    const label = isWinner ? ' (cheapest)' : '';
    return `
      <tr style="background: ${bg}; border-bottom: 1px solid #eee;">
        <td style="padding: 10px; font-weight: ${weight};">${opt.airline}${label}</td>
        <td style="padding: 10px; color: #555; font-size: 13px;">${opt.route}</td>
        <td style="padding: 10px; color: #555; font-size: 13px;">${formatDuration(opt.totalDuration)}, ${opt.stops} stop(s)</td>
        <td style="padding: 10px; font-weight: ${weight}; text-align: right;">$${opt.price.toLocaleString()} ${currency}</td>
      </tr>
    `;
  }).join('');

  return `
    <div style="margin: 20px 0;">
      <h3 style="font-size: 14px; color: #555; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Top options by airline</h3>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #eee; border-radius: 6px; overflow: hidden; font-size: 14px;">
        <thead>
          <tr style="background: #f9fafb;">
            <th style="padding: 10px; text-align: left; color: #555; font-weight: 600; font-size: 12px;">AIRLINE</th>
            <th style="padding: 10px; text-align: left; color: #555; font-weight: 600; font-size: 12px;">ROUTE</th>
            <th style="padding: 10px; text-align: left; color: #555; font-weight: 600; font-size: 12px;">TIME</th>
            <th style="padding: 10px; text-align: right; color: #555; font-weight: 600; font-size: 12px;">PRICE</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function buildGoogleFlightsUrl(alert: PriceDropAlert): string {
  const params = new URLSearchParams({
    q: `flights from YYZ to DEL on ${alert.departureDate} return ${alert.returnDate} business class`,
  });
  return `https://www.google.com/travel/flights?${params.toString()}`;
}

function formatDatePretty(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00Z').toLocaleDateString('en-US', {
    weekday: 'short', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
}
