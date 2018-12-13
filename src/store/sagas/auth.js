import { put, call } from 'redux-saga/effects';
import {
  postAuthentication,
  postVerifyToken,
  signUp,
  logout
} from '../../api/auth';
import * as auth from '../actions/auth';

export function* authenticationWorker(action) {
  yield put(auth.setAuthenticationStatus(true));

  try {
    let response = yield call(
      postAuthentication,
      action.payload.email,
      action.payload.password
    );

    if (response.error_status) {
      throw new Error(response.error_status);
    }

    if (
      response.user.email.endsWith('@aesystech.it') ||
      response.user.email.endsWith('@aesys.tech')
    ) {
      yield put(
        auth.authenticationSuccess(
          response.user.email,
          response.user.displayName,
          response.user.uid,
          response.user.emailVerified
        )
      );
    } else {
      yield put(auth.logoutFlow());
      throw new Error('Abbiamo disabilitato gli account non Aesys!');
    }

    console.log(response);
  } catch (err) {
    yield put(auth.authenticationFail(err.message));
    yield localStorage.removeItem('refreshToken');
    yield localStorage.removeItem('username');
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('localId');
  } finally {
    yield put(auth.setAuthenticationStatus(false));
  }
}

export function* signupWorker(action) {
  yield put(auth.setSignupStatus(true));
  try {
    let response = yield call(
      signUp,
      action.payload.email,
      action.payload.password,
      action.payload.nome,
      action.payload.cognome
    );

    // if (response.error_status) {
    //   throw new Error(response.error_status);
    // }

    yield put(
      auth.signupSuccess(
        response.email,
        response.displayName,
        response.uid,
        response.emailVerified
      )
    );
  } catch (err) {
    console.log(err);
    yield put(auth.signupFail(err.message));
  } finally {
    yield put(auth.setSignupStatus(false));
  }
}

export function* verifyTokenWorker(action) {
  yield put(auth.tokenIsVerifying(true));

  try {
    let response = yield call(postVerifyToken);

    if (
      response.email.endsWith('@aesystech.it') ||
      response.email.endsWith('@aesys.tech')
    ) {
      yield put(
        auth.authenticationSuccess(
          response.email,
          response.displayName,
          response.uid,
          response.emailVerified
        )
      );
    } else {
      yield put(auth.logoutFlow());
      throw new Error('Abbiamo disabilitato gli account non Aesys!');
    }

    yield put(auth.tokenVerifiedSuccess(response));
  } catch (err) {
    yield put(auth.tokenVerifiedFailure());
  } finally {
    yield put(auth.tokenIsVerifying(false));
  }
}

export function* logoutWorker() {
  try {
    let response = yield call(logout);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
  yield put(auth.logout());
}
