import {
    Button,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
    TableSelectionCell,
    Body1Strong,
    Menu,
    MenuTrigger,
    MenuPopover,
    Tooltip,
    MenuList,
    MenuItem,
    MenuItemCheckbox,
    MenuButton
  } from "@fluentui/react-components";
  import {
    AddFilled,
    BinFullRegular,
    DeleteRegular,
    MoreHorizontal24Filled
  } from "@fluentui/react-icons";
  import { FC } from "react";
  import { NameValueTableType } from "../../model/NameValueTableType";
  import NameValueRow from "./NameValueRow";
  import "./NameValueTable.css";
  const NameValueTable: FC<NameValueTableType> = ({ title, rows, readonly }) => {
    const columns = [
      { columnKey: "key", label: "Key" },
      { columnKey: "value", label: "Value" },
      { columnKey: "description", label: "Description" }
    ];
    const addItem = () => {};
    return (
      <div className="name-value-table">
        <div className="name-value-table-header">
          <Body1Strong>{title}</Body1Strong>
          {/* <div>
            <Button
              appearance="subtle"
              size="small"
              icon={<AddFilled />}
              onClick={() => addItem()}
            ></Button>
            <Button
              appearance="subtle"
              size="small"
              icon={<DeleteRegular />}
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
          </div> */}
        </div>
        <Table arial-label="Default table" size="extra-small">
          <TableHeader>
            <TableRow>
              <TableSelectionCell
                // checked={
                //   allRowsSelected ? true : someRowsSelected ? "mixed" : false
                // }
                // onClick={toggleAllRows}
                // onKeyDown={toggleAllKeydown}
                checkboxIndicator={{ "aria-label": "Select all rows " }}
              />
              {columns.map((column) => (
                <TableHeaderCell key={column.columnKey}>
                  {column.label}
                </TableHeaderCell>
              ))}
              <TableHeaderCell key="actions">
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <Tooltip
                      content="Small with calendar icon only"
                      relationship="label"
                    >
                      <MenuButton
                        appearance="transparent"
                        icon={<MoreHorizontal24Filled />}
                        size="small"
                      />
                    </Tooltip>
                  </MenuTrigger>
  
                  <MenuPopover>
                    <MenuList>
                      {columns.map((column, index) => (
                        <MenuItemCheckbox
                          key={index}
                          name={column.label}
                          value={column.columnKey}
                        >
                          {column.label}
                        </MenuItemCheckbox>
                      ))}
                    </MenuList>
                  </MenuPopover>
                </Menu>
                {/* <Button
                  appearance="transparent"
                  icon={<MoreHorizontal24Filled />}
                  aria-label="Delete"
                  size="small"
                /> */}
                <Button size="small" appearance="transparent">
                  Bulk Edit
                </Button>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableSelectionCell
                  checked={row.enabled}
                  checkboxIndicator={{ "aria-label": "Select row" }}
                />
                <TableCell>
                  <TableCellLayout>{row.name}</TableCellLayout>
                </TableCell>
                <TableCell>
                  <TableCellLayout>{row.value}</TableCellLayout>
                </TableCell>
                <TableCell>
                  <TableCellLayout>{row.description}</TableCellLayout>
                </TableCell>
                <TableCell>
                  <Button
                    icon={<DeleteRegular />}
                    aria-label="Delete"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* {rows?.map((row, index) => {
          return <NameValueRow key={index} {...row}></NameValueRow>;
        })} */}
      </div>
    );
  };
  export default NameValueTable;
  