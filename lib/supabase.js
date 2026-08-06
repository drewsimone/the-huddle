const { createClient } = require('@supabase/supabase-js');

// SUPABASE_SERVICE_ROLE_KEY (not the anon key) is required here because
// these functions run server-side and need to bypass row-level security
// to read/write the subscribers table. Never expose this key in front-end code.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = { supabase };
