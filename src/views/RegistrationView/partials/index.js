import { defineAsyncComponent } from "vue";

export const MailAddress = defineAsyncComponent(() =>
  import("./steps/MailAddress/MailAddress.vue")
);
export const PFAccount = defineAsyncComponent(() =>
  import("./steps/PFAccount/PFAccount.vue")
);
export const PJAccount = defineAsyncComponent(() =>
  import("./steps/PJAccount/PJAccount.vue")
);
export const Password = defineAsyncComponent(() =>
  import("./steps/Password/Password.vue")
);
export const DataConfirmation = defineAsyncComponent(() =>
  import("./steps/DataConfirmation/DataConfirmation.vue")
);
