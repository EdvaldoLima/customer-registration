<script setup>
import { randomId } from "@/utils/random";

const model = defineModel({
  type: [String, null],
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
  <div class="input-text">
    <label :for="labelAndId">{{ label }}</label>
    <input
      v-model="model"
      v-bind="$attrs"
      :id="labelAndId"
      type="text"
    />
  </div>
</template>
<style lang="scss" scoped>
@use "./InputText.scss";
</style>
