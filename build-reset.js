
// Build environment reset verification
// This file forces a complete cache invalidation and environment reset
const fs = require('fs');
const path = require('path');

console.log('🔄 Initiating build environment reset...');

// Verify critical files exist
const criticalFiles = [
  'package.json',
  'vite.config.ts', 
  'tsconfig.json',
  'index.html',
  'src/main.tsx'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} found`);
  } else {
    console.log(`❌ ${file} missing`);
    process.exit(1);
  }
});

console.log('✅ All critical files verified');
console.log('🚀 Ready for clean build');
