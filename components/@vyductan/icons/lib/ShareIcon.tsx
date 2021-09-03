import { SVGProps } from "react";
import Svg from "../svgs/share.svg";

const ShareIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="share"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ShareIcon;