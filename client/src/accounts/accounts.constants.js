const ACCOUNTS_PREFIX = '/accounts';

export const REGISTER_URL = `${ACCOUNTS_PREFIX}/register`;
// export const REGISTER_CUSTOMER_URL = `${REGISTER_URL}/customer`;
// export const REGISTER_CUSTOMER_USER_URL = `${REGISTER_CUSTOMER_URL}/user`;
// export const REGISTER_CUSTOMER_ORDER_URL = `${REGISTER_CUSTOMER_URL}/order`;
export const RESEND_EMAIL_VERIFICATION_URL = `${ACCOUNTS_PREFIX}/resend`;
export const CONFIRM_EMAIL_URL = `${ACCOUNTS_PREFIX}/confirm-email/:key`;
export const LOGIN_URL = `${ACCOUNTS_PREFIX}/login`;
export const PASSWORD_RESET_REQUEST_URL = `${ACCOUNTS_PREFIX}/password/reset`;
export const PASSWORD_RESET_URL = `${ACCOUNTS_PREFIX}/password/reset/:token/:uid/`;
export const PASSWORD_CHANGE_URL = `${ACCOUNTS_PREFIX}/password/change`;

export const PROFILE_URL = `/profile`;

export const MESSAGES = {
  email: {
    required: 'Email address is required',
    email: 'Email address is invalid',
  },
  uniqueEmail: {
    notOneOf: 'A user with this email address already exists',
  },
  password: {
    required: 'Password is required',
    min: 'Password is too short (minimum ${min} characters)',
    max: 'Password is too long (maximum ${max} characters)',
  },
  oldPassword: {
    required: 'Old Password is required',
  },
  newPassword: {
    strength: 'Password must not be weak',
  },
  newPasswordConfirm: {
    oneOf: "Passwords don't match",
    notOneOf: 'New Password matches Old Password',
  },
  firstName: {
    required: 'First Name is required',
  },
  lastName: {
    required: 'Last Name is required',
  },
  isAdmin: {
    required: 'Admin is required',
  },
};

export const CONTEXT_KEYS = {
  passwordMinLength: 'passwordMinLength',
  passwordMaxLength: 'passwordMaxLength',
  passwordStrength: 'passwordStrength',
  existingEmails: 'existingEmails',
};

export const FIELD_NAMES = {
  email: 'email',
  phone: 'phone',
  password: 'password',
  oldPassword: 'oldPassword',
  newPassword: 'newPassword',
  newPasswordConfirm: 'newPasswordConfirm',
  firstName: 'firstName',
  lastName: 'lastName',
  country: 'country',
  address: 'address',
  postcode: 'postcode',
  isAdmin: 'isAdmin',
};
