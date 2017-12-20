import { put, call, takeEvery } from 'redux-saga/effects';
import * as apiActions from './api/apiActions';
import * as constants from './api/apiContains';
import * as api from './server';

function* updatePanes() {
    yield put(apiActions.pageLoading(true));

    const data = yield call(api.fetchCommentList);
    yield put(apiActions.updatePanes(data, data[0].key));

    yield put(apiActions.pageLoading(false));
}

export default function* watchGetPosts() {
    yield takeEvery(constants.INIT_PAGE, updatePanes);
}