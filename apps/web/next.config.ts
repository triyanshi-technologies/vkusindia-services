import type { NextConfig } from "next";

/**
 * GitHub Pages build: a fully static export (no server, no proxy, no image optimizer).
 * The site is served from a sub-path (e.g. /vkusindia-services), which the deploy
 * workflow passes in as PAGES_BASE_PATH. Locally it is empty, so `out/` works at "/".
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Every page becomes a folder with index.html, which GitHub Pages serves at "/path/".
  trailingSlash: true,
  // Cache Components (partial prerendering) needs a server, so it is off for the export.
  // "use cache" still works: here it just runs once at build time. Next logs that
  // useCache is deprecated in favour of cacheComponents; that option can't be used here.
  experimental: {
    useCache: true,
  },
  images: {
    // Sanity photos are resized by Sanity's image CDN; see the loader file.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
