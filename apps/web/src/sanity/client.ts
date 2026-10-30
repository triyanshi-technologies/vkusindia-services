import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET. Add them to apps/web/.env.local (see .env.example).",
  );
}

/**
 * Read-only client for the public dataset. Results are cached by Next.js
 * ("use cache" in src/content), so the Sanity CDN is only hit on revalidation.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-02-19",
  useCdn: true,
  perspective: "published",
});

/** Cache tag on every Sanity fetch, so one webhook call can refresh all content. */
export const SANITY_CACHE_TAG = "sanity";
