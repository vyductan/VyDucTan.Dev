import InternalForm from "./Form";
import Item from "./FormItem";

export type { FormProps } from "./Form";
export type { FormItemChildProps } from "./types";

const Form = Object.assign(InternalForm, {
  Item,
});
export default Form;
