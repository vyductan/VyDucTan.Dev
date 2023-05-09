import { useState } from "react";
import { Input as InputAntd, Form } from "antd";
import { Rule } from "antd/lib/form";
type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  rules?: Rule[];
};
const Input = ({ name, label, placeholder, rules }: InputProps) => {
  const [value, setValue] = useState<string>();
  const required = rules?.some((x) => Object.keys(x).includes("required"));

  return (
    <Form.Item rules={rules}>
      <div className="form-item">
        <InputAntd
          id={name}
          className={`${value ? "filled" : ""}`}
          placeholder={placeholder ? placeholder : ""}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <label htmlFor={name}>
          {label}
          {required && " *"}
        </label>
      </div>
    </Form.Item>
  );
};

export default Input;
