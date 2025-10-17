# Homepage Video Assets

The Recovery Compass homepage hero uses the optimized video files stored in this directory. These files are referenced directly from the public assets path so they can be served without bundling.

## Available sources

- `erd-method-homepage.mp4` – Desktop/landscape background video (~1.1 MB)
- `homepage-mobile-20251016.mp4` – Mobile/portrait background video (~2.9 MB)

When referencing the assets from React components, use the `/videos/...` path so Vite serves the static files from the `public` directory. For example:

```tsx
<source src="/videos/erd-method-homepage.mp4" type="video/mp4" />
```

The companion poster images live in `public/images`:

- `water-drapes-poster-v3.jpg`
- `water-drapes-poster-mobile-v3.jpg`

These posters should be passed to the `<video>` element's `poster` attribute to ensure an instant paint while the video is loading.
