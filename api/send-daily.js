const { Resend } = require('resend');
const { supabase } = require('../lib/supabase');
const { getTodaysQuote } = require('../lib/quotes');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  // Shared-secret check so this endpoint can't be triggered by anyone
  // who finds the URL. GitHub Actions sends this header (see the
  // workflow file in .github/workflows/daily-send.yml).
 const authHeader = req.headers['authorization'];
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (authHeader !== expected) {
    console.log('Auth debug:', {
      hasSecretEnvVar: !!process.env.CRON_SECRET,
      secretLength: process.env.CRON_SECRET ? process.env.CRON_SECRET.length : 0,
      receivedLength: authHeader ? authHeader.length : 0,
      expectedLength: expected.length
    });
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('email, unsubscribe_token')
    .eq('active', true);

  if (error) {
    console.error('send-daily fetch error:', error);
    res.status(500).json({ error: 'Could not load subscribers' });
    return;
  }

  const quote = getTodaysQuote();
  const baseUrl = process.env.SITE_URL; // e.g. https://yourdomain.com — no trailing slash

  const results = await Promise.allSettled(
    (subscribers || []).map((sub) => {
      const unsubscribeUrl = `${baseUrl}/api/unsubscribe?token=${sub.unsubscribe_token}`;
      return resend.emails.send({
        from: 'The Huddle <huddle@the-daily-huddle.com>',
        to: sub.email,
        subject: "Today's Huddle",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
            <p style="font-size: 20px; font-style: italic; line-height: 1.4;">"${quote.text}"</p>
            <p style="color: #666;">&mdash; ${quote.author}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            <p style="font-size: 12px; color: #999;">
              You're getting this because you signed up at The Huddle.
              <a href="${unsubscribeUrl}">Unsubscribe</a><br>
              9842 Beaver Creek Lane, Fishers, IN 46037
            </p>
          </div>
        `
      });
    })
  );

  const sent = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.length - sent;

  res.status(200).json({ ok: true, total: results.length, sent, failed });
};
