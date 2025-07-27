# Auto-Responder Cloudflare Worker

This project sets up a Cloudflare Email Worker to automatically reply to incoming emails using the Resend API, and stores each email record as a JSON file in a GitHub repository.

## Setup

1. Install Wrangler:
   ```bash
   npm install -g wrangler
   ```

2. Configure Wrangler:
   ```bash
   wrangler login
   wrangler secret put RESEND_API_KEY
   wrangler secret put GITHUB_TOKEN
   ```

3. Edit `wrangler.toml` to set your GitHub repo (`GITHUB_REPO`) and branch (`GITHUB_BRANCH`).

4. Deploy:
   ```bash
   npm install
   npm run deploy
   ```

## How It Works

- The worker listens for incoming email events.
- Parses sender, subject, and body.
- Saves a JSON file under `emails/` in your GitHub repo via the GitHub Contents API.
- Sends a reply using the Resend API.
