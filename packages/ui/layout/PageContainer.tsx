import { ReactNode } from "react"

type PageContainerProps = {
  children: ReactNode
}
const PageContainer = ({ children }: PageContainerProps) => {
  return <main>{children}</main>
}

export default PageContainer
