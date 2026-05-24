-- Table des entrées de la bucket list
create table if not exists public.entries (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  categorie text not null,
  statut text not null default 'a_decouvrir',
  note text,
  created_at timestamptz not null default now()
);

alter table public.entries enable row level security;

create policy "entries_select_anon"
  on public.entries for select
  to anon
  using (true);

create policy "entries_insert_anon"
  on public.entries for insert
  to anon
  with check (true);

create policy "entries_update_anon"
  on public.entries for update
  to anon
  using (true)
  with check (true);

create policy "entries_delete_anon"
  on public.entries for delete
  to anon
  using (true);
