import @khulnasoft-bot from '@khulnasoft/eslint-config'

export default @khulnasoft-bot({
  typescript: {
    overrides: {
      'ts/ban-ts-comment': 'off',
      'ts/prefer-ts-expect-error': 'off',
    },
  },
})
