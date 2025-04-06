'use client'

import { useParams, useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'
import { useEffect, useState } from 'react'

export default function Post() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  const router = useRouter()

  useEffect(() => {
    fetch(`/api/get-individual-post?id=${id}`).then((res) => {
        if (!res.ok) {
            router.push('/')
        } else {
            res.json().then((data) => {
                setPost(data)
            })
        }
    })
  }, [id])

  return (
    <div className="viewport-container">
      <div className="window-container">
        <TopBar currentPage="post" backButtonPage="/posts" />
        <main className="window">
          <h1>Post {parseInt(id as string)}</h1>
        </main>
      </div>
    </div>
  )
}