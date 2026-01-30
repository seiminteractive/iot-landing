# Guía GSAP - Animaciones Premium

## Lo que se implementó

### 1. **Hero Section Animations** (`useHeroAnimations.js`)
- ✨ Título con revelado palabra por palabra
- 🎯 Fade in del botón de anuncio
- 📍 Scroll indicator con efecto de pulso
- 🌟 Glow animado en el indicador de scroll
- 🖱️ Hover effects mejorados en botones

### 2. **Scroll Animations** (`useScrollAnimations.js`) - Composable Reutilizable
Funciones disponibles para usar en toda la app:

```javascript
import { useScrollAnimations } from '@/composables/useScrollAnimations'

const { animateOnScroll, staggerTextOnScroll, parallaxOnScroll, revealOnScroll } = useScrollAnimations()
```

#### `animateOnScroll(selector, options)`
Anima elementos cuando entran en el viewport
```javascript
animateOnScroll('.card', {
  from: { opacity: 0, y: 50 },
  to: { opacity: 1, y: 0 },
  duration: 0.8,
  stagger: 0.1,
  start: 'top 80%',
})
```

#### `parallaxOnScroll(selector, distance)`
Efecto parallax en scroll
```javascript
parallaxOnScroll('.hero-content', 100) // Mueve 100px en scroll
```

#### `revealOnScroll(selector, options)`
Revelado suave de elementos
```javascript
revealOnScroll('.section-title', {
  duration: 1,
  stagger: 0.1,
})
```

#### `staggerTextOnScroll(selector, options)`
Anima palabras individuales al hacer scroll
```javascript
staggerTextOnScroll('.text-animate', {
  duration: 0.8,
})
```

## Cómo Usar en Otros Componentes

### Ejemplo: Sección Services
```javascript
<script setup>
import { onMounted } from 'vue'
import { useScrollAnimations } from '@/composables/useScrollAnimations'

const { revealOnScroll, parallaxOnScroll } = useScrollAnimations()

onMounted(() => {
  // Animar cards de servicios
  revealOnScroll('.service-card', {
    duration: 0.8,
    stagger: 0.15,
    start: 'top 85%',
  })
  
  // Parallax en la imagen
  parallaxOnScroll('.service-image', 80)
})
</script>
```

### Ejemplo: Sección Use Cases
```javascript
onMounted(() => {
  revealOnScroll('.use-case-card', {
    duration: 0.8,
    stagger: 0.1,
  })
  
  revealOnScroll('.accordion-item', {
    duration: 0.6,
    stagger: 0.08,
  })
})
```

## Características de las Animaciones Implementadas

### ✨ Animaciones del Hero
1. **Revelado de Título**: Palabras aparecen con blur y fade
2. **Botón Announcement**: Desliza desde la izquierda
3. **Scroll Indicator**: Aparece con efecto de resorte (back.out)
4. **Glow Effect**: Pulsa continuamente con drop-shadow
5. **Parallax**: El contenido se mueve lentamente en scroll
6. **Light Fade**: El fondo se desvanece en scroll

### ⚙️ Configuración Optimizada
- `will-change` para mejor performance
- `scrub: 1` para animaciones suaves en scroll
- `ease: 'power2.out'` para movimientos naturales
- Timings escalonados para efecto cascada

## Performance Considerations

- GSAP ScrollTrigger está registrado globalmente
- Las animaciones se limpian en `onUnmounted`
- Se usan spans inline-block para mejor rendimiento
- `filter: blur()` usa GPU acceleration

## Próximas Mejoras

- Agregar animaciones a todas las secciones
- Crear transiciones de página
- Agregar AnimationGsap a formularios
- Efectos de mouse interactivos
- Scroll-triggered counters para números

¡Ahora tienes GSAP configurado y listo para usar en toda tu app! 🚀
