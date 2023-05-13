import 'antd/dist/reset.css'
import '../styles/globals.css'

import { getCssText } from 'stitches.config'

import { TrpcProvider } from '~/utils/trpc-provider'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <style
          id='stitches'
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </head>
      <body>
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  )
}
