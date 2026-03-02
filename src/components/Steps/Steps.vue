<script setup>
import { computed } from "vue";

const props = defineProps({
  currentStep: {
    type: Number,
    default: 1,
  },
  steps: {
    type: Array,
    required: true,
  },
});

const currentStepIndicator = computed(() => {
  return props.currentStep + 1;
});
const totalSteps = computed(() => {
  return props.steps.length;
});
</script>
<template>
  <div class="steps">
    <div class="steps__indicator">
      Etapa <span>{{ currentStepIndicator }}</span> de {{ totalSteps }}
    </div>
    <div
      v-for="(step, index) in props.steps"
      :key="index"
      class="steps__step"
    >
      <template v-if="props.currentStep === index">
        <div class="steps__step__title">
          <h3>{{ step }}</h3>
        </div>
        <div class="steps__step__content">
          <slot />
        </div>
        <div class="steps__step__actions">
          <slot name="actions" />
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "./Steps.scss";
</style>
