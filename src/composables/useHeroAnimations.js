import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addHoverListeners, afterNextPaint, hasFinePointer, isMobileLayout } from './animationUtils'

gsap.registerPlugin(ScrollTrigger)

export function useHeroAnimations() {
  let context
  let cancelSetup = () => {}
  const cleanups = []

  const animateHeroOnLoad = () => {
    const tl = gsap.timeline()

    tl.fromTo(
      '.hero-title',
      {
        opacity: 0,
        y: 40,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power2.out',
      },
      0
    )
      .fromTo(
        '.announcement-button',
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
        },
        0.35
      )
      .fromTo(
        '.scroll-indicator',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'back.out(1.5)',
        },
        0.5
      )

    if (hasFinePointer()) {
      gsap.to('.scroll-indicator svg', {
        filter: 'drop-shadow(0 0 12px rgba(175, 227, 232, 0.5))',
        duration: 1,
        delay: 1.1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }
  }

  const animateHeroOnScroll = () => {
    if (isMobileLayout()) return

    gsap.to('.hero-content', {
      y: 80,
      opacity: 0.82,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.2,
        fastScrollEnd: true,
      },
    })

    gsap.to('.light-container', {
      opacity: 0.12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'center top',
        scrub: 0.2,
        fastScrollEnd: true,
      },
    })
  }

  const setupHoverEffects = () => {
    const button = document.querySelector('.announcement-button')
    const svg = button?.querySelector('svg')

    if (!button || !svg) return

    cleanups.push(
      addHoverListeners(
        [button],
        () => {
          gsap.to(svg, {
            x: 4,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          gsap.to(button, {
            background: 'rgba(255, 255, 255, 0.08)',
            duration: 0.25,
            overwrite: 'auto',
          })
        },
        () => {
          gsap.to(svg, {
            x: 0,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          gsap.to(button, {
            background: 'transparent',
            duration: 0.25,
            overwrite: 'auto',
          })
        }
      )
    )
  }

  onMounted(() => {
    cancelSetup = afterNextPaint(() => {
      context = gsap.context(() => {
        animateHeroOnLoad()
        animateHeroOnScroll()
        setupHoverEffects()
      })
    })
  })

  onUnmounted(() => {
    cancelSetup()
    cleanups.forEach((cleanup) => cleanup())
    context?.revert()
  })
}
