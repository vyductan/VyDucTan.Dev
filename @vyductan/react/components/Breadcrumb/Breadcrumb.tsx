import { Link } from '../Link'
import { type Route } from '../Menu'

export type BreadCrumbItemType = Route
export type BreadcrumbProps = {
  items: BreadCrumbItemType[]
}
export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  if (items.length === 0) {
    return null
  }
  return (
    <ul>
      {items.map(({ label, path }) => {
        return (
          <li key={path}>
            <Link href={path}>{label}</Link>
          </li>
        )
      })}
    </ul>
  )
}
