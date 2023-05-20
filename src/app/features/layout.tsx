'use client'

import { type ReactNode } from 'react'

import { PageHeader } from './_components/PageHeader'
import { FeaturesSidebar } from './_components/Sidebar'

type FeaturesLayoutProps = {
  children: ReactNode
}
const FeaturesLayout = ({ children }: FeaturesLayoutProps) => {
  return (
    <>
      <header className='h-16'></header>
      <main className='mt-6 lg:flex'>
        <FeaturesSidebar>Sidebar</FeaturesSidebar>
        <div className='mx-4 grow'>
          <PageHeader />
          <div className='my-6'>{children}</div>
        </div>
      </main>
    </>
  )
}

export default FeaturesLayout
