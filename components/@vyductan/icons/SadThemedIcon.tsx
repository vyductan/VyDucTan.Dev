import * as React from 'react';

function SvgSadThemedIcon(props: React.SVGProps<SVGSVGElement>) {
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
        <linearGradient id="sad-themed-icon_svg__a" x1="50%" x2="50%" y1="10.25%" y2="100%">
          <stop offset="0%" stopColor="#FEEA70" />
          <stop offset="100%" stopColor="#F69B30" />
        </linearGradient>
        <linearGradient id="sad-themed-icon_svg__d" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#472315" />
          <stop offset="100%" stopColor="#8B3A0E" />
        </linearGradient>
        <linearGradient id="sad-themed-icon_svg__e" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#191A33" />
          <stop offset="87.162%" stopColor="#3B426A" />
        </linearGradient>
        <linearGradient id="sad-themed-icon_svg__h" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#E78E0D" />
          <stop offset="100%" stopColor="#CB6000" />
        </linearGradient>
        <linearGradient id="sad-themed-icon_svg__i" x1="50%" x2="50%" y1="81.899%" y2="17.94%">
          <stop offset="0%" stopColor="#35CAFC" />
          <stop offset="100%" stopColor="#007EDB" />
        </linearGradient>
        <linearGradient id="sad-themed-icon_svg__j" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#6AE1FF" stopOpacity={0.287} />
          <stop offset="100%" stopColor="#A8E3FF" stopOpacity={0.799} />
        </linearGradient>
        <filter
          id="sad-themed-icon_svg__c"
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
        <filter
          id="sad-themed-icon_svg__g"
          width="111.4%"
          height="137.5%"
          x="-5.7%"
          y="-18.8%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation={0.5} />
          <feOffset in="shadowBlurInner1" result="shadowOffsetInner1" />
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
            values="0 0 0 0 0.0411226772 0 0 0 0 0.0430885485 0 0 0 0 0.0922353316 0 0 0 0.819684222 0"
          />
        </filter>
        <path id="sad-themed-icon_svg__b" d="M16 8A8 8 0 110 8a8 8 0 0116 0" />
        <path
          id="sad-themed-icon_svg__f"
          d="M3.599 8.8c0-.81.509-1.466 1.134-1.466.627 0 1.134.656 1.134 1.466 0 .338-.089.65-.238.898a.492.492 0 01-.301.225c-.14.037-.353.077-.595.077-.243 0-.453-.04-.595-.077a.49.49 0 01-.3-.225 1.741 1.741 0 01-.239-.898zm6.534 0c0-.81.508-1.466 1.133-1.466.627 0 1.134.656 1.134 1.466 0 .338-.089.65-.238.898a.49.49 0 01-.301.225 2.371 2.371 0 01-1.189 0 .49.49 0 01-.301-.225 1.74 1.74 0 01-.238-.898z"
        />
      </defs>
      <g fill="none">
        <use fill="url(#sad-themed-icon_svg__a)" xlinkHref="#sad-themed-icon_svg__b" />
        <use fill="#000" filter="url(#sad-themed-icon_svg__c)" xlinkHref="#sad-themed-icon_svg__b" />
        <path
          fill="url(#sad-themed-icon_svg__d)"
          d="M5.333 12.765c0 .137.094.235.25.235.351 0 .836-.625 2.417-.625s2.067.625 2.417.625c.156 0 .25-.098.25-.235C10.667 12.368 9.828 11 8 11c-1.828 0-2.667 1.368-2.667 1.765"
        />
        <use fill="url(#sad-themed-icon_svg__e)" xlinkHref="#sad-themed-icon_svg__f" />
        <use fill="#000" filter="url(#sad-themed-icon_svg__g)" xlinkHref="#sad-themed-icon_svg__f" />
        <path
          fill="#4E506A"
          d="M4.616 7.986c.128.125.136.372.017.551-.12.178-.32.222-.448.096-.128-.125-.135-.372-.017-.55.12-.179.32-.222.448-.097zm6.489 0c.128.125.136.372.018.551-.12.178-.32.222-.45.096-.127-.125-.134-.372-.015-.55.119-.179.319-.222.447-.097z"
        />
        <path
          fill="url(#sad-themed-icon_svg__h)"
          d="M4.157 5.153c.332-.153.596-.219.801-.219.277 0 .451.119.55.306.175.329.096.401-.198.459-1.106.224-2.217.942-2.699 1.39-.301.28-.589-.03-.436-.274.154-.244.774-1.105 1.982-1.662zm6.335.087c.099-.187.273-.306.55-.306.206 0 .469.066.801.219 1.208.557 1.828 1.418 1.981 1.662.153.244-.134.554-.435.274-.483-.448-1.593-1.166-2.7-1.39-.294-.058-.371-.13-.197-.459z"
        />
        <path
          fill="url(#sad-themed-icon_svg__i)"
          d="M13.5 16c-.828 0-1.5-.748-1.5-1.671 0-.922.356-1.545.643-2.147.598-1.258.716-1.432.857-1.432.141 0 .259.174.857 1.432.287.602.643 1.225.643 2.147 0 .923-.672 1.671-1.5 1.671"
        />
        <path
          fill="url(#sad-themed-icon_svg__j)"
          d="M13.5 13.606c-.328 0-.594-.296-.594-.66 0-.366.141-.613.255-.852.236-.498.283-.566.339-.566.056 0 .103.068.339.566.114.24.255.486.255.851s-.266.661-.594.661"
        />
      </g>
    </svg>
  );
}

export default SvgSadThemedIcon;
