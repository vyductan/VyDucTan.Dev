import { SVGProps } from "react";
import Svg from "../svgs/github.svg";

const GithubIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="github"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default GithubIcon;