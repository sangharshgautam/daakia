import {
  Dropdown,
  Input,
  Menu,
  MenuButtonProps,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Option,
  SelectTabData,
  SelectTabEvent,
  SplitButton,
  Tab,
  TabList,
  Textarea,
  TextareaProps,
  CounterBadge,
  Caption1
} from "@fluentui/react-components";
import React, { FC, useEffect, useState } from "react";
import RestRequest from "../../model/RestRequest";
import { HTTP_METHODS } from "./HttpConstants";
import RestSectionProps from "./RestSectionProps";
import { usePostmanStore } from "../../Main";
import CodeMirror from "@uiw/react-codemirror";
import NameValueRow from "./NameValueRow";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { RestResponse } from "../../model/RestResponse";
import { RestHeader } from "../../model/RestHeader";
import NameValueTable from "./NameValueTable";

const RequestSection = () => {
  const dakiaRequests = usePostmanStore((state) => state.requests);
  const dakiaUpdate = usePostmanStore((state) => state.update);
  const selectedRequest =
    dakiaRequests.filter((req) => req.selected)?.[0] ?? {};
  const [requestSection, setRequestSection] = React.useState<string>("body");
  const send = () => {
    const config: AxiosRequestConfig = {
      url: selectedRequest.url,
      method: selectedRequest.method,
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        console.log(progressEvent);
      }
    };
    axios.request(config).then((response) => {
      const headers = Object.keys(response.headers).map((key) => ({
        name: key,
        value: response.headers[key],
        enabled: false
      }));
      onResponseChange({
        status: response.status,
        statusText: response.statusText,
        body: JSON.stringify(response.data),
        headers: headers
      });
    });
  };
  const primaryActionButtonProps = {
    send
  };
  const onRequestSectionSelect = (
    event: SelectTabEvent,
    data: SelectTabData
  ) => {
    setRequestSection(data.value);
  };
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [body, setBody] = useState<string>("");
  useEffect(() => {
    setUrl(selectedRequest?.url ? selectedRequest.url : "");
    setMethod(selectedRequest?.method ? selectedRequest?.method : "GET");
    setBody(selectedRequest?.body ? selectedRequest.body : "");
  }, [selectedRequest]);
  const onUrlChange = (value: string) => {
    dakiaUpdate({ ...selectedRequest, url: value });
  };
  const onMethodChange = (value: string | undefined) => {
    if (value) {
      dakiaUpdate({ ...selectedRequest, method: value });
    }
  };
  const onBodyChange = (value: string) => {
    if (value) {
      dakiaUpdate({ ...selectedRequest, body: value });
    }
  };
  const onResponseChange = (response: RestResponse) => {
    dakiaUpdate({ ...selectedRequest, response });
  };

  return (
    <div role="request">
      <div className="request-section-row requestBar">
        <div className="requestBar-item stretched">
          <Dropdown
            className="request-method"
            appearance="outline"
            value={method}
            selectedOptions={[method]}
            onOptionSelect={(e, data) => onMethodChange(data.optionValue)}
          >
            {HTTP_METHODS.map((method) => {
              return <Option key={method}>{method}</Option>;
            })}
          </Dropdown>
          <Input
            className="stretched"
            value={url}
            placeholder="URL"
            type="url"
            onChange={(e) => onUrlChange(e.target.value)}
          />
        </div>
        <div className="requestBar-item">
          <Menu positioning="below-end">
            <MenuTrigger disableButtonEnhancement>
              {(triggerProps: MenuButtonProps) => (
                <SplitButton
                  appearance="primary"
                  menuButton={triggerProps}
                  primaryActionButton={primaryActionButtonProps}
                  onClick={() => send()}
                >
                  Send
                </SplitButton>
              )}
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Item a</MenuItem>
                <MenuItem>Item b</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>
        <div className="requestBar-item">
          <SplitButton appearance="secondary">Save</SplitButton>
        </div>
      </div>
      <div className="request-section-row">
        <TabList
          selectedValue={requestSection}
          onTabSelect={onRequestSectionSelect}
        >
          <Tab key="parameters" value="parameters">
            Parameters
            <>
              <CounterBadge
                count={selectedRequest?.parameters.length}
                shape="rounded"
                size="small"
                className="tab-badge"
              />
            </>
          </Tab>
          <Tab key="body" value="body">
            Body
          </Tab>
          <Tab key="headers" value="headers">
            Headers
            <>
              <CounterBadge
                count={selectedRequest?.headers?.length}
                shape="rounded"
                size="small"
                className="tab-badge"
              />
            </>
          </Tab>
        </TabList>
        {requestSection === "parameters" && (
          <NameValueTable
            title="Query Parameters"
            rows={selectedRequest?.parameters}
            readonly={false}
          ></NameValueTable>
        )}
        {requestSection === "body" && (
          <div className="daakia-cm">
            <CodeMirror
              value={body}
              height="200px"
              onChange={onBodyChange}
              editable={true}
            />
          </div>
        )}
        {requestSection === "headers" && (
          <NameValueTable
            title="Header List"
            rows={selectedRequest?.headers}
            readonly={false}
          ></NameValueTable>
        )}
      </div>
    </div>
  );
};
export default RequestSection;
