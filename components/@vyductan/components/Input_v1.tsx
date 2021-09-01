import { useState } from "react";
import { Input as InputAntd } from "antd";
type InputProps = {
  id: string;
  placeholder?: string;
};
const Input = ({ id, placeholder }: InputProps) => {
  const [value, setValue] = useState<string>();
  return (
    <InputAntd
      id={id}
      className={`${value ? "filled" : ""}`}
      placeholder={placeholder ? placeholder : ""}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export default Input;
