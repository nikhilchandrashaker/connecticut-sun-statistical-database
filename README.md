# ☀️ Connecticut Sun Tribute — 2003–2026

A digital museum for the Connecticut Sun franchise, built from a
research spreadsheet (`connecticut_sun_definitive_stat_database.xlsx`)
into a full interactive site: the story, the players, the numbers, the
seasons, the All-Stars, the Finals runs, the moments, and a searchable
player archive.

## Files in this project

| File | What it is |
|---|---|
| `connecticut-sun-tribute.html` | The published, self-contained web page (live artifact). Open it directly in a browser — no build step, no dependencies. |
| `ConnecticutSunTribute.jsx` | The same site as a single React component (Tailwind utility classes, `useState`/`useMemo`), for dropping into an existing React project. Default export, no required props. |
| `README.md` | This file. |

## Sections

1. **Hero** — franchise headline numbers (all-time record, Finals trips, player count, coaching changes)
2. **Story** — the five coaching eras (Thibault → Donovan → Miller → White → Meziane), each with a win% sparkline and record
3. **Legends** — nine featured careers (Alyssa Thomas, Jonquel Jones, DeWanna Bonner, Tina Charles, Asjha Jones, Brionna Jones, Nykesha Sales, Katie Douglas, Chiney Ogwumike) with awards, franchise records, and All-Star counts
4. **Numbers** — the official franchise record book (career and single-season/game records) plus scoring/rebounding/assist leaderboards
5. **Seasons** — all 24 season cards (record, playoff result, coach, that year's All-Stars), filterable by decade
6. **All-Stars** — a horizontal 2003 → 2026 timeline of every All-Star selection
7. **Finals** — the four Finals runs (2004, 2005, 2019, 2022), documented rather than ranked
8. **Moments** — a chronological milestone timeline
9. **Archive** — all 155 players, searchable by name, position, or season, with a click-through bio modal
10. **Closing page** — a mosaic of every player's badge under the "24 seasons, one Connecticut Sun" line

## Data & sourcing notes

- All content is drawn directly from the uploaded stat database (sheets:
  Season Records, All-Stars, Major Awards, Franchise Records, Coaches,
  Milestones, Player Master, Career Totals, 2025–2026 Player Data).
- **Career-totals leaderboards are a partial subset.** The spreadsheet's
  `Career Totals` sheet has verified box-score totals for only part of the
  155-player roster — it is *not* the same as the `Franchise Records`
  sheet, which holds the definitive all-time record holders (e.g. Nykesha
  Sales as the all-time scoring leader). The site shows both, labeled
  separately, so the leaderboard table is never mistaken for the
  official record book.
- **No player photos.** Real player photos raise both copyright and
  identifiability concerns, so every player gets a generated
  initials badge (colored by a hash of their name) instead — used
  consistently across the Legends, Archive, and closing mosaic sections.
- Any field the dataset didn't have for a given player or season (e.g.
  a season's leading scorer, for years outside 2025–2026) was left out
  rather than estimated or invented.

## Using the files

- **HTML version:** open `connecticut-sun-tribute.html` in any browser,
  or re-publish it as a hosted link.
- **JSX version:** copy `ConnecticutSunTribute.jsx` into a React project
  with Tailwind CSS configured, then `import ConnecticutSunTribute from
  './ConnecticutSunTribute'` and render `<ConnecticutSunTribute />`.
  All data is embedded in the file — no external API or data file needed.

## Customizing

- **Legends selection:** edit the `LEGEND_NAMES` array (and matching
  `LEGEND_BLURB` entries) to feature different players.
- **Era narratives:** edit the `ERA_COPY` object to rewrite the story
  text for each coaching era.
- **Colors:** the HTML version uses CSS custom properties at the top of
  the `<style>` block (`--sun`, `--ember`, `--dawn`, `--ink`, etc.); the
  JSX version uses Tailwind's orange/red/amber/slate palette throughout.
