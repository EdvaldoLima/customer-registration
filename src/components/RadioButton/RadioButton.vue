<script setup>
import { randomId } from "@/utils/random";

const model = defineModel({
  type: String,
  required: true,
});
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
const labelAndId = randomId();
</script>
<template>
  <div class="radio-button">
    <input
      v-model="model"
      v-bind="$attrs"
      :id="labelAndId"
      type="radio"
    />
    <label :for="labelAndId">{{ label }}</label>
  </div>
</template>
<style lang="scss" scoped>
@use "./RadioButton.scss";
</style>
