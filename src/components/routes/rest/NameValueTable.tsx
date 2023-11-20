import { Button } from "@fluentui/react-components";
import { AddFilled, BinFullRegular } from "@fluentui/react-icons";
import { FC } from "react";
import { NameValueTableType } from "../../model/NameValueTableType";
import NameValueRow from "./NameValueRow";
import "./NameValueTable.css";
const NameValueTable: FC<NameValueTableType> = ({ title, rows, readonly }) => {
  const addItem = () => {};
  return (
    <div className="name-value-table">
      <div className="name-value-table-header">
        <div>{title}</div>
        <div>
          <Button
            appearance="subtle"
            size="small"
            icon={<AddFilled />}
            onClick={() => addItem()}
          ></Button>
          <Button
            appearance="subtle"
            size="small"
            icon={<BinFullRegular />}
            onClick={() => addItem()}
          ></Button>
          <Button
            appearance="subtle"
            size="small"
            icon={<AddFilled />}
            onClick={() => addItem()}
          ></Button>
          <Button
            appearance="subtle"
            icon={<AddFilled />}
            onClick={() => addItem()}
          ></Button>
        </div>
      </div>
      {rows?.map((row, index) => {
        return <NameValueRow key={index} {...row}></NameValueRow>;
      })}
    </div>
  );
};
export default NameValueTable;
