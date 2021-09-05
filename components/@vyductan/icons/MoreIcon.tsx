import * as React from 'react';

function SvgMoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="more-icon_svg__icon"
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
            '@font-face{font-family:feedback-iconfont;src:url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix) format(&quot;embedded-opentype&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2) format(&quot;woff2&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff) format(&quot;woff&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf) format(&quot;truetype&quot;),url(//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont) format(&quot;svg&quot;)}'
          }
        </style>
      </defs>
      <path d="M113.30000000000001 511.5a94 94 0 10188 0 94 94 0 10-188 0zM418 511.5a94 94 0 10188 0 94 94 0 10-188 0zM722.7 511.5a94 94 0 10188 0 94 94 0 10-188 0z" />
    </svg>
  );
}

export default SvgMoreIcon;
