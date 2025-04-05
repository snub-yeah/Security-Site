'use client'

import { useRouter } from 'next/navigation'
import { useScrollDirection } from '@/hooks/useScrollDirection'

interface TopBarProps {
  currentPage: string
}

export default function TopBar({ currentPage }: TopBarProps) {
  const router = useRouter()
  const isVisible = useScrollDirection()

  return (
    <div className={`topBar ${isVisible ? 'visible' : 'hidden'}`}>
      <button className="backButton" onClick={() => router.push('/')}>
        &lt;-
      </button>
      <p>{currentPage}.page</p>
      <button className="backButton" onClick={() => router.push('/posts')}>
        posts
      </button>
    </div>
  )
} 