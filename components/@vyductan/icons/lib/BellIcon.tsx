import { SVGProps } from "react";
import Svg from "../svgs/bell.svg";

const BellIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="bell"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default BellIcon;