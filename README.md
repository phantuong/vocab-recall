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

For learner-facing primary meaning selection, the build uses the Oxford 3000/5000 PDFs as a **build-time reference for part of speech priority only**. For example, when a word has several dictionary senses across different parts of speech, the build prefers the sense matching the lowest-level Oxford POS. This helps avoid cases such as choosing a rare noun/verb sense when the learner is studying the common lexical role.

Oxford definitions, examples, audio and the Oxford word-list itself are **not copied into the public app data**. The app continues to use the CC BY-SA Skypedia data for Vietnamese meanings, examples and IPA.

The A1–C2 labels in this MVP remain the existing frequency-based bands. They are not official CEFR classifications yet. The next data step can use an openly redistributable CEFR source to replace those provisional bands.

Sources:
- https://www.newgeneralservicelist.com/
- https://github.com/skypediacode/english-vietnamese-dictionary
- https://www.oxfordlearnersdictionaries.com/about/wordlists/oxford3000-5000

## Important
Skypedia dictionary data is licensed CC BY-SA 4.0. Keep attribution and ShareAlike terms when redistributing the dictionary-derived data.
