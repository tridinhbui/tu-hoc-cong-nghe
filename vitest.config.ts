import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    // e2e/ holds Playwright specs (npm run test:e2e), not vitest tests -
    // without this, vitest's default glob also matches *.spec.ts there and
    // fails trying to run Playwright's `test` as if it were vitest's.
    // .claude/worktrees/ holds git worktrees a subagent may have left behind.
    // They are git-ignored, but vitest's glob still walks them and runs a stale
    // copy of the suite against a half-populated tree - six test files failed
    // there while the real repo was green, which is the worst kind of red.
    exclude: ["**/node_modules/**", "**/e2e/**", "**/.claude/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "server-only": path.resolve(__dirname, "lib/__tests__/__mocks__/server-only.ts"),
    },
  },
});
