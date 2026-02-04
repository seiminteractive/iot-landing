import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHeroAnimations() {
  let animations = []

  const animateHeroOnLoad = () => {
    const tl = gsap.timeline()

    // Animar título - revelar de abajo hacia arriba
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
        duration: 1,
        ease: 'power2.out',
      },
      0
    )

    // Animar announcement button
    tl.fromTo(
      '.announcement-button',
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      0.4
    )

    // Animar scroll indicator con efecto de pulso
    tl.fromTo(
      '.scroll-indicator',
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out',
      },
      0.6
    )

    // Efecto de glow en scroll indicator
    gsap.to('.scroll-indicator svg', {
      filter: 'drop-shadow(0 0 12px rgba(175, 227, 232, 0.5))',
      duration: 1,
      delay: 1.2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    animations.push(tl)
  }

  const animateHeroOnScroll = () => {
    // Parallax efecto en hero content
    gsap.to('.hero-content', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
      y: 100,
      opacity: 0.8,
      ease: 'none',
    })

    // Fade out del light container en scroll
    gsap.to('.light-container', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'center top',
        scrub: 1,
      },
      opacity: 0.1,
      ease: 'power2.inOut',
    })
  }

  const setupHoverEffects = () => {
    const button = document.querySelector('.announcement-button')
    const svg = button?.querySelector('svg')
    
    if (button && svg) {
      button.addEventListener('mouseenter', () => {
        // Animación de la flecha (SVG)
        gsap.to(svg, {
          x: 4,
          duration: 0.3,
          ease: 'power2.out',
        })
        
        // Fondo blanco apenas visible
        gsap.to(button, {
          background: 'rgba(255, 255, 255, 0.08)',
          duration: 0.3,
        })
      })
      
      button.addEventListener('mouseleave', () => {
        // Vuelve a posición original
        gsap.to(svg, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
        
        gsap.to(button, {
          background: 'transparent',
          duration: 0.3,
        })
      })
    }
  }

  onMounted(() => {
    // Pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => {
      animateHeroOnLoad()
      animateHeroOnScroll()
      setupHoverEffects()
    }, 200)
  })

  onUnmounted(() => {
    // Limpiar todas las animaciones
    animations.forEach(anim => anim.kill())
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
}
