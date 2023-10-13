import { theme } from "antd";
import { AliasToken } from "antd/es/theme/internal";
import defaultColors from "tailwindcss/colors";

const defaultToken = theme.getDesignToken();
export const THEME_TOKENS: AliasToken = {
  ...defaultToken,
  colorPrimary: defaultColors.blue[600],
  colorPrimaryBorder: defaultColors.blue[300],
  colorPrimaryHover: defaultColors.blue[500],
  colorText: defaultColors.gray[600],
  colorBorder: defaultColors.gray[200],
  colorBorderSecondary: defaultColors.gray[200],
  controlHeightSM: 32,
  controlHeight: 40,
  controlHeightLG: 48,
};
