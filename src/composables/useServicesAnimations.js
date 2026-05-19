import { onMounted, onUnmounted } from 'vue'
import { isPrerendering } from './animationUtils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addHoverListeners, afterNextPaint, isMobileLayout, isVisibleElement } from './animationUtils'

gsap.registerPlugin(ScrollTrigger)

export function useServicesAnimations() {
  let context
  let cancelSetup = () => {}
  const cleanups = []

  const animateServicesSection = () => {
    const desktopWrapper = document.querySelector('.desktop-services')
    if (!isVisibleElement(desktopWrapper) || isMobileLayout()) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 72%',
        once: true,
      },
    })

    tl.fromTo(
      '.nav-label',
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: 'power2.out',
      },
      0
    )
      .fromTo(
        '.service-item',
        {
          opacity: 0,
          x: -36,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
        },
        0.12
      )
      .fromTo(
        '.service-detail',
        {
          opacity: 0,
          x: 40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: 'power2.out',
        },
        0.22
      )
      .fromTo(
        '.dot-indicator',
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'back.out(1.6)',
        },
        0.28
      )
  }

  const animateMobileCarousel = () => {
    const carousel = document.querySelector('.mobile-services-carousel')
    if (!isVisibleElement(carousel) || !isMobileLayout()) return

    gsap.fromTo(
      carousel,
      {
        opacity: 0,
        y: 36,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: carousel,
          start: 'top 82%',
          once: true,
        },
      }
    )

    gsap.fromTo(
      '.carousel-dot',
      {
        opacity: 0,
        scale: 0.6,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.07,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.carousel-dots',
          start: 'top 88%',
          once: true,
        },
      }
    )
  }

  const animateDots = () => {
    const dots = Array.from(document.querySelectorAll('.dot-indicator, .carousel-dot'))

    cleanups.push(
      addHoverListeners(
        dots,
        (dot) => {
          gsap.to(dot, {
            scale: 1.3,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        },
        (dot) => {
          gsap.to(dot, {
            scale: dot.classList.contains('active') ? 1.2 : 1,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      )
    )
  }

  onMounted(() => {
    if (isPrerendering()) return
    cancelSetup = afterNextPaint(() => {
      context = gsap.context(() => {
        animateServicesSection()
        animateMobileCarousel()
        animateDots()
      })
    })
  })

  onUnmounted(() => {
    cancelSetup()
    cleanups.forEach((cleanup) => cleanup())
    context?.revert()
  })
}
