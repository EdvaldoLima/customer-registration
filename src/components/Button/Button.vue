<script setup>
const props = defineProps({
  outlined: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button
    v-bind="$attrs"
    :class="{
      '--outline': props.outlined,
      '--block': props.block,
      '--loading': props.loading,
    }"
    :disabled="props.loading || $attrs.disabled"
  >
    <span
      v-if="props.loading"
      class="spinner"
    ></span>
    <slot />
  </button>
</template>
<style lang="scss" scoped>
@use "./Button.scss";
</style>
