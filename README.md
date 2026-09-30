# Vocab Recall

Personal/free English vocabulary recall practice app.

## Features
- 10-second visual thinking timer
- Manual **Reveal** and manual **Next** — no auto-next
- Automatic pronunciation after reveal + replay button
- IPA, part of speech, Vietnamese meaning and example
- Sets: A1, B1, B2, C1, C2, TOEIC, Business, All

## Data pipeline
The GitHub Actions build downloads the NGSL 1.2, TSL 1.2 and BSL 1.2 word lists and enriches matching entries from the Skypedia English–Vietnamese SQLite dictionary. The resulting `data/words.json` is generated during deployment and is not committed.

The NGSL/TSL/BSL lists are released under CC BY-SA 4.0. The Skypedia dictionary is CC BY-SA 4.0.

Sources:
- https://www.newgeneralservicelist.com/
- https://github.com/skypediacode/english-vietnamese-dictionary

## Important
The A1–C2 labels in this MVP are **provisional frequency-based bands**, not official CEFR classifications.
