const { supabase } = require('../lib/supabase');

module.exports = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    res.status(400).send('Missing unsubscribe token.');
    return;
  }

  const { error } = await supabase
    .from('subscribers')
    .update({ active: false })
    .eq('unsubscribe_token', token);

  if (error) {
    console.error('unsubscribe error:', error);
    res.status(500).send('Something went wrong. Please try again.');
    return;
  }

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <html>
      <body style="font-family: Arial, sans-serif; text-align: center; padding: 60px 20px;">
        <h1>You're unsubscribed</h1>
        <p>You won't get any more emails from The Huddle. Sorry to see you go.</p>
      </body>
    </html>
  `);
};
