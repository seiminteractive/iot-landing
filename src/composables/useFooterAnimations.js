import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addHoverListeners, afterNextPaint, isMobileLayout, isVisibleElement } from './animationUtils'

gsap.registerPlugin(ScrollTrigger)

export function useFooterAnimations() {
  let context
  let cancelSetup = () => {}
  const cleanups = []

  const animateFooterLight = () => {
    // Animar el fondo de luz del footer
    gsap.fromTo(
      '.footer-light',
      {
        opacity: 0,
      },
      {
        opacity: 1,
          scrollTrigger: {
            trigger: '.main-footer',
            start: 'top 82%',
            once: true,
          },
        duration: 0.8,
      }
    )
  }

  const animateFooterBrand = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.footer-brand',
        start: 'top 88%',
        once: true,
      },
    })

    // Animar logo
    tl.fromTo(
      '.footer-logo',
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out',
      },
      0
    )

    // Animar texto
    tl.fromTo(
      '.footer-about',
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.2
    )

    animations.push(tl)
  }

  const animateFooterColumns = () => {
    const columns = document.querySelectorAll('.footer-column:not(.footer-brand)')

    gsap.fromTo(
      columns,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '.footer-grid',
          start: 'top 85%',
          markers: false,
        },
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }
    )
  }

  const animateFooterTitles = () => {
    const titles = document.querySelectorAll('.footer-title')

    titles.forEach((title) => {
      gsap.fromTo(
        title,
        {
          opacity: 0,
          letterSpacing: '-2px',
        },
        {
          opacity: 1,
          letterSpacing: '1px',
          scrollTrigger: {
            trigger: title,
            start: 'top 90%',
            markers: false,
          },
          duration: 0.5,
          ease: 'power2.out',
        }
      )
    })
  }

  const animateFooterLinks = () => {
    const linkItems = document.querySelectorAll('.footer-links li')

    linkItems.forEach((li) => {
      const link = li.querySelector('a')
      
      gsap.fromTo(
        li,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: li,
            start: 'top 92%',
            markers: false,
          },
          duration: 0.4,
          ease: 'power2.out',
        }
      )

      // Hover effect en links
      if (!link) return
    })

    const links = Array.from(document.querySelectorAll('.footer-links li a'))

    cleanups.push(
      addHoverListeners(
        links,
        (link) => {
          gsap.to(link, {
            x: 5,
            color: '#AFE3E8',
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        },
        (link) => {
          gsap.to(link, {
            x: 0,
            color: 'rgba(255, 255, 255, 0.6)',
            duration: 0.2,
            overwrite: 'auto',
          })
        }
      )
    )
  }

  const animateFooterBottom = () => {
    gsap.fromTo(
      '.footer-bottom',
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '.footer-bottom',
          start: 'top 95%',
          markers: false,
        },
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.2,
      }
    )
  }

  onMounted(() => {
    cancelSetup = afterNextPaint(() => {
      context = gsap.context(() => {
        if (!isVisibleElement(document.querySelector('.main-footer'))) return

        animateFooterLight()
        animateFooterBrand()
        animateFooterColumns()
        animateFooterTitles()
        animateFooterLinks()
        animateFooterBottom()
      })
    })
  })

  onUnmounted(() => {
    cancelSetup()
    cleanups.forEach((cleanup) => cleanup())
    context?.revert()
  })
}
