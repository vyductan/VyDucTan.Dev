import InternalInput from "./Input";
import Password from "./Password";

export * from "./TextArea";
export * from "./utils";

const Input = Object.assign(InternalInput, {
  Password: Password,
});
export default Input;
