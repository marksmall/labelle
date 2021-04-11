import { Redirect, Route, Switch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { passwordConfigSelector } from 'app.slice';

import {
  // activateAccount,
  // changePassword,
  confirmPasswordReset,
  login,
  registerUser,
  // resendVerificationEmail,
  resetPassword,
  isLoadingSelector,
  serverErrorsSelector,
  isLoggedInSelector,
  userSelector,
} from './accounts.slice';

import {
  CONFIRM_EMAIL_URL,
  LOGIN_URL,
  // PASSWORD_CHANGE_URL,
  PASSWORD_RESET_REQUEST_URL,
  PASSWORD_RESET_URL,
  REGISTER_URL,
  // RESEND_EMAIL_VERIFICATION_URL,
} from './accounts.constants';

import LoginForm from './login/login-form.component';
// import PasswordChangeForm from './password/change/password-change-form.component';
// import PasswordResetConfirmForm from './password/reset/password-reset-confirm-form.component';
import PasswordResetRequestForm from './password/reset/password-reset-request-form.component';
import PasswordResetForm from './password/reset/password-reset-form.component';
import RegisterForm from './register/register-form.component';
// import ResendVerificationEmail from './email-verification/resend-email-verification.component';

const Accounts = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingSelector);

  const user = useSelector(userSelector);
  const passwordConfig = useSelector(passwordConfigSelector);
  const serverErrors = useSelector(serverErrorsSelector);

  const isLoggedIn = useSelector(isLoggedInSelector);

  return (
    <Switch>
      <Route
        exact
        path={REGISTER_URL}
        render={() => (
          <RegisterForm
            isLoading={isLoading}
            registerUser={form => dispatch(registerUser(form))}
            passwordMaxLength={passwordConfig.passwordMaxLength}
            passwordMinLength={passwordConfig.passwordMinLength}
            serverErrors={serverErrors}
          />
        )}
      />

      <Route
        exact
        path={[LOGIN_URL, CONFIRM_EMAIL_URL]}
        render={() =>
          isLoggedIn ? (
            <Redirect to="/" />
          ) : (
            <LoginForm
              isLoading={isLoading}
              user={user}
              login={form => dispatch(login(form))}
              // activateAccount={form => dispatch(activateAccount(form))}
              passwordMaxLength={passwordConfig.passwordMaxLength}
              passwordMinLength={passwordConfig.passwordMinLength}
              serverErrors={serverErrors}
            />
          )
        }
      />

      <Route
        exact
        path={PASSWORD_RESET_REQUEST_URL}
        // user={user}
        render={() => (
          <PasswordResetRequestForm
            isLoading={isLoading}
            resetPassword={form => dispatch(resetPassword(form))}
            // resetStatus={resetStatus}
            serverErrors={serverErrors}
          />
        )}
      />

      <Route
        path={PASSWORD_RESET_URL}
        render={props => (
          <PasswordResetForm
            confirmPasswordReset={(form, params) =>
              dispatch(confirmPasswordReset(form))
            }
            // resetStatus={resetStatus}
            // match={props.match}
            passwordMaxLength={passwordConfig.passwordMaxLength}
            passwordMinLength={passwordConfig.passwordMinLength}
            serverErrors={serverErrors}
          />
        )}
      />

      {/* <Route
        exact
        path={RESEND_EMAIL_VERIFICATION_URL}
        render={() => (
          <ResendVerificationEmail
            email={user?.email}
            onResend={() => dispatch(resendVerificationEmail(user?.email))}
            isLoading={isLoading}
          />
        )}
      /> */}

      {/* <PrivateRoute
        exact
        path={PASSWORD_CHANGE_URL}
        // user={user}
        component={PasswordChangeForm}
        changePassword={form => dispatch(changePassword(form))}
        // changeStatus={changeStatus}
        passwordMaxLength={passwordConfig.passwordMaxLength}
        passwordMinLength={passwordConfig.passwordMinLength}
        serverErrors={serverErrors}
      /> */}
    </Switch>
  );
};

export default Accounts;
