import * as React from "react";

function SvgMessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="1em"
      height="1em"
      aria-hidden="true"
      fill="currentColor"
      {...props}
    >
      <path d="M14 2.042c6.76 0 12 4.952 12 11.64s-5.24 11.64-12 11.64a13.091 13.091 0 01-3.474-.461.956.956 0 00-.641.047L7.5 25.959a.961.961 0 01-1.348-.849l-.065-2.134a.957.957 0 00-.322-.684A11.389 11.389 0 012 13.682c0-6.688 5.24-11.64 12-11.64zM6.794 17.086a.57.57 0 00.827.758l3.786-2.874a.722.722 0 01.868 0l2.8 2.1a1.8 1.8 0 002.6-.481l3.525-5.592a.57.57 0 00-.827-.758l-3.786 2.874a.722.722 0 01-.868 0l-2.8-2.1a1.8 1.8 0 00-2.6.481z" />
    </svg>
  );
}

export default SvgMessageIcon;
