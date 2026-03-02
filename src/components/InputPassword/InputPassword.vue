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
  <div class="input-password">
    <label :for="labelAndId">{{ label }}</label>
    <input
      v-model="model"
      v-bind="$attrs"
      :id="labelAndId"
      type="password"
    />
  </div>
</template>
<style lang="scss" scoped>
@use "./InputPassword.scss";
</style>
