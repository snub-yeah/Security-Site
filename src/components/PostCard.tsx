'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './PostCard.module.css'

interface Post {
  id: number
  title: string
  path: string
}

interface PostCardProps {
  post: Post
  searchQuery: string
}

export default function PostCard({ post, searchQuery }: PostCardProps) {
  const router = useRouter()
  const [preview, setPreview] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await fetch(`https://snub-yeah.github.io/Security-Writeups${post.path}`)
        const text = await response.text()
        // clean up the text by removing markdown formatting
        const cleanText = text
          .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
          .replace(/[#*`_~]/g, '') 
          .replace(/\n/g, ' ') 
          .trim()
        const previewText = cleanText.substring(0, 80) + '...' // limit to 80 characters then add "..."
        setPreview(previewText)
      } catch (error) {
        console.error('Error fetching post preview:', error)
        setPreview('')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPreview()
  }, [post.path])

  const checkSearchQuery = (query: string) => {
    return post.title.toLowerCase().includes(query.toLowerCase()) || preview.toLowerCase().includes(query.toLowerCase())
  }

  const handleClick = () => {
    router.push(`/post/${post.id}`)
  }

  if (!checkSearchQuery(searchQuery)) {
    return null;
  }

  return (
    <div 
      className={styles.card}
      onClick={handleClick}
    >
      <h2 className={styles.title}>{post.title}</h2>
      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <p className={styles.preview}>{preview}</p>
      )}
    </div>
  )
} 