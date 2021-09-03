import { SVGProps } from "react";
import Svg from "../svgs/close.svg";

const CloseIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="close"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default CloseIcon;