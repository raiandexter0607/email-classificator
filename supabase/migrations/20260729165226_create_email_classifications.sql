-- Table: email_classifications
-- Stores AI classification + routing results for inbound emails, written by the
-- n8n workflow via the Supabase REST API using the service_role key.
create table if not exists public.email_classifications (
  id uuid primary key default gen_random_uuid(),
  message_id text not null unique,
  thread_id text,
  is_thread_continuation boolean not null default false,
  sender_email text,
  subject text,
  received_at timestamptz,
  category text,
  confidence numeric(4, 3),
  routing_status text,
  assigned_department text,
  has_attachments boolean not null default false,
  attachment_note text,
  ai_reasoning text,
  reviewed_by_human boolean not null default false,
  processed_at timestamptz not null default now()
);

comment on column public.email_classifications.category is
  'Expected values: quote | pickup | claim | status_inquiry | general';
comment on column public.email_classifications.routing_status is
  'Expected values: auto_routed | flagged_for_review';

-- Row Level Security
alter table public.email_classifications enable row level security;

-- Dashboard (anon) is allowed to read. Inserts/updates/deletes are performed
-- exclusively by n8n via the service_role key, which bypasses RLS.
create policy "Allow anon read access"
  on public.email_classifications
  for select
  to anon
  using (true);
