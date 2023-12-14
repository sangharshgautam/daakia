import { RestHeader } from "./RestHeader";
export type RestResponse = {
  status: number;
  statusText: string;
  body?: string;
  time?: number;
  size?: string;
  headers?: RestHeader[];
};
