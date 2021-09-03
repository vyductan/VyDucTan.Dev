import { SVGProps } from "react";
import Svg from "../svgs/emoji-happy.svg";

const EmojiHappyIcon = (props: SVGProps<SVGElement>) => (
	<Svg
		data-icon="emoji-happy"
		width="1em"
		height="1em"
		aria-hidden="true"
		fill="currentcolor"
		{...props}
	/>
);

export default EmojiHappyIcon;