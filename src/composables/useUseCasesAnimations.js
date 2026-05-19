import { onMounted, onUnmounted } from 'vue'
import { isPrerendering } from './animationUtils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addHoverListeners, afterNextPaint, isMobileLayout, isVisibleElement } from './animationUtils'

gsap.registerPlugin(ScrollTrigger)

export function useUseCasesAnimations() {
  let context
  let cancelSetup = () => {}
  let accordionObserver = null
  const cleanups = []

  const animateUseCasesHeader = () => {
    const section = document.querySelector('.use-cases-section')
    if (!isVisibleElement(section)) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
        once: true,
      },
    })

    tl.fromTo(
      '.use-cases-label',
      {
        opacity: 0,
        y: -18,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      0
    )
      .fromTo(
        '.use-cases-title',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        },
        0.08
      )
      .fromTo(
        '.use-cases-subtitle',
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.16
      )
  }

  const animateCardHover = () => {
    const cards = Array.from(document.querySelectorAll('.use-case-card'))

    cleanups.push(
      addHoverListeners(
        cards,
        (card) => {
          const icon = card.querySelector('.card-icon svg')
          if (!icon) return

          gsap.to(icon, {
            scale: 1.2,
            stroke: '#AFE3E8',
            duration: 0.25,
            ease: 'back.out(1.4)',
            overwrite: 'auto',
          })
        },
        (card) => {
          const icon = card.querySelector('.card-icon svg')
          if (!icon) return

          gsap.to(icon, {
            scale: 1,
            stroke: 'rgba(255, 255, 255, 0.4)',
            duration: 0.25,
            overwrite: 'auto',
          })
        }
      )
    )
  }

  const animateMobileAccordion = () => {
    const accordion = document.querySelector('.mobile-use-cases-accordion')
    if (!isVisibleElement(accordion) || !isMobileLayout()) return

    gsap.fromTo(
      accordion,
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
          trigger: accordion,
          start: 'top 82%',
          once: true,
        },
      }
    )

    gsap.fromTo(
      '.accordion-item',
      {
        opacity: 0,
        x: -28,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.accordion-item:first-child',
          start: 'top 88%',
          once: true,
        },
      }
    )
  }

  const animateAccordionOpen = () => {
    const accordionItems = document.querySelectorAll('.accordion-item')
    if (!accordionItems.length || !isMobileLayout()) return

    accordionObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName !== 'data-state') return

        const item = mutation.target
        const content = item.querySelector('.accordion-content')
        const innerContent = content?.querySelector('.accordion-content-inner')
        const header = item.querySelector('.accordion-header')
        const isOpen = item.getAttribute('data-state') === 'open'

        if (!content) return

        gsap.killTweensOf(content)
        if (innerContent) {
          gsap.killTweensOf(innerContent)
        }

        gsap.fromTo(
          content,
          {
            opacity: isOpen ? 0 : 1,
            y: isOpen ? -12 : 0,
          },
          {
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -12,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          }
        )

        if (innerContent) {
          gsap.fromTo(
            innerContent,
            {
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.97 : 1,
              y: isOpen ? -8 : 0,
            },
            {
              opacity: isOpen ? 1 : 0,
              scale: isOpen ? 1 : 0.97,
              y: isOpen ? 0 : -8,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            }
          )
        }

        if (header) {
          gsap.to(header, {
            x: isOpen ? 5 : 0,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      })
    })

    accordionItems.forEach((item) => {
      accordionObserver.observe(item, { attributes: true })
    })
  }

  const animateAccordionHeaderHover = () => {
    const headers = Array.from(document.querySelectorAll('.accordion-header'))

    cleanups.push(
      addHoverListeners(
        headers,
        (header) => {
          const toggle = header.querySelector('.accordion-toggle')

          gsap.to(header, {
            x: 5,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          if (toggle) {
            gsap.to(toggle, {
              scale: 1.12,
              duration: 0.25,
              ease: 'back.out(1.4)',
              overwrite: 'auto',
            })
          }
        },
        (header) => {
          const toggle = header.querySelector('.accordion-toggle')

          gsap.to(header, {
            x: 0,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          if (toggle) {
            gsap.to(toggle, {
              scale: 1,
              duration: 0.25,
              overwrite: 'auto',
            })
          }
        }
      )
    )
  }

  onMounted(() => {
    if (isPrerendering()) return
    cancelSetup = afterNextPaint(() => {
      context = gsap.context(() => {
        animateUseCasesHeader()
        animateCardHover()
        animateMobileAccordion()
        animateAccordionOpen()
        animateAccordionHeaderHover()
      })
    })
  })

  onUnmounted(() => {
    cancelSetup()
    cleanups.forEach((cleanup) => cleanup())
    accordionObserver?.disconnect()
    context?.revert()
  })
}
