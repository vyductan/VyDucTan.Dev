import { useSelectedLayoutSegments } from 'next/navigation'
import { create } from 'zustand'

type AppState = {
  segments: string[]
  updateSegments: (segments: string[]) => void
}
export const useAppStore = create<AppState>((set) => ({
  segments: [],
  updateSegments: (segments) => set(() => ({ segments })),
}))
