import "./Main.css";
import Rest from "./routes/rest/Rest";
import { HTTP_METHOD_GET, HTTP_METHOD_POST } from "./routes/rest/HttpConstants";
import { create } from "zustand";
import RestRequest from "./model/RestRequest";
import { DakiaStore } from "./model/DakiaStore";
import { uuid } from "uuidv4";

export const usePostmanStore = create<DakiaStore<RestRequest>>((set) => ({
  requests: [],
  add: (item: RestRequest) => {
    set((prevState) => ({
      requests: [...prevState.requests, item]
    }));
  },
  update: (item: RestRequest) => {
    set((prevState) => ({
      requests: prevState.requests.map((req) =>
        req.key === item.key ? { ...item } : { ...req }
      )
    }));
  },
  remove: (key: string) => {
    set((prevState) => ({
      requests: prevState.requests.filter((req) => req.key !== key)
    }));
  },
  selectByKey: (key: string) => {
    set((prevState) => ({
      requests: prevState.requests.map((req) =>
        req.key === key
          ? { ...req, selected: true }
          : { ...req, selected: false }
      )
    }));
  },
  selectByIndex: (index: number) => {
    console.log(" select at index: " + index);
    set((prevState) => ({
      requests: prevState.requests.map((req, i) =>
        i === index ? { ...req, selected: true } : { ...req, selected: false }
      )
    }));
  }
}));
usePostmanStore.setState((prevState) => ({
  requests: [
    {
      key: "1",
      name: "Request1",
      method: HTTP_METHOD_GET,
      url: "https://echo.hoppscotch.io",
      open: true,
      selected: true,
      parameters: [
        {
          name: "content-type",
          value: "application/json",
          enabled: true
        }
      ],
      headers: [],
      body: JSON.stringify({
        name: "content-type",
        value: "application/json",
        enabled: true
      })
    },
    {
      key: "2",
      name: "Request2",
      method: HTTP_METHOD_GET,
      url: "https://google.com",
      open: true,
      selected: false,
      parameters: [],
      headers: []
    }
  ]
}));
function Main() {
  const requests = usePostmanStore((state) => state.requests);
  return (
    <div className="main">
      <Rest></Rest>
    </div>
  );
}
export default Main;
