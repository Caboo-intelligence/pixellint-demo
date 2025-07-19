const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Helper to save canvas as PNG
function saveCanvas(canvas, filepath) {
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filepath, buffer);
  console.log(`Created: ${filepath}`);
}

// Generate golden sample - perfect 8px grid alignment
function generateGoldenButton() {
  const canvas = createCanvas(320, 80);
  const ctx = canvas.getContext('2d');
  
  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 320, 80);
  
  // Perfect 8px grid aligned button
  ctx.fillStyle = '#3B82F6';
  ctx.fillRect(16, 16, 160, 48); // All multiples of 8
  
  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Perfect Button', 96, 40);
  
  saveCanvas(canvas, 'screenshots/golden/button-primary.png');
}

// Generate golden card layout
function generateGoldenCard() {
  const canvas = createCanvas(320, 240);
  const ctx = canvas.getContext('2d');
  
  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 320, 240);
  
  // Card with perfect 8px padding
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(16, 16, 288, 208);
  
  // Header
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(16, 16, 288, 48);
  
  // Content area with 8px spacing
  ctx.fillStyle = '#e5e7eb';
  ctx.fillRect(32, 80, 256, 64);
  ctx.fillRect(32, 152, 256, 56);
  
  saveCanvas(canvas, 'screenshots/golden/card-layout.png');
}

// Generate warning sample - slight misalignment
function generateWarningButton() {
  const canvas = createCanvas(320, 80);
  const ctx = canvas.getContext('2d');
  
  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 320, 80);
  
  // Button with 2px misalignment
  ctx.fillStyle = '#EF4444';
  ctx.fillRect(18, 17, 158, 47); // Not aligned to 8px grid
  
  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Misaligned', 97, 40);
  
  saveCanvas(canvas, 'screenshots/warning/button-misaligned.png');
}

// Generate failure sample - completely broken
function generateFailureLayout() {
  const canvas = createCanvas(320, 240);
  const ctx = canvas.getContext('2d');
  
  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 320, 240);
  
  // Random misaligned elements
  ctx.fillStyle = '#6B7280';
  ctx.fillRect(13, 21, 147, 43);
  ctx.fillRect(171, 19, 133, 51);
  ctx.fillRect(17, 83, 289, 37);
  ctx.fillRect(23, 131, 271, 29);
  ctx.fillRect(11, 171, 293, 41);
  
  // Poor contrast text
  ctx.fillStyle = '#E5E7EB';
  ctx.font = '14px Arial';
  ctx.fillText('Poor contrast', 50, 100);
  
  saveCanvas(canvas, 'screenshots/failure/broken-layout.png');
}

// Generate all samples
function generateAllSamples() {
  // Ensure directories exist
  ['golden', 'warning', 'failure'].forEach(dir => {
    const dirPath = path.join('screenshots', dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
  
  console.log('Generating sample screenshots...\n');
  
  // Golden samples
  generateGoldenButton();
  generateGoldenCard();
  
  // Warning samples
  generateWarningButton();
  
  // Failure samples
  generateFailureLayout();
  
  console.log('\n✅ Sample screenshots generated!');
}

// Check if canvas is available
try {
  generateAllSamples();
} catch (error) {
  console.error('Error generating samples:', error);
  console.log('\nNote: This script requires the "canvas" package.');
  console.log('Install it with: npm install canvas');
}