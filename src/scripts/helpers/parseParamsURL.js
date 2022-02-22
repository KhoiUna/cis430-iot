export default function parseParamsURL({ param }) {
  const url = new URL(location);
  return url.searchParams.get(param);
}
