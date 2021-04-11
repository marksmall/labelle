import * as yup from 'yup';
import zxcvbn from 'zxcvbn';

import { CONTEXT_KEYS, FIELD_NAMES, MESSAGES } from './accounts.constants';

export const email = yup
  .string()
  .required(MESSAGES.email.required)
  .email(MESSAGES.email.email);

export const uniqueEmail = yup
  .string()
  .concat(email)
  .test({
    test: function (value) {
      return !this.options.context?.[CONTEXT_KEYS.existingEmails].includes(
        value,
      );
    },
    message: MESSAGES.uniqueEmail.notOneOf,
  });

export const password = yup
  .string()
  .required(MESSAGES.password.required)
  .min(2, MESSAGES.password.min)
  .max(50, MESSAGES.password.max);
// .min(yup.ref(`$${CONTEXT_KEYS.passwordMinLength}`), MESSAGES.password.min)
// .max(yup.ref(`$${CONTEXT_KEYS.passwordMaxLength}`), MESSAGES.password.max);

export const oldPassword = yup.string().required(MESSAGES.oldPassword.required);

export const newPassword = yup
  .string()
  .concat(password)
  .test({
    test: function (value) {
      const { score } = zxcvbn(value);
      return score >= this.options.context?.[CONTEXT_KEYS.passwordStrength];
    },
    message: MESSAGES.newPassword.strength,
  });

export const newPasswordConfirm = yup
  .string()
  .concat(password)
  .oneOf([yup.ref(FIELD_NAMES.password)], MESSAGES.newPasswordConfirm.oneOf)
  .when(FIELD_NAMES.oldPassword, (oldPassword, schema) =>
    schema.notOneOf([oldPassword], MESSAGES.newPasswordConfirm.notOneOf),
  );

export const firstName = yup.string().required(MESSAGES.firstName.required);

export const lastName = yup.string().required(MESSAGES.lastName.required);

export const isAdmin = yup.string().required(MESSAGES.isAdmin.required);
