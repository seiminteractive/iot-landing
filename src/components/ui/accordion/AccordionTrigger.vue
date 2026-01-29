<script setup lang="ts">
import type { AccordionTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  AccordionHeader,
  AccordionTrigger,
} from "reka-ui"

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AccordionHeader class="accordion-header-wrapper">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="props.class"
    >
      <slot />
    </AccordionTrigger>
  </AccordionHeader>
</template>

<style scoped>
.accordion-header-wrapper {
  display: flex !important;
  width: 100% !important;
}

.accordion-header-wrapper :deep(button) {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  padding: 20px 0 !important;
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
}
</style>
