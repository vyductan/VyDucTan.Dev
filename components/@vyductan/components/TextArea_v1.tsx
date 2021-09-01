import { useState } from "react";
type TextAreaProps = {
  rows?: number;
};
const TextArea = ({ rows }: TextAreaProps) => {
  const [value, setValue] = useState<string>();
  return (
    <textarea
      className={`${value ? "filled" : ""}`}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      rows={rows}
    />
  );
};

export default TextArea;
