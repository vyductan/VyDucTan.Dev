import { addDynamicIconSelectors } from '@iconify/tailwind'
import { type Config } from 'tailwindcss'
import defaultColors from 'tailwindcss/colors'
import { borderRadius, fontSize, screens } from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './@vyductan/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      libre: ['librebaskerville', 'serif'],
    },
    screens: {
      xs: '475px',
      ...screens,
    },
    extend: {
      borderRadius: {
        base: borderRadius.md,
      },
      borderColor: {
        'color-base': defaultColors.gray['500'],
      },
      colors: {
        primary: {
          '50': '#fffaec',
          '100': '#fff4d3',
          '200': '#ffe6a5',
          '300': '#ffd26d',
          '400': '#ffb332',
          '500': '#ff9a0a',
          '600': '#ff8200',
          '700': '#cc5f02',
          '800': '#a1490b',
          '900': '#823e0c',
          '950': '#461d04',
        },
        // brand: {
        //   '50': '#fffaec',
        //   '100': '#fff4d3',
        //   '200': '#ffe6a5',
        //   '300': '#ffd26d',
        //   '400': '#ffb332',
        //   '500': '#ff9a0a',
        //   '600': '#ff8200',
        //   '700': '#cc5f02',
        //   '800': '#a1490b',
        //   '900': '#823e0c',
        //   '950': '#461d04',
        // },
        error: defaultColors.red['500'],
      },
      fontSize: {
        md: fontSize.base,
        base: fontSize.sm,
      },
      maxWidth: ({ theme }) => ({
        '2/3': theme('width.2/3') as string,
      }),
      // maxWidth: {
      //   // '1/2': width['1/2'],
      //   // '2/3': width.,
      // },

      height: ({ theme }) => ({
        xxs: theme('spacing.6') as string,
        xs: theme('spacing.7') as string,
        sm: theme('spacing.8') as string,
        md: theme('spacing.9') as string,
        lg: theme('spacing.10') as string,
        xl: theme('spacing.12') as string,
      }),
      // height: ({theme}) => ({
      //   sm: theme("height.6"),
      //   base: theme("height.8"),
      //   lg: spacing['10'],
      // }),
      spacing: {
        md: '24px',
      },
      transitionProperty: {
        border: 'border',
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), addDynamicIconSelectors()],
} satisfies Config
