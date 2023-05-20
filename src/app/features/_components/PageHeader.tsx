import { Breadcrumb, H1 } from '@vyductan/react'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'

import { getBreadcrumbItemsFromSegments, getRouteByPath } from '~/app/routes'

export const PageHeader = () => {
  const segments = useSelectedLayoutSegments()
  const breadcrumbItems = getBreadcrumbItemsFromSegments(segments)

  const pathName = usePathname()
  const { pageName } = getRouteByPath(pathName)

  console.log('p', pathName)

  return (
    <div className='flex h-16 items-center py-6'>
      <Breadcrumb items={breadcrumbItems} />
      <H1>{pageName}</H1>
    </div>
  )
}
