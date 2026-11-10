/**
 * Media utility for KV STUDIO.
 * Serves direct, reliable media URLs without failing Cloudinary transformation errors (400 Bad Request).
 */

export interface VideoOptimizationOptions {
  width?: number;
  quality?: "auto" | "good" | "eco" | "best";
  crop?: string;
}

/**
 * Returns clean, direct video URLs.
 * Keeps original Cloudinary CDN URLs intact to avoid 400 Bad Request on accounts
 * where dynamic video transformation / transcoding is restricted or disabled.
 */
export function getOptimizedVideoUrl(
  url: string | undefined,
  _options: VideoOptimizationOptions = {}
): string {
  if (!url) return "";
  // Strip any broken transformations if they were previously injected
  if (url.includes("/video/upload/") && !url.includes("/video/upload/v")) {
    return url.replace(/\/video\/upload\/[^/]+\/v/, "/video/upload/v");
  }
  return url;
}

/**
 * Safe poster URL resolver.
 * Avoids generating dynamic on-the-fly Cloudinary transformations that can trigger 400 errors.
 */
export function getVideoPosterUrl(
  _url: string | undefined,
  _width = 1280
): string | undefined {
  return undefined;
}

