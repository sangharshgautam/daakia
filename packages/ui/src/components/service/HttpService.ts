import axios from "axios";

export class HttpService {
  execute(config: any) {
    return axios.request(config);
  }
}
