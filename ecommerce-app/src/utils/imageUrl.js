export function optimizeImageUrl(url, width = 400) {
  if (!url?.includes("unsplash.com")) {
    return url;
  }

  const base = url.split("?")[0];
  return `${base}?w=${width}&q=75&auto=format&fit=crop`;
}
