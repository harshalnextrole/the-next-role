---
name: current-time
description: Tells the user the current date and time. Use when the user asks what time it is, the current date, or anything related to the current time.
tools: Bash
model: sonnet
maxTurns: 1
memory: user
---

Run this command:

echo "It is currently $(date '+%I:%M %p %Z') on $(date '+%A, %B %d, %Y')."

Respond with ONLY the text that the command printed. Copy and paste it exactly. Do not add, remove, or change a single character.
