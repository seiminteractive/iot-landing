<template>
  <div id="app">
    <!-- Navbar Component -->
    <Navbar />
    
    <main class="hero">
      <!-- Contenedor de luz con conic gradients - SOLO EN HERO -->
      <div class="light-container">
        <div class="conic-light conic-light-top"></div>
        <div class="conic-light conic-light-bottom"></div>
      </div>

      <div class="hero-content">
        <h1 class="hero-title">
          La nueva era<br>
          de la Industria Inteligente
        </h1>
        
        <a href="#solution" class="announcement-button">
          <span class="dot"></span>
          IoT Industrial · Conocé Más
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <!-- Scroll indicator -->
      <a class="scroll-indicator" href="#services">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </main>

    <!-- Services Section -->
    <section id="services" class="services-section">
      <!-- Decorative Elements - Left Vertical (Desktop only) -->
      <div class="deco-left">
        <span class="deco-text-vertical">SEIM</span>
        <div class="deco-line-vertical"></div>
      </div>
      
      <!-- Desktop Content -->
      <div class="services-content-wrapper desktop-services">
        <!-- Left Side - Navigation -->
        <div class="services-nav">
          <div class="nav-header">
            <span class="nav-label">SERVICIOS</span>
          </div>
          
          <ul class="services-list">
            <li 
              v-for="(service, index) in services" 
              :key="index"
              class="service-item"
              :class="{ 'active': activeIndex === index }"
              @click="setActiveService(index)"
            >
              {{ service.name }}
            </li>
          </ul>
        </div>

        <!-- Center - Main Content -->
        <div class="services-main">
          <Transition name="fade-slide" mode="out-in">
            <div :key="activeIndex" class="service-detail">
              <h2 class="service-title">
                {{ services[activeIndex].title.toUpperCase() }}
              </h2>
              <p class="service-description">
                {{ services[activeIndex].mainDescription }}
              </p>
              <p class="service-secondary" v-if="services[activeIndex].secondaryDescription">
                {{ services[activeIndex].secondaryDescription }}
              </p>
            </div>
          </Transition>
        </div>

        <!-- Right Side - Dots Navigation -->
        <div class="dots-nav">
          <span 
            v-for="(_, index) in services" 
            :key="index"
            class="dot-indicator"
            :class="{ 'active': activeIndex === index }"
            @click="setActiveService(index)"
          ></span>
        </div>
      </div>

      <!-- Mobile Carousel -->
      <div class="mobile-services-carousel">
        <div class="carousel-header">
          <span class="carousel-label">SERVICIOS</span>
          <span class="carousel-counter">{{ activeIndex + 1 }} / {{ services.length }}</span>
        </div>
        
        <div 
          class="carousel-track"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <Transition :name="swipeDirection" mode="out-in">
            <div :key="activeIndex" class="carousel-slide">
              <h2 class="carousel-title">
                {{ services[activeIndex].title }}
              </h2>
              <p class="carousel-description">
                {{ services[activeIndex].mainDescription }}
              </p>
              <p class="carousel-secondary" v-if="services[activeIndex].secondaryDescription">
                {{ services[activeIndex].secondaryDescription }}
              </p>
            </div>
          </Transition>
        </div>
        
        <!-- Swipe hint -->
        <div class="carousel-hint">
          <i class="pi pi-arrow-left"></i>
          <span>Deslizá para ver más</span>
          <i class="pi pi-arrow-right"></i>
        </div>
        
        <!-- Dots -->
        <div class="carousel-dots">
          <span 
            v-for="(_, index) in services" 
            :key="index"
            class="carousel-dot"
            :class="{ 'active': activeIndex === index }"
            @click="setActiveService(index)"
          ></span>
        </div>
      </div>
    </section>

    <!-- Solution Section -->
    <section id="solution" class="solution-section">
      <!-- Simple light gradient from bottom -->
      <div class="solution-light"></div>

      <div class="solution-container">
        <!-- Column 1 - Overview / Descripción -->
        <div class="solution-column solution-column-left">
          <span class="solution-label">OVERVIEW</span>
          <h3 class="solution-column-title">La Solución</h3>
          <p class="solution-text">
            Diseñamos e implementamos soluciones de telemetría industrial que conectan los sistemas de planta con la nube de forma segura y confiable.
          </p>
          <p class="solution-text">
            Nuestro enfoque combina integración industrial, arquitectura cloud y visualización inteligente para brindar visibilidad real sobre la operación.
          </p>
          <p class="solution-text">
            Cada solución es diseñada a medida, respetando los procesos existentes y acompañando la toma de decisiones operativas y estratégicas.
          </p>
          <p class="solution-text">
            La plataforma que entregamos es privada, dedicada y adaptada a cada cliente, funcionando como el punto central de control y análisis de la operación.
          </p>
        </div>

        <!-- Separator Line -->
        <div class="solution-separator"></div>

        <!-- Column 2 - Núcleo / Plataforma -->
        <div class="solution-column solution-column-center">
          <span class="solution-label">BASE OPERATIVA</span>
          <h2 class="solution-main-title">Plataforma de Control Industrial</h2>
          
          <div class="solution-device">
            <div class="solution-device-inner">
              <img src="./assets/capturaLoginPlataforma.png" alt="Plataforma de Control Industrial" class="device-image" />
            </div>
          </div>

          <p class="solution-device-caption">
            Vista unificada de métricas, estados y variables críticas de la operación industrial.
          </p>
        </div>

        <!-- Separator Line -->
        <div class="solution-separator"></div>

        <!-- Column 3 - Overview / Capacidades -->
        <div class="solution-column">
          <span class="solution-label">OVERVIEW</span>
          <h3 class="solution-column-title">Capacidades Clave</h3>
          
          <ul class="solution-features">
            <li class="feature-item">
              <span class="feature-icon">◇</span>
              <span>Integración con PLCs y sistemas industriales</span>
            </li>
            <li class="feature-item">
              <span class="feature-icon">◇</span>
              <span>Arquitectura cloud privada y escalable</span>
            </li>
            <li class="feature-item">
              <span class="feature-icon">◇</span>
              <span>Dashboards operativos a medida</span>
            </li>
            <li class="feature-item">
              <span class="feature-icon">◇</span>
              <span>Métricas en tiempo real</span>
            </li>
            <li class="feature-item">
              <span class="feature-icon">◇</span>
              <span>Seguridad industrial y de datos</span>
            </li>
            <li class="feature-item">
              <span class="feature-icon">◇</span>
              <span>Inteligencia artificial aplicada</span>
            </li>
            <li class="feature-item">
              <span class="feature-icon">◇</span>
              <span>Soporte y operación continua</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Use Cases Section -->
    <section id="use-cases" class="use-cases-section">
      <div class="use-cases-container">
        <div class="use-cases-header">
          <span class="use-cases-label">CASOS DE USO</span>
          <h2 class="use-cases-title">Aplicaciones Industriales</h2>
          <p class="use-cases-subtitle">Soluciones diseñadas para resolver desafíos operativos reales.</p>
        </div>

        <!-- Desktop Grid -->
        <div class="use-cases-grid desktop-use-cases">
          <!-- Card 1 -->
          <div class="use-case-card">
            <div class="card-border"></div>
            <div class="card-content">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 12h4l3-9 4 18 3-9h4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="card-title">Monitoreo de Producción</h3>
              <p class="card-description">Visibilidad en tiempo real del estado de líneas y procesos.</p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="use-case-card">
            <div class="card-border"></div>
            <div class="card-content">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="card-title">Eficiencia Operativa</h3>
              <p class="card-description">Indicadores clave para optimizar el desempeño industrial.</p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="use-case-card">
            <div class="card-border"></div>
            <div class="card-content">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="M12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="card-title">Continuidad Operativa</h3>
              <p class="card-description">Supervisión constante para asegurar estabilidad y previsibilidad.</p>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="use-case-card">
            <div class="card-border"></div>
            <div class="card-content">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="card-title">Mantenimiento Inteligente</h3>
              <p class="card-description">Anticipación de fallas basada en datos operativos.</p>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="use-case-card">
            <div class="card-border"></div>
            <div class="card-content">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 class="card-title">Gestión Multi-Planta</h3>
              <p class="card-description">Control centralizado de múltiples plantas o líneas.</p>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="use-case-card">
            <div class="card-border"></div>
            <div class="card-content">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
              </div>
              <h3 class="card-title">Inteligencia Artificial Aplicada</h3>
              <p class="card-description">Insights automáticos para decisiones estratégicas.</p>
            </div>
          </div>
        </div>

        <!-- Mobile Accordion -->
        <Accordion type="single" collapsible class="mobile-use-cases-accordion" default-value="item-0">
          <AccordionItem 
            v-for="(useCase, index) in useCases" 
            :key="index"
            :value="`item-${index}`"
            class="accordion-item"
            :class="{ 'active': activeUseCaseIndex === index }"
            @update:open="(open) => { if (open) activeUseCaseIndex = index }"
          >
            <AccordionTrigger class="accordion-header">
              <div class="accordion-header-left">
                <span class="accordion-number">0{{ index + 1 }}</span>
                <i :class="['pi', useCase.icon, 'accordion-icon']"></i>
                <span class="accordion-title">{{ useCase.title }}</span>
              </div>
              <div class="accordion-toggle">
                <i class="pi pi-plus"></i>
              </div>
            </AccordionTrigger>
            <AccordionContent class="accordion-content">
              <div class="accordion-content-inner">
                <p class="accordion-description">{{ useCase.description }}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- Technology Section - Timeline -->
    <section id="technology" class="technology-section">
      <!-- Contenedor de luz - igual que hero pero lado izquierdo -->
      <div class="tech-light-container">
        <div class="tech-conic-light tech-conic-light-top"></div>
        <div class="tech-conic-light tech-conic-light-bottom"></div>
      </div>

      <div class="technology-container">
        
        <!-- Header -->
        <div class="technology-header">
          <div class="header-line-wrapper">
            <div class="header-line"></div>
            <span class="technology-label">TECNOLOGÍA</span>
          </div>
          <h2 class="technology-title">Cómo funciona</h2>
          <p class="technology-subtitle">El flujo de datos desde la planta hasta la inteligencia operativa.</p>
        </div>

        <!-- Timeline Container -->
        <div class="timeline-container">
          
          <!-- Timeline Line -->
          <div class="timeline-line">
            <div class="timeline-line-progress"></div>
          </div>

          <!-- Timeline Items -->
          <div class="timeline-items">
            
            <!-- Step 1 - Top -->
            <div class="timeline-item item-top">
              <div class="timeline-dot"><div class="dot-inner"></div></div>
              <div class="vertical-line"></div>
              <div class="timeline-card">
                <span class="step-label">Paso 1</span>
                <h4 class="step-title">PLCs y Sistemas Industriales</h4>
                <p class="step-description">Los datos nacen en los PLCs y sistemas de control que gobiernan la operación industrial.</p>
              </div>
            </div>

            <!-- Step 2 - Bottom -->
            <div class="timeline-item item-bottom">
              <div class="timeline-dot"><div class="dot-inner"></div></div>
              <div class="vertical-line"></div>
              <div class="timeline-card">
                <span class="step-label">Paso 2</span>
                <h4 class="step-title">Gateway Industrial</h4>
                <p class="step-description">Un gateway industrial captura la información en planta y la envía de forma segura hacia la nube.</p>
              </div>
            </div>

            <!-- Step 3 - Top -->
            <div class="timeline-item item-top">
              <div class="timeline-dot"><div class="dot-inner"></div></div>
              <div class="vertical-line"></div>
              <div class="timeline-card">
                <span class="step-label">Paso 3</span>
                <h4 class="step-title">Nube Industrial</h4>
                <p class="step-description">La información se procesa, organiza y almacena en una infraestructura cloud privada y escalable.</p>
              </div>
            </div>

            <!-- Step 4 - Bottom -->
            <div class="timeline-item item-bottom">
              <div class="timeline-dot"><div class="dot-inner"></div></div>
              <div class="vertical-line"></div>
              <div class="timeline-card">
                <span class="step-label">Paso 4</span>
                <h4 class="step-title">Plataforma de Datos</h4>
                <p class="step-description">Los datos se transforman en métricas claras y estados operativos accesibles en tiempo real.</p>
              </div>
            </div>

            <!-- Step 5 - Top -->
            <div class="timeline-item item-top">
              <div class="timeline-dot"><div class="dot-inner"></div></div>
              <div class="vertical-line"></div>
              <div class="timeline-card">
                <span class="step-label">Paso 5</span>
                <h4 class="step-title">Dashboards Operativos</h4>
                <p class="step-description">Visualizaciones diseñadas a medida permiten entender el estado de la operación de un vistazo.</p>
              </div>
            </div>

            <!-- Step 6 - Bottom -->
            <div class="timeline-item item-bottom">
              <div class="timeline-dot"><div class="dot-inner"></div></div>
              <div class="vertical-line"></div>
              <div class="timeline-card">
                <span class="step-label">Paso 6</span>
                <h4 class="step-title">Inteligencia Artificial</h4>
                <p class="step-description">La inteligencia artificial analiza patrones y comportamientos para generar insights relevantes.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="contact-container">
        <div class="contact-content">
          <span class="contact-label">CONTACTO</span>
          
          <h2 class="contact-title">Trabajemos juntos</h2>
          <p class="contact-subtitle">
            Conectá con nuestro equipo para explorar cómo podemos<br>
            transformar tu operación industrial.
          </p>
          
          <div class="contact-options">
            <!-- WhatsApp -->
            <a href="https://wa.me/5493413551507" target="_blank" rel="noopener" class="contact-btn contact-btn-primary">
              <div class="contact-btn-content">
                <i class="pi pi-whatsapp"></i>
                <span>Escribinos por WhatsApp</span>
              </div>
              <i class="pi pi-arrow-up-right contact-btn-arrow"></i>
            </a>

            <!-- Email -->
            <a href="mailto:hello@seiminteractive.io" class="contact-btn contact-btn-secondary">
              <div class="contact-btn-content">
                <i class="pi pi-envelope"></i>
                <span>Envianos un email</span>
              </div>
              <i class="pi pi-arrow-up-right contact-btn-arrow"></i>
            </a>
          </div>

          <p class="contact-note">
            Respondemos en menos de 24 horas
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="main-footer">
      <!-- Light effect -->
      <div class="footer-light"></div>
      
      <div class="footer-container">
        <div class="footer-grid">
          <!-- Column 1 - Logo & About -->
          <div class="footer-column footer-brand">
            <img src="./assets/MARCA-14.png" alt="SEIM" class="footer-logo" />
            <p class="footer-about">
              Soluciones de telemetría industrial que conectan planta y nube de forma segura y confiable.
            </p>
          </div>

          <!-- Column 2 - Servicios -->
          <div class="footer-column">
            <h4 class="footer-title">SERVICIOS</h4>
            <ul class="footer-links">
              <li><a href="#services">Integración Industrial</a></li>
              <li><a href="#services">Arquitectura Cloud</a></li>
              <li><a href="#services">Visualización</a></li>
              <li><a href="#services">Inteligencia Artificial</a></li>
            </ul>
          </div>

          <!-- Column 3 - Secciones -->
          <div class="footer-column">
            <h4 class="footer-title">SECCIONES</h4>
            <ul class="footer-links">
              <li><a href="#solution">Solución</a></li>
              <li><a href="#use-cases">Casos de Uso</a></li>
              <li><a href="#technology">Tecnología</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>

          <!-- Column 4 - Contacto -->
          <div class="footer-column footer-contact-column">
            <h4 class="footer-title">CONTACTO</h4>
            <ul class="footer-links">
              <li><a href="https://wa.me/5493413551507" target="_blank">WhatsApp</a></li>
              <li><a href="mailto:hello@seiminteractive.io">Email</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <span class="footer-copyright">© 2026 Seim Interactive. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import { useHeroAnimations } from './composables/useHeroAnimations'
import { useServicesAnimations } from './composables/useServicesAnimations'
import { useSolutionAnimations } from './composables/useSolutionAnimations'
import { useUseCasesAnimations } from './composables/useUseCasesAnimations'
import { useTechnologyAnimations } from './composables/useTechnologyAnimations'
import { useContactAnimations } from './composables/useContactAnimations'
import { useFooterAnimations } from './composables/useFooterAnimations'
import { useScrollAnimations } from './composables/useScrollAnimations'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// Usar animaciones
useHeroAnimations()
useServicesAnimations()
useSolutionAnimations()
useUseCasesAnimations()
useTechnologyAnimations()
useContactAnimations()
useFooterAnimations()

const services = [
  {
    name: 'Integración Industrial',
    title: 'Integración Industrial',
    mainDescription: 'Conectamos PLCs y sistemas industriales existentes de forma segura y no invasiva. Trabajamos con distintos protocolos y arquitecturas, respetando la operación actual y evitando interrupciones en planta.',
    secondaryDescription: 'La integración se adapta a cada entorno industrial, permitiendo capturar datos críticos desde el origen.'
  },
  {
    name: 'Arquitectura Cloud',
    title: 'Arquitectura Cloud',
    mainDescription: 'Diseñamos y operamos arquitecturas cloud robustas, escalables y seguras para entornos industriales. Cada solución se construye según la criticidad de la operación.',
    secondaryDescription: 'La infraestructura está preparada para crecer junto a la planta, manteniendo estabilidad y control.'
  },
  {
    name: 'Visualización',
    title: 'Visualización e Inteligencia Operativa',
    mainDescription: 'Creamos dashboards claros, enfocados en métricas relevantes para cada rol y proceso. La información se presenta de forma simple, priorizando la toma de decisiones.',
    secondaryDescription: 'No mostramos datos por mostrar: estructuramos la información para reflejar el estado real de la operación.'
  },
  {
    name: 'Inteligencia Artificial',
    title: 'Inteligencia Artificial Aplicada',
    mainDescription: 'Incorporamos inteligencia artificial para analizar patrones, detectar anomalías y generar insights sobre los datos industriales.',
    secondaryDescription: 'El objetivo no es reemplazar decisiones humanas, sino potenciar el criterio operativo con información contextualizada.'
  },
  {
    name: 'Seguridad',
    title: 'Seguridad Industrial y de Datos',
    mainDescription: 'La seguridad es un pilar central de cada implementación. Aplicamos buenas prácticas de aislamiento, control de accesos y protección de datos industriales.',
    secondaryDescription: 'Cada entorno es privado y diseñado específicamente para el cliente, evitando exposiciones innecesarias.'
  },
  {
    name: 'Soporte y Operación',
    title: 'Soporte y Operación Continua',
    mainDescription: 'Operamos y monitoreamos la solución de forma continua, asegurando disponibilidad y correcto funcionamiento.',
    secondaryDescription: 'La operación no termina en la implementación: es un proceso vivo.'
  },
  {
    name: 'Consultoría y Evolución',
    title: 'Consultoría y Evolución',
    mainDescription: 'Acompañamos a las empresas en la evolución de su madurez digital industrial. Analizamos procesos, métricas y necesidades futuras.',
    secondaryDescription: 'La plataforma y el servicio evolucionan junto a la operación y al negocio.'
  }
]

const activeIndex = ref(0)
let autoScrollInterval = null

const setActiveService = (index) => {
  activeIndex.value = index
  resetAutoScroll()
}

const nextService = () => {
  swipeDirection.value = 'slide-left'
  activeIndex.value = (activeIndex.value + 1) % services.length
}

const prevService = () => {
  swipeDirection.value = 'slide-right'
  activeIndex.value = (activeIndex.value - 1 + services.length) % services.length
}

const startAutoScroll = () => {
  autoScrollInterval = setInterval(nextService, 5000)
}

const resetAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
  }
  startAutoScroll()
}

// Touch/Swipe handling for mobile carousel
const swipeDirection = ref('slide-left')
let touchStartX = 0
let touchEndX = 0

// Use Cases data for mobile accordion
const useCases = [
  {
    icon: 'pi-chart-line',
    title: 'Monitoreo de Producción',
    description: 'Visibilidad en tiempo real del estado de líneas y procesos productivos. Seguimiento continuo de métricas clave para tomar decisiones informadas.'
  },
  {
    icon: 'pi-bolt',
    title: 'Eficiencia Operativa',
    description: 'Indicadores clave para optimizar el desempeño industrial. Identificación de cuellos de botella y oportunidades de mejora continua.'
  },
  {
    icon: 'pi-clock',
    title: 'Continuidad Operativa',
    description: 'Supervisión constante para asegurar estabilidad y previsibilidad. Alertas tempranas y monitoreo 24/7 de variables críticas.'
  },
  {
    icon: 'pi-wrench',
    title: 'Mantenimiento Inteligente',
    description: 'Anticipación de fallas basada en datos operativos. Reducción de paradas no planificadas y optimización de recursos de mantenimiento.'
  },
  {
    icon: 'pi-globe',
    title: 'Gestión Multi-Planta',
    description: 'Control centralizado de múltiples plantas o líneas. Comparativas de rendimiento y estandarización de procesos entre ubicaciones.'
  },
  {
    icon: 'pi-sparkles',
    title: 'Inteligencia Artificial',
    description: 'Insights automáticos para decisiones estratégicas. Análisis predictivo y detección de patrones en grandes volúmenes de datos.'
  }
]

const activeUseCaseIndex = ref(null)

const toggleUseCase = (index) => {
  if (activeUseCaseIndex.value === index) {
    activeUseCaseIndex.value = null
  } else {
    activeUseCaseIndex.value = index
  }
}

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
  // Pause auto-scroll while touching
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
  }
}

const handleTouchMove = (e) => {
  touchEndX = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next
      nextService()
    } else {
      // Swipe right - previous
      prevService()
    }
  }
  
  // Resume auto-scroll
  startAutoScroll()
}

onMounted(() => {
  startAutoScroll()
})

onUnmounted(() => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
  }
})
</script>

<style>
/* Estilos globales sin scoped para afectar html y body */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  background: #000;
  scroll-behavior: smooth;
}
</style>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* Contenedor de luz - Extendido para cubrir hero y parte de services */
.light-container {
  position: absolute;
  top: -20%;
  right: -2rem;
  width: 90vw;
  height: 140vh;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 1;
  filter: blur(20px);
  mask-image: radial-gradient(
    ellipse 120% 120% at 100% 40%, 
    rgb(255, 255, 255) 0%, 
    rgba(255, 255, 255, 0.95) 10%,
    rgba(255, 255, 255, 0.9) 20%,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0.65) 40%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.35) 60%,
    rgba(255, 255, 255, 0.2) 70%,
    rgba(255, 255, 255, 0.1) 80%,
    rgba(255, 255, 255, 0.03) 90%,
    rgba(255, 255, 255, 0) 100%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 120% 120% at 100% 40%, 
    rgb(255, 255, 255) 0%, 
    rgba(255, 255, 255, 0.95) 10%,
    rgba(255, 255, 255, 0.9) 20%,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0.65) 40%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.35) 60%,
    rgba(255, 255, 255, 0.2) 70%,
    rgba(255, 255, 255, 0.1) 80%,
    rgba(255, 255, 255, 0.03) 90%,
    rgba(255, 255, 255, 0) 100%
  );
}

/* Gradientes cónicos - Luz superior */
.conic-light {
  flex: 1;
  width: 100%;
}

.conic-light-top {
  background: conic-gradient(
    from 180deg at 99.78% 35%,
    rgb(255, 255, 255) 0deg,
    rgb(255, 255, 255) 15deg,
    rgb(255, 220, 150) 25deg,
    rgb(255, 200, 120) 40deg,
    rgba(255, 180, 100, 0.5) 60deg,
    rgba(17, 17, 17, 0) 90deg,
    rgba(17, 17, 17, 0) 342deg,
    rgb(255, 255, 255) 360deg
  );
}

/* Gradientes cónicos - Luz inferior */
.conic-light-bottom {
  background: conic-gradient(
    from 0deg at 99.78% 65%,
    rgb(255, 255, 255) 0deg,
    rgb(255, 255, 255) 10deg,
    rgba(17, 17, 17, 0) 20deg,
    rgba(17, 17, 17, 0) 270deg,
    rgb(255, 200, 120) 315deg,
    rgb(255, 220, 150) 330deg,
    rgb(255, 255, 255) 342deg,
    rgb(255, 255, 255) 360deg
  );
}

/* Hero Section */
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 10;
  padding-top: 80px;
  background: #000;
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 10;
  text-align: left;
  max-width: 1200px;
  padding: 0 60px;
}

.hero-title {
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 40px;
  letter-spacing: -0.02em;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.7) 30%,
    rgba(255, 255, 255, 0.95) 60%,
    rgba(255, 255, 255, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  will-change: transform, filter, opacity;
}

/* Announcement Button enhanced */
.announcement-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  will-change: transform, box-shadow, border-color;
  position: relative;
  overflow: hidden;
}

.announcement-button:hover {
}

.announcement-button svg {
  transition: transform 0.3s ease;
  opacity: 0.6;
  will-change: transform;
}

.announcement-button:hover svg {
}

.dot {
  width: 6px;
  height: 6px;
  background: #06f62e;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 60px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 6px;
  transition: all 0.3s ease;
  animation: bounce 2s ease-in-out infinite;
}

.scroll-indicator:hover {
  color: rgba(255, 255, 255, 0.7);
  transform: translateY(4px);
}

.scroll-indicator svg {
  width: 20px;
  height: 20px;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

/* Documentation Button - Liquid Glass */
.documentation-button {
  position: absolute;
  bottom: 40px;
  right: 60px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.6px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.1);
}

.documentation-button:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.15),
    0 6px 16px rgba(0, 0, 0, 0.15);
}

.documentation-button svg {
  transition: transform 0.3s ease;
  width: 14px;
  height: 14px;
}

.documentation-button:hover svg {
  transform: translateX(3px);
}

/* ==================== SERVICES SECTION ==================== */
.services-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000;
}

/* Decorative Elements - Left Vertical */
.deco-left {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.deco-text-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
}

.deco-line-vertical {
  width: 1px;
  height: 80px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
}

/* Decorative Elements - Top Right */
.deco-top-right {
  position: absolute;
  top: 2rem;
  right: 3rem;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.deco-text-small {
  font-size: 0.6rem;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
}

.deco-text-brand {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  text-transform: uppercase;
}

.deco-text-accent {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(255, 200, 120, 0.7);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.deco-cross {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.3);
  margin-left: 1rem;
}

.services-content-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 60px;
}

/* Left Navigation */
.services-nav {
  width: 280px;
  padding: 3rem 2rem 3rem 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  flex-shrink: 0;
}

.nav-header {
  margin-bottom: 1rem;
}

.nav-label {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
}

.services-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.service-item {
  font-size: 0.95rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding-left: 0;
  letter-spacing: 0.02em;
  will-change: transform, color;
}

.service-item::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 0;
  background: rgba(255, 200, 120, 0.8);
  transition: height 0.3s ease;
}

.service-item:hover {
}

.service-item.active {
  color: #fff;
  font-weight: 500;
}

.service-item.active::before {
  height: 100%;
}

/* Main Content */
.services-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4rem 4rem 4rem 6rem;
}

.service-detail {
  max-width: 600px;
  position: relative;
}

.service-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  line-height: 1.15;
}

.service-description {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.25rem;
  max-width: 480px;
}

.service-secondary {
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

/* Dots Navigation */
.dots-nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  z-index: 20;
  padding-right: 2rem;
}

.dot-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  transition: all 0.3s ease;
  will-change: transform, background;
}

.dot-indicator:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.2);
}

.dot-indicator.active {
  background: rgba(255, 200, 120, 0.9);
  box-shadow: 0 0 12px rgba(255, 200, 120, 0.6);
  transform: scale(1.2);
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ==================== MOBILE SERVICES CAROUSEL ==================== */
.mobile-services-carousel {
  display: none;
  flex-direction: column;
  padding: 0;
  width: 72%;
  max-width: 320px;
  margin: 0 auto;
  min-height: 380px;
}

.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;
}

.carousel-label {
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: rgba(255, 200, 120, 0.6);
}

.carousel-counter {
  font-size: 0.7rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.3);
  font-family: monospace;
}

.carousel-track {
  display: flex;
  align-items: flex-start;
  touch-action: pan-y;
  user-select: none;
  height: 300px;
  overflow: hidden;
}

.carousel-slide {
  width: 100%;
}

.carousel-title {
  font-size: 1.4rem;
  font-weight: 300;
  color: #fff;
  margin-bottom: 1.35rem;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.carousel-description {
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.1rem;
}

.carousel-secondary {
  font-size: 0.82rem;
  font-weight: 300;
  font-style: italic;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.35);
}

.carousel-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 1.75rem 0 1.1rem;
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.65rem;
  font-weight: 300;
}

.carousel-hint i {
  font-size: 0.55rem;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 7px;
}

.carousel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-dot.active {
  background: rgba(255, 200, 120, 0.7);
  width: 18px;
  border-radius: 3px;
}

/* Slide transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.35s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ==================== SOLUTION SECTION ==================== */
.solution-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000;
  padding: 100px 0 80px;
}

/* Simple light gradient - at the bottom of solution */
.solution-light {
  position: absolute;
  bottom: 0;
  left: -15%;
  right: -15%;
  height: 60%;
  pointer-events: none;
  z-index: 1;
  filter: blur(40px);
  background: radial-gradient(
    ellipse 140% 100% at 50% 100%,
    rgba(255, 240, 210, 1) 0%,
    rgba(255, 230, 190, 0.85) 8%,
    rgba(255, 220, 165, 0.7) 16%,
    rgba(255, 210, 145, 0.55) 24%,
    rgba(255, 200, 130, 0.42) 32%,
    rgba(255, 190, 120, 0.3) 40%,
    rgba(255, 180, 110, 0.2) 50%,
    rgba(255, 170, 100, 0.12) 60%,
    rgba(255, 160, 95, 0.05) 75%,
    rgba(0, 0, 0, 0) 100%
  );
}

.solution-container {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  align-items: stretch;
}

/* Separator Lines */
.solution-separator {
  width: 1px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.08) 20%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.08) 80%,
    rgba(255, 255, 255, 0) 100%
  );
  flex-shrink: 0;
}

/* Solution Columns */
.solution-column {
  display: flex;
  flex-direction: column;
  padding: 40px 40px;
  flex: 1;
}

.solution-column:first-child {
  padding-left: 0;
}

.solution-column:last-child {
  padding-right: 0;
}

.solution-column-center {
  align-items: center;
  text-align: center;
  flex: 1.3;
}

.solution-label {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.solution-column-title {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.85) 50%,
    rgba(255, 240, 220, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.solution-main-title {
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.85) 50%,
    rgba(255, 240, 220, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  will-change: transform, text-shadow;
}

.solution-text {
  font-size: 0.85rem;
  font-weight: 300;
  line-height: 1.8;
  flex: 1;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 230, 200, 0.75) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.solution-text-small {
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
  flex: none;
}

/* Device/Product Display */
.solution-device {
  width: 100%;
  max-width: 550px;
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.6),
    0 10px 30px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
  will-change: transform, box-shadow;
  cursor: pointer;
}

.solution-device-inner {
  width: 100%;
}

.device-image {
  width: 100%;
  height: auto;
  display: block;
}

.solution-device-caption {
  font-size: 0.85rem;
  font-weight: 300;
  line-height: 1.6;
  text-align: center;
  max-width: 400px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 230, 200, 0.75) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Features List */
.solution-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.85rem;
  transition: all 0.3s ease;
  will-change: transform;
  cursor: pointer;
}

.feature-icon {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  flex-shrink: 0;
  will-change: transform, color;
}

.feature-item span:last-child {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.75) 50%,
    rgba(255, 230, 200, 0.9) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-item:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-icon {
  color: rgba(255, 200, 120, 0.5);
  font-size: 0.75rem;
}

/* Links */
.solution-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: auto;
  padding-top: 2rem;
}

.solution-link a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.solution-link a:hover {
  color: #fff;
}

.doc-icon {
  font-size: 1rem;
}

/* Bottom Title */
.solution-bottom {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 80px auto 0;
  padding: 0 60px;
}

.solution-bottom-title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.solution-bottom-subtitle {
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 300;
}

/* ==================== USE CASES SECTION ==================== */
.use-cases-section {
  position: relative;
  width: 100%;
  background: transparent;
  padding: 120px 0;
}

.use-cases-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 60px;
}

.use-cases-header {
  text-align: center;
  margin-bottom: 80px;
}

.use-cases-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.use-cases-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  color: #fff;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.use-cases-subtitle {
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  max-width: 500px;
  margin: 0 auto;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.use-case-card {
  position: relative;
  background: #000;
  padding: 48px 36px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, box-shadow;
}

/* Border glow effect on hover */
.card-border {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.use-case-card:hover .card-border {
  opacity: 1;
}

.use-case-card:hover {
  background: rgba(255, 255, 255, 0.03);
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-icon {
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 24px;
  transition: all 0.4s ease;
}

.use-case-card:hover .card-icon {
  color: rgba(255, 255, 255, 0.8);
  transform: translateY(-4px);
}

.card-title {
  font-size: 1.15rem;
  font-weight: 500;
  color: #fff;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
  transition: color 0.4s ease;
}

.card-description {
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.45);
  transition: color 0.4s ease;
}

.use-case-card:hover .card-description {
  color: rgba(255, 255, 255, 0.65);
}

/* Subtle line decorators */
.use-case-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 36px;
  right: 36px;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.4s ease;
}

.use-case-card:hover::before {
  opacity: 1;
  transform: scaleX(1);
}

/* ==================== MOBILE USE CASES ACCORDION ==================== */
.mobile-use-cases-accordion {
  display: none;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

/* Global reset for accordion */
.mobile-use-cases-accordion * {
  background: transparent !important;
  background-color: transparent !important;
}

.accordion-item {
  border: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
}

.accordion-item:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
}

/* The button trigger */
.accordion-header {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  padding: 28px 0 !important;
  cursor: pointer !important;
  border: none !important;
  outline: none !important;
  transition: all 0.3s ease !important;
  will-change: transform;
}

.accordion-header:hover {
  text-decoration: none !important;
}

/* Left side: number + icon + title */
.accordion-header-left {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 14px !important;
}

.accordion-number {
  font-size: 0.65rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.2);
  font-family: monospace;
  min-width: 20px;
}

.accordion-icon {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.accordion-item[data-state="open"] .accordion-icon {
  color: rgba(255, 200, 120, 0.8);
}

.accordion-title {
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  text-align: left;
}

.accordion-item[data-state="open"] .accordion-title {
  color: rgba(255, 255, 255, 0.95);
}

/* Right side: toggle button */
.accordion-toggle {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.04) !important;
  color: rgba(255, 255, 255, 0.4) !important;
  transition: all 0.3s ease !important;
  flex-shrink: 0 !important;
  will-change: transform, background, color;
}

.accordion-toggle .pi {
  font-size: 0.75rem;
}

.accordion-item[data-state="open"] .accordion-toggle {
  background: rgba(255, 200, 120, 0.15) !important;
  color: rgba(255, 200, 120, 0.9) !important;
}

/* AccordionContent */
.accordion-content {
  overflow: hidden;
}

.accordion-content-inner {
  padding: 0 0 20px 34px;
}

.accordion-description {
  font-size: 0.85rem;
  font-weight: 300;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.5);
}

/* ==================== TECHNOLOGY SECTION - TIMELINE ==================== */
.technology-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000;
  padding: 120px 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Contenedor de luz - COPIA EXACTA del hero pero en lado izquierdo */
.tech-light-container {
  position: absolute;
  top: -20%;
  left: -2rem;
  width: 80vw;
  height: 140vh;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 1;
  filter: blur(20px);
  transform: scaleX(-1);
  opacity: 0.85;
  mask-image: radial-gradient(
    ellipse 110% 120% at 100% 40%, 
    rgb(255, 255, 255) 0%, 
    rgba(255, 255, 255, 0.95) 10%,
    rgba(255, 255, 255, 0.85) 20%,
    rgba(255, 255, 255, 0.7) 30%,
    rgba(255, 255, 255, 0.5) 40%,
    rgba(255, 255, 255, 0.35) 50%,
    rgba(255, 255, 255, 0.2) 60%,
    rgba(255, 255, 255, 0.1) 70%,
    rgba(255, 255, 255, 0.03) 80%,
    rgba(255, 255, 255, 0) 90%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 110% 120% at 100% 40%, 
    rgb(255, 255, 255) 0%, 
    rgba(255, 255, 255, 0.95) 10%,
    rgba(255, 255, 255, 0.85) 20%,
    rgba(255, 255, 255, 0.7) 30%,
    rgba(255, 255, 255, 0.5) 40%,
    rgba(255, 255, 255, 0.35) 50%,
    rgba(255, 255, 255, 0.2) 60%,
    rgba(255, 255, 255, 0.1) 70%,
    rgba(255, 255, 255, 0.03) 80%,
    rgba(255, 255, 255, 0) 90%
  );
}

.tech-conic-light {
  flex: 1;
  width: 100%;
}

/* COPIA EXACTA de conic-light-top del hero */
.tech-conic-light-top {
  background: conic-gradient(
    from 180deg at 99.78% 35%,
    rgb(255, 255, 255) 0deg,
    rgb(255, 255, 255) 15deg,
    rgb(255, 220, 150) 25deg,
    rgb(255, 200, 120) 40deg,
    rgba(255, 180, 100, 0.5) 60deg,
    rgba(17, 17, 17, 0) 90deg,
    rgba(17, 17, 17, 0) 342deg,
    rgb(255, 255, 255) 360deg
  );
}

/* COPIA EXACTA de conic-light-bottom del hero */
.tech-conic-light-bottom {
  background: conic-gradient(
    from 0deg at 99.78% 65%,
    rgb(255, 255, 255) 0deg,
    rgb(255, 255, 255) 10deg,
    rgba(17, 17, 17, 0) 20deg,
    rgba(17, 17, 17, 0) 270deg,
    rgb(255, 200, 120) 315deg,
    rgb(255, 220, 150) 330deg,
    rgb(255, 255, 255) 342deg,
    rgb(255, 255, 255) 360deg
  );
}

.technology-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 60px 0 200px;
}

/* Header */
.technology-header {
  margin-bottom: 80px;
}

.header-line-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.header-line {
  width: 32px;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.technology-label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
}

.technology-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  background: linear-gradient(
    to right,
    rgba(255, 240, 220, 1) 0%,
    rgba(255, 255, 255, 0.9) 30%,
    rgba(255, 255, 255, 0.7) 60%,
    rgba(255, 255, 255, 0.5) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.technology-subtitle {
  font-size: 1rem;
  font-weight: 300;
  max-width: 500px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.35) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Timeline Container */
.timeline-container {
  position: relative;
  padding: 160px 0;
}

/* Timeline Line */
.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-50%);
}

.timeline-line-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 200, 120, 0.6) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 200, 120, 0.6) 100%
  );
}

/* Timeline Items */
.timeline-items {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.timeline-item {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Dot */
.timeline-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  will-change: transform, box-shadow, border-color;
  cursor: pointer;
}

.timeline-item:hover .timeline-dot {
  border-color: rgba(255, 200, 120, 0.8);
  box-shadow: 0 0 15px rgba(255, 200, 120, 0.3);
}

.dot-inner {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.timeline-item:hover .dot-inner {
  background: rgba(255, 200, 120, 1);
}

/* Vertical Line */
.vertical-line {
  position: absolute;
  left: 50%;
  width: 1px;
  height: 70px;
  transform: translateX(-50%);
}

.item-top .vertical-line {
  bottom: 50%;
  margin-bottom: 7px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.03)
  );
}

.item-bottom .vertical-line {
  top: 50%;
  margin-top: 7px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.03)
  );
}

/* Content Card */
.timeline-card {
  position: absolute;
  width: max-content;
  max-width: 200px;
  text-align: left;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
  will-change: transform, box-shadow;
  cursor: pointer;
}

.timeline-item:hover .timeline-card {
  transform: translateX(-50%) translateY(-3px);
}

.item-top .timeline-card {
  bottom: calc(50% + 90px);
}

.item-bottom .timeline-card {
  top: calc(50% + 90px);
}

/* Step Label */
.step-label {
  display: block;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgba(255, 200, 120, 0.6);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

/* Step Title */
.step-title {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 0.6rem;
  line-height: 1.3;
}

/* Step Description */
.step-description {
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}

/* Efecto de iluminación gradual - más brillante a la izquierda */
.timeline-item:nth-child(1) .step-label { color: rgba(255, 220, 150, 1); }
.timeline-item:nth-child(1) .step-title { color: rgba(255, 255, 255, 1); }
.timeline-item:nth-child(1) .step-description { color: rgba(255, 255, 255, 0.8); }

.timeline-item:nth-child(2) .step-label { color: rgba(255, 210, 140, 0.85); }
.timeline-item:nth-child(2) .step-title { color: rgba(255, 255, 255, 0.95); }
.timeline-item:nth-child(2) .step-description { color: rgba(255, 255, 255, 0.7); }

.timeline-item:nth-child(3) .step-label { color: rgba(255, 200, 120, 0.7); }
.timeline-item:nth-child(3) .step-title { color: rgba(255, 255, 255, 0.88); }
.timeline-item:nth-child(3) .step-description { color: rgba(255, 255, 255, 0.6); }

.timeline-item:nth-child(4) .step-label { color: rgba(255, 200, 120, 0.55); }
.timeline-item:nth-child(4) .step-title { color: rgba(255, 255, 255, 0.8); }
.timeline-item:nth-child(4) .step-description { color: rgba(255, 255, 255, 0.5); }

.timeline-item:nth-child(5) .step-label { color: rgba(255, 200, 120, 0.45); }
.timeline-item:nth-child(5) .step-title { color: rgba(255, 255, 255, 0.72); }
.timeline-item:nth-child(5) .step-description { color: rgba(255, 255, 255, 0.42); }

.timeline-item:nth-child(6) .step-label { color: rgba(255, 200, 120, 0.35); }
.timeline-item:nth-child(6) .step-title { color: rgba(255, 255, 255, 0.65); }
.timeline-item:nth-child(6) .step-description { color: rgba(255, 255, 255, 0.35); }

/* Dots gradual illumination */
.timeline-item:nth-child(1) .timeline-dot { border-color: rgba(255, 220, 150, 0.9); }
.timeline-item:nth-child(1) .dot-inner { background: rgba(255, 220, 150, 1); }

.timeline-item:nth-child(2) .timeline-dot { border-color: rgba(255, 210, 140, 0.7); }
.timeline-item:nth-child(2) .dot-inner { background: rgba(255, 220, 160, 0.9); }

.timeline-item:nth-child(3) .timeline-dot { border-color: rgba(255, 255, 255, 0.5); }
.timeline-item:nth-child(3) .dot-inner { background: rgba(255, 255, 255, 0.85); }

.timeline-item:nth-child(4) .timeline-dot { border-color: rgba(255, 255, 255, 0.4); }
.timeline-item:nth-child(4) .dot-inner { background: rgba(255, 255, 255, 0.75); }

.timeline-item:nth-child(5) .timeline-dot { border-color: rgba(255, 255, 255, 0.3); }
.timeline-item:nth-child(5) .dot-inner { background: rgba(255, 255, 255, 0.65); }

.timeline-item:nth-child(6) .timeline-dot { border-color: rgba(255, 255, 255, 0.25); }
.timeline-item:nth-child(6) .dot-inner { background: rgba(255, 255, 255, 0.55); }

/* ==================== CONTACT SECTION ==================== */
.contact-section {
  position: relative;
  width: 100%;
  background: #000;
  padding: 140px 0 80px;
}

.contact-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 40px;
}

.contact-content {
  text-align: center;
}

.contact-label {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: rgba(255, 200, 120, 0.7);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.contact-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  color: #fff;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}

.contact-subtitle {
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 3rem;
}

.contact-options {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 2.5rem;
}

/* Primary button - WhatsApp */
.contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 400;
  transition: all 0.3s ease;
  min-width: 220px;
  will-change: transform, box-shadow, border-color;
  cursor: pointer;
}

.contact-btn-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-btn-content i {
  font-size: 1rem;
}

.contact-btn-arrow {
  font-size: 0.75rem;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: all 0.3s ease;
  will-change: transform;
}

.contact-btn:hover .contact-btn-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.contact-btn-primary {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
}

.contact-btn-primary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
}

.contact-btn-primary .contact-btn-content i {
  color: rgba(37, 211, 102, 0.9);
}

.contact-btn-secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

.contact-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}

.contact-note {
  font-size: 0.75rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.02em;
}

/* ==================== FOOTER ==================== */
.main-footer {
  position: relative;
  width: 100%;
  background: transparent;
  padding: 100px 0 40px;
  overflow: hidden;
}

.footer-light {
  position: absolute;
  bottom: 0;
  left: -40%;
  right: -40%;
  height: 120%;
  background: radial-gradient(
    ellipse 160% 100% at 50% 120%,
    rgba(255, 220, 180, 0.5) 0%,
    rgba(255, 200, 150, 0.35) 10%,
    rgba(255, 180, 120, 0.25) 25%,
    rgba(220, 160, 100, 0.15) 40%,
    rgba(180, 130, 90, 0.08) 55%,
    rgba(120, 90, 60, 0.04) 70%,
    transparent 100%
  );
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
}

.footer-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 60px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 60px;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-brand {
  padding-right: 40px;
}

.footer-logo {
  width: 10rem;
  margin-bottom: 16px;
  opacity: 0.7;
  will-change: transform, opacity;
  cursor: pointer;
}

.footer-about {
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
}

.footer-title {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 20px;
  will-change: opacity, letter-spacing;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links li a {
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
  will-change: transform, color;
  display: inline-block;
  cursor: pointer;
}

.footer-links li a:hover {
  color: rgba(255, 200, 120, 0.9);
}

/* Footer bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
}

.footer-copyright {
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.3);
}

.footer-legal {
  display: flex;
  gap: 24px;
}

.footer-legal a {
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal a:hover {
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive */
@media (max-width: 1024px) {
  .services-content-wrapper {
    flex-direction: column;
  }

  .services-nav {
    width: 100%;
    padding: 2rem;
    order: 2;
  }

  .services-main {
    order: 1;
    padding: 2rem;
  }

  .dots-nav {
    right: 1rem;
  }
  
  /* Technology responsive - tablet */
  .technology-container {
    padding: 0 40px;
  }
  
  .timeline-container {
    padding: 120px 0;
  }
  
  .timeline-card {
    max-width: 160px;
  }
  
  .vertical-line {
    height: 50px;
  }
  
  .item-top .timeline-card {
    bottom: calc(50% + 70px);
  }
  
  .item-bottom .timeline-card {
    top: calc(50% + 70px);
  }
}

@media (max-width: 768px) {
  /* Technology responsive - mobile: vertical layout */
  .technology-section {
    padding: 80px 0;
  }
  
  .tech-light-container {
    top: 10%;
    left: -30%;
    width: 100vw;
    height: 130vh;
    opacity: 0.6;
  }
  
  .technology-container {
    padding: 0 30px;
  }
  
  .technology-header {
    margin-bottom: 50px;
  }
  
  .timeline-container {
    padding: 30px 0 0 0;
  }
  
  .timeline-line {
    top: 0;
    bottom: 0;
    left: 20px;
    right: auto;
    width: 1px;
    height: auto;
    transform: none;
  }
  
  .timeline-line-progress {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(255, 200, 120, 0.6) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 200, 120, 0.6) 100%
    );
  }
  
  .timeline-items {
    flex-direction: column;
    gap: 50px;
    padding-left: 50px;
  }
  
  .timeline-item {
    align-items: flex-start;
  }
  
  .timeline-dot {
    left: -30px;
    top: 0;
    transform: translate(-50%, 0);
  }
  
  .vertical-line {
    display: none;
  }
  
  .timeline-card {
    position: relative;
    left: 0;
    top: 0;
    bottom: auto;
    transform: none;
    max-width: 100%;
  }
  
  .item-top .timeline-card,
  .item-bottom .timeline-card {
    position: relative;
    left: 0;
    top: 0;
    bottom: auto;
    transform: none;
  }
  
  .timeline-item:hover .timeline-card {
    transform: none;
    top: 30%;
  }

  .deco-left,
  .deco-top-right {
    display: none;
  }
  
  .services-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .service-item {
    font-size: 0.85rem;
  }
  
  .service-item::before {
    display: none;
  }
  
  /* Solution responsive */
  .solution-container {
    flex-direction: column;
    gap: 0;
    padding: 0 30px;
  }
  
  /* Hide left column and first separator on mobile */
  .solution-column-left {
    display: none;
  }
  
  .solution-separator:first-of-type {
    display: none;
  }
  
  .solution-separator {
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  
  .solution-column {
    padding: 40px 20px;
  }
  
  .solution-column-center {
    flex: none;
  }
  
  .solution-bottom {
    padding: 0 30px;
    margin-top: 40px;
  }
  
  /* Use Cases responsive */
  .use-cases-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .use-cases-container {
    padding: 0 30px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 100px;
    min-height: 100vh;
    min-height: 100dvh;
    align-items: flex-start;
    padding-bottom: 100px;
  }
  
  .hero-content {
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 200px);
    min-height: calc(100dvh - 200px);
  }
  
  .hero-title {
    font-size: clamp(32px, 10vw, 48px);
    margin-bottom: 24px;
    line-height: 1.15;
  }
  
  .announcement-button {
    font-size: 10px;
    padding: 12px 20px;
    align-self: flex-start;
  }
  
  .scroll-indicator {
  bottom: 24px;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 32px;
  height: 32px;
}

.scroll-indicator:hover {
  transform: translateX(-50%) translateY(4px);
}

.scroll-indicator svg {
  width: 24px;
  height: 24px;
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(8px);
  }
}
  
  .documentation-button {
    display: none;
  }
  
  /* Adjust light for mobile */
  .light-container {
    width: 100vw;
    right: -20%;
  }
  
  /* Services mobile - Carousel */
  .services-section {
    min-height: auto;
    padding: 80px 0 60px;
    scroll-margin-top: 225px;
  }
  
  .desktop-services {
    display: none !important;
  }
  
  .deco-left {
    display: none;
  }
  
  .mobile-services-carousel {
    display: flex;
  }
  
  /* Use Cases mobile - Accordion */
  .desktop-use-cases {
    display: none;
  }
  
  .mobile-use-cases-accordion {
    display: flex;
  }
  
  .use-cases-section {
    padding: 80px 0;
  }
  
  .use-cases-container {
    padding: 0 24px;
  }
  
  .use-cases-header {
    margin-bottom: 40px;
    text-align: center;
  }
  
  .use-cases-title {
    font-size: 1.6rem;
  }
  
  .use-cases-subtitle {
    font-size: 0.85rem;
  }
  
  /* Contact responsive */
  .contact-section {
    padding: 100px 0 60px;
  }
  
  .contact-container {
    padding: 0 30px;
  }
  
  .contact-options {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  
  .contact-btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
  
  /* Footer responsive */
  .main-footer {
    padding: 60px 0 30px;
  }
  
  .footer-container {
    padding: 0 24px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px 20px;
  }
  
  .footer-brand {
    grid-column: span 2;
    padding-right: 0;
    margin-bottom: 16px;
  }
  
  .footer-logo {
    height: 14px;
    max-width: 100px;
  }
  
  .footer-about {
    font-size: 0.8rem;
    line-height: 1.6;
  }
  
  .footer-contact-column {
    display: none;
  }
  
  .footer-column {
    padding: 0;
  }
  
  .footer-title {
    font-size: 0.6rem;
    margin-bottom: 12px;
  }
  
  .footer-links {
    gap: 8px;
  }
  
  .footer-links li a {
    font-size: 0.8rem;
  }
  
  .footer-bottom {
    margin-top: 30px;
    padding-top: 20px;
  }
  
  .footer-copyright {
    font-size: 0.7rem;
    text-align: center;
  }
  
  .footer-legal {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
}
</style>
