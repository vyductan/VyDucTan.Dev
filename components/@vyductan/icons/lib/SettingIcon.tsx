import { SVGProps } from "react";
import Svg from "../svgs/setting.svg";

const SettingIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="setting"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default SettingIcon;