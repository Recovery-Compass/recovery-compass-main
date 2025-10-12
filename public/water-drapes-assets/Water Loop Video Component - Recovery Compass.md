# Water Loop Video Component - Recovery Compass

This package contains everything you need to embed a seamless water loop video in your Lovable project.

## Files Included

1. **VideoHero.tsx** - React component with Base64 placeholders
2. **VideoHero.css** - Styling for the hero section
3. **water-loop.b64** - Base64-encoded video (4.7 MB → 6.3 MB encoded)
4. **water-poster.b64** - Base64-encoded poster image (85 KB → 113 KB encoded)
5. **water-loop-720p.mp4** - Original video file (for reference/testing)
6. **water-poster-final.jpg** - Original poster image (for reference/testing)
7. **validate.html** - Local validation page

## Video Specifications

- **Resolution**: 1280×720 (720p)
- **Duration**: 10 seconds
- **Frame Rate**: 24 fps
- **Codec**: H.264 (libx264)
- **File Size**: 4.7 MB (well under 8 MB limit)
- **Audio**: None (stripped for autoplay compatibility)

## Poster Image Specifications

- **Resolution**: 1280×720
- **Format**: JPEG
- **File Size**: 85 KB (under 100 KB target)
- **Quality**: Optimized for web

## Installation Instructions

### Step 1: Copy the Base64 Payloads

Open the Base64 files and copy their contents (they are single-line, no newlines):

```bash
# The files are already formatted as single-line strings
cat water-poster.b64  # Copy this entire line
cat water-loop.b64    # Copy this entire line
```

### Step 2: Update the Component

1. Open `VideoHero.tsx`
2. Find these two lines:
   ```typescript
   const POSTER_B64 = "PASTE_POSTER_BASE64_HERE";
   const MP4_B64 = "PASTE_MP4_BASE64_HERE";
   ```
3. Replace `PASTE_POSTER_BASE64_HERE` with the contents of `water-poster.b64`
4. Replace `PASTE_MP4_BASE64_HERE` with the contents of `water-loop.b64`

**Important**: 
- Keep the double quotes
- Paste as a single line (no line breaks)
- Do not add spaces or newlines

### Step 3: Add to Your Lovable Project

1. Create a new file: `components/VideoHero.tsx`
2. Paste the updated component code
3. Create a new file: `styles/VideoHero.css` (or add to your existing CSS)
4. Paste the CSS code

### Step 4: Use the Component

Import and use in your page:

```typescript
import VideoHero from './components/VideoHero';

function HomePage() {
  return (
    <div>
      <VideoHero />
      {/* Rest of your content */}
    </div>
  );
}
```

## Local Validation

Before deploying, you can test the video locally:

1. Open `validate.html` in a web browser
2. The video should autoplay and loop seamlessly
3. Check the status display for video metadata

## Features

✅ **Deterministic**: No external CDN dependencies, no CORS issues
✅ **Accessible**: Respects `prefers-reduced-motion` setting
✅ **Performant**: Poster image paints instantly, video loads progressively
✅ **Mobile-friendly**: Autoplay works on mobile (muted + playsInline)
✅ **Seamless loop**: 10-second continuous water motion
✅ **Optimized**: Under 8 MB total, fast loading

## Troubleshooting

### Video doesn't autoplay
- Ensure the video is muted (`muted` attribute is set)
- Check that `playsInline` is set for mobile devices
- Some browsers block autoplay until user interaction

### File size too large for your editor
- The Base64 strings are large but valid
- If your editor lags, try a different editor or split into chunks
- Consider hosting the video externally if Base64 is problematic

### Loop isn't seamless
- The current video should loop smoothly
- If you see a jump, you may need to apply a crossfade in ffmpeg
- See the original instructions for xfade filter usage

## Source Attribution

Video sourced from Pexels (royalty-free, free to use)
- License: Pexels License (free for personal and commercial use)
- No attribution required, but appreciated

## Technical Notes

- Base64 encoding increases file size by ~33%
- Original video: 4.7 MB → Base64: 6.3 MB
- Original poster: 85 KB → Base64: 113 KB
- Total embedded size: ~6.4 MB
- The video uses H.264 codec for maximum browser compatibility
- No audio track (removed for autoplay policies and size reduction)

## Next Steps

1. ✅ Copy Base64 strings into component
2. ✅ Add component and CSS to your project
3. ✅ Import and use VideoHero in your page
4. ✅ Test locally
5. ✅ Deploy to Lovable

---

Created with ffmpeg and optimized for web embedding.
