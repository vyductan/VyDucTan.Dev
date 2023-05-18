import * as React from 'react';

function SvgNightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="night-icon_svg__icon"
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
      <path
        d="M713.28 734.08A328 328 0 01288 308.8a32 32 0 00-44.48-40.32A378.88 378.88 0 10753.6 778.56a32 32 0 00-40.32-44.48zM427.2 199.04l42.88 14.4a90.56 90.56 0 0157.28 57.28l14.4 42.88a17.28 17.28 0 0032 0l14.4-42.88a90.56 90.56 0 0157.28-57.28l42.88-14.4a17.28 17.28 0 000-32l-42.88-14.4A90.56 90.56 0 01588.8 96L576 51.84a17.28 17.28 0 00-32 0L527.36 96a90.56 90.56 0 01-57.28 57.28l-42.88 14.4a17.28 17.28 0 000 32zM986.24 438.4L943.36 424a90.56 90.56 0 01-57.28-57.28l-14.4-42.88a17.28 17.28 0 00-32 0l-14.4 42.88a90.56 90.56 0 01-57.28 57.6l-42.88 14.4a17.28 17.28 0 000 32l42.88 14.4A90.56 90.56 0 01824.64 544l14.4 42.88a17.28 17.28 0 0032 0L886.08 544a90.56 90.56 0 0157.28-57.28l42.88-14.4a17.28 17.28 0 000-32z"
        fill="#231F20"
      />
    </svg>
  );
}

export default SvgNightIcon;