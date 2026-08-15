<template>
  <div class="console login-screen">
    <form class="login-card" @submit.prevent="submit">
      <img src="@/assets/MARCA-14.png" alt="Seim Interactive" class="login-logo" />

      <div class="login-head">
        <h1 class="login-title">Bienvenido</h1>
        <p class="login-sub">Ingresá para gestionar tus briefs y propuestas.</p>
      </div>

      <div class="login-fields">
        <UiInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="vos@seim.com"
          autocomplete="username"
          :disabled="loading"
        />
        <UiInput
          v-model="password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
          :disabled="loading"
        />
      </div>

      <p v-if="error" class="login-error">{{ error }}</p>

      <UiButton type="submit" variant="primary" size="lg" block :loading="loading">
        Ingresar
      </UiButton>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loginAdmin } from '@/services/auth'
import { UiInput, UiButton } from '@/components/console'

const route = useRoute()
const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await loginAdmin(email.value, password.value)
    router.replace(route.query.redirect || { name: 'admin' })
  } catch (e) {
    error.value = 'Email o contraseña incorrectos.'
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 22px;
  background: linear-gradient(180deg, #131316 0%, #0c0c0e 100%);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
}
.login-logo { height: 24px; width: auto; opacity: 0.95; margin-bottom: 32px; }
.login-head { margin-bottom: 30px; }
.login-title { font-size: 2rem; font-weight: 680; letter-spacing: -0.03em; margin: 0; }
.login-sub { color: var(--text-dim); margin: 8px 0 0; font-size: 0.95rem; line-height: 1.5; }
.login-fields { display: flex; flex-direction: column; gap: 18px; margin-bottom: 22px; }
.login-error {
  color: var(--danger);
  font-size: 0.88rem;
  background: rgba(255, 122, 122, 0.09);
  border: 1px solid rgba(255, 122, 122, 0.28);
  border-radius: var(--r-md);
  padding: 11px 14px;
  margin: 0 0 18px;
}
</style>
