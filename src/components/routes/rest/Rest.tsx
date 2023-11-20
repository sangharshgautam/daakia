import type { SelectTabData, SelectTabEvent } from "@fluentui/react-components";
import {
  Button,
  Overflow,
  OverflowItem,
  Tab,
  TabList
} from "@fluentui/react-components";
import { AddFilled } from "@fluentui/react-icons";
import { v4 as uuid } from "uuid";
import { usePostmanStore } from "../../Main";
import { HTTP_METHOD_GET } from "./HttpConstants";
import RequestSection from "./RequestSection";
import ResponseSection from "./ResponseSection";
import "./Rest.css";

const Rest = () => {
  const dakiaRequests = usePostmanStore((state) => state.requests);
  const dakiaAdd = usePostmanStore((state) => state.add);
  const dakiaSelectByIndex = usePostmanStore((state) => state.selectByIndex);
  const dakiaSelectByKey = usePostmanStore((state) => state.selectByKey);
  const dakiaRemove = usePostmanStore((state) => state.remove);

  const selectedRequest =
    dakiaRequests.filter((req) => req.selected)?.[0] ?? {};

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    dakiaSelectByKey(data?.value);
  };
  const removeTab = (index: number, key: string) => {
    dakiaRemove(key);
    dakiaSelectByIndex(index - 1);
  };
  const addTab = () => {
    const key = uuid();
    const obj = {
      key,
      name: "Untitled",
      method: HTTP_METHOD_GET,
      url: "",
      open: true,
      selected: false,
      parameters: []
    };
    dakiaAdd(obj);
    dakiaSelectByKey(key);
  };

  return (
    <div className="rest">
      <h1>
        {selectedRequest?.method} {selectedRequest?.name}
      </h1>
      <Overflow minimumVisible={2}>
        <TabList
          appearance="subtle"
          selectedValue={selectedRequest?.key}
          onTabSelect={onTabSelect}
        >
          {dakiaRequests.map((request, index) => {
            return (
              <OverflowItem key={request.key} id={request.key}>
                <Tab value={request.key}>
                  <div className="request-name-tab">
                    <div
                      className={`request-tab-method text-${request.method}-500`}
                    >
                      {request.method}
                    </div>
                    <div className="request-tab-name">{request.name}</div>
                    <div>
                      {/* <Button
                        appearance="subtle"
                        icon={<ClosedCaptionFilled />}
                        onClick={() => removeTab(index, request.key)}
                      ></Button> */}
                    </div>
                  </div>
                </Tab>
              </OverflowItem>
            );
          })}
          <OverflowItem id="addNew" key="addNew">
            <Button
              appearance="subtle"
              icon={<AddFilled />}
              onClick={() => addTab()}
            ></Button>
          </OverflowItem>
        </TabList>
      </Overflow>
      {selectedRequest && <RequestSection></RequestSection>}
      {selectedRequest.response && <ResponseSection></ResponseSection>}
    </div>
  );
};
export default Rest;
