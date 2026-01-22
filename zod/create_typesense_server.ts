import { z } from "zod";

export const CreateTypesenseServerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  protocol: z.enum(["http", "https"]).nullish(),
  host: z.string().nonempty("A host is required"),
  port: z.number().nullish(),
  path: z.string().nullish(),
  apiKey: z.string().nonempty("An API Key is required"),
});

export type CreateTypesenseServerFormFields = z.infer<
  typeof CreateTypesenseServerSchema
>;

export interface ITypesenseAuthData {
  apiKey: string;
  protocol: string;
  port: number;
  host: string;
  path: string;
}
