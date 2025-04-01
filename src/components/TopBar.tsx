'use client'

import { useRouter } from 'next/navigation'

export default function TopBar() {
  const router = useRouter()

  return (
    <div className="topBar">
      <button className="backButton" onClick={() => router.push('/')}>
        &lt;-
      </button>
      <p>main.page</p>
      <button className="backButton" onClick={() => router.push('/posts')}>
        posts
      </button>
    </div>
  )
} 