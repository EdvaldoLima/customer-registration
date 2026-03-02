<script setup>
import { InputText, RadioButton } from "@/components";

const model = defineModel({
  type: Object,
  required: true,
});
</script>
<template>
  <InputText
    v-model="model.mailAddress"
    label="Endereco de e-mail"
  />
  <div class="account-type">
    <RadioButton
      v-model="model.accountType"
      label="Pessoa física"
      value="pf"
    />
    <RadioButton
      v-model="model.accountType"
      label="Pessoa jurídica"
      value="pj"
    />
  </div>
</template>
<style scoped lang="scss">
.account-type {
  display: flex;
  gap: 1rem;
}
</style>
