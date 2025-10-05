import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      import: importPlugin,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Hard block parent-relative imports across layers/slices
      "import/no-relative-parent-imports": "error",

      // Enforce public API usage: allow only layer public entry points
      // This denies deep internal imports that bypass index.ts
      "import/no-internal-modules": [
        "error",
        {
          allow: [
            "app/*",
            "pages/*",
            "features/*",
            "entities/*",
            // Allow well-known external internals needed by tooling/runtime
            "react-dom/*",
          ],
        },
      ],
    },
  },
  {
    // Forbid absolute and relative same-layer imports inside each layer (enforce public API via upper layers only)
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "app/*"],
              message:
                "Modules cannot import other modules of the same or upper level.",
            },
          ],
        },
      ],
    },
  },
  {
    // Forbid absolute and relative same-layer imports inside each layer (enforce public API via upper layers only)
    files: ["src/entities/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "entities/*"],
              message:
                "Modules cannot import other modules of the same or upper level.",
            },
          ],
        },
      ],
    },
  },
  {
    // Forbid absolute and relative same-layer imports inside each layer (enforce public API via upper layers only)
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "features/*"],
              message:
                "Modules cannot import other modules of the same or upper level.",
            },
          ],
        },
      ],
    },
  },
  {
    // Forbid absolute and relative same-layer imports inside each layer (enforce public API via upper layers only)
    files: ["src/pages/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "pages/*"],
              message:
                "Modules cannot import other modules of the same or upper level.",
            },
          ],
        },
      ],
    },
  },
  {
    // Forbid absolute and relative same-layer imports inside each layer (enforce public API via upper layers only)
    files: ["src/widgets/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "widgets/*"],
              message:
                "Modules cannot import other modules of the same or upper level.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.test.*"],
    rules: {
      // Allow deep imports in tests/stories
      "import/no-internal-modules": "off",
    },
  },
]);
