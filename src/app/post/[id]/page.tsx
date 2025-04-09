'use client'

import { useParams, useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'
import { useEffect, useState } from 'react'
// the posts are stored as markdown, so this is using react markdown to transform it.
import Markdown from 'react-markdown'
import styles from './Post.module.css'

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
                //get the markdown stuff from the JSON object
                const mdData = data.markdown;
                setPost(mdData)
            })
        }
    })
  }, [id])

  return (
    <div className="viewport-container">
      <div className="window-container">
        <TopBar currentPage="post" backButtonPage="/posts" />
        <main className="window">
          <div className={styles.postContainer}>
            <h1>Post {parseInt(id as string)}</h1>
            <Markdown>{post}</Markdown>
          </div>
        </main>
      </div>
    </div>
  )
}