import { IconType } from "./Icon";
import VWSvgs from "./src/vyductan";
export default function getIconType(type: IconType | string) {
  switch (type) {
    case "vyductan":
      return VWSvgs;
    default:
      return VWSvgs;
  }
}
