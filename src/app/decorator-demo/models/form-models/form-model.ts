
export function FormModel(configs: {
  showReset: boolean;
  resetBtnLabel: string;
  submitBtnLabel: string;
}) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        showReset = configs.showReset;
        resetBtnLabel = configs.resetBtnLabel;
        submitBtnLabel = configs.submitBtnLabel;
        formModel = true;
    };
  };
}
