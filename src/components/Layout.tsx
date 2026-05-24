import type { ReactNode } from 'react'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-[#f3f4f6]">
      <main className="mx-auto w-full max-w-lg px-4 py-8 sm:py-12">{children}</main>
    </div>
  )
}
