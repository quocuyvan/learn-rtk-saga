import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga, incrementSagaSuccess } from 'features/counter/counterSlice';
import { delay, put, takeEvery } from 'redux-saga/effects';

export function* handleIncrementSaga(action: PayloadAction<number>) {
    console.log('Waiting 1s');
    yield delay(1000);
    console.log('Waiting done, dispatch action');
    yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
    yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
    // yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
