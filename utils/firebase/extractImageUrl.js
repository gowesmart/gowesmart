export default function extractImageUrl(url) {
  const start = url.lastIndexOf("%2F") + 3;

  const end = url.indexOf("?");

  const filename = url.substring(start, end);

  return decodeURIComponent(filename);
}
