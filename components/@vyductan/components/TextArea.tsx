import { Form } from "antd";
import { Rule } from "antd/lib/form";
import { useState } from "react";
type TextAreaProps = {
  name: string;
  label: string;
  rows?: number;
  rules?: Rule[];
};
const TextArea = ({ name, label, rows, rules }: TextAreaProps) => {
  const [value, setValue] = useState<string>();
  const required = rules?.some((x) => Object.keys(x).includes("required"));
  return (
    <Form.Item rules={rules} name={name}>
      <div className="form-item">
        <textarea
          id={name}
          className={`${value ? "filled" : ""}`}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={rows}
        />
        <label htmlFor={name}>
          {label}
          {required && " *"}
        </label>
      </div>
    </Form.Item>
  );
};

export default TextArea;
