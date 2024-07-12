import { PayloadAction } from '@reduxjs/toolkit';
import { authActions, LoginPayload } from 'features/auth/authSlice';
import { call, delay, fork, put, take } from 'redux-saga/effects';

function* handleLogin(payload: LoginPayload) {
    try {
        yield delay(500);
        localStorage.setItem('access_token', 'fake_token');
        yield put(
            authActions.loginSuccess({
                id: 1,
                name: 'John Wick',
            })
        );
        // redirect to admin page
    } catch (error: any) {
        yield put(authActions.loginFailed(error.message));
    }
}

function* handleLogout() {
    yield delay(500);
    localStorage.removeItem('access_token');
    // redirect to login page
}

function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload); //non-blocking
        }

        yield take(authActions.logout.type);
        yield call(handleLogout); //blocking
    }
}

export function* authSaga() {
    yield fork(watchLoginFlow);
}
