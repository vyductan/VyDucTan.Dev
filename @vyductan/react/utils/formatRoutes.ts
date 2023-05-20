type Route = {
  name: string
  path: string
  children?: Route[]
} & Record<string, string>

export const formatRoures = (routes: Route[]): Route[] => {
  const result: Route[] = []
  const parentPath = ''
  routes.forEach(({ name, children, ...rest }) => {
    result.push({
      ...rest,
      name,
      path: parentPath + '/' + name,
    })

    if (children) {
      formatRoures(routes)
    }
  })
  return result
}
