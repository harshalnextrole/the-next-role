---
name: send-welcome-email
description: Send a personalized welcome/prep email to a client who just booked a session through Calendly.
disable-model-invocation: true
allowed-tools: Bash, Read
argument-hint: "[client-name] [client-email]"
---

# Send Welcome Email

A client just booked a session. Send them a personalized email telling them what to prepare.

## Step 1: Gather Info

If arguments were provided, use them for name and email. Otherwise, ask the user for:
1. Client name (first name is enough)
2. Client email
3. Service booked — one of: Intro Call, Single Session, Resume/LinkedIn Review, Job Search Sprint, Career Transformation, Targeted Job Postings, Group Session
4. Personal note (optional) — anything extra to mention, e.g. "referred by Sarah" or "transitioning from engineering"

## Step 2: Draft the Email

Write the email in HTML. Follow these rules:

SUBJECT: Looking forward to our session, {firstName}

TONE: Warm, first-person from Harshal. Like texting a friend who you are genuinely excited to help. Not corporate.

EMAIL TEMPLATE:

Hey {firstName},

(1-2 sentence personal greeting expressing excitement about working together. If a personal note was provided, weave it in naturally.)

(1 sentence about what the session will cover based on the service type.)

To make the most of our time together, here is what I would love you to send my way beforehand (just reply to this email):

(Service-specific checklist from below)

No pressure to have everything perfect — we will figure it out together. But the more context I have going in, the more value I can give you.

Talk soon,
Harshal

P.S. Need to reschedule? No worries — https://calendly.com/harshal-nextrole/30min

SERVICE-SPECIFIC CHECKLISTS:

Intro Call:
- A brief intro — who you are and your background
- What role or industry you are targeting
- Your biggest career challenge right now

Single Session:
- Your resume (PDF is great)
- The specific topic you want to focus on (resume, interviews, career strategy, etc.)
- 1-2 job postings you are interested in

Resume/LinkedIn Review:
- Your resume (PDF)
- Your LinkedIn profile URL
- The type of role you are targeting
- 2-3 job postings you would like me to tailor your resume towards

Job Search Sprint:
- Your resume and LinkedIn profile URL
- A list of target companies (dream list is fine)
- Where you are in your job search right now
- Your timeline — when do you want to land something by?

Career Transformation:
- Your resume and LinkedIn profile URL
- A brief career history (where you have been)
- Where you want to be in 1-2 years
- What feels like the biggest blocker right now

Targeted Job Postings:
- Target roles/titles you are looking for
- Preferred companies or industries
- Location preferences (remote, hybrid, specific cities)
- Any dealbreakers (company size, travel, etc.)

Group Session:
- The topic or focus area for the group
- Number of participants
- General experience levels of attendees
- Any specific outcomes the group is hoping for

## Step 3: Show the Draft

Display the email subject and body to the user in a readable format. Ask them if they want to send it as-is or change anything. Wait for approval. If the user wants changes, revise and show again.

## Step 4: Send the Email

Once approved, write the JSON payload to a temporary file, then use curl to send it. Do this in two Bash commands:

First, write the payload to /tmp/welcome-email.json using a Node one-liner:
node -e "const d = {name: 'NAME', email: 'EMAIL', service: 'SERVICE', subject: 'SUBJECT', htmlBody: 'HTML'}; require('fs').writeFileSync('/tmp/welcome-email.json', JSON.stringify(d))"

Then send it:
curl -s -X POST http://localhost:3000/api/welcome-email -H "Content-Type: application/json" -d @/tmp/welcome-email.json

Replace NAME, EMAIL, SERVICE, SUBJECT, and HTML with actual values. Make sure the HTML is properly escaped in the JavaScript string.

## Step 5: Confirm

If the response includes "success": true, tell the user the email was sent and a copy went to the admin email.

If it fails, show the error and suggest checking if the dev server is running (npm run dev).
