import { SVGProps } from "react";
import Svg from "../svgs/shop-outline.svg";

const ShopOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="shop-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ShopOutlineIcon;