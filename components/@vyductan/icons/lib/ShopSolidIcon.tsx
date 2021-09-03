import { SVGProps } from "react";
import Svg from "../svgs/shop-solid.svg";

const ShopSolidIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="shop-solid"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default ShopSolidIcon;