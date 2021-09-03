import { SVGProps } from "react";
import Svg from "../svgs/friend-solid.svg";

const FriendSolidIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="friend-solid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default FriendSolidIcon;