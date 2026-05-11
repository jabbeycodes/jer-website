#!/usr/bin/env bash
# Apply all SQL files in supabase/migrations/ in sorted order.
#
# Option A — connection string (Supabase Dashboard → Project Settings → Database → URI):
#   export DATABASE_URL='postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres'
#   npm run db:migrate
#
# Option B — Supabase CLI linked project (leave DATABASE_URL unset):
#   supabase link --project-ref YOUR_PROJECT_REF
#   npm run db:migrate
#
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
CLI=(npx --yes supabase@latest)

run_file() {
  local f="$1"
  echo ""
  echo "==> $(basename "$f")"
  if [[ -n "${DATABASE_URL:-}" ]]; then
    "${CLI[@]}" db query -f "$f" --db-url "$DATABASE_URL" --agent no
  else
    "${CLI[@]}" db query -f "$f" --linked --agent no
  fi
}

if ! find "$ROOT/supabase/migrations" -maxdepth 1 -name '*.sql' -type f | grep -q .; then
  echo "No .sql files in supabase/migrations/"
  exit 1
fi

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "Using --linked (no DATABASE_URL). If this fails: supabase link --project-ref <ref> or set DATABASE_URL."
fi

while IFS= read -r f; do
  [[ -n "$f" ]] || continue
  run_file "$f"
done < <(find "$ROOT/supabase/migrations" -maxdepth 1 -name '*.sql' -type f | LC_ALL=C sort)

echo ""
echo "All migration files applied."
