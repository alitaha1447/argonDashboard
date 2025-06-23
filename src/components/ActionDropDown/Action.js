import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

const Action = () => {
  return (
    <>
      <UncontrolledDropdown direction="left">
        <DropdownToggle
          tag="span"
          style={{ cursor: "pointer" }}
          data-toggle="dropdown"
          aria-expanded={false}
        >
          <BsThreeDotsVertical size={20} />
        </DropdownToggle>

        <DropdownMenu
          right
          style={{
            minWidth: "120px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <DropdownItem
          // onClick={() => {
          //   console.log("Edit clicked for", item.name);
          // }}
          >
            ✏️ Edit
          </DropdownItem>
          <DropdownItem
          // onClick={() => {
          //   console.log("Delete clicked for", item.name);
          // }}
          >
            🗑️ Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default Action;
