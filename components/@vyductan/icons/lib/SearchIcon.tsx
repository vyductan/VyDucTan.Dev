import { SVGProps } from "react";
import Svg from "../svgs/search.svg";

const SearchIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="search"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default SearchIcon;