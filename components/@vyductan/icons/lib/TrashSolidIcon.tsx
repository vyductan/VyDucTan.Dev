import { SVGProps } from "react";
import Svg from "../svgs/trash-solid.svg";

const TrashSolidIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="trash-solid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default TrashSolidIcon;