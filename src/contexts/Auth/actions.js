import * as types from '../contextTypes';

export function loginRequest(payload = {}) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload = {}) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}
