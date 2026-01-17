# AICW Default Website Template

A Handlebars-based website template for generating static blog websites deployed to Cloudflare Pages.

## Features

- **Dark mode default** with light mode toggle
- Responsive 3-column article grid
- Pill-shaped navigation with search icon
- Hero section with customizable title and tagline
- Multi-column footer with social icons
- Full SEO support with Open Graph and Twitter cards
- JSON-LD structured data for articles
- RSS feed and sitemap auto-generation
- AICW tracking widget injection
- Table of contents for articles
- Image lightbox functionality
- Social sharing buttons

## Directory Structure

```
default/
├── README.md                    # This file
├── config.schema.json           # JSON Schema for validation
├── config.defaults.json         # Default configuration
├── layouts/
│   └── base.hbs                 # HTML document wrapper
├── pages/
│   ├── index.hbs                # Homepage with hero + article listing
│   ├── page.hbs                 # Paginated listing (page 2+)
│   └── article.hbs              # Single article page
├── partials/
│   ├── head.hbs                 # <head> meta tags, SEO, tracking
│   ├── navigation.hbs           # Header with logo, nav, search, CTA
│   ├── footer.hbs               # Multi-column footer with theme toggle
│   ├── hero.hbs                 # Homepage hero section
│   ├── article-card.hbs         # Card for article listings
│   ├── article-schema.hbs       # JSON-LD structured data
│   ├── social-share.hbs         # Social sharing buttons
│   ├── table-of-contents.hbs    # TOC component
│   ├── pagination.hbs           # Pagination controls
│   └── theme-toggle.hbs         # Dark/light mode toggle
└── assets/
    ├── css/
    │   ├── main.css             # Core styles with CSS variables
    │   └── prose.css            # Article content typography
    └── js/
        ├── theme.js             # Theme toggle + mobile nav
        ├── toc.js               # Table of contents generation
        ├── lightbox.js          # Image zoom functionality
        └── share.js             # Copy link functionality
```

## Configuration

The template is configured via `config.defaults.json`. All settings can be overridden by the website's `theme_config` in the database.

### Key Configuration Options

| Section | Description |
|---------|-------------|
| `site` | Basic site info: name, tagline, URL, language |
| `logo` | Logo type (text/image), border settings |
| `hero` | Hero section title and subtitle |
| `colors` | Light mode color scheme |
| `darkMode` | Dark mode settings and colors |
| `typography` | Font families and Google Fonts |
| `header` | Navigation style, links, CTA button |
| `footer` | Columns, social links, copyright |
| `blog` | Article listing options |
| `article` | Single article page options |
| `seo` | SEO settings, OG images |
| `tracking` | AICW widget code, custom scripts |

### Tracking Widget Injection

The `tracking.widgetCode` field contains the auto-generated AICW tracking snippet:

```json
{
  "tracking": {
    "widgetCode": "<script defer src=\"https://cdn.aicw.io/w.js\" data-id=\"your-id\"></script>"
  }
}
```

This code is injected into the `<head>` section of every page.

## Handlebars Helpers

The following custom helpers are available in templates:

| Helper | Description | Example |
|--------|-------------|---------|
| `formatDate` | Format date string | `{{formatDate published_at "MMM d, yyyy"}}` |
| `slugify` | Convert to URL slug | `{{slugify title}}` |
| `truncate` | Truncate text | `{{truncate excerpt 120}}` |
| `eq` | Equality comparison | `{{#if (eq type "image")}}` |
| `first` | Get first array item | `{{first categories}}` |
| `replacePlaceholders` | Replace {{YEAR}}, {{SITE_NAME}} | `{{replacePlaceholders copyrightText}}` |

## CSS Theming

CSS uses custom properties that are replaced by the edge function:

```css
:root {
  --color-primary: {{colors.primary}};
  --color-bg-primary: {{colors.background}};
  /* ... */
}

[data-theme="dark"] {
  --color-bg-primary: {{darkMode.colors.background}};
  /* ... */
}
```

## Generated Output

The edge function generates:

```
/
├── index.html                       # Homepage
├── page/2/index.html               # Paginated pages
├── category/{category}/index.html  # Category archives
├── {article-slug}/index.html       # Article pages
├── assets/css/main.css             # Compiled CSS
├── assets/css/prose.css            # Typography CSS
├── assets/js/*.js                  # JavaScript files
├── rss.xml                         # RSS feed
├── sitemap.xml                     # Sitemap
└── robots.txt                      # Robots file
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari/Chrome
