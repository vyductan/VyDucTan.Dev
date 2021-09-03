import { SVGProps } from "react";
import Svg from "../svgs/linkedin.svg";

const LinkedinIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="linkedin"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default LinkedinIcon;