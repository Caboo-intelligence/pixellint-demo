# PixelLint Demo

[![PixelLint Score](https://img.shields.io/badge/PixelLint-A+-brightgreen.svg)](https://github.com/caboo/pixellint)

> Demo repository showcasing PixelLint - the pixel-perfect design linting tool for CI/CD pipelines

This repository demonstrates how to use PixelLint to automatically check design precision in your screenshots during CI builds.

## 🎯 What is PixelLint?

PixelLint analyzes UI screenshots for:
- **8px grid alignment** - Ensures elements snap to consistent spacing
- **Visual hierarchy** - Validates proper contrast and emphasis
- **Spacing consistency** - Detects irregular gaps and margins
- **Design precision** - Catches pixel-level imperfections

## 📸 Sample Screenshots

This demo includes three categories of screenshots:

### ✅ Golden (Score: A+)
Perfect examples following all design principles:
- `screenshots/golden/button-primary.png` - Perfectly aligned button component
- `screenshots/golden/card-layout.png` - Precise card with 8px grid spacing
- `screenshots/golden/form-input.png` - Well-structured form with consistent spacing

### ⚠️ Warning (Score: B-)
Good but with minor issues:
- `screenshots/warning/button-misaligned.png` - Button with 2px alignment offset
- `screenshots/warning/card-spacing.png` - Card with inconsistent padding
- `screenshots/warning/form-contrast.png` - Form with suboptimal contrast ratios

### ❌ Failure (Score: F)
Examples of poor design precision:
- `screenshots/failure/broken-layout.png` - Completely misaligned layout
- `screenshots/failure/random-spacing.png` - Random spacing throughout
- `screenshots/failure/poor-hierarchy.png` - No clear visual hierarchy

## 🚀 Quick Start

### Install PixelLint CLI

```bash
npm install -g pixellint
# or
yarn global add pixellint
```

### Run Analysis

```bash
# Analyze all screenshots
pixellint analyze "screenshots/**/*.png"

# Set custom threshold (default: 0.7)
pixellint analyze "screenshots/**/*.png" --threshold 0.8

# Generate HTML report
pixellint analyze "screenshots/**/*.png" --report html
```

### Example Output

```
screenshots/golden/button-primary.png
─────────────────────────────────────
Precision Score: A+ (0.98)

Metrics:
  Alignment:    ██████████ 100.0%
  Spacing:      █████████░ 94.0%
  Consistency:  ██████████ 99.0%
  Hierarchy:    ██████████ 98.0%
  Contrast:     ██████████ 100.0%

✅ No issues found
```

## 🤖 GitHub Action

Add PixelLint to your CI pipeline:

```yaml
name: Design Precision Check
on: [push, pull_request]

jobs:
  pixellint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run PixelLint
        uses: caboo/pixellint-action@v1
        with:
          pattern: 'screenshots/**/*.png'
          threshold: 0.7
          fail-on-issues: true
```

## 📊 Configuration

Create a `.pixellintrc.json` file to customize analysis:

```json
{
  "analyzer": {
    "grid_size": 8,
    "alignment_threshold": 2.0,
    "min_contrast_ratio": 4.5
  },
  "thresholds": {
    "precision": 0.8,
    "alignment": 0.9,
    "spacing": 0.85,
    "consistency": 0.9,
    "hierarchy": 0.8,
    "contrast": 0.95
  }
}
```

## 🔧 Local Development

```bash
# Clone this demo
git clone https://github.com/caboo/pixellint-demo
cd pixellint-demo

# Install dependencies
npm install

# Run analysis
npm run lint:design

# View results
npm run report
```

## 📈 CI Results

View our latest CI run results:
- [GitHub Actions](https://github.com/caboo/pixellint-demo/actions)
- [Design Precision Trends](https://pixellint.caboo.ai/demo/trends)

## 🏆 Badge

Add a PixelLint badge to your project:

```markdown
[![PixelLint Score](https://pixellint.caboo.ai/badge/A+.svg)](https://github.com/caboo/pixellint)
```

## 📚 Learn More

- [PixelLint Documentation](https://pixellint.caboo.ai)
- [CLI Reference](https://pixellint.caboo.ai/cli)
- [GitHub Action Guide](https://pixellint.caboo.ai/action)
- [Design Precision Best Practices](https://pixellint.caboo.ai/best-practices)

## 🤝 Contributing

Found an issue or want to contribute? Check out our [main repository](https://github.com/caboo/pixellint).

## 📄 License

MIT © Caboo AI

---

<p align="center">
  Built with ❤️ by the Caboo team
</p>