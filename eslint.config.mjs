import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.FlatConfig[]} */
const eslintConfig = [
  // Базовые плагины от Next.js (по желанию)
  ...compat.extends(),

  // Включаем только базовую среду
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
    },
    rules: {
      // Выключаем большинство проверок
      "no-unused-vars": "off",
      "no-console": "off",
      "no-debugger": "off",
      "no-undef": "off",
      "no-empty": "off",
    },
  },
];

export default eslintConfig;
