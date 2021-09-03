import { SVGProps } from "react";
import Svg from "../svgs/edit-solid.svg";

const EditSolidIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="edit-solid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default EditSolidIcon;