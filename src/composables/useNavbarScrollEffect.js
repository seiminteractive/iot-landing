import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

export function useNavbarScrollEffect() {
  let scrollListener = null

  const updateNavbarStyle = () => {
    const header = document.querySelector('.header')
    const scrollY = window.scrollY

    if (scrollY === 0) {
      // En el top - quitar glassmorph y bordes
      gsap.to(header, {
        background: 'transparent',
        borderBottom: 'none',
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out',
      })
      
      // Quitar el backdrop filter del ::before via css
      header.style.setProperty('--header-opacity', '0')
    } else {
      // Mostrar glassmorph y bordes
      gsap.to(header, {
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(175, 227, 232, 0.03) 50%, rgba(255, 255, 255, 0.04) 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 16px 0 rgba(175, 227, 232, 0.03)',
        duration: 0.3,
        ease: 'power2.out',
      })
      
      // Mostrar el backdrop filter del ::before
      header.style.setProperty('--header-opacity', '1')
    }
  }

  onMounted(() => {
    // Ejecutar una vez al montar para el estado inicial
    updateNavbarStyle()

    // Agregar listener de scroll
    scrollListener = () => {
      requestAnimationFrame(updateNavbarStyle)
    }

    window.addEventListener('scroll', scrollListener)
  })

  onUnmounted(() => {
    if (scrollListener) {
      window.removeEventListener('scroll', scrollListener)
    }
  })
}
