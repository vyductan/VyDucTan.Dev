import { SVGProps } from "react";
import Svg from "../svgs/link.svg";

const LinkIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="link"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default LinkIcon;