-- ====================================================================
-- MdTerra Architecture - Supabase Database Schema & Storage Setup
-- ====================================================================
-- Οδηγίες:
-- 1. Άνοιξε το Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Επίλεξε το project σου -> "SQL Editor"
-- 3. Επικόλλησε ολόκληρο το περιεχόμενο αυτού του αρχείου και πάτησε "Run"
-- ====================================================================

-- 1. Πίνακας Projects (Έργα)
create table if not exists public.projects (
  id bigint primary key,
  title text not null,
  slug text not null,
  categories text[] default '{}',
  image text not null,
  "headerImage" text,
  subtitle text,
  subtitle_el text,
  year text,
  location text,
  location_el text,
  client text,
  "designTeam" text,
  mep text,
  "structuralDesign" text,
  contractor text,
  photographer text,
  "associateArchitects" text,
  "designConsultant" text,
  "plotSize" text,
  "builtArea" text,
  capacity text,
  "galleryImages" text[] default '{}',
  description text[] default '{}',
  description_el text[] default '{}',
  created_at timestamptz default now()
);

-- 2. Πίνακας Team Members (Ομάδα)
create table if not exists public.team_members (
  id text primary key,
  name text not null,
  role text not null,
  role_el text not null,
  email text not null,
  image text not null,
  created_at timestamptz default now()
);

-- 3. Πίνακας Fakarola Items
create table if not exists public.fakarola_items (
  id bigint primary key,
  type text not null,
  type_el text not null,
  title text not null,
  title_el text not null,
  description text not null,
  description_el text not null,
  span text,
  color text,
  image text,
  date text,
  created_at timestamptz default now()
);

-- ====================================================================
-- Ρύθμιση Ασφάλειας (Row Level Security - RLS)
-- ====================================================================
alter table public.projects enable row level security;
alter table public.team_members enable row level security;
alter table public.fakarola_items enable row level security;

-- Δικαιώματα: Ανάγνωση για όλους (public view)
drop policy if exists "Allow public read projects" on public.projects;
create policy "Allow public read projects" on public.projects for select using (true);

drop policy if exists "Allow public read team" on public.team_members;
create policy "Allow public read team" on public.team_members for select using (true);

drop policy if exists "Allow public read fakarola" on public.fakarola_items;
create policy "Allow public read fakarola" on public.fakarola_items for select using (true);

-- Δικαιώματα: Προσθήκη / Επεξεργασία / Διαγραφή από το Admin Panel (μέσω Anon Key)
drop policy if exists "Allow mutations projects" on public.projects;
create policy "Allow mutations projects" on public.projects for all using (true) with check (true);

drop policy if exists "Allow mutations team" on public.team_members;
create policy "Allow mutations team" on public.team_members for all using (true) with check (true);

drop policy if exists "Allow mutations fakarola" on public.fakarola_items;
create policy "Allow mutations fakarola" on public.fakarola_items for all using (true) with check (true);

-- ====================================================================
-- Ρύθμιση Storage (Για ανέβασμα φωτογραφιών/εικόνων)
-- ====================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- Storage policies: Επιτρέπεται σε όλους να βλέπουν και να ανεβάζουν φωτογραφίες
drop policy if exists "Allow public view media" on storage.objects;
create policy "Allow public view media" on storage.objects for select using (bucket_id = 'media');

drop policy if exists "Allow public upload media" on storage.objects;
create policy "Allow public upload media" on storage.objects for insert with check (bucket_id = 'media');

drop policy if exists "Allow public update media" on storage.objects;
create policy "Allow public update media" on storage.objects for update with check (bucket_id = 'media');

drop policy if exists "Allow public delete media" on storage.objects;
create policy "Allow public delete media" on storage.objects for delete using (bucket_id = 'media');
