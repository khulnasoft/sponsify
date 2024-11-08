import repo from "@repo/eslint-config";

export default repo({
  typescript: {
    overrides: {
      "ts/ban-ts-comment": "off",
      "ts/prefer-ts-expect-error": "off",
    },
  },
});
