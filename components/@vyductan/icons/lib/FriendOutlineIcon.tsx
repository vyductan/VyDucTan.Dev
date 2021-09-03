import { SVGProps } from "react";
import Svg from "../svgs/friend-outline.svg";

const FriendOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="friend-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default FriendOutlineIcon;