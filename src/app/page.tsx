'use client'

import anime from 'animejs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'
import Image from 'next/image'

export default function Home() {
  const [isReadyToShowContent, setIsReadyToShowContent] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsReadyToShowContent(true)
    })

    // header
    anime({
      targets: '.text-content-header',
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutCubic',
      delay: 500
    })

    anime({
      targets: '.text-content-header',
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

    // advertisement section
    anime({
      targets: '.advertisement p',
      opacity: [0, 0.7],
      translateY: [20, 0],
      duration: 800,
      easing: 'easeOutCubic',
      delay: 2000
    })

    anime({
      targets: '.advertisement button',
      opacity: [0, 0.9],
      translateY: [20, 0],
      duration: 800,
      easing: 'easeOutCubic',
      delay: 2200
    })

    // arrows animation
    anime({
      targets: '.arrow',
      opacity: [0, 0.7, 0],
      translateY: [-10, 10],
      delay: anime.stagger(200, {start: 2400}),
      duration: 1000,
      loop: true,
      easing: 'easeInOutSine'
    })
  }, [])

  const router = useRouter()

  const onHoverOverCat = (e: React.MouseEvent) => {
    setIsTooltipVisible(true)
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const onHoverLeaveCat = () => {
    setIsTooltipVisible(false)
  }

  /**
   * Method to calculate the position of the cursor when hovering over the cat image
   * @param event <-- React mouse event, which has a clientX and a clientY.
   */
  const onMouseMove = (event: React.MouseEvent) => {
    if (isTooltipVisible) {
      setMousePos({ x: event.clientX, y: event.clientY })
    }
  }

  return (
    <div className="viewport-container">
      <div className="window-container">
        <TopBar currentPage="main" backButtonPage="/" />
        <main className="window">
          <div className="text-content" style={{ visibility: isReadyToShowContent ? 'visible' : 'hidden' }}>
            <div className="text-content-header">
              {/* this is the cat typing gif, had to replace it with Image cuz i had an issue with the normal img tag */}
              <Image 
                src="/images/type.png" 
                alt='cat typing gif'
                width={500}
                height={500}
                className="cat-image"
                onMouseOver={onHoverOverCat} 
                onMouseLeave={onHoverLeaveCat}
                onMouseMove={onMouseMove}
              />
              <h1>snub-yeah</h1>
            </div>
            <span
              className={`cursor-tooltip ${isTooltipVisible ? 'visible' : ''}`}
              style={{
                left: `${mousePos.x + 15}px`,
                top: `${mousePos.y + 15}px`,
              }}
            >
              ← this is me
            </span>
            <p>This is a site for my security writeups.</p>
          </div>
          <div className="advertisement" style={{ visibility: isReadyToShowContent ? 'visible' : 'hidden' }}>
            <p>Click below to see posts</p>
            <div className="arrow-container">
              <div className="arrow">▼</div>
              <div className="arrow">▼</div>
              <div className="arrow">▼</div>
            </div>
            <button onClick={() => router.push('/posts')}>Posts</button>
          </div>
        </main>
      </div>
    </div>
  )
}