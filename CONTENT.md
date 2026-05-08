# Editing the Dé-light Fashion House site

For Beulah and Nifemi. No coding required. The site is hosted on Vercel; once we push this folder to GitHub and link it to Vercel, every change you save on GitHub triggers a fresh deploy in about 30 to 60 seconds.

## Where the editable text lives

Everything you can change without a developer is in the `content/` folder, in seven small files:

| File | What it controls |
| --- | --- |
| `content/site.json` | Hero headline, subhead, primary CTA label, social handles, the "10 / 600,000 / less than 1 hour" stats |
| `content/pins.json` | Every Fashion Inspo look: title, archetype, price, image, story |
| `content/archetypes.json` | The four gallery pages (Brides, Aso Ebi, Boss Ladies, Soft Life): headline, subhead, promise text, hero image |
| `content/testimonials.json` | The Real Women, Real Results section |
| `content/milestones.json` | The 10-year timeline on Our Story |
| `content/team.json` | Beulah and senior team on Our Story |
| `content/faqs.json` | The Contact page FAQ |

Each file is a list (or object) of plain text fields. You change the text inside the quotation marks. You do not touch the field names (the words on the left), only the values (the words on the right).

## How to edit (the two-minute version)

1. Open the GitHub repo for the site in your browser.
2. Click the `web/content/` folder.
3. Click the file you want to edit (e.g. `pins.json` to change a pin title or price).
4. Click the pencil icon at the top right of the file.
5. Edit the text inside the quotation marks. **Keep the quotation marks. Keep the commas.**
6. Scroll to the bottom. Type a short note in the "Commit changes" box (e.g. "set price for The Beaded Bride").
7. Click the green **Commit changes** button.
8. Wait 30 to 60 seconds. The new version is live on the site.

That is it. No deployment commands, no rebuilds.

## Setting a price on a pin

Open `content/pins.json`. Find the pin you want to price. Look for the `priceFromNgn` line:

```
"priceFromNgn": null,
```

Change `null` to the number, **with no commas, no spaces, no naira sign**:

```
"priceFromNgn": 220000,
```

That is two hundred and twenty thousand naira. The site will display it as `From ₦220,000` automatically.

If you want a pin to show **Price on request** (which is what every pin shows by default), leave `priceFromNgn` set to `null`.

> **Important.** Do not put quotation marks around the number. `"priceFromNgn": "220000"` will break the page. The number is not text; it is a number.

## Adding a brand new pin

In `content/pins.json`, the file is a list of pins between square brackets `[` and `]`. To add a pin:

1. First, upload the photo to `web/public/pins/` (call it `pin-19.jpg`, `pin-20.jpg`, etc., next number after the last one).
2. Open `content/pins.json`.
3. Copy one of the existing pin blocks (everything between the curly braces `{ ... }` for one pin, including the comma at the end).
4. Paste it after the last pin's closing `}`.
5. Edit the title, archetype, image path, story.
6. Save and commit.

A pin block looks like this:

```json
{
  "title": "The New Look",
  "archetype": "boss-ladies",
  "priceFromNgn": null,
  "image": "/pins/pin-19.jpg",
  "featured": false,
  "story": [
    "The first paragraph of the story.",
    "The second paragraph."
  ]
}
```

Allowed values for `"archetype"`: `"brides"`, `"aso-ebi"`, `"boss-ladies"`, `"soft-life"`. Spelled exactly like that, all lowercase, with the dashes.

`"featured": true` makes it appear in the six-pin mosaic on the homepage. `"featured": false` keeps it only in the Fashion Inspo gallery.

## Replacing the founder portrait or any image

1. Upload the new image to the matching folder in `web/public/`:
   - Founder portrait → `web/public/designs/founder-portrait.jpg` (replaces the current one)
   - A new pin photo → `web/public/pins/pin-XX.jpg`
   - A new editorial → `web/public/designs/editorial-XX.jpg`
2. If you replaced an existing file with the **same filename**, no edits to the JSON files are needed; the site picks up the new image automatically.
3. If you uploaded with a **different filename**, edit the relevant JSON file and update the path.

## Where to be careful

- Keep every quotation mark. JSON breaks if a `"` is missing.
- Keep every comma between blocks. The last block before a `]` does not have a trailing comma. The ones before it do.
- Numbers (like `priceFromNgn`) do not get quotation marks. Text always does.
- If GitHub shows a red `×` after you save, JSON is broken. Hit "Cancel" and try again, or message the developer.

## What you cannot edit from GitHub yet

- Site colours, fonts, page layout (these are in code; ask the developer)
- The two step CTA modal copy
- The footer
- Page URLs (e.g. you cannot rename `/fashion-inspo` to `/looks`)

If you need any of those changed, message the developer.

## Deploying changes to Vercel

After you commit on GitHub, Vercel sees it within seconds and starts a build. To watch progress:

1. Open vercel.com → log in → pick the Dé-light project.
2. Click "Deployments". The new build is at the top.
3. When it shows a green check mark, the new version is live on `delightfashionhouse.com`.

If a build ever fails (red X), click into it, copy the error, and send it to the developer.
