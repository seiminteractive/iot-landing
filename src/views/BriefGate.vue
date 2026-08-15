<template>
  <div class="console gate-screen">
    <div class="gate-light" aria-hidden="true">
      <div class="gate-conic gate-conic--top"></div>
      <div class="gate-conic gate-conic--bottom"></div>
    </div>

    <form class="gate-card" @submit.prevent="submit">
      <img src="@/assets/MARCA-14.png" alt="Seim Interactive" class="gate-logo" />

      <div class="gate-head">
        <h1 class="gate-title">Contanos tu proyecto</h1>
        <p class="gate-sub">
          Ingresá el código que te compartimos para acceder a tu formulario y
          armar juntos la propuesta.
        </p>
      </div>

      <span class="gate-sep" aria-hidden="true"></span>

      <UiInput
        v-model="code"
        label="Tu código de acceso"
        placeholder="Ej: proyecto-2026"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        :disabled="loading"
        :error="error"
      />

      <UiButton
        type="submit"
        variant="primary"
        size="lg"
        block
        :loading="loading"
        :disabled="!code.trim()"
        class="gate-btn"
      >
        <span class="gate-btn-text">Ingresar</span>
        <svg class="gate-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h13M12 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </UiButton>

      <div class="gate-or" aria-hidden="true"><span>o</span></div>

      <p class="gate-foot">¿No tenés código? Escribinos y te lo generamos.</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ensureClientSession } from '@/services/auth'
import { validateCode } from '@/services/db'
import { UiInput, UiButton } from '@/components/console'

const router = useRouter()
const code = ref('')
const loading = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await ensureClientSession()
    const result = await validateCode(code.value)
    if (!result) {
      error.value = 'El código no es válido. Revisalo o escribinos.'
      return
    }
    router.push({ name: 'brief-wizard', params: { sessionId: result.hash } })
  } catch (e) {
    console.error(e)
    error.value = 'No pudimos validar el código. Probá de nuevo en un momento.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.gate-screen {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  overflow: hidden;
  background: #000;
}

/* Luz lateral — misma identidad que el header de la landing --------------- */
.gate-light {
  position: absolute;
  top: -25%;
  right: -8%;
  width: 85vw;
  max-width: 780px;
  height: 150vh;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 0;
  filter: blur(24px) brightness(0.95);
  opacity: 0.82;
  mask-image: radial-gradient(
    ellipse 130% 130% at 100% 50%,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.92) 25%,
    rgba(255, 255, 255, 0.62) 50%,
    rgba(255, 255, 255, 0.3) 70%,
    rgba(255, 255, 255, 0.1) 85%,
    rgba(255, 255, 255, 0) 100%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 130% 130% at 100% 50%,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.92) 25%,
    rgba(255, 255, 255, 0.62) 50%,
    rgba(255, 255, 255, 0.3) 70%,
    rgba(255, 255, 255, 0.1) 85%,
    rgba(255, 255, 255, 0) 100%
  );
}
.gate-conic { flex: 1; width: 100%; }
.gate-conic--top {
  background: conic-gradient(
    from 180deg at 99.78% 35%,
    rgb(255, 255, 255) 0deg,
    rgb(255, 255, 255) 15deg,
    rgb(175, 227, 232) 25deg,
    rgb(160, 212, 222) 40deg,
    rgba(145, 195, 205, 0.5) 60deg,
    rgba(17, 17, 17, 0) 90deg,
    rgba(17, 17, 17, 0) 342deg,
    rgb(255, 255, 255) 360deg
  );
}
.gate-conic--bottom {
  background: conic-gradient(
    from 0deg at 99.78% 65%,
    rgb(255, 255, 255) 0deg,
    rgb(255, 255, 255) 10deg,
    rgba(17, 17, 17, 0) 20deg,
    rgba(17, 17, 17, 0) 270deg,
    rgb(160, 212, 222) 315deg,
    rgb(175, 227, 232) 330deg,
    rgb(255, 255, 255) 342deg,
    rgb(255, 255, 255) 360deg
  );
}

/* Card — encapsula el login por encima de la luz ------------------------- */
.gate-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 448px;
  padding: 52px 46px;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(17, 18, 21, 0.68) 0%, rgba(11, 11, 13, 0.74) 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(20px) saturate(1.1);
  -webkit-backdrop-filter: blur(20px) saturate(1.1);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.05) inset,
    0 40px 90px -32px rgba(0, 0, 0, 0.9);
  animation: gate-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}
/* Hairline luminoso en el borde superior */
.gate-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(180deg, rgba(175, 227, 232, 0.4), rgba(255, 255, 255, 0.03) 32%, transparent 60%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
@keyframes gate-rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

.gate-logo { height: 24px; width: auto; opacity: 0.95; margin-bottom: 52px; }
.gate-head { margin-bottom: 0; }

.gate-title {
  font-size: clamp(2rem, 9vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  margin: 0;
  line-height: 1.05;
  background: linear-gradient(120deg, #ffffff 30%, #afe3e8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.gate-sub { color: var(--text-dim); margin: 16px 0 0; font-size: 0.98rem; line-height: 1.6; max-width: 380px; }

/* Separador — línea sutil que abre la sección del formulario */
.gate-sep {
  display: block;
  width: 34px;
  height: 1px;
  margin: 34px 0;
  background: linear-gradient(90deg, rgba(175, 227, 232, 0.75), rgba(175, 227, 232, 0.05));
}

/* Botón con flecha a la derecha */
.gate-btn { margin-top: 26px; }
.gate-btn :deep(.ui-btn__label) { position: relative; width: 100%; justify-content: center; }
.gate-btn-arrow { position: absolute; right: 0; display: inline-flex; }

/* Divisor "o" */
.gate-or {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 32px 0 22px;
  color: var(--text-faint);
  font-size: 0.85rem;
}
.gate-or::before,
.gate-or::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.gate-foot { color: var(--text-faint); font-size: 0.82rem; text-align: center; margin: 0; }

/* En mobile reubicamos la luz al centro y bajamos un poco el brillo */
@media (max-width: 640px) {
  .gate-light {
    top: -10%;
    right: -30%;
    width: 130vw;
    height: 120vh;
    opacity: 0.85;
    filter: blur(30px) brightness(1.02);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gate-card { animation: none; }
}
</style>
