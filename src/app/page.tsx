'use client'

import anime from 'animejs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'

export default function Home() {

  useEffect(() => {
    // header
    anime({
      targets: '.text-content-header h1',
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutCubic',
      delay: 500
    })

    anime({
      targets: '.text-content-header h1',
      scale: [0.95, 1.05, 1],
      duration: 500,
      easing: 'easeOutCubic',
      delay: 300
    })

    // subtext
    anime({
      targets: '.text-content p',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1200,
      easing: 'easeOutCubic',
      delay: 1300
    })
  }, [])

  const router = useRouter()



  return (
    <div className="viewport-container">
      <div className="window-container">
        <TopBar />
        <main className="window">
          <div className="text-content">
            <div className="text-content-header">
              <h1>snub-yeah</h1>
            </div>
            <p>This is a site for my security writeups.</p>
          </div>
        </main>
      </div>
    </div>
  )
}