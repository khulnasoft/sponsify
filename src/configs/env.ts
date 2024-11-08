import process from "node:process";
import dotenv from "dotenv";
import type { GitHubAccountType, SponsifyConfig } from "../types";

function getDeprecatedEnv(name: string, replacement: string) {
  const value = process.env[name];
  if (value)
    console.warn(
      `[sponsify] env.${name} is deprecated, use env.${replacement} instead`,
    );
  return value;
}

export function loadEnv(): Partial<SponsifyConfig> {
  dotenv.config();

  const config: Partial<SponsifyConfig> = {
    github: {
      login:
        process.env.SPONSIFY_GITHUB_LOGIN ||
        process.env.GITHUB_LOGIN ||
        getDeprecatedEnv("SPONSIFY_LOGIN", "SPONSIFY_GITHUB_LOGIN"),
      token:
        process.env.SPONSIFY_GITHUB_TOKEN ||
        process.env.GITHUB_TOKEN ||
        getDeprecatedEnv("SPONSIFY_TOKEN", "SPONSIFY_GITHUB_TOKEN"),
      type: (process.env.SPONSIFY_GITHUB_TYPE || process.env.GITHUB_TYPE) as
        | GitHubAccountType
        | undefined,
    },
    patreon: {
      token: process.env.SPONSIFY_PATREON_TOKEN || process.env.PATREON_TOKEN,
    },
    opencollective: {
      key:
        process.env.SPONSIFY_OPENCOLLECTIVE_KEY ||
        process.env.OPENCOLLECTIVE_KEY,
      id:
        process.env.SPONSIFY_OPENCOLLECTIVE_ID || process.env.OPENCOLLECTIVE_ID,
      slug:
        process.env.SPONSIFY_OPENCOLLECTIVE_SLUG ||
        process.env.OPENCOLLECTIVE_SLUG,
      githubHandle:
        process.env.SPONSIFY_OPENCOLLECTIVE_GH_HANDLE ||
        process.env.OPENCOLLECTIVE_GH_HANDLE,
      type:
        process.env.SPONSIFY_OPENCOLLECTIVE_TYPE ||
        process.env.OPENCOLLECTIVE_TYPE,
    },
    afdian: {
      userId: process.env.SPONSIFY_AFDIAN_USER_ID || process.env.AFDIAN_USER_ID,
      token: process.env.SPONSIFY_AFDIAN_TOKEN || process.env.AFDIAN_TOKEN,
      exechangeRate:
        Number.parseFloat(
          process.env.SPONSIFY_AFDIAN_EXECHANGERATE ||
            process.env.AFDIAN_EXECHANGERATE ||
            "0",
        ) || undefined,
    },
    polar: {
      token: process.env.SPONSIFY_POLAR_TOKEN || process.env.POLAR_TOKEN,
      organization:
        process.env.SPONSIFY_POLAR_ORGANIZATION ||
        process.env.POLAR_ORGANIZATION,
    },
    outputDir: process.env.SPONSIFY_DIR,
  };

  // remove undefined keys
  return JSON.parse(JSON.stringify(config));
}
