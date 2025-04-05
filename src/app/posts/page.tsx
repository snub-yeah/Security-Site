'use client'

import TopBar from '@/components/TopBar'
import PostCard from '@/components/PostCard'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  title: string
  path: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    fetch('/api/get-posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, [])

  return (
    <div className="viewport-container">
      <div className="window-container">
        <TopBar currentPage="posts" />
        <main className="window">
          <div className="text-content">
            <div className="flex flex-col items-center gap-4 mb-8">
              <p className="text-center text-2xl font-bold">Select a post to view.</p>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-1/2 p-2 rounded-md bg-foreground border border-border text-text focus:outline-none focus:border-accent"
              />
            </div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} searchQuery={searchQuery} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}