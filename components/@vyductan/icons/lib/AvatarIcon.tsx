import { SVGProps } from "react";
import Svg from "../svgs/avatar.svg";

const AvatarIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="avatar"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default AvatarIcon;