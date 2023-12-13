import { usePostmanStore } from "../../Main";
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  Button
} from "@fluentui/react-components";
import {
  AddFilled,
  BinFullRegular,
  DeleteRegular,
  MoreHorizontal24Filled,
  DismissSquareMultipleFilled
} from "@fluentui/react-icons";
const RequestTreeSection = () => {
  const daakiaRequests = usePostmanStore((state) => state.requests);
  const daakiaOpenByKey = usePostmanStore((state) => state.openByKey);
  const selectAndOpen = (key: string) => {
    daakiaOpenByKey(key);
  };
  return (
    <>
      <Tree aria-label="Default Layout">
        <TreeItem itemType="branch">
          <div>
            <Button appearance="transparent" icon={<AddFilled />} size="small">
              Add
            </Button>
          </div>
          <TreeItemLayout>Collection</TreeItemLayout>
          <Tree>
            {daakiaRequests.map((request, index) => {
              return (
                <TreeItem
                  key={index}
                  itemType="leaf"
                  onClick={() => selectAndOpen(request.key)}
                >
                  <TreeItemLayout>
                    <div
                      className={`request-tab-method text-${request.method}-500`}
                    >
                      {request.method}
                      {request.name}
                    </div>
                  </TreeItemLayout>
                </TreeItem>
              );
            })}
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};
export default RequestTreeSection;
