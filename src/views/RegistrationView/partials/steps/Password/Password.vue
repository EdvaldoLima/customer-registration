<script setup>
import { InputPassword } from "@/components";
const model = defineModel({
  type: Object,
  required: true,
});
</script>

<template>
  <InputPassword
    label="Sua senha"
    v-model="model.password"
  />
</template>
