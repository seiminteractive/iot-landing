import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addHoverListeners, afterNextPaint, hasFinePointer, isMobileLayout, isVisibleElement } from './animationUtils'

gsap.registerPlugin(ScrollTrigger)

export function useContactAnimations() {
  let context
  let cancelSetup = () => {}
  const cleanups = []

  const animateContactHeader = () => {
    const section = document.querySelector('.contact-section')
    if (!isVisibleElement(section)) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
        once: true,
      },
    })

    // Animar label
    tl.fromTo(
      '.contact-label',
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      0
    )

    // Animar título
    tl.fromTo(
      '.contact-title',
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      0.1
    )

    // Animar subtitle
    tl.fromTo(
      '.contact-subtitle',
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      0.2
    )

    animations.push(tl)
  }

  const animateContactButtons = () => {
    const buttons = document.querySelectorAll('.contact-btn')

    gsap.fromTo(
      buttons,
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        scrollTrigger: {
          trigger: '.contact-options',
          start: 'top 80%',
          markers: false,
        },
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
      }
    )
  }

  const animateContactButtonsHover = () => {
    const buttons = document.querySelectorAll('.contact-btn')

    cleanups.push(
      addHoverListeners(
        Array.from(buttons),
        (btn) => {
          const arrow = btn.querySelector('.contact-btn-arrow')

          gsap.to(btn, {
            y: -8,
            background: 'rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 40px rgba(175, 227, 232, 0.2)',
            borderColor: 'rgba(175, 227, 232, 0.4)',
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          if (arrow) {
            gsap.to(arrow, {
              x: 4,
              y: -4,
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
        },
        (btn) => {
          const arrow = btn.querySelector('.contact-btn-arrow')

          gsap.to(btn, {
            y: 0,
            background: 'transparent',
            boxShadow: '0 0px 0px rgba(175, 227, 232, 0)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              y: 0,
              duration: 0.25,
              overwrite: 'auto',
            })
          }
        }
      )
    )
  }

  const animateContactNote = () => {
    gsap.fromTo(
      '.contact-note',
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '.contact-note',
          start: 'top 85%',
          markers: false,
        },
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3,
      }
    )
  }

  const setupButtonPulse = () => {
    if (!hasFinePointer() || isMobileLayout()) return

    gsap.to('.contact-btn-arrow', {
      filter: 'drop-shadow(0 0 8px rgba(175, 227, 232, 0.4))',
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
    })
  }

  onMounted(() => {
    cancelSetup = afterNextPaint(() => {
      context = gsap.context(() => {
        animateContactHeader()
        animateContactButtons()
        animateContactButtonsHover()
        animateContactNote()
        setupButtonPulse()
      })
    })
  })

  onUnmounted(() => {
    cancelSetup()
    cleanups.forEach((cleanup) => cleanup())
    context?.revert()
  })
}
