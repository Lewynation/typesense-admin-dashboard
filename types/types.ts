export type TypesenseServer = {
  id: string;
  name: string;
  protocol?: "http" | "https";
  host: string;
  port?: number;
  path?: string;
  apiKey: string;
};

export type GetResourceByServerIdProps = {
  serverId: string;
};
