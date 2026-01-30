import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  const animateOnScroll = (selector, options = {}) => {
    const {
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      duration = 0.8,
      delay = 0,
      stagger = 0.1,
      ease = 'power2.out',
      trigger = null,
      start = 'top 80%',
      end = 'top 20%',
      scrub = false,
    } = options

    const elements = document.querySelectorAll(selector)
    if (elements.length === 0) return

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        from,
        {
          ...to,
          scrollTrigger: {
            trigger: trigger || element,
            start,
            end,
            scrub,
            markers: false,
          },
          duration,
          delay: delay + index * stagger,
          ease,
        }
      )
    })
  }

  const staggerTextOnScroll = (selector, options = {}) => {
    const {
      duration = 0.8,
      delay = 0,
      ease = 'power2.out',
      start = 'top 80%',
      scrub = false,
    } = options

    const elements = document.querySelectorAll(selector)
    if (elements.length === 0) return

    elements.forEach((element) => {
      const words = element.querySelectorAll('span')
      if (words.length === 0) return

      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(5px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: element,
            start,
            scrub,
            markers: false,
          },
          duration,
          delay,
          stagger: 0.05,
          ease,
        }
      )
    })
  }

  const parallaxOnScroll = (selector, distance = 100) => {
    gsap.to(selector, {
      scrollTrigger: {
        trigger: selector,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
      y: distance,
      ease: 'none',
    })
  }

  const revealOnScroll = (selector, options = {}) => {
    const {
      duration = 1,
      ease = 'power3.out',
      stagger = 0.1,
      start = 'top 85%',
    } = options

    const elements = document.querySelectorAll(selector)
    if (elements.length === 0) return

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 40,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scrollTrigger: {
          trigger: elements[0].parentElement,
          start,
          markers: false,
        },
        duration,
        stagger,
        ease,
      }
    )
  }

  return {
    animateOnScroll,
    staggerTextOnScroll,
    parallaxOnScroll,
    revealOnScroll,
  }
}
