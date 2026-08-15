<template>
  <component :is="tag" class="ui-card" :class="{ 'ui-card--pad': pad, 'ui-card--hover': hover }">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  tag: { type: String, default: 'div' },
  pad: { type: Boolean, default: true },
  hover: Boolean,
})
</script>

<style scoped>
.ui-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-sm);
}
.ui-card--pad { padding: 22px; }
.ui-card--hover { transition: border-color 0.16s ease, background 0.16s ease, transform 0.16s ease; }
.ui-card--hover:hover { border-color: var(--border-strong); background: #101013; }
</style>
