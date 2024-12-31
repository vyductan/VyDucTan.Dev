import type { IconWrapperProps } from "./wrapper";
import { IconWrapper } from "./wrapper";

export const CsvIcon = (props: Omit<IconWrapperProps, "children">) => {
  return (
    <IconWrapper aria-label="csv" {...props}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 512 512"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#00a651"
          stroke="none"
        >
          <path
            d="M915 4781 c-53 -22 -50 37 -53 -1113 l-2 -1068 -134 0 c-116 0 -135
-2 -149 -18 -16 -17 -17 -89 -17 -824 0 -767 1 -806 18 -821 15 -14 42 -17
150 -17 l131 0 3 -270 c3 -265 3 -270 26 -292 l23 -23 1649 0 1649 0 23 23
c23 22 23 27 26 292 l3 270 133 0 c116 0 135 2 149 18 16 17 17 89 17 824 0
767 -1 806 -18 821 -15 14 -42 17 -150 17 l-132 0 -2 1070 -3 1069 -23 23 -23
23 -1637 2 c-900 1 -1646 -2 -1657 -6z m3185 -1161 l0 -1020 -1540 0 -1540 0
0 1020 0 1020 1540 0 1540 0 0 -1020z m-2154 -1411 c77 -29 163 -113 187 -183
28 -81 27 -81 -68 -105 -117 -29 -119 -29 -146 26 -28 55 -60 81 -111 89 -58
10 -106 -4 -148 -42 -57 -51 -73 -109 -68 -242 4 -133 27 -189 92 -227 100
-59 207 -12 246 108 7 21 18 41 26 44 14 5 170 -43 191 -59 25 -20 -25 -134
-90 -205 -126 -137 -383 -150 -537 -27 -100 80 -149 186 -157 339 -9 168 26
289 108 380 54 59 141 108 219 125 68 14 189 4 256 -21z m804 2 c30 -11 71
-34 92 -51 49 -40 88 -121 88 -181 l0 -47 -99 -7 c-103 -7 -121 -4 -121 21 0
25 -29 73 -51 85 -32 17 -131 14 -168 -5 -22 -12 -31 -24 -31 -42 0 -31 41
-51 185 -89 132 -34 194 -64 243 -115 51 -52 67 -96 67 -190 0 -62 -5 -84 -27
-126 -52 -99 -145 -151 -294 -161 -228 -16 -373 77 -413 267 -10 47 -10 56 4
66 16 12 183 29 193 20 3 -3 15 -29 26 -58 29 -72 69 -98 150 -98 70 0 121 24
136 66 21 55 -10 76 -178 123 -170 47 -240 90 -282 171 -78 154 14 325 200
367 76 17 212 10 280 -16z m545 -266 c50 -148 94 -277 97 -285 2 -8 47 113
100 270 l95 285 108 3 c60 1 112 -1 117 -6 5 -5 -61 -203 -149 -451 l-158
-442 -113 3 -114 3 -154 430 c-84 237 -154 438 -154 448 0 16 10 17 116 15
l116 -3 93 -270z m805 -1245 l0 -220 -1540 0 -1540 0 0 220 0 220 1540 0 1540
0 0 -220z"
          />
          <path
            d="M1365 4203 c-56 -14 -76 -91 -34 -129 21 -18 55 -19 1229 -19 1174 0
1208 1 1229 19 29 26 29 86 0 112 -20 18 -56 19 -1213 20 -655 1 -1200 0
-1211 -3z"
          />
          <path
            d="M1365 3643 c-56 -14 -76 -91 -34 -129 21 -18 55 -19 1229 -19 1174 0
1208 1 1229 19 29 26 29 86 0 112 -20 18 -56 19 -1213 20 -655 1 -1200 0
-1211 -3z"
          />
          <path
            d="M1365 3083 c-56 -14 -76 -91 -34 -129 21 -18 55 -19 1229 -19 1174 0
1208 1 1229 19 29 26 29 86 0 112 -20 18 -56 19 -1213 20 -655 1 -1200 0
-1211 -3z"
          />
        </g>
      </svg>
    </IconWrapper>
  );
};