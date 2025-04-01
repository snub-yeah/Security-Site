'use client'

import TopBar from '@/components/TopBar'

export default function Home() {
  return (
    <div className="viewport-container">
      <div className="window-container">
        <TopBar />
        <main className="window">
          <div className="text-content">
            <p>Select a post to view.</p>
          </div>
        </main>
      </div>
    </div>
  )
}