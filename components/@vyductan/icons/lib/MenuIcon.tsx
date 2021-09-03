import { SVGProps } from "react";
import Svg from "../svgs/menu.svg";

const MenuIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="menu"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default MenuIcon;