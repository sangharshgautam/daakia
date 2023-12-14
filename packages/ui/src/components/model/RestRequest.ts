import { RestHeader } from "./RestHeader";
import { RestParameter } from "./RestParameter";
import { RestResponse } from "./RestResponse";
export default interface RestRequest {
  key: string;
  name: string;
  method: string;
  url?: string;
  body?: string;
  open: boolean;
  selected: boolean;
  parameters: RestParameter[];
  response?: RestResponse;
  headers: RestHeader[];
}
