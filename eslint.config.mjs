import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "apps/**",
    "packages/**",
    // Agent worktrees. `.claude/worktrees/<name>/` is a full second checkout
    // of this repo, so linting it reported every finding twice - once in
    // `components/X.tsx` and again in `.claude/worktrees/lobby/components/X.tsx` -
    // and its `.next/` added 1,593 errors from bundled vendor code
    // (`require()` imports, `this` aliasing, minified `module` assignment).
    // Together that made `npm run lint` exit non-zero with 32,021 problems,
    // which is why it was never wired into CI, and why 107 real errors in
    // this repo's own source sat invisible underneath.
    ".claude/**",
    // Same anchoring bug for any other nested build output: the patterns
    // above are relative to the repo root and never matched a subdirectory.
    "**/.next/**",
    "**/out/**",
  ]),
]);

export default eslintConfig;
