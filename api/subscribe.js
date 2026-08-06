const crypto = require('crypto');
const { supabase } = require('../lib/supabase');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email } = req.body || {};

  if (!email || !EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: 'A valid email is required.' });
    return;
  }

  const unsubscribeToken = crypto.randomBytes(24).toString('hex');

  const { error } = await supabase.from('subscribers').insert({
    name: name ? String(name).trim() : null,
    email: email.toLowerCase().trim(),
    consent_timestamp: new Date().toISOString(),
    unsubscribe_token: unsubscribeToken,
    active: true
  });

  if (error) {
    // Postgres unique_violation — they're already on the list, treat as success
    if (error.code === '23505') {
      res.status(200).json({ ok: true, message: 'Already subscribed.' });
      return;
    }
    console.error('subscribe error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
    return;
  }

  res.status(200).json({ ok: true });
};
