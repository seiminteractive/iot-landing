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
    
    <a href="#contact" class="cta-button">COMENZAR</a>
  </header>
</template>

<script setup>
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
  background: transparent;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 24px;
  width: auto;
  display: block;
  opacity: 0.9;
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
  transition: color 0.3s ease;
  position: relative;
  text-transform: uppercase;
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
}

.cta-button:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.35);
  color: rgba(255, 255, 255, 1);
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
    padding: 20px 30px;
  }
  
  .nav {
    display: none;
  }
  
  .logo-img {
    height: 22px;
  }
}
</style>
