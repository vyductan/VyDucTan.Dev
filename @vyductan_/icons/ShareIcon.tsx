import * as React from "react";

function SvgShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="share-icon_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden="true"
      fill="currentColor"
      {...props}
    >
      <defs>
        <style>
          {
            "@font-face{font-family:feedback-iconfont;src:url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix) format(&quot;embedded-opentype&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2) format(&quot;woff2&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff) format(&quot;woff&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf) format(&quot;truetype&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont) format(&quot;svg&quot;)}"
          }
        </style>
      </defs>
      <path d="M704 755.8H204.8V396.4h115S348 357 405.2 320H166.4c-21.2 0-38.4 17-38.4 38.2V794c0 21 17.2 38.2 38.4 38.2h576c21.2 0 38.4-17 38.4-38.2V576L704 638.8v117zM640 448v127.8l256-191L640 192v119.4C330.4 311.4 320 640 320 640c87.6-143 152-192 320-192z" />
    </svg>
  );
}

export default SvgShareIcon;
