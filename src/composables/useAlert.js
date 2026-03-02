import { ref } from "vue";

export default function useAlert() {
  const showAlert = ref(false);
  const alertMessage = ref("");
  const alertSeverity = ref("error");

  const showAlertError = (message) => {
    alertMessage.value = message;
    alertSeverity.value = "error";
    showAlert.value = true;
  };

  const showAlertSuccess = (message) => {
    alertMessage.value = message;
    alertSeverity.value = "success";
    showAlert.value = true;
  };

  return {
    showAlert,
    alertMessage,
    alertSeverity,
    showAlertError,
    showAlertSuccess,
  };
}
