import { TypesenseClient } from "./client";

const typesenseClientSingleton = () => {
  return new TypesenseClient();
};

declare const globalThis: {
  typesenseGlobal: ReturnType<typeof typesenseClientSingleton>;
} & typeof global;

const typesense = globalThis.typesenseGlobal ?? typesenseClientSingleton();

export default typesense;

if (process.env.NODE_ENV !== "production")
  globalThis.typesenseGlobal = typesense;
