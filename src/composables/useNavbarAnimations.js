import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { addHoverListeners, afterNextPaint, isVisibleElement } from './animationUtils'

export function useNavbarAnimations() {
  let context
  let cancelSetup = () => {}
  let menuObserver = null
  const cleanups = []

  const animateNavbarOnLoad = () => {
    const tl = gsap.timeline()

    tl.fromTo(
      '.logo-img',
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'back.out(1.5)',
      },
      0
    )
      .fromTo(
        '.nav-link',
        {
          opacity: 0,
          y: -10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.08,
          ease: 'power2.out',
        },
        0.18
      )
      .fromTo(
        '.cta-button',
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'back.out(1.4)',
        },
        0.36
      )
  }

  const setupCTAButtonHover = () => {
    const button = document.querySelector('.cta-button')
    if (!button) return

    cleanups.push(
      addHoverListeners(
        [button],
        () => {
          gsap.to(button, {
            background: 'rgba(255, 255, 255, 0.08)',
            duration: 0.25,
            overwrite: 'auto',
          })
        },
        () => {
          gsap.to(button, {
            background: 'transparent',
            duration: 0.25,
            overwrite: 'auto',
          })
        }
      )
    )
  }

  const animateMobileMenuContent = () => {
    const menu = document.querySelector('.mobile-menu')
    if (!isVisibleElement(menu)) return

    gsap.killTweensOf(['.menu-label', '.menu-deco-line', '.menu-footer'])

    const tl = gsap.timeline()

    tl.fromTo(
      '.menu-label',
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
      },
      0
    )
      .fromTo(
        '.menu-deco-line',
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          transformOrigin: 'center',
        },
        0.08
      )
      .fromTo(
        '.menu-footer',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.22
      )
  }

  const setupMobileMenuAnimations = () => {
    const header = document.querySelector('.header')
    if (!header) return

    menuObserver = new MutationObserver(() => {
      animateMobileMenuContent()
    })

    menuObserver.observe(header, { attributes: true, subtree: true })
  }

  onMounted(() => {
    cancelSetup = afterNextPaint(() => {
      context = gsap.context(() => {
        animateNavbarOnLoad()
        setupCTAButtonHover()
        setupMobileMenuAnimations()
      })
    })
  })

  onUnmounted(() => {
    cancelSetup()
    cleanups.forEach((cleanup) => cleanup())
    menuObserver?.disconnect()
    context?.revert()
  })
}
