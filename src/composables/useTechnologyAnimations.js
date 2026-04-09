import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addHoverListeners, afterNextPaint, isMobileLayout, isVisibleElement } from './animationUtils'

gsap.registerPlugin(ScrollTrigger)

export function useTechnologyAnimations() {
  let context
  let cancelSetup = () => {}
  const cleanups = []

  const animateTechnologyHeader = () => {
    const section = document.querySelector('.technology-section')
    if (!isVisibleElement(section)) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
        once: true,
      },
    })

    tl.fromTo(
      '.header-line',
      {
        scaleX: 0,
        opacity: 0,
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      },
      0
    )
      .fromTo(
        '.technology-label',
        {
          opacity: 0,
          x: -24,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.06
      )
      .fromTo(
        '.technology-title',
        {
          opacity: 0,
          y: 32,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        },
        0.12
      )
      .fromTo(
        '.technology-subtitle',
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
        },
        0.2
      )
  }

  const animateTimelineProgress = () => {
    const timeline = document.querySelector('.timeline-container')
    const progress = document.querySelector('.timeline-line-progress')
    if (!isVisibleElement(timeline) || !progress) return

    const mobileLayout = isMobileLayout()

    gsap.set(progress, {
      scaleX: mobileLayout ? 1 : 0,
      scaleY: mobileLayout ? 0 : 1,
      transformOrigin: mobileLayout ? 'center top' : 'left center',
      force3D: true,
    })

    gsap.to(progress, {
      scaleX: mobileLayout ? 1 : 1,
      scaleY: mobileLayout ? 1 : 1,
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 80%',
        end: 'bottom 22%',
        scrub: mobileLayout ? true : 0.2,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    })
  }

  const animateTimelineItems = () => {
    const items = gsap.utils.toArray('.timeline-item')
    const mobileLayout = isMobileLayout()

    items.forEach((item) => {
      if (!isVisibleElement(item)) return

      const dot = item.querySelector('.timeline-dot')

      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: mobileLayout ? 0 : item.classList.contains('item-top') ? -44 : 44,
          y: mobileLayout ? 22 : 30,
          force3D: true,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: mobileLayout ? 'top 90%' : 'top 84%',
            once: true,
          },
        }
      )

      if (dot) {
        gsap.fromTo(
          dot,
          {
            scale: 0.72,
            opacity: 0,
            force3D: true,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: item,
              start: mobileLayout ? 'top 92%' : 'top 86%',
              once: true,
            },
          }
        )
      }
    })
  }

  const animateTimelineCardHover = () => {
    const cards = Array.from(document.querySelectorAll('.timeline-card'))

    cleanups.push(
      addHoverListeners(
        cards,
        (card) => {
          const dot = card.parentElement?.querySelector('.timeline-dot')

          gsap.to(card, {
            y: -10,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          if (dot) {
            gsap.to(dot, {
              scale: 1.22,
              boxShadow: '0 0 20px rgba(175, 227, 232, 0.6)',
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
        },
        (card) => {
          const dot = card.parentElement?.querySelector('.timeline-dot')

          gsap.to(card, {
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          if (dot) {
            gsap.to(dot, {
              scale: 1,
              boxShadow: '0 0 0px rgba(175, 227, 232, 0)',
              duration: 0.25,
              overwrite: 'auto',
            })
          }
        }
      )
    )
  }

  const animateTechLight = () => {
    const techLight = document.querySelector('.tech-light-container')
    const section = document.querySelector('.technology-section')

    if (!techLight || !isVisibleElement(section) || isMobileLayout()) {
      return
    }

    gsap.fromTo(
      techLight,
      {
        opacity: 0.72,
      },
      {
        opacity: 0.85,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }

  onMounted(() => {
    cancelSetup = afterNextPaint(() => {
      context = gsap.context(() => {
        animateTechnologyHeader()
        animateTimelineProgress()
        animateTimelineItems()
        animateTimelineCardHover()
        animateTechLight()
      })
    })
  })

  onUnmounted(() => {
    cancelSetup()
    cleanups.forEach((cleanup) => cleanup())
    context?.revert()
  })
}
