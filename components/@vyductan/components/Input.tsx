import { useState } from "react";
import { Input as InputAntd } from "antd";
type InputProps = {
  placeholder?: string;
};
const Input = ({ placeholder }: InputProps) => {
  const [value, setValue] = useState<string>();
  return (
    <InputAntd
      className={`${value ? "filled" : ""}`}
      placeholder={placeholder ? placeholder : ""}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export default Input;
