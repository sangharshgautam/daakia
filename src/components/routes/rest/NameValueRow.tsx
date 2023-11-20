import { Button, Input } from "@fluentui/react-components";
import { BinFullRegular, CheckmarkFilled } from "@fluentui/react-icons";
import { FC } from "react";
import { RestHeader } from "../../model/RestHeader";
const NameValueRow: FC<RestHeader> = ({ name, value, enabled }) => {
  const onNameChange = (value: string) => {};
  const onValueChange = (value: string) => {};
  return (
    <div className="name-value-row">
      <Input
        className="stretched"
        value={name}
        placeholder="Parameter 1"
        onChange={(e) => onNameChange(e.target.value)}
        disabled={!enabled}
      />
      <Input
        className="stretched"
        value={value}
        placeholder="Value 1"
        onChange={(e) => onValueChange(e.target.value)}
        disabled={!enabled}
      />
      {enabled && <Button icon={<CheckmarkFilled />} />}
      {enabled && <Button icon={<BinFullRegular />} />}
    </div>
  );
};
export default NameValueRow;
