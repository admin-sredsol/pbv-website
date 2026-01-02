/**
 * Utility to generate breadcrumbs from a pathname.
 * Optionally maps certain segments to friendly display names.
 *
 * Usage:
 *   import { getBreadcrumbs } from "../utils/getBreadcrumbs";
 *   const breadcrumbs = getBreadcrumbs(Astro.url.pathname);
 */

interface Crumb {
  name: string;
  href?: string;
}

/**
 * Maps a URL segment to a user-friendly display name.
 * Extend this function as needed for your routes.
 */
function mapSegmentToName(segment: string): string {
  const mapping: Record<string, string> = {
    gallery: "Photo Albums",
    videoalbums: "Video Albums",
    blog: "Blog",
    team: "Our Team",
    "style-guide": "Style Guide",
    "theme-info": "Theme Info",
  };
  return (
    mapping[segment] ||
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

/**
 * Generates an array of breadcrumb objects from a pathname.
 * The last crumb is not a link.
 *
 * @param pathname - The URL pathname (e.g., "/gallery/ILS")
 * @returns Array of { name, href? }
 */
export function getBreadcrumbs(pathname: string): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [];
  let href = "";
  for (let i = 0; i < segments.length; i++) {
    href += "/" + segments[i];
    crumbs.push({
      name: mapSegmentToName(segments[i]),
      href: i < segments.length - 1 ? href : undefined,
    });
  }
  // Always add Home at the start
  return [{ name: "Home", href: "/" }, ...crumbs];
}
