"use server";

import { z } from "zod";
import { actionClient } from ".";
import { redirect } from "next/navigation";

const RepositoryInputSchema = z
  .string()
  .trim()
  .min(3, "Repository input must be at least 3 characters")
  .transform((val) => {
    const trimmedValue = val.trim().toLowerCase();
    return trimmedValue;
  })
  .transform((val) => {
    try {
      const url = new URL(val);

      if (url.hostname.includes("github.com")) {
        const pathSegments = url.pathname.split("/").filter(Boolean);
        if (pathSegments.length === 2) {
          return { owner: pathSegments[0], repo: pathSegments[1] };
        }
      }
    } catch {}

    const parts = val.split("/").filter(Boolean);
    if (parts.length === 2) {
      return { owner: parts[0], repo: parts[1] };
    }

    return val;
  })
  .refine(
    (val) => {
      return typeof val === "object" &&
        val !== null &&
        "owner" in val &&
        typeof val.owner === "string" &&
        "repo" in val &&
        typeof val.repo === "string"
        ? true
        : false;
    },
    {
      message:
        "Invalid repository format. Please use 'owner/repo' or a valid GitHub URL.",
    },
  )
  .transform((val) => {
    return val as { owner: string; repo: string };
  });

export const validateRepositoryInput = actionClient
  .schema(z.object({ input: RepositoryInputSchema }))
  .metadata({
    actionName: "validateRepositoryInput",
  })
  .action(async ({ parsedInput }) => {
    const {
      input: { owner, repo },
    } = parsedInput;

    //TODO: Validate {owner}/{repo} exists

    redirect(`/${owner}/${repo}`);
  });
