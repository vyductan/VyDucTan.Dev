"use client";
import { Form, Input as InputAntd } from "antd";
import { type Rule } from "antd/lib/form";
import { useState } from "react";

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
