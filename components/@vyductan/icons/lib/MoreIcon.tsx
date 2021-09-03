import { SVGProps } from "react";
import Svg from "../svgs/more.svg";

const MoreIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="more"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default MoreIcon;