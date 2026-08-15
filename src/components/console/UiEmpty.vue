<template>
  <div class="ui-empty">
    <div v-if="$slots.icon" class="ui-empty__icon"><slot name="icon" /></div>
    <h3 class="ui-empty__title">{{ title }}</h3>
    <p v-if="text || $slots.default" class="ui-empty__text"><slot>{{ text }}</slot></p>
    <div v-if="$slots.action" class="ui-empty__action"><slot name="action" /></div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  text: String,
})
</script>

<style scoped>
.ui-empty {
  text-align: center;
  padding: 72px 28px;
  border: 1px dashed var(--border);
  border-radius: var(--r-lg);
  background: rgba(255, 255, 255, 0.012);
}
.ui-empty__icon {
  width: 54px;
  height: 54px;
  margin: 0 auto 18px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--accent);
  box-shadow: var(--shadow-sm);
}
.ui-empty__title {
  margin: 0 0 7px;
  font-size: 1.1rem;
  font-weight: 620;
  letter-spacing: -0.02em;
  color: var(--text);
}
.ui-empty__text {
  margin: 0 auto;
  max-width: 360px;
  line-height: 1.55;
  font-size: 0.92rem;
  color: var(--text-dim);
}
.ui-empty__action { margin-top: 24px; }
</style>
