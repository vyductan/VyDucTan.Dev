import { SVGProps } from "react";
import Svg from "../svgs/comment-outline.svg";

const CommentOutlineIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="comment-outline"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default CommentOutlineIcon;