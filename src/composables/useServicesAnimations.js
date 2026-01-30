import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useServicesAnimations() {
  let animations = []

  const animateServicesSection = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 60%',
        end: 'top 20%',
        scrub: 1,
        markers: false,
      },
    })

    // Animar el header y label
    tl.fromTo(
      '.nav-label',
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      0
    )

    // Animar items de la lista con stagger
    tl.fromTo(
      '.service-item',
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      },
      0.2
    )

    // Animar el contenido principal
    tl.fromTo(
      '.service-detail',
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      0.3
    )

    // Animar los dots de navegación
    tl.fromTo(
      '.dot-indicator',
      {
        opacity: 0,
        scale: 0.3,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out',
      },
      0.4
    )

    animations.push(tl)
  }

  const animateServiceHover = () => {
    // No hay efectos de hover
  }

  const animateMobileCarousel = () => {
    // Animar el carousel en mobile
    gsap.fromTo(
      '.mobile-services-carousel',
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '.mobile-services-carousel',
          start: 'top 80%',
          markers: false,
        },
        duration: 0.8,
        ease: 'power2.out',
      }
    )

    // Animar los dots del carousel
    gsap.fromTo(
      '.carousel-dot',
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: '.carousel-dots',
          start: 'top 85%',
          markers: false,
        },
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out',
      }
    )
  }

  const animateDots = () => {
    const dots = document.querySelectorAll('.dot-indicator, .carousel-dot')
    
    dots.forEach(dot => {
      dot.addEventListener('mouseenter', () => {
        gsap.to(dot, {
          scale: 1.3,
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      dot.addEventListener('mouseleave', () => {
        gsap.to(dot, {
          scale: dot.classList.contains('active') ? 1.2 : 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    })
  }

  onMounted(() => {
    setTimeout(() => {
      animateServicesSection()
      animateServiceHover()
      animateMobileCarousel()
      animateDots()
    }, 300)
  })

  onUnmounted(() => {
    animations.forEach(anim => anim.kill())
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
}
