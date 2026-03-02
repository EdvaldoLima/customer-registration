<script setup>
import { InputText } from "@/components";
import { computed } from "vue";
import PFAccount from "../PFAccount/PFAccount.vue";
import PJAccount from "../PJAccount/PJAccount.vue";
import Password from "../Password/Password.vue";
const model = defineModel({
  type: Object,
  required: true,
});

const accountTypeIsPf = computed(() => model.value.accountType === "pf");
</script>
<template>
  <InputText
    v-model="model.mailAddress"
    label="Endereco de e-mail"
  />
  <PFAccount
    v-if="accountTypeIsPf"
    v-model="model"
  />
  <PJAccount
    v-else
    v-model="model"
  />
  <Password v-model="model" />
</template>
