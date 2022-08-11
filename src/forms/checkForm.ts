/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import classNames from './formSection.module.scss';

export const handleFormErrors = (errors: object, refForm: HTMLFormElement) => {
  if (refForm === null) return;
  
  clearFormErrors(refForm);

  if (Object.keys(errors).length === 0) return;

  for (const value of Object.values(errors)) {
    const { ref, message } = value;

    const label = (ref as HTMLElement).closest('label');
    if (!label) continue;
    label.classList.add(classNames.error);

    const errorMessage = document.createElement('p');
    errorMessage.classList.add(classNames.errorMessage);
    errorMessage.innerText = message as string;
    label.append(errorMessage);
  }
};

const clearFormErrors = (form: HTMLElement) => {
  const labels = form.querySelectorAll('label');
  for (const label of labels) {
    label.classList.remove(classNames.error);
    const errorMessage = label.querySelector('p');
    if (errorMessage) label.removeChild(errorMessage);
  }
};
