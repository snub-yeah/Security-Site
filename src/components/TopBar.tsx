'use client'

import { useScrollDirection } from '@/hooks/useScrollDirection'
import Link from 'next/link'

interface TopBarProps {
  currentPage: string
  backButtonPage: string
}

export default function TopBar({ currentPage, backButtonPage }: TopBarProps) {
  const isVisible = useScrollDirection()

  return (
    <div className={`topBar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="topBar-left">
      <Link href={backButtonPage} className="backButton">
      ←
      </Link>
      <p>{currentPage}.page</p>
      </div>
      <div className="hyperlinks">
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/about">About</Link>
      </div>
    </div>
  )
} 