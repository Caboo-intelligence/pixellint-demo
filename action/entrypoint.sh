#!/bin/bash
set -e

# GitHub Action entrypoint for PixelLint
# Usage: entrypoint.sh <pattern> <threshold> <fail-on-issues>

PATTERN="${1:-screenshots/**/*.png}"
THRESHOLD="${2:-0.7}"
FAIL_ON_ISSUES="${3:-true}"
OUTPUT_FORMAT="${4:-json}"

echo "🔍 PixelLint Design Precision Check"
echo "=================================="
echo "Pattern: $PATTERN"
echo "Threshold: $THRESHOLD"
echo "Fail on issues: $FAIL_ON_ISSUES"
echo "Output format: $OUTPUT_FORMAT"
echo ""

# Run PixelLint analysis
echo "Running analysis..."
pixellint analyze "$PATTERN" --threshold "$THRESHOLD" --output "$OUTPUT_FORMAT" > results.json

# Extract results
SCORE=$(cat results.json | jq -r '.summary.averageScore // 0')
TOTAL_FILES=$(cat results.json | jq -r '.summary.totalFiles // 0')
PASSED_FILES=$(cat results.json | jq -r '.summary.passedFiles // 0')
FAILED_FILES=$(cat results.json | jq -r '.summary.failedFiles // 0')

# Determine grade
if (( $(echo "$SCORE >= 0.97" | bc -l) )); then
    GRADE="A+"
elif (( $(echo "$SCORE >= 0.90" | bc -l) )); then
    GRADE="A"
elif (( $(echo "$SCORE >= 0.80" | bc -l) )); then
    GRADE="B"
elif (( $(echo "$SCORE >= 0.70" | bc -l) )); then
    GRADE="C"
else
    GRADE="F"
fi

# Output summary
echo ""
echo "📊 Results Summary"
echo "=================="
echo "Overall Score: $GRADE ($(echo "$SCORE * 100" | bc -l | xargs printf "%.1f")%)"
echo "Files Analyzed: $TOTAL_FILES"
echo "Files Passed: $PASSED_FILES"
echo "Files Failed: $FAILED_FILES"

# Set outputs for GitHub Actions
echo "score=$SCORE" >> $GITHUB_OUTPUT
echo "grade=$GRADE" >> $GITHUB_OUTPUT
echo "total-files=$TOTAL_FILES" >> $GITHUB_OUTPUT
echo "passed-files=$PASSED_FILES" >> $GITHUB_OUTPUT
echo "failed-files=$FAILED_FILES" >> $GITHUB_OUTPUT

# Generate detailed report if failures exist
if [ "$FAILED_FILES" -gt 0 ]; then
    echo ""
    echo "❌ Failed Files:"
    echo "================"
    cat results.json | jq -r '.files[] | select(.score < '$THRESHOLD') | "  - \(.path): \(.score)"'
fi

# Exit with appropriate code
if [ "$FAIL_ON_ISSUES" = "true" ] && (( $(echo "$SCORE < $THRESHOLD" | bc -l) )); then
    echo ""
    echo "❌ Design precision check failed. Score ($SCORE) is below threshold ($THRESHOLD)"
    exit 1
else
    echo ""
    echo "✅ Design precision check passed!"
    exit 0
fi