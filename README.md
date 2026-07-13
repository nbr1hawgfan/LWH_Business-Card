# LWH Card & Label Printer

Zero-build static PWA. No Apps Script, no server — everything (vCard QR codes,
Code128 barcodes) is generated in the browser and sent straight to `window.print()`.

## Copies per label

The "Copies per label" field on the Bulk Labels tab reprints every ID in the
batch that many times in a row — e.g. set it to 2 if a bin needs the same
label on the front and the side. Defaults to 1.

## Scan to verify

After generating a batch, a "Verify Before You Install" panel appears below
the preview. Hit **Start Scanning**, point your camera at a freshly printed
label, and it checks the scanned code against the batch — the matching chip
turns green. Useful for catching a bad print (smudged barcode, wrong ID)
*before* a bay sign goes up somewhere you can't easily get back to.

This uses your camera through the browser (`getUserMedia`), which only works
over HTTPS — GitHub Pages serves everything over HTTPS by default, so no
extra setup needed there. The browser will ask for camera permission the
first time; say yes. It reads both the QR code and the barcode, so scanning
either one on the label works.

## Why the QR codes/barcodes might not show up

If you pushed an earlier version of this app that loaded QR/barcode libraries
from a CDN (`cdn.jsdelivr.net`), and either your network blocks that domain
or your browser already cached the old broken page, you may see label text
but no QR code or barcode image. That's now fixed — the libraries live
locally in `vendor/` and nothing calls out to the internet. If you're
updating an existing install, do a hard refresh (Ctrl+Shift+R) once so the
old service worker cache clears; after that it self-updates normally.

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
