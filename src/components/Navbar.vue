<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/MARCA-14.png" alt="SEIM Interactive" class="logo-img" />
    </div>
    
    <nav class="nav">
      <a href="#services" class="nav-link">SERVICIO</a>
      <a href="#solution" class="nav-link">SOLUCIÓN</a>
      <a href="#use-cases" class="nav-link">CASOS DE USO</a>
      <a href="#technology" class="nav-link">TECNOLOGÍA</a>
      <a href="#contact" class="nav-link">CONTACTO</a>
    </nav>
    
    <a href="#contact" class="cta-button desktop-only">COMENZAR</a>
    
    <!-- Mobile menu button -->
    <button class="menu-toggle" @click="toggleMenu" :class="{ active: menuOpen }">
      <span class="menu-line"></span>
      <span class="menu-line"></span>
    </button>
    
    <!-- Mobile menu overlay -->
    <Transition name="menu-fade">
      <div class="mobile-menu" v-if="menuOpen">
        <!-- Decorative elements -->
        <div class="menu-deco-line menu-deco-top"></div>
        <div class="menu-deco-line menu-deco-bottom"></div>
        
        <div class="menu-content">
          <span class="menu-label">NAVEGACIÓN</span>
          
          <nav class="mobile-nav">
            <a 
              v-for="(item, index) in menuItems" 
              :key="item.href"
              :href="item.href" 
              class="mobile-nav-link" 
              @click="closeMenu"
              :style="{ transitionDelay: `${index * 50}ms` }"
            >
              <span class="nav-number">0{{ index + 1 }}</span>
              <span class="nav-text">{{ item.label }}</span>
              <span class="nav-arrow">
                <i class="pi pi-arrow-right"></i>
              </span>
            </a>
          </nav>
          
          <div class="menu-footer">
            <div class="menu-contact">
              <a href="https://wa.me/5493413551507" target="_blank" class="menu-contact-link">
                <i class="pi pi-whatsapp"></i>
              </a>
              <a href="mailto:hello@seiminteractive.io" class="menu-contact-link">
                <i class="pi pi-envelope"></i>
              </a>
            </div>
            <span class="menu-copyright">© 2026 SEIM Interactive</span>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNavbarAnimations } from '../composables/useNavbarAnimations'

// Inicializar animaciones del navbar
useNavbarAnimations()

const menuOpen = ref(false)

const menuItems = [
  { href: '#services', label: 'Servicio' },
  { href: '#solution', label: 'Solución' },
  { href: '#use-cases', label: 'Casos de Uso' },
  { href: '#technology', label: 'Tecnología' },
  { href: '#contact', label: 'Contacto' }
]

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
/* Header/Navbar */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  z-index: 100;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 220, 150, 0.03) 50%,
    rgba(255, 255, 255, 0.04) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 16px 0 rgba(255, 200, 120, 0.03);
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  pointer-events: none;
  z-index: -1;
}

.logo {
  display: flex;
  align-items: center;
  z-index: 101;
}

.logo-img {
  height: 24px;
  width: auto;
  display: block;
  opacity: 0.9;
  will-change: transform, opacity;
  cursor: pointer;
}

.nav {
  display: flex;
  gap: 32px;
  flex: 1;
  justify-content: center;
  margin: 0 40px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.3s ease, transform 0.2s ease;
  position: relative;
  text-transform: uppercase;
  will-change: color, transform;
  cursor: pointer;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.9);
}

/* Minimal Button */
.cta-button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.85);
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-decoration: none;
  will-change: transform, box-shadow, border-color;
}

.cta-button:hover {
}

/* Menu Toggle Button - Sin recuadro */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 101;
  padding: 0;
}

.menu-line {
  width: 22px;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.85);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  will-change: background, transform;
}

.menu-toggle.active .menu-line:first-child {
  transform: rotate(45deg) translate(2.5px, 2.5px);
}

.menu-toggle.active .menu-line:last-child {
  transform: rotate(-45deg) translate(2.5px, -2.5px);
}

/* Mobile Menu Overlay */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  z-index: 99;
  overflow: hidden;
}

/* Menu transition */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.4s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

/* Decorative lines */
.menu-deco-line {
  position: absolute;
  left: 24px;
  right: 24px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 20%,
    rgba(255, 255, 255, 0.1) 80%,
    transparent 100%
  );
}

.menu-deco-top {
  top: 80px;
}

.menu-deco-bottom {
  bottom: 100px;
}

/* Menu Content */
.menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px 40px;
}

.menu-label {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: rgba(255, 200, 120, 0.6);
  margin-bottom: 2rem;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  text-decoration: none;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.mobile-nav-link:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.nav-number {
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.25);
  font-family: monospace;
  min-width: 24px;
}

.nav-text {
  flex: 1;
  font-size: 1.4rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
  will-change: color;
}

.nav-arrow {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  transform: translateX(-8px);
  opacity: 0;
}

.mobile-nav-link:hover .nav-text,
.mobile-nav-link:active .nav-text {
  color: rgba(255, 255, 255, 1);
}

.mobile-nav-link:hover .nav-arrow,
.mobile-nav-link:active .nav-arrow {
  transform: translateX(0);
  opacity: 1;
  color: rgba(255, 200, 120, 0.7);
}

/* Menu Footer */
.menu-footer {
  position: absolute;
  bottom: 40px;
  left: 40px;
  right: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-contact {
  display: flex;
  gap: 16px;
}

.menu-contact-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: all 0.3s ease;
  will-change: transform, filter;
  cursor: pointer;
}

.menu-contact-link:hover {
  color: rgba(255, 200, 120, 0.9);
}

.menu-copyright {
  font-size: 0.7rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.05em;
}

/* Responsive */
@media (max-width: 1024px) {
  .nav {
    gap: 24px;
  }
  
  .nav-link {
    font-size: 10px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 20px 24px;
  }
  
  .nav,
  .desktop-only {
    display: none;
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .logo-img {
    height: 20px;
  }
}
</style>
