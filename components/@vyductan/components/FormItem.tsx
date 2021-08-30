import { Form } from "antd";
import { Rule } from "antd/lib/form";

type FormItemProps = {
  children: React.ReactNode;
  label: string;
  name: string;
  rules?: Rule[];
};
const FormItem = ({ children, label, name, rules }: FormItemProps) => {
  const required = rules?.some((x) => Object.keys(x).includes("required"));
  return (
    <Form.Item rules={rules} name={name}>
      <div className="form-item">
        {children}
        <label>
          {label}
          {required && " *"}
        </label>
      </div>
    </Form.Item>
  );
};

export default FormItem;
