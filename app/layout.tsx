import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Viral Video Automator',
  description: 'Automate trend discovery, scriptwriting, video creation, and uploads',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Viral Video Automator</h1>
            <a className="button" href="https://agentic-45755201.vercel.app" target="_blank" rel="noreferrer">Production</a>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
