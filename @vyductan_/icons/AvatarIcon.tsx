import * as React from "react";

function SvgAvatarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="avatar-icon_svg__icon"
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
      <path d="M512 85.333c235.52 0 426.667 191.147 426.667 426.667S747.52 938.667 512 938.667 85.333 747.52 85.333 512 276.48 85.333 512 85.333zm0 85.334c-188.373 0-341.333 152.96-341.333 341.333S323.627 853.333 512 853.333 853.333 700.373 853.333 512 700.373 170.667 512 170.667zM512 768c-84.01 0-161.45-34.859-213.333-93.099 26.154-39.68 121.941-77.568 213.333-77.568s187.179 37.888 213.333 77.568C673.451 733.141 596.011 768 512 768zm0-469.333c70.827 0 128 57.173 128 128s-57.173 128-128 128-128-57.174-128-128 57.173-128 128-128z" />
    </svg>
  );
}

export default SvgAvatarIcon;
