# Alpine Acres Adventures — WordPress Theme

One-page landing site for Alpine Acres Adventures, a family ranch featuring llamas, heirloom garlic, and mountain living.

**Instagram:** [@alpineacresadventures](https://www.instagram.com/alpineacresadventures)

---

## Getting Started

### Install in WordPress

1. Zip the `wp-content/themes/alpineacres/` folder
2. In WordPress Admin → Appearance → Themes → Add New → Upload Theme
3. Activate the theme
4. Go to **Settings → Reading** → set "Your homepage displays" to "A static page" → create a blank page called "Home" and set it as Front page
5. Visit **Appearance → Customize** to fill in your content

### Customizer Settings

All site text and contact info is editable without touching code:

| Section | Settings |
|---|---|
| **Hero Section** | Tagline, CTA button labels |
| **Ranch Stats** | Acres, llama count, garlic lbs, years farming |
| **Contact Information** | Email, phone, location, Instagram handle |
| **Site Identity** | Site name, tagline, logo |

### Adding Photos

Each section has a placeholder that shows "Upload photo via Media Library."
To replace with a real photo, open the relevant template part in `template-parts/` and swap `<?php alpineacres_placeholder(...) ?>` with:

```php
<img src="YOUR_MEDIA_LIBRARY_URL" alt="Descriptive alt text" loading="lazy">
```

**Hero background:** Replace `assets/images/hero-bg.jpg` with your ranch landscape photo, or set a CSS background-image via the Customizer.

---

## Shopify Integration (Future)

The garlic section and shop section have clearly marked integration points.

**Steps when ready:**
1. Create your Shopify store
2. Go to **Sales Channels → Buy Button → Create Buy Button**
3. Select your product, customize to match forest green `#2A4A1E`
4. Paste the `<div id="product-component-XXXXXXX">` into `template-parts/garlic.php`
5. Add the generated `<script>` tag to `footer.php` before `<?php wp_footer(); ?>`

---

## Airbnb Integration (Future)

Airbnb does not offer embeddable widgets. When your listing is live:
1. Copy your Airbnb listing URL
2. In `template-parts/stay.php`, replace the `mailto:` link with your listing URL
3. Optionally add `?irgwc=1` for Airbnb's affiliate embed preview

---

## Live Instagram Feed

Currently shows placeholder tiles. To connect a live feed, install one of:
- [Smash Balloon Social Photo Feed](https://wordpress.org/plugins/instagram-feed/) (free)
- [Feed Them Social](https://wordpress.org/plugins/feed-them-social/)

Then in `template-parts/instagram.php`, replace the placeholder grid with the plugin shortcode.

---

## File Structure

```
wp-content/themes/alpineacres/
├── style.css                  # Theme manifest + all CSS
├── functions.php              # Theme setup, Customizer, AJAX handlers
├── front-page.php             # One-page template (assembles all sections)
├── index.php                  # Fallback template
├── header.php                 # <head>, nav
├── footer.php                 # Footer, wp_footer()
├── template-parts/
│   ├── hero.php               # Full-viewport hero
│   ├── stats-bar.php          # Ranch at-a-glance numbers
│   ├── about.php              # Farm story + values
│   ├── llamas.php             # Llama herd cards
│   ├── garlic.php             # Garlic section + Shopify hook
│   ├── stay.php               # Airbnb/farm stay teaser
│   ├── vendors.php            # Wholesale inquiry + AJAX form
│   └── instagram.php          # Feed placeholder + live feed hook
└── assets/
    ├── css/                   # (additional CSS files if needed)
    ├── js/
    │   └── main.js            # Nav, mobile menu, scroll reveal, form AJAX
    └── images/
        └── hero-bg.jpg        # Replace with actual ranch photo
```
