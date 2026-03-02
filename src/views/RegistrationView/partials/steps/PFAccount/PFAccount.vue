<script setup>
import { InputText } from "@/components";

const model = defineModel({
  type: Object,
  required: true,
});
</script>
<template>
  <InputText
    label="Nome"
    v-model="model.nameCompanyName"
  />
  <InputText
    label="CPF"
    v-model="model.cpfCnpj"
  />
  <InputText
    label="Data de nascimento"
    v-model="model.birthOrOpenDate"
  />
  <InputText
    label="Telefone"
    v-model="model.phone"
  />
</template>
