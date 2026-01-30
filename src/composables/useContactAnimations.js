import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useContactAnimations() {
  let animations = []

  const animateContactHeader = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 60%',
        end: 'top 10%',
        scrub: 1,
        markers: false,
      },
    })

    // Animar label
    tl.fromTo(
      '.contact-label',
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
      '.contact-title',
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
      '.contact-subtitle',
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

  const animateContactButtons = () => {
    const buttons = document.querySelectorAll('.contact-btn')

    gsap.fromTo(
      buttons,
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        scrollTrigger: {
          trigger: '.contact-options',
          start: 'top 80%',
          markers: false,
        },
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
      }
    )
  }

  const animateContactButtonsHover = () => {
    const buttons = document.querySelectorAll('.contact-btn')

    buttons.forEach((btn) => {
      const arrow = btn.querySelector('.contact-btn-arrow')

      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          y: -8,
          background: 'rgba(255, 255, 255, 0.08)',
          duration: 0.3,
          ease: 'power2.out',
        })

        gsap.to(btn, {
          boxShadow: '0 20px 40px rgba(255, 200, 120, 0.2)',
          borderColor: 'rgba(255, 200, 120, 0.4)',
          duration: 0.3,
        })

        if (arrow) {
          gsap.to(arrow, {
            x: 4,
            y: -4,
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      })

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          y: 0,
          background: 'transparent',
          duration: 0.3,
          ease: 'power2.out',
        })

        gsap.to(btn, {
          boxShadow: '0 0px 0px rgba(255, 200, 120, 0)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          duration: 0.3,
        })

        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            y: 0,
            duration: 0.3,
          })
        }
      })
    })
  }

  const animateContactNote = () => {
    gsap.fromTo(
      '.contact-note',
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '.contact-note',
          start: 'top 85%',
          markers: false,
        },
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3,
      }
    )
  }

  const setupButtonPulse = () => {
    // Efecto de pulso suave en los botones en reposo
    gsap.to('.contact-btn-arrow', {
      filter: 'drop-shadow(0 0 8px rgba(255, 200, 120, 0.4))',
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
    })
  }

  onMounted(() => {
    setTimeout(() => {
      animateContactHeader()
      animateContactButtons()
      animateContactButtonsHover()
      animateContactNote()
      setupButtonPulse()
    }, 300)
  })

  onUnmounted(() => {
    animations.forEach(anim => anim.kill())
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
}
