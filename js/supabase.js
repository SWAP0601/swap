const SUPABASE_URL = "https://zmxcpohtuwucnotmjphx.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_WtTin4Rtr4M2NXclZvaNKQ_eK42XCTJ";

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);