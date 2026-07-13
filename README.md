# LWH Card & Label Printer

Zero-build static PWA. No Apps Script, no server — everything (vCard QR codes,
Code128 barcodes) is generated in the browser and sent straight to `window.print()`.

## One-time setup

Logo and icons are already in this folder, generated from the LWH badge logo:
`logo.png` (trimmed, transparent, used on the printed card), `icon-192.png` /
`icon-512.png` (home-screen icons), `icon-192-maskable.png` /
`icon-512-maskable.png` (padded versions Android can safely crop into a
circle/squircle), `apple-touch-icon.png` (iOS home screen), and `favicon.ico`
(browser tab). Nothing else to add — just push the folder as-is.

Push this folder to a GitHub repo and enable GitHub Pages (Settings → Pages →
deploy from branch), same as your warehouse floor app.

## Printing — read this once

Browsers can't send data straight to a printer driver; there's always a print
dialog in between. This app is built to make that dialog painless:

- **Business card**: pick your HID card printer in the dialog. Page 1 is the
  front, page 2 is the back (QR scan side) — the printer's duplex/manual-flip
  setting is what physically prints both sides.
- **Bulk labels — 4×6 thermal**: one label ID per page, sized for your Zebra
  thermal roll. Pick the Zebra as the printer.
- **Bulk labels — 8.5×11 sheet**: 6 labels per landscape page. Works on plain
  paper or cardstock — just load whichever stock you want in the tray and
  pick that printer/tray in the dialog. Nothing in the app changes based on
  paper stock, it's purely a printer setting.

Your browser remembers your last-used printer, so after the first print this
is genuinely a one-click action per printer/format combo.

## Bulk label ID ranges

Type a Start ID and an End ID that share a prefix and end in digits, e.g.
`Rack01` → `Rack22`. The app zero-pads to match whichever ID has more digits
and fills in every number in between. Range is capped at 500 labels per batch
as a sanity check.

## Editing company info

Company name, address, tagline, and default website live in the `CONFIG`
object near the top of the `<script>` block in `index.html`.
