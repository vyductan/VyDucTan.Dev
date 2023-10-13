import { PageContainer } from "@vyductan/ui"

import { AddVocabularyModal } from "./components/AddModal"

export default function HomePage() {
  return (
    <PageContainer>
      <AddVocabularyModal />
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-pink-400">T3</span> Turbo
        </h1>
      </div>
    </PageContainer>
  )
}
