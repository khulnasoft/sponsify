import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";

const entries = ["src/index.ts"];

const plugins = [
  alias({
    entries: [{ find: /^node:(.+)$/, replacement: "$1" }],
  }),
  resolve({
    preferBuiltins: true,
  }),
  json(),
  commonjs(),
  esbuild({
    target: "node14",
  }),
];

export default [
  // JavaScript/TypeScript Builds
  ...entries.map((input) => ({
    input,
    output: [
      {
        file: input.replace("src/", "dist/").replace(".ts", ".mjs"),
        format: "esm",
        sourcemap: true,
      },
      {
        file: input.replace("src/", "dist/").replace(".ts", ".cjs"),
        format: "cjs",
        sourcemap: true,
      },
    ],
    external: ["@khulnasoft/sponsify-utils"],
    plugins,
    onwarn: (warning, warn) => {
      // Skip the inlining warning if it's for @khulnasoft/sponsify-utils
      if (
        warning.code === "UNRESOLVED_IMPORT" &&
        warning.source === "@khulnasoft/sponsify-utils"
      )
        return;
      warn(warning);
    },
  })),

  // TypeScript Declaration Files
  ...entries.map((input) => ({
    input,
    output: [
      {
        file: input.replace("src/", "dist/").replace(".ts", ".d.mts"),
        format: "esm",
      },
      {
        file: input.replace("src/", "dist/").replace(".ts", ".d.cts"),
        format: "cjs",
      },
    ],
    external: ["@khulnasoft/sponsify-utils"],
    plugins: [
      dts({
        respectExternal: true,
      }),
    ],
  })),
];
