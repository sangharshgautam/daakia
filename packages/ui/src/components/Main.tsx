import "./Main.css";
import "../SplitPane.css";
import Rest from "./routes/rest/Rest";
import Flow from "./routes/flow/Flow";
import { HTTP_METHOD_GET, HTTP_METHOD_POST } from "./routes/rest/HttpConstants";
import { create} from "zustand";
import RestRequest from "./model/RestRequest";
import { DakiaStore } from "./model/DakiaStore";
import { uuid } from "uuidv4";
import SplitPane from "react-split-pane";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
  },
  openByKey: (key: string) => {
    set((prevState) => ({
      requests: prevState.requests.map((req) =>
        req.key === key
          ? { ...req, open: true, selected: true }
          : { ...req, selected: false }
      )
    }));
  },
  closeByKey: (key: string) => {
    set((prevState) => ({
      requests: prevState.requests.map((req) =>
        req.key === key ? { ...req, open: false, selected: false } : { ...req }
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
      parameters: [],
      headers: [
        {
          name: "content-type",
          value: "application/json",
          enabled: true
        }
      ],
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
    },
    {
      key: "3",
      name: "Request3",
      method: HTTP_METHOD_GET,
      url: "https://hmrc.gov.uk",
      open: false,
      selected: false,
      parameters: [],
      headers: []
    }
  ]
}));
function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rest />}>
          <Route index element={<Rest />} />
          <Route path="blogs" element={<Flow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Main;
