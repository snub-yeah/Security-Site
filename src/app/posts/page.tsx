'use client'

import TopBar from '@/components/TopBar'
import { useEffect, useState } from 'react'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/get-posts')
      .then(res => res.json())
      .then(data => setPosts(data));
      console.log(posts)
  }, [])

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