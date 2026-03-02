<script setup>
import { computed } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  severity: {
    type: String,
    default: "success",
  },
});

const severity = computed(() => `--${props.severity}`);
</script>
<template>
  <div
    v-show="props.show"
    class="alert"
    :class="[severity]"
  >
    <p>
      <slot />
    </p>
  </div>
</template>
<style scoped lang="scss">
@use "Alert.scss";
</style>
