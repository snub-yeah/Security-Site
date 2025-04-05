import { useState, useEffect } from 'react'

// custom hook to control navbar visibility based on scroll direction
export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      // show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
      ticking = false
    }

    // throttles scroll event for better performance
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          controlNavbar()
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)
    
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [lastScrollY])

  return isVisible
} 