import { SVGProps } from "react";
import Svg from "../svgs/care-themed.svg";

const CareThemedIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="care-themed"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default CareThemedIcon;