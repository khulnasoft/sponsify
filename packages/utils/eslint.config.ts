import repo from "@khulnasoft/eslint-config";

export default repo({
  typescript: {
    overrides: {
      "ts/ban-ts-comment": "off",
      "ts/prefer-ts-expect-error": "off",
    },
  },
});
