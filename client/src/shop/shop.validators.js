import * as yup from 'yup';

import { MESSAGES } from './shop.constants';

export const rating = yup.string().required(MESSAGES.rating.required);

export const comment = yup.string().required(MESSAGES.comment.required);

export const address = yup.string().required(MESSAGES.address.required);

export const city = yup.string().required(MESSAGES.city.required);

export const postalCode = yup.string().required(MESSAGES.postalCode.required);

export const country = yup.string().required(MESSAGES.country.required);

export const paymentMethod = yup
  .string()
  .required(MESSAGES.paymentMethod.required);
