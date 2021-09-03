import { SVGProps } from "react";
import Svg from "../svgs/like-outline.svg";

const LikeOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="like-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default LikeOutlineIcon;