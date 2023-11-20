import {
  Caption1,
  Caption1Stronger,
  CounterBadge,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList
} from "@fluentui/react-components";
import NameValueTable from "./NameValueTable";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { usePostmanStore } from "../../Main";
import { RestHeader } from "../../model/RestHeader";
import NameValueRow from "./NameValueRow";
const ResponseSection = () => {
  const dakiaRequests = usePostmanStore((state) => state.requests);
  const selectedRequest =
    dakiaRequests.filter((req) => req.selected)?.[0] ?? {};
  const [status, setStatus] = useState<number>();
  const [statusText, setStatusText] = useState<string>();
  const [time, setTime] = useState<number>();
  const [size, setSize] = useState<string>();
  const [headers, setHeaders] = useState<RestHeader[]>([]);
  const [body, setBody] = useState<string>("");
  const [responseSection, setResponseSection] = useState<string>("body");
  const onResponseSectionSelect = (
    event: SelectTabEvent,
    data: SelectTabData
  ) => {
    setResponseSection(data.value);
  };
  useEffect(() => {
    setBody(
      selectedRequest?.response?.body ? selectedRequest?.response?.body : ""
    );
    setStatus(
      selectedRequest?.response?.status ? selectedRequest?.response?.status : -1
    );
    setStatusText(
      selectedRequest?.response?.statusText
        ? selectedRequest?.response?.statusText
        : ""
    );
    setTime(
      selectedRequest?.response?.time ? selectedRequest?.response?.time : -1
    );
    setSize(
      selectedRequest?.response?.size ? selectedRequest?.response?.size : ""
    );
    setHeaders(
      selectedRequest?.response?.headers
        ? selectedRequest?.response?.headers
        : []
    );
  }, [selectedRequest]);
  const disabled = true;
  return (
    <div className="response">
      <div className="requestBar-item">
        <div>
          <Caption1Stronger>Status</Caption1Stronger>
          <Caption1>{status}</Caption1>
          <Caption1>{statusText}</Caption1>
        </div>
        <div>
          <Caption1Stronger>Time</Caption1Stronger>
          <Caption1>{time} ms</Caption1>
        </div>
        <div>
          <Caption1Stronger>Size</Caption1Stronger>
          <Caption1>{size}</Caption1>
        </div>
      </div>
      <TabList
        selectedValue={responseSection}
        onTabSelect={onResponseSectionSelect}
      >
        <Tab key="body" value="body">
          Body
        </Tab>
        <Tab key="headers" value="headers">
          Headers
          <>
            <CounterBadge
              count={headers.length}
              shape="rounded"
              size="small"
              className="tab-badge"
            />
          </>
        </Tab>
      </TabList>
      {responseSection === "body" && (
        <div className="daakia-cm">
          <CodeMirror value={body} height="200px" editable={false} />
        </div>
      )}
      {responseSection === "headers" && (
        <NameValueTable
          title="Header List"
          rows={headers}
          readonly={true}
        ></NameValueTable>
      )}
    </div>
  );
};
export default ResponseSection;
