import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const SCROLLED_BACKGROUND = 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(175, 227, 232, 0.03) 50%, rgba(255, 255, 255, 0.04) 100%)'
const SCROLL_THRESHOLD = 4

export function useNavbarScrollEffect() {
  let scrollListener = null
  let activeTween = null
  let isScrolled = null

  const applyNavbarState = (header, nextIsScrolled, immediate = false) => {
    if (!header || isScrolled === nextIsScrolled) return

    isScrolled = nextIsScrolled
    activeTween?.kill()

    activeTween = gsap.to(header, {
      background: nextIsScrolled ? SCROLLED_BACKGROUND : 'transparent',
      borderBottom: nextIsScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
      boxShadow: nextIsScrolled ? '0 4px 16px 0 rgba(175, 227, 232, 0.03)' : 'none',
      duration: immediate ? 0 : 0.22,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    header.style.setProperty('--header-opacity', nextIsScrolled ? '1' : '0')
  }

  onMounted(() => {
    const header = document.querySelector('.header')
    if (!header) return

    let ticking = false

    const updateNavbarStyle = (immediate = false) => {
      applyNavbarState(header, window.scrollY > SCROLL_THRESHOLD, immediate)
    }

    updateNavbarStyle(true)

    scrollListener = () => {
      if (ticking) return

      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        updateNavbarStyle()
      })
    }

    window.addEventListener('scroll', scrollListener, { passive: true })
  })

  onUnmounted(() => {
    activeTween?.kill()

    if (scrollListener) {
      window.removeEventListener('scroll', scrollListener)
    }
  })
}
