-- Allow the dashboard to receive live INSERT/UPDATE events for this table.
alter publication supabase_realtime add table public.email_classifications;
