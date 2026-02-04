import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSolutionAnimations() {
  let animations = []

  const animateSolutionSection = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.solution-section',
        start: 'top 60%',
        end: 'top 10%',
        scrub: 1,
        markers: false,
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
    const featureItems = document.querySelectorAll('.feature-item')
    
    featureItems.forEach((item) => {
      const icon = item.querySelector('.feature-icon')
      
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          x: 15,
          duration: 0.3,
          ease: 'power2.out',
        })
        
        gsap.to(icon, {
          scale: 1.3,
          color: '#AFE3E8',
          duration: 0.3,
          ease: 'back.out',
        })
      })

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
        
        gsap.to(icon, {
          scale: 1,
          color: 'rgba(255, 255, 255, 0.4)',
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    })
  }

  const animateDeviceHover = () => {
    const device = document.querySelector('.solution-device')
    
    if (device) {
      device.addEventListener('mouseenter', () => {
        gsap.to(device, {
          y: -10,
          boxShadow: '0 20px 60px rgba(175, 227, 232, 0.2)',
          duration: 0.4,
          ease: 'power2.out',
        })
      })

      device.addEventListener('mouseleave', () => {
        gsap.to(device, {
          y: 0,
          boxShadow: '0 0px 0px #AFE3E8',
          duration: 0.4,
          ease: 'power2.out',
        })
      })
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
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1,
          markers: false,
        },
        duration: 0.8,
        ease: 'power2.out',
      }
    )
  }

  const animateSolutionLight = () => {
    // Animar el fondo de luz
    gsap.to('.solution-light', {
      scrollTrigger: {
        trigger: '.solution-section',
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
      animateSolutionSection()
      animateFeatureIcons()
      animateDeviceHover()
      animateSeparators()
      animateSolutionLight()
    }, 300)
  })

  onUnmounted(() => {
    animations.forEach(anim => anim.kill())
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
}
