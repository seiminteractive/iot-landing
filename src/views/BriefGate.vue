<template>
  <div class="console gate-screen">
    <form class="gate-card" @submit.prevent="submit">
      <img src="@/assets/MARCA-14.png" alt="Seim Interactive" class="gate-logo" />

      <div class="gate-head">
        <h1 class="gate-title">Contanos tu proyecto</h1>
        <p class="gate-sub">
          Ingresá el código que te compartimos para acceder a tu formulario y
          armar juntos la propuesta.
        </p>
      </div>

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
        Ingresar
      </UiButton>

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
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.gate-card {
  width: 100%;
  max-width: 440px;
  padding: 40px;
  border-radius: 22px;
  background: linear-gradient(180deg, #131316 0%, #0c0c0e 100%);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
}
.gate-logo { height: 24px; width: auto; opacity: 0.95; margin-bottom: 30px; }
.gate-head { margin-bottom: 28px; }
.gate-title { font-size: 1.85rem; font-weight: 680; letter-spacing: -0.03em; margin: 0; line-height: 1.1; }
.gate-sub { color: var(--text-dim); margin: 10px 0 0; font-size: 0.96rem; line-height: 1.55; }
.gate-btn { margin-top: 22px; }
.gate-foot { color: var(--text-faint); font-size: 0.82rem; text-align: center; margin: 20px 0 0; }
</style>
