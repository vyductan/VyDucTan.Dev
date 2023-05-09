import * as React from 'react';

function SvgEmojiHappyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="emoji-happy-icon_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden="true"
      fill="currentColor"
      {...props}
    >
      <defs>
        <style />
      </defs>
      <path d="M512 85.333C276.736 85.333 85.333 276.736 85.333 512S276.736 938.667 512 938.667 938.667 747.264 938.667 512 747.264 85.333 512 85.333zm0 768c-188.203 0-341.333-153.13-341.333-341.333S323.797 170.667 512 170.667 853.333 323.797 853.333 512 700.203 853.333 512 853.333z" />
      <path d="M298.667 448a64 64 0 10128 0 64 64 0 10-128 0zM597.333 447.701a63.701 63.701 0 10127.403 0 63.701 63.701 0 10-127.403 0zM512 768c170.667 0 213.333-170.667 213.333-170.667H298.667S341.333 768 512 768z" />
    </svg>
  );
}

export default SvgEmojiHappyIcon;
