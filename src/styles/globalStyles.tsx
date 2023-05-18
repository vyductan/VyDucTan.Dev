import tw, { globalStyles, theme } from 'twin.macro'

import { globalCss } from '../../stitches.config'

const customStyles = {
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
}

const styles = () => {
  globalCss(customStyles)()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalCss(globalStyles as Record<any, any>)()
}

export default styles
