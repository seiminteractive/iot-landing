import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useTechnologyAnimations() {
  let animations = []

  const animateTechnologyHeader = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.technology-section',
        start: 'top 60%',
        end: 'top 10%',
        scrub: 1,
        markers: false,
      },
    })

    // Animar línea del header
    tl.fromTo(
      '.header-line',
      {
        scaleX: 0,
        opacity: 0,
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      0
    )

    // Animar label
    tl.fromTo(
      '.technology-label',
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      0.1
    )

    // Animar título
    tl.fromTo(
      '.technology-title',
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
      0.2
    )

    // Animar subtitle
    tl.fromTo(
      '.technology-subtitle',
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
      0.3
    )

    animations.push(tl)
  }

  const animateTimelineProgress = () => {
    // Animar la línea de progreso del timeline
    gsap.fromTo(
      '.timeline-line-progress',
      {
        scaleY: 0,
      },
      {
        scaleY: 1,
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          markers: false,
        },
        duration: 1,
        ease: 'none',
        transformOrigin: 'top',
      }
    )
  }

  const animateTimelineItems = () => {
    const items = document.querySelectorAll('.timeline-item')
    
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: item.classList.contains('item-top') ? -60 : 60,
          y: 40,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            markers: false,
          },
          duration: 0.8,
          ease: 'power2.out',
        }
      )

      // Animar el dot
      const dot = item.querySelector('.timeline-dot')
      if (dot) {
        gsap.fromTo(
          dot,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              markers: false,
            },
            duration: 0.5,
            ease: 'back.out',
            delay: 0.1,
          }
        )
      }

      // Animar la línea vertical
      const verticalLine = item.querySelector('.vertical-line')
      if (verticalLine) {
        gsap.fromTo(
          verticalLine,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              markers: false,
            },
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.15,
            transformOrigin: 'top',
          }
        )
      }

      // Animar la card
      const card = item.querySelector('.timeline-card')
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              markers: false,
            },
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.2,
          }
        )
      }
    })
  }

  const animateTimelineCardHover = () => {
    const cards = document.querySelectorAll('.timeline-card')
    
    cards.forEach((card) => {
      const dot = card.parentElement.querySelector('.timeline-dot')
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: 'power2.out',
        })

        if (dot) {
          gsap.to(dot, {
            scale: 1.3,
            boxShadow: '0 0 20px rgba(175, 227, 232, 0.6)',
            duration: 0.3,
            ease: 'back.out',
          })
        }
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })

        if (dot) {
          gsap.to(dot, {
            scale: 1,
            boxShadow: '0 0 0px #AFE3E8',
            duration: 0.3,
          })
        }
      })
    })
  }

  const animateTechLight = () => {
    // Animar el fondo de luz
    gsap.to('.tech-light-container', {
      scrollTrigger: {
        trigger: '.technology-section',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        markers: false,
      },
      opacity: 1,
      duration: 0.8,
    })
  }

  onMounted(() => {
    setTimeout(() => {
      animateTechnologyHeader()
      animateTimelineProgress()
      animateTimelineItems()
      animateTimelineCardHover()
      animateTechLight()
    }, 300)
  })

  onUnmounted(() => {
    animations.forEach(anim => anim.kill())
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
}
