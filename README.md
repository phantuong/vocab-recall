# Vocab Recall

Personal/free English vocabulary recall practice app.

## Features
- 10-second visual thinking timer
- Manual **Reveal** and manual **Next** — no auto-next
- Automatic pronunciation after reveal + replay button
- IPA, part of speech, Vietnamese meaning and example
- Sets: A1, B1, B2, C1, C2, TOEIC, Business, All

## Data pipeline
The GitHub Actions build downloads the NGSL 1.2, TSL 1.2 and BSL 1.2 word lists and enriches matching entries from the Skypedia English–Vietnamese SQLite dictionary.

For learner-facing prioritisation, the build uses the **American Oxford 3000/5000** as the primary reference for CEFR level and part of speech. It also applies a learner-first meaning layer for common words where a raw dictionary's first sense is misleading for everyday learning (for example, `dinner` is presented as **bữa tối** for American-English learners).

Oxford definitions, examples, audio and the Oxford word-list itself are **not copied into the public app data**. The app continues to use the CC BY-SA Skypedia data for Vietnamese meanings, examples and IPA, with original curated glosses/examples for selected high-frequency learner words.

The app now uses the American Oxford 3000/5000 word lists as the primary CEFR/POS reference when a word is covered by Oxford. NGSL/TSL/BSL frequency/category metadata remains available as supporting information, and the previous frequency band is retained as a fallback for words not covered by Oxford.

Sources:
- https://www.newgeneralservicelist.com/
- https://github.com/skypediacode/english-vietnamese-dictionary
- https://www.oxfordlearnersdictionaries.com/about/wordlists/oxford3000-5000

## Important
Skypedia dictionary data is licensed CC BY-SA 4.0. Keep attribution and ShareAlike terms when redistributing the dictionary-derived data.
