import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addHoverListeners, afterNextPaint, isMobileLayout, isVisibleElement } from './animationUtils'

gsap.registerPlugin(ScrollTrigger)

export function useSolutionAnimations() {
  let context
  let cancelSetup = () => {}
  const cleanups = []

  const animateSolutionSection = () => {
    const section = document.querySelector('.solution-section')
    if (!isVisibleElement(section)) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
        once: true,
      },
    })

    // Animar columna izquierda (Overview)
    tl.fromTo(
      '.solution-column-left',
      {
        opacity: 0,
        x: -60,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      0
    )

    // Animar label y título izquierda
    tl.fromTo(
      '.solution-column-left .solution-label',
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
      0.1
    )

    // Animar títulos
    tl.fromTo(
      '.solution-column-left .solution-column-title',
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      0.2
    )

    // Animar textos con stagger
    tl.fromTo(
      '.solution-column-left .solution-text',
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      },
      0.3
    )

    // Animar columna central (Plataforma)
    tl.fromTo(
      '.solution-column-center',
      {
        opacity: 0,
        scale: 0.95,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      },
      0.2
    )

    // Animar label central
    tl.fromTo(
      '.solution-column-center .solution-label',
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
      0.3
    )

    // Animar título central con efecto especial
    tl.fromTo(
      '.solution-main-title',
      {
        opacity: 0,
        y: 30,
        textShadow: '0 0 0px #AFE3E8',
      },
      {
        opacity: 1,
        y: 0,
        textShadow: '0 0 20px rgba(175, 227, 232, 0.3)',
        duration: 0.8,
        ease: 'power2.out',
      },
      0.4
    )

    // Animar device con efecto de flotación
    tl.fromTo(
      '.solution-device',
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
      },
      0.5
    )

    // Animar caption del device
    tl.fromTo(
      '.solution-device-caption',
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
      0.7
    )

    // Animar columna derecha (Capacidades)
    tl.fromTo(
      '.solution-column:last-child',
      {
        opacity: 0,
        x: 60,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      0.3
    )

    // Animar features con stagger
    tl.fromTo(
      '.feature-item',
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      },
      0.5
    )

    animations.push(tl)
  }

  const animateFeatureIcons = () => {
    const featureItems = Array.from(document.querySelectorAll('.feature-item'))

    cleanups.push(
      addHoverListeners(
        featureItems,
        (item) => {
          const icon = item.querySelector('.feature-icon')

          gsap.to(item, {
            x: 15,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              color: '#AFE3E8',
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
        },
        (item) => {
          const icon = item.querySelector('.feature-icon')

          gsap.to(item, {
            x: 0,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          if (icon) {
            gsap.to(icon, {
              scale: 1,
              color: 'rgba(255, 255, 255, 0.4)',
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
        }
      )
    )
  }

  const animateDeviceHover = () => {
    const device = document.querySelector('.solution-device')
    
    if (device) {
      cleanups.push(
        addHoverListeners(
          [device],
          () => {
            gsap.to(device, {
              y: -10,
              boxShadow: '0 20px 60px rgba(175, 227, 232, 0.2)',
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          },
          () => {
            gsap.to(device, {
              y: 0,
              boxShadow: '0 0px 0px rgba(175, 227, 232, 0)',
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
        )
      )
    }
  }

  const animateSeparators = () => {
    // Animar las líneas separadoras
    gsap.fromTo(
      '.solution-separator',
      {
        scaleY: 0,
        opacity: 0,
      },
      {
        scaleY: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: '.solution-section',
          start: 'top 72%',
          once: true,
        },
        duration: 0.8,
        ease: 'power2.out',
      }
    )
  }

  const animateSolutionLight = () => {
    if (isMobileLayout()) return

    gsap.fromTo(
      '.solution-light',
      {
        opacity: 0.7,
      },
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.solution-section',
          start: 'top 80%',
          once: true,
        },
      }
    )
  }

  onMounted(() => {
    cancelSetup = afterNextPaint(() => {
      context = gsap.context(() => {
        animateSolutionSection()
        animateFeatureIcons()
        animateDeviceHover()
        animateSeparators()
        animateSolutionLight()
      })
    })
  })

  onUnmounted(() => {
    cancelSetup()
    cleanups.forEach((cleanup) => cleanup())
    context?.revert()
  })
}
