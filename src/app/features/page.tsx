import { Link } from '@vyductan/react'
import React from 'react'

import { FEATURES_ROUTES } from '../routes'

export default function FeaturesPage() {
  return (
    <div>
      {FEATURES_ROUTES.routes?.map(({ label, path }) => (
        <div key={path}>
          <Link href={path}>{label}</Link>
        </div>
      ))}
    </div>
  )
}
