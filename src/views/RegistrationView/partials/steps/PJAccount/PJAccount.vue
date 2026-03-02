<script setup>
import { InputText } from "@/components";

const model = defineModel({
  type: Object,
  required: true,
});
</script>
<template>
  <InputText
    label="Razão social"
    v-model="model.nameCompanyName"
  />
  <InputText
    label="CNPJ"
    v-model="model.cpfCnpj"
  />
  <InputText
    label="Data de abertura"
    v-model="model.birthOrOpenDate"
  />
  <InputText
    label="Telefone"
    v-model="model.phone"
  />
</template>
