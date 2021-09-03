import { SVGProps } from "react";
import Svg from "../svgs/like-themed.svg";

const LikeThemedIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="like-themed"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default LikeThemedIcon;