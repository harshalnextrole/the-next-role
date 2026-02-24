// Email notification utility
// Configure with Resend, SendGrid, or any email service

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // Check if Resend API key is configured
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.log('Email notification (RESEND_API_KEY not set):', options.subject);
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'notifications@thenextrole.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export async function notifyNewTestimonial(testimonial: {
  name: string;
  role: string;
  quote: string;
  rating: number;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'hello@thenextrole.com';

  await sendEmail({
    to: adminEmail,
    subject: `New Testimonial from ${testimonial.name}`,
    html: `
      <h2>New Testimonial Submitted</h2>
      <p><strong>Name:</strong> ${testimonial.name}</p>
      <p><strong>Role:</strong> ${testimonial.role}</p>
      <p><strong>Rating:</strong> ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</p>
      <p><strong>Quote:</strong></p>
      <blockquote style="border-left: 4px solid #E07A5F; padding-left: 16px; margin: 16px 0; color: #555;">
        "${testimonial.quote}"
      </blockquote>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://thenextrole.com'}/admin">Review in Admin Dashboard</a></p>
    `,
  });
}

export async function notifyNewInquiry(inquiry: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'hello@thenextrole.com';

  await sendEmail({
    to: adminEmail,
    subject: `New Contact Form: ${inquiry.subject || 'General Inquiry'}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
      <p><strong>Subject:</strong> ${inquiry.subject || 'General Inquiry'}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
        ${inquiry.message.replace(/\n/g, '<br>')}
      </div>
      <p><a href="mailto:${inquiry.email}?subject=Re: ${inquiry.subject || 'Your inquiry'}">Reply to ${inquiry.name}</a></p>
    `,
  });
}
