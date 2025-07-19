# Screenshot Samples

This directory contains sample screenshots for demonstrating PixelLint's capabilities.

## Directory Structure

- `golden/` - Perfect examples (Score: A+)
- `warning/` - Minor issues (Score: B-)  
- `failure/` - Major issues (Score: F)

## Adding Screenshots

When adding real screenshots:

1. Golden samples should:
   - Be perfectly aligned to 8px grid
   - Have consistent spacing
   - Meet WCAG contrast requirements
   - Show clear visual hierarchy

2. Warning samples should have minor issues like:
   - 1-2px misalignment
   - Slightly inconsistent spacing
   - Minor contrast issues

3. Failure samples should demonstrate:
   - Random alignment
   - No consistent spacing
   - Poor contrast
   - Broken layouts

## File Naming Convention

Use descriptive names:
- `component-state.png` (e.g., `button-hover.png`)
- `layout-description.png` (e.g., `card-grid.png`)
- `page-section.png` (e.g., `dashboard-header.png`)