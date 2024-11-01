import React from "react";

const Dropdown = ({ onSelect }) => {
  return (
    <ul className="dropdown-menu">
      <li onClick={() => onSelect("Option 1")}>Option 1</li>
      <li onClick={() => onSelect("Option 2")}>Option 2</li>
      <li onClick={() => onSelect("Option 3")}>Option 3</li>
    </ul>
  );
};

export default Dropdown;