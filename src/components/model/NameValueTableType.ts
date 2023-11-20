import { RestHeader } from "./RestHeader";
import { RestParameter } from "./RestParameter";

export type NameValueTableType = {
  title: string;
  rows: RestHeader[] | RestParameter[];
  readonly: boolean;
};
