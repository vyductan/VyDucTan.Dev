import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const clsm = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
