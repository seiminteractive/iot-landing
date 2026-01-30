import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useUseCasesAnimations() {
  let animations = []

  const animateUseCasesHeader = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.use-cases-section',
        start: 'top 60%',
        end: 'top 20%',
        scrub: 1,
        markers: false,
      },
    })

    // Animar label
    tl.fromTo(
      '.use-cases-label',
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
      '.use-cases-title',
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
      '.use-cases-subtitle',
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

  const animateUseCaseCards = () => {
    // Animar cards en desktop con stagger
    gsap.fromTo(
      '.desktop-use-cases .use-case-card',
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        scrollTrigger: {
          trigger: '.desktop-use-cases',
          start: 'top 75%',
          markers: false,
        },
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      }
    )
  }

  const animateCardHover = () => {
    const cards = document.querySelectorAll('.use-case-card')
    
    cards.forEach((card) => {
      const icon = card.querySelector('.card-icon svg')
      
      card.addEventListener('mouseenter', () => {
        if (icon) {
          gsap.to(icon, {
            scale: 1.2,
            stroke: 'rgba(255, 200, 120, 0.9)',
            duration: 0.3,
            ease: 'back.out',
          })
        }
      })

      card.addEventListener('mouseleave', () => {
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            stroke: 'rgba(255, 255, 255, 0.4)',
            duration: 0.3,
          })
        }
      })
    })
  }

  const animateMobileAccordion = () => {
    // Animar el accordion en mobile
    gsap.fromTo(
      '.mobile-use-cases-accordion',
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '.mobile-use-cases-accordion',
          start: 'top 80%',
          markers: false,
        },
        duration: 0.8,
        ease: 'power2.out',
      }
    )

    // Animar items individuales
    gsap.fromTo(
      '.accordion-item',
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: '.accordion-item:first-child',
          start: 'top 85%',
          markers: false,
        },
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }
    )
  }

  const animateAccordionOpen = () => {
    // Observar cambios en los accordion items cuando se abren/cierran
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-state') {
          const item = mutation.target
          const content = item.querySelector('.accordion-content')
          
          if (content) {
            const state = item.getAttribute('data-state')
            
            if (state === 'open') {
              // Animar cuando se ABRE
              gsap.killTweensOf(content)
              gsap.killTweensOf(content.querySelector('.accordion-content-inner'))
              
              gsap.fromTo(
                content,
                {
                  opacity: 0,
                  y: -15,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: 'power2.out',
                }
              )

              // Animar los elementos internos
              const innerContent = content.querySelector('.accordion-content-inner')
              if (innerContent) {
                gsap.fromTo(
                  innerContent,
                  {
                    opacity: 0,
                    scale: 0.95,
                    y: -10,
                  },
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: 0.1,
                  }
                )
              }

              // Animar el header
              const header = item.querySelector('.accordion-header')
              if (header) {
                gsap.to(header, {
                  x: 5,
                  duration: 0.3,
                  ease: 'power2.out',
                })
              }
            } else if (state === 'closed') {
              // Animar cuando se CIERRA (igual que apertura)
              gsap.killTweensOf(content)
              gsap.killTweensOf(content.querySelector('.accordion-content-inner'))
              
              gsap.fromTo(
                content,
                {
                  opacity: 1,
                  y: 0,
                },
                {
                  opacity: 0,
                  y: -15,
                  duration: 0.5,
                  ease: 'power2.out',
                }
              )

              // Animar los elementos internos al cerrar
              const innerContent = content.querySelector('.accordion-content-inner')
              if (innerContent) {
                gsap.fromTo(
                  innerContent,
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  },
                  {
                    opacity: 0,
                    scale: 0.95,
                    y: -10,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: 0.1,
                  }
                )
              }

              // Animar el header al cerrar
              const header = item.querySelector('.accordion-header')
              if (header) {
                gsap.to(header, {
                  x: 0,
                  duration: 0.3,
                  ease: 'power2.out',
                })
              }
            }
          }
        }
      })
    })

    // Configurar observer para todos los accordion items
    const accordionItems = document.querySelectorAll('.accordion-item')
    accordionItems.forEach((item) => {
      observer.observe(item, { attributes: true })
    })
  }

  const animateAccordionHeaderHover = () => {
    const headers = document.querySelectorAll('.accordion-header')
    
    headers.forEach((header) => {
      const toggle = header.querySelector('.accordion-toggle')
      
      header.addEventListener('mouseenter', () => {
        gsap.to(header, {
          x: 5,
          duration: 0.3,
          ease: 'power2.out',
        })

        if (toggle) {
          gsap.to(toggle, {
            scale: 1.15,
            duration: 0.3,
            ease: 'back.out',
          })
        }
      })

      header.addEventListener('mouseleave', () => {
        gsap.to(header, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        })

        if (toggle) {
          gsap.to(toggle, {
            scale: 1,
            duration: 0.3,
          })
        }
      })
    })
  }

  onMounted(() => {
    setTimeout(() => {
      animateUseCasesHeader()
      animateUseCaseCards()
      animateCardHover()
      animateMobileAccordion()
      animateAccordionOpen()
      animateAccordionHeaderHover()
    }, 300)
  })

  onUnmounted(() => {
    animations.forEach(anim => anim.kill())
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
}
