# The Huddle — setup

## 1. Supabase
1. Create a project at supabase.com (free tier).
2. Open SQL Editor > New query, paste in `supabase/schema.sql`, run it.
3. Project Settings > API — copy the Project URL and the `service_role` key
   (not `anon`). You'll need both in step 4.

## 2. Resend
1. Sign up at resend.com (free tier).
2. Domains > Add Domain — enter your domain, add the DNS records it gives
   you at your domain registrar, wait for verification (minutes to hours).
3. API Keys > Create API Key — copy it.
4. In `api/send-daily.js`, change the `from` address to use your verified
   domain, e.g. `"The Huddle <huddle@yourdomain.com>"`.

## 3. Deploy to Vercel
1. Push this folder to a new GitHub repo.
2. Import the repo at vercel.com/new. No framework preset needed — Vercel
   auto-detects the `/api` folder as serverless functions and serves
   `index.html` as the static site.
3. Project Settings > Environment Variables — add all five from
   `.env.example`:
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — from step 1
   - `RESEND_API_KEY` — from step 2
   - `SITE_URL` — your live domain, e.g. `https://yourdomain.com` (no
     trailing slash)
   - `CRON_SECRET` — any random string you make up (e.g. generate one with
     `openssl rand -hex 20`)
4. Project Settings > Domains — add your domain and follow Vercel's DNS
   instructions.
5. Redeploy after adding the env vars.

## 4. GitHub Actions (the daily trigger)
1. In your GitHub repo: Settings > Secrets and variables > Actions.
2. Add two repository secrets:
   - `SITE_URL` — same value as above
   - `CRON_SECRET` — same value as above
3. The workflow in `.github/workflows/daily-send.yml` will run automatically
   once merged to your default branch. Adjust the `cron:` line if you want
   a different send time (it runs on UTC).

## 5. Test before telling anyone about it
1. Sign up on your live site with your own email.
2. Go to the repo's Actions tab > "Daily Huddle Send" > Run workflow
   (this uses the manual `workflow_dispatch` trigger, no need to wait for
   the schedule).
3. Confirm the email arrives and the unsubscribe link works.
4. Fill in the real mailing address in `index.html`'s footer and in
   `api/send-daily.js`'s email template — required for CAN-SPAM.
