import { SVGProps } from "react";
import Svg from "../svgs/download.svg";

const DownloadIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="download"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default DownloadIcon;