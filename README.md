# QA Wolf Take-Home Assignment — Hacker News Sort Validation

This project uses [Playwright](https://playwright.dev/) and Node.js to validate that the **first 100 articles** on [Hacker News Newest](https://news.ycombinator.com/newest) are sorted from **newest to oldest**.

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Levitiku5/qa-wolf-assignment
   cd qa_wolf_take_home
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install required browsers via Playwright:**

   ```bash
   npx playwright install
   ```

   If you're on Linux and see missing library errors (e.g., `libdbus-glib-1.so.2`), install system dependencies:

   ```bash
   sudo apt install libdbus-glib-1-2    # Debian/Ubuntu
   ```

---

## How to Run the Script

```bash
node index.js
```

* The script will:

  * Open Chromium via Playwright
  * Navigate to the **newest** Hacker News page
  * Paginate through articles until 100 are collected
  * Validate that article IDs are strictly decreasing (newest to oldest)
  * Output a success/failure message in the terminal

---

## What This Script Does

* Uses `page.$$eval` to extract article `item?id=` links and parse their numeric IDs.
* Handles pagination by clicking the `More` button until at least 100 unique articles are collected.
* Once 100 articles are gathered:

  * It checks that the array of IDs is in **strict descending order** (i.e., each newer article has a higher ID).
* Outputs clear messaging in the terminal with the result.

---

## Limitations & Future Improvements

* **Assumes article ID is a proxy for post time.** While this holds true in practice on Hacker News, a more robust approach would validate against actual timestamps (not available directly).
* **Does not currently validate the "X minutes ago" age indicators.** This could be used as a secondary verification method.
* **No CLI arguments or logging modes yet.** It could be enhanced to allow flags like `--verbose`, `--limit=200`, or `--report=html`.
* **HTML report output** could make this suitable for CI pipelines or automated QA dashboards.

