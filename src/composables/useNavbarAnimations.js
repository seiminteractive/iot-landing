import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

export function useNavbarAnimations() {
  let animations = []

  const animateNavbarOnLoad = () => {
    const tl = gsap.timeline()

    // Animar logo
    tl.fromTo(
      '.logo-img',
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out',
      },
      0
    )

    // Animar links de navegación
    const navLinks = document.querySelectorAll('.nav-link')
    tl.fromTo(
      navLinks,
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
      },
      0.2
    )

    // Animar botón CTA
    tl.fromTo(
      '.cta-button',
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out',
      },
      0.4
    )

    animations.push(tl)
  }

  const setupNavbarHoverEffects = () => {
    // No hay efectos de hover
  }

  const setupCTAButtonHover = () => {
    const button = document.querySelector('.cta-button')
    
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          background: 'rgba(255, 255, 255, 0.08)',
          duration: 0.3,
        })
      })
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          background: 'transparent',
          duration: 0.3,
        })
      })
    }
  }

  const setupMenuToggleHover = () => {
    // No hay efectos de hover
  }

  const setupMobileMenuAnimations = () => {
    // Cuando el menú se abre, animar el contenido
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const mobileMenu = document.querySelector('.mobile-menu')
          
          if (mobileMenu && mobileMenu.offsetParent !== null) {
            // Menú visible - animar elementos
            animateMobileMenuContent()
          }
        }
      })
    })

    const header = document.querySelector('.header')
    if (header) {
      observer.observe(header, { attributes: true })
    }
  }

  const animateMobileMenuContent = () => {
    const tl = gsap.timeline()

    // Animar label
    tl.fromTo(
      '.menu-label',
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      0
    )

    // Animar decorative lines
    tl.fromTo(
      '.menu-deco-line',
      {
        scaleX: 0,
        opacity: 0,
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        transformOrigin: 'center',
      },
      0.1
    )

    // Links ya vienen animados con CSS keyframes
    const links = document.querySelectorAll('.mobile-nav-link')
    // No hay efectos de hover

    // Animar menu footer
    tl.fromTo(
      '.menu-footer',
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      0.3
    )
  }

  const setupMenuContactHover = () => {
    // No hay efectos de hover
  }

  onMounted(() => {
    setTimeout(() => {
      animateNavbarOnLoad()
      setupNavbarHoverEffects()
      setupCTAButtonHover()
      setupMenuToggleHover()
      setupMobileMenuAnimations()
      setupMenuContactHover()
    }, 100)
  })

  onUnmounted(() => {
    animations.forEach(anim => anim.kill())
  })
}
