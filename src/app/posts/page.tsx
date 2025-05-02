'use client'

import TopBar from '@/components/TopBar'
import PostCard from '@/components/PostCard'
import { useEffect, useState, useRef } from 'react'
import anime from 'animejs'

interface Post {
  id: number
  title: string
  path: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isReadyToShowPosts, setIsReadyToShowPosts] = useState(false)
  const [sortMethod, setSortMethod] = useState<string>('date')
  const postsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/get-posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        
        // wait to make sure frame is ready and rendered
        requestAnimationFrame(() => {
          if (postsContainerRef.current) {
            const postElements = Array.from(postsContainerRef.current.children) as HTMLElement[]
            
            // animate each of the posts
            anime({
              targets: postElements,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 500,
              easing: 'easeOutQuad',
              delay: anime.stagger(100)
            })
          }
          setIsReadyToShowPosts(true)
        })
      });
  }, [])

  const sortPosts = (posts: Post[]) => {
    let sortedPosts = [...posts];
    
    if (sortMethod === 'title') {
      //claude sorting method
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortMethod === 'title-desc') {
      sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortMethod === 'date') {
      //currently does nothing
      return;
    }
    
    setPosts(sortedPosts);
  }

  useEffect(() => {
    sortPosts(posts)
  }, [sortMethod])

  return (
    <div className="viewport-container">
      <div className="window-container">
        <TopBar currentPage="posts" backButtonPage="/" />
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
              <select
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value)}
                className="w-1/2 p-1 rounded-md bg-foreground border border-border text-text focus:outline-none focus:border-accent"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title A-Z</option>
                <option value="title-desc">Sort by Title Z-A</option>
              </select>
            </div>
            <div ref={postsContainerRef} style={{ visibility: isReadyToShowPosts ? 'visible' : 'hidden' }}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} searchQuery={searchQuery} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}