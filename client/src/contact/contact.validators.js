import * as yup from 'yup';

import { MESSAGES } from './contact.constants';

export const firstName = yup.string().required(MESSAGES.firstName.required);

export const lastName = yup.string().required(MESSAGES.lastName.required);

export const email = yup
  .string()
  .required(MESSAGES.email.required)
  .email(MESSAGES.email.email);

export const phone = yup.string().required(MESSAGES.phone.required);

export const message = yup.string().required(MESSAGES.message.required);
