'use client'

import TopBar from '@/components/TopBar'
import Image from 'next/image'

export default function Home() {
  
  return (
    <div className="viewport-container">
      <div className="window-container">
        <TopBar currentPage="about" backButtonPage="/" />
        <main className="window">
          <div className="text-content" >
            <div className="text-content-header">
              {/* this is the cat typing gif, had to replace it with Image cuz i had an issue with the normal img tag */}
              <Image 
                src="/images/type.png" 
                alt='cat typing gif'
                width={400}
                height={400}
                className="cat-image"
              />
              <h1>About me</h1>
            </div>
            <p>Hi! I&apos;m <em style={{color: 'var(--accent)'}}>snub-yeah</em>, a security researcher and developer.</p>
            <p>This is a site I made to share random cybersecurity related posts or hacking writeups.</p>
            <p>This site is built with Next.js, Tailwind CSS, and Anime.js for animations. 
                You can <a target="_blank" style={{color: 'var(--accent)', fontWeight: 'bold'}} href="https://github.com/snub-yeah/Security-Site"> visit the repository for this site here</a>.</p>
            <p>For now, you can visit my <a target="_blank" style={{color: 'var(--accent)', fontWeight: 'bold'}} href="https://github.com/snub-yeah">GitHub</a> for more information.
            In the near future, you can look forward to more contact methods on this site.</p>
          </div>
        </main>
      </div>
    </div>
  )
}