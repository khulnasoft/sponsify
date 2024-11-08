import type { TypedFlatConfigItem } from "../types";

import { GLOB_SRC, GLOB_SRC_EXT } from "../globs";

export async function disables(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      files: [`**/scripts/${GLOB_SRC}`],
      name: "khulnasoft/disables/scripts",
      rules: {
        "khulnasoft/no-top-level-await": "off",
        "no-console": "off",
        "ts/explicit-function-return-type": "off",
      },
    },
    {
      files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      name: "khulnasoft/disables/cli",
      rules: {
        "khulnasoft/no-top-level-await": "off",
        "no-console": "off",
      },
    },
    {
      files: ["**/bin/**/*", `**/bin.${GLOB_SRC_EXT}`],
      name: "khulnasoft/disables/bin",
      rules: {
        "khulnasoft/no-import-dist": "off",
        "khulnasoft/no-import-node-modules-by-path": "off",
      },
    },
    {
      files: ["**/*.d.?([cm])ts"],
      name: "khulnasoft/disables/dts",
      rules: {
        "eslint-comments/no-unlimited-disable": "off",
        "import/no-duplicates": "off",
        "no-restricted-syntax": "off",
        "unused-imports/no-unused-vars": "off",
      },
    },
    {
      files: ["**/*.js", "**/*.cjs"],
      name: "khulnasoft/disables/cjs",
      rules: {
        "ts/no-require-imports": "off",
      },
    },
    {
      files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
      name: "khulnasoft/disables/config-files",
      rules: {
        "khulnasoft/no-top-level-await": "off",
        "no-console": "off",
        "ts/explicit-function-return-type": "off",
      },
    },
  ];
}
