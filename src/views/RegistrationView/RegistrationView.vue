<script setup>
import { Button, Steps, Alert } from "@/components";
import { computed, reactive, ref, watch } from "vue";
import { useFetch, useAlert } from "@/composables";
import { dateFormat } from "@/utils/date";
import {
  MailAddress,
  PFAccount,
  PJAccount,
  Password,
  DataConfirmation,
} from "./partials";
import {
  validateEmail,
  validateCpf,
  validateCnpj,
  validateDate,
} from "@/utils/validators";

const http = useFetch();
const {
  showAlert,
  alertMessage,
  alertSeverity,
  showAlertError,
  showAlertSuccess,
} = useAlert();

const formData = reactive({
  mailAddress: null,
  accountType: "pf",
  nameCompanyName: null,
  cpfCnpj: null,
  birthOrOpenDate: null,
  phone: null,
  password: null,
});
const currentStep = ref(0);
const isSubmitting = ref(false);

watch(currentStep, () => {
  showAlert.value = false;
});

const isLastStep = computed(() => currentStep.value === steps.value.length - 1);
const accountTypeIsPf = computed(() => formData.accountType === "pf");
const disabledPreviousButton = computed(() => currentStep.value === 0);
const hiddenNextButton = computed(() => !disabledPreviousButton.value);
const stepComponents = computed(() => {
  const step = {
    0: MailAddress,
    1: accountTypeIsPf.value ? PFAccount : PJAccount,
    2: Password,
    3: DataConfirmation,
  };
  return step[currentStep.value];
});
const nextButtonText = computed(() => {
  if (isLastStep.value) {
    return "Cadastrar";
  }
  return "Continuar";
});
const steps = computed(() => {
  const nextStep = accountTypeIsPf.value ? "Pessoa física" : "Pessoa jurídica";

  return [
    "Seja bem vindo(a)",
    nextStep,
    "Senha de acesso",
    "Revise suas informações",
  ];
});

const validateCurrentStep = () => {
  if (currentStep.value === 0) {
    if (!formData.mailAddress) {
      return { isValid: false, message: "Endereço de e-mail é obrigatório." };
    }
    if (!validateEmail(formData.mailAddress)) {
      return { isValid: false, message: "Endereço de e-mail inválido." };
    }
  }

  if (currentStep.value === 1) {
    if (
      !formData.nameCompanyName ||
      !formData.cpfCnpj ||
      !formData.birthOrOpenDate ||
      !formData.phone
    ) {
      return { isValid: false, message: "Todos os campos são obrigatórios." };
    }

    if (accountTypeIsPf.value && !validateCpf(formData.cpfCnpj)) {
      return { isValid: false, message: "CPF inválido." };
    }

    if (!accountTypeIsPf.value && !validateCnpj(formData.cpfCnpj)) {
      return { isValid: false, message: "CNPJ inválido." };
    }

    if (!validateDate(dateFormat(formData.birthOrOpenDate))) {
      return { isValid: false, message: "Data inválida." };
    }
  }

  if (currentStep.value === 2) {
    if (!formData.password) {
      return { isValid: false, message: "Senha é obrigatória." };
    }
  }

  return { isValid: true };
};

const handleNextStep = () => {
  const validation = validateCurrentStep();

  if (validation.isValid) {
    if (isLastStep.value) {
      handlerRegistration();
    } else {
      currentStep.value++;
    }
  } else {
    showAlertError(validation.message);
  }
};

const handlerRegistration = async () => {
  isSubmitting.value = true;
  await http
    .post({
      body: {
        ...formData,
        birthOrOpenDate: dateFormat(formData.birthOrOpenDate),
      },
    })
    .then((response) => {
      showAlertSuccess(response.message);
    })
    .catch((error) => {
      showAlertError(error.error || "Ocorreu um erro ao processar sua solicitação.");
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};
</script>

<template>
  <div class="registration-view">
    <Steps
      v-model:currentStep="currentStep"
      :steps="steps"
    >
      <component
        v-model="formData"
        :is="stepComponents"
      />
      <Alert
        v-model:show="showAlert"
        :severity="alertSeverity"
      >
        {{ alertMessage }}
      </Alert>
      <template #actions>
        <Button
          @click="currentStep--"
          v-if="hiddenNextButton"
          outlined
          >Voltar</Button
        >
        <Button
          @click="handleNextStep"
          :block="disabledPreviousButton"
          :loading="isSubmitting"
        >
          {{ nextButtonText }}
        </Button>
      </template>
    </Steps>
  </div>
</template>

<style scoped lang="scss">
.registration-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
