/**
 * Extracts the hostname from a URL string (similar to window.location.host).
 * @param url - The URL string to parse
 * @returns The hostname (e.g., "aserputko.com" from "http://aserputko.com/bookmarks/all")
 */
export const getHostnameFromURL = (url: string): string => {
  try {
    // Add protocol if missing to make URL parsing work
    const urlWithProtocol = url.includes('://') ? url : `https://${url}`;
    const urlObj = new URL(urlWithProtocol);
    return urlObj.hostname;
  } catch {
    // Fallback: return original URL if parsing fails
    return url;
  }
};
