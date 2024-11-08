import type { OptionsStylistic, TypedFlatConfigItem } from "../types";

import { pluginKhulnasoft, pluginImport } from "../plugins";

export async function imports(
  options: OptionsStylistic = {},
): Promise<TypedFlatConfigItem[]> {
  const { stylistic = true } = options;

  return [
    {
      name: "khulnasoft/imports/rules",
      plugins: {
        khulnasoft: pluginKhulnasoft,
        import: pluginImport,
      },
      rules: {
        "khulnasoft/import-dedupe": "error",
        "khulnasoft/no-import-dist": "error",
        "khulnasoft/no-import-node-modules-by-path": "error",

        "import/first": "error",
        "import/no-duplicates": "error",
        "import/no-mutable-exports": "error",
        "import/no-named-default": "error",
        "import/no-self-import": "error",
        "import/no-webpack-loader-syntax": "error",

        ...(stylistic
          ? {
              "import/newline-after-import": ["error", { count: 1 }],
            }
          : {}),
      },
    },
  ];
}
