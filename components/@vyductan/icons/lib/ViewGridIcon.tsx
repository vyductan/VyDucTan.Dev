import { SVGProps } from "react";
import Svg from "../svgs/view-grid.svg";

const ViewGridIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="view-grid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ViewGridIcon;