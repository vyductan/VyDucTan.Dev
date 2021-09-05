import * as React from 'react';

function SvgHahaThemedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      aria-hidden="true"
      fill="currentColor"
      {...props}
    >
      <defs>
        <linearGradient id="haha-themed-icon_svg__a" x1="50%" x2="50%" y1="10.25%" y2="100%">
          <stop offset="0%" stopColor="#FEEA70" />
          <stop offset="100%" stopColor="#F69B30" />
        </linearGradient>
        <linearGradient id="haha-themed-icon_svg__d" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#472315" />
          <stop offset="100%" stopColor="#8B3A0E" />
        </linearGradient>
        <linearGradient id="haha-themed-icon_svg__e" x1="50%" x2="50%" y1="0%" y2="81.902%">
          <stop offset="0%" stopColor="#FC607C" />
          <stop offset="100%" stopColor="#D91F3A" />
        </linearGradient>
        <filter
          id="haha-themed-icon_svg__c"
          width="118.8%"
          height="118.8%"
          x="-9.4%"
          y="-9.4%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation={1} />
          <feOffset dy={-1} in="shadowBlurInner1" result="shadowOffsetInner1" />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2={-1}
            k3={1}
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            values="0 0 0 0 0.921365489 0 0 0 0 0.460682745 0 0 0 0 0 0 0 0 0.35 0"
          />
        </filter>
        <path id="haha-themed-icon_svg__b" d="M16 8A8 8 0 110 8a8 8 0 0116 0" />
      </defs>
      <g fill="none">
        <use fill="url(#haha-themed-icon_svg__a)" xlinkHref="#haha-themed-icon_svg__b" />
        <use fill="#000" filter="url(#haha-themed-icon_svg__c)" xlinkHref="#haha-themed-icon_svg__b" />
        <path
          fill="url(#haha-themed-icon_svg__d)"
          d="M3 8.008C3 10.023 4.006 14 8 14c3.993 0 5-3.977 5-5.992C13 7.849 11.39 7 8 7c-3.39 0-5 .849-5 1.008"
        />
        <path
          fill="url(#haha-themed-icon_svg__e)"
          d="M4.541 12.5c.804.995 1.907 1.5 3.469 1.5 1.563 0 2.655-.505 3.459-1.5-.551-.588-1.599-1.5-3.459-1.5s-2.917.912-3.469 1.5"
        />
        <path
          fill="#2A3755"
          d="M6.213 4.144c.263.188.502.455.41.788-.071.254-.194.369-.422.371-.78.011-1.708.255-2.506.612-.065.029-.197.088-.332.085-.124-.003-.251-.058-.327-.237-.067-.157-.073-.388.276-.598.545-.33 1.257-.48 1.909-.604a7.077 7.077 0 00-1.315-.768c-.427-.194-.38-.457-.323-.6.127-.317.609-.196 1.078.026a9 9 0 011.552.925zm3.577 0a8.953 8.953 0 011.55-.925c.47-.222.95-.343 1.078-.026.057.143.104.406-.323.6a7.029 7.029 0 00-1.313.768c.65.123 1.363.274 1.907.604.349.21.342.44.276.598-.077.18-.203.234-.327.237-.135.003-.267-.056-.332-.085-.797-.357-1.725-.6-2.504-.612-.228-.002-.351-.117-.422-.37-.091-.333.147-.6.41-.788z"
        />
      </g>
    </svg>
  );
}

export default SvgHahaThemedIcon;
