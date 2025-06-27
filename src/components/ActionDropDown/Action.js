import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

const Action = ({ options = [], data }) => {
  return (
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
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => option.onClick(data)}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Action;
