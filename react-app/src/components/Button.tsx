import React from "react";

interface Props {
  handleClick: () => void;
  children: string;
  color?: "primary" | "secondary" | "danger";
}

const Button = ({ handleClick, children, color }: Props) => {
  return (
    <button type="button" className={"btn btn-" + color} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
