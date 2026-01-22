import Configuration from "typesense/lib/Typesense/Configuration";

export const getTypesenseUrl = ({ nodes }: Configuration): string => {
  const config = nodes[0];

  if ("url" in config) {
    if ("host" in config) {
      if (config.url) {
        return config.url;
      }
    } else {
      return config.url;
    }
  }
  const { protocol, host, port, path } = config;
  const base = `${protocol}://${host}:${port}`;
  return path ? `${base}${path.startsWith("/") ? "" : "/"}${path}` : base;
};
