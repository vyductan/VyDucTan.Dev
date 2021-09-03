import { SVGProps } from "react";
import Svg from "../svgs/facebook.svg";

const FacebookIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="facebook"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default FacebookIcon;