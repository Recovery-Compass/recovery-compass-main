# Desktop Video Display Fix - 2025-10-17

## Issue
Desktop homepage video was not displaying correctly, while mobile video worked fine.

## Root Cause
The `HeroBackground.tsx` component was using `<source>` elements with `media` attributes to conditionally load videos based on viewport size:

```tsx
<video>
  <source media="(max-width: 768px)" src={MP4_MOBILE} type="video/mp4" />
  <source src={MP4_DESKTOP} type="video/mp4" />
</video>
```

**Problem**: Not all browsers reliably support `media` queries on `<source>` elements within `<video>` tags. This is especially problematic on desktop browsers where the media query doesn't match, causing the video to fail silently.

## Solution
Changed to using a direct `src` attribute with React state to dynamically select the correct video:

```tsx
const videoSrc = isMobile ? MP4_MOBILE : MP4_DESKTOP;

<video
  key={videoSrc} // Force re-mount when video changes
  src={videoSrc}
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster={poster}
/>
```

## Benefits
1. **Better Browser Compatibility**: Direct `src` attribute is universally supported
2. **Explicit Video Selection**: React state (`isMobile`) explicitly controls which video loads
3. **Forced Re-mount**: The `key` prop ensures the video element re-mounts when viewport changes
4. **Cleaner Code**: Removes nested `<source>` elements, simpler to debug

## Technical Details

### State Management
The component uses `matchMedia` to detect viewport changes:

```tsx
const mobileMq = window.matchMedia('(max-width: 768px)');
const updateMobile = () => setIsMobile(!!mobileMq.matches);
mobileMq.addEventListener('change', updateMobile);
```

### Files Modified
- `src/components/HeroBackground.tsx` - Core video logic

### Assets Verified
- ✅ Desktop: `/public/videos/erd-method-homepage.mp4` (1.1MB)
- ✅ Mobile: `/public/videos/homepage-mobile-20251016.mp4` (2.9MB)
- ✅ Desktop Poster: `/public/images/water-drapes-poster-v3.jpg` (73KB)
- ✅ Mobile Poster: `/public/images/water-drapes-poster-mobile-v3.jpg` (82KB)
- ✅ All videos verified to contain lighthouse imagery

### Build & Deploy
```bash
npm run build  # Successfully built
git commit -m "fix: Use direct src attribute instead of source media queries"
git push origin main  # Deployed to GitHub
```

## Testing Checklist
- [ ] Desktop browser (Chrome/Safari/Firefox) - Video displays correctly
- [ ] Mobile browser (iOS Safari/Chrome) - Video displays correctly
- [ ] Tablet (iPad) - Video displays correctly
- [ ] Resize window from mobile→desktop - Video switches correctly
- [ ] Reduced motion preference - Falls back to poster image
- [ ] Video error handling - Falls back to poster image gracefully

## Related Issues
- Original issue: HANDOFF-TO-LOVABLE.md
- Video verification: Videos confirmed to contain lighthouse by user inspection
- Mobile working correctly, desktop was broken

## Commit
- Commit: `9b711df`
- Message: "fix: Use direct src attribute instead of source media queries for video selection"
- Date: 2025-10-17
