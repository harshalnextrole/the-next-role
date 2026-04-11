import { formatDuration } from '../utils/duration.js';
import type { PriceDropAlert } from '../types/index.js';

/**
 * Send a price drop email notification via Resend.
 * Falls back to console.log if RESEND_API_KEY is not set.
 */
export async function sendPriceDropAlert(alert: PriceDropAlert): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!notificationEmail) {
    console.warn('  NOTIFICATION_EMAIL not set — skipping email');
    return false;
  }

  const subject = `Flight Deal: ${alert.airline} YYZ→DEL $${alert.newPrice} ${alert.currency} (${alert.departureDate})`;

  const previousPriceText = alert.previousPrice
    ? `<p style="color: #22c55e; font-size: 18px; margin: 8px 0;">
        Price dropped from <s>$${alert.previousPrice.toLocaleString()}</s> to
        <strong>$${alert.newPrice.toLocaleString()} ${alert.currency}</strong>
       </p>`
    : `<p style="color: #3b82f6; font-size: 18px; margin: 8px 0;">
        First price seen: <strong>$${alert.newPrice.toLocaleString()} ${alert.currency}</strong>
       </p>`;

  const googleFlightsUrl = buildGoogleFlightsUrl(alert);

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a5f; margin-bottom: 4px;">Business Class Price Drop</h2>
      <p style="color: #666; margin-top: 0;">YYZ (Toronto) → DEL (New Delhi)</p>

      ${previousPriceText}

      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0; color: #888;">Airline</td>
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

      <a href="${googleFlightsUrl}"
         style="display: inline-block; background: #1e3a5f; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 8px;">
        View on Google Flights
      </a>

      <p style="color: #999; font-size: 12px; margin-top: 24px;">
        Checked at ${new Date().toISOString()}
      </p>
    </div>
  `;

  if (!resendApiKey) {
    console.log(`  [Email Preview] ${subject}`);
    console.log(`  Price: $${alert.newPrice} ${alert.currency} | ${alert.airline} | ${alert.route}`);
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

/** Build a Google Flights deep link */
function buildGoogleFlightsUrl(alert: PriceDropAlert): string {
  const base = 'https://www.google.com/travel/flights';
  const params = new URLSearchParams({
    q: `flights from YYZ to DEL on ${alert.departureDate} return ${alert.returnDate} business class`,
  });
  return `${base}?${params.toString()}`;
}

/** Format YYYY-MM-DD as a readable date */
function formatDatePretty(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
