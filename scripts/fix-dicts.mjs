import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.cwd(), "lib/i18n/translations.ts");
let src = fs.readFileSync(target, "utf-8");

// For each of ar, hi, he: need to close `pricing:` BEFORE `testimonials:`
// Pattern: in each dict, find the line `    testimonials: {` that follows the `    },` that closes `plans: {`
// After `    },  (closing plans)
// Change the NEXT line `    testimonials: {` needs to be preceded by closing pricing first.

// The problem: testimonials, faq, finalCta, footer, langSwitcher
// are nested inside pricing because `};` never appears before them

// Fix approach: for each dict, change:
//   agency: {...},
//   },
//   testimonials: {
// to:
//   agency: {...},
//   },
//   },
//   testimonials: {

// Actually let me look: the closing of `plans: {` ends with `},` then directly followed by `  testimonials: {`
// We need to insert `  },` (close pricing) before `  testimonials: {`

// Let me use a specific regex approach:
// Find: `    agency: {...},\n    },\n    testimonials: {`
// And change to: `    agency: {...},\n    },\n  },\n  testimonials: {`

// But the content has specific text. Let me try a more targeted approach.

// For each of the three broken dicts (ar, hi, he):
// Insert `  },\n` before `  testimonials:`

// Actually looking at the file structure, in the correctly-inserted text:
// The indentation matters. In the `he` dict text I see `    },` closes `plans: {` 
// Then `    testimonials: {` - which is at the same indent as `    plans: {`
// We need to close `pricing:` first before `  testimonials: {`

// Let me use a smarter approach. Find the block between the `    testimonials:` that
// inside the problematic dicts and insert a closing brace.

const fixes = [
  // he
  { after: `    },\n    testimonials: {`, replacement: `    },\n  },\n  testimonials: {` },
];

// Do a global replace but only within these three dicts

// Actually easier: find `    },` followed by `    testimonials:` (with various possibilities)
// and insert `  },` (closing of pricing) before testimonials.

// Do multiple passes. Each pass targets the first occurrence after each of ar/hi/he boundaries.

// Actually the simplest: find `    },\n    testimonials: {` and replace it with `    },\n  },\n  testimonials: {`
// BUT only for those 3 dicts. Let me do a targeted find.

// Find each const ar:, then look for first `    testimonials:` within it.
// Let me locate `agency:` start positions first.

// Simple fix: replace all occurrences of `\n    },\n    testimonials: {\n` (inside the three)

// Actually let me just replace the pattern:
// The three dicts have the closing of plans with `    },` immediately followed by `    testimonials: {`
// While correct dicts have: `  },\n  testimonials: {` (note the `} ` level)

// Let me replace in the file: `    },\n    testimonials: {\n` -> `    },\n  },\n  testimonials: {\n`

// Do this 3 times (once per dict):
for (let i = 0; i < 3; i++) {
  src = src.replace(/\n    },\n    testimonials: {\n/, '\n    },\n  },\n  testimonials: {\n');
}

fs.writeFileSync(target, src, 'utf-8');
console.log('✅ testimonials moved out of pricing (3 occurrences)');
