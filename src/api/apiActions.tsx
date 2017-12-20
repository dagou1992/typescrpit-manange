import * as constants from './apiContains';

export function initPage() {
    return { type: constants.INIT_PAGE };
}

export function updatePanes(panes: string[], activeKey: string) {
    return { type: constants.UPDATE_PANES, payload: { panes, activeKey } };
}

export function pageLoading(bool: boolean) {
    return { type: constants.PAGE_LOADING, payload: bool };
}

export function updateOutActiveKey(value: string) {
    return { type: constants.UPDATE_OUT_ACTIVE_KEY, payload: value };
}


interface Base {
    payload?: any;
}

export interface InitPage {
    type: constants.INIT_PAGE;
}

export interface UpdatePanes extends Base {
    type: constants.UPDATE_PANES;
}

export interface PageLoading extends Base {
    type: constants.PAGE_LOADING;
}

export interface UpdateOutActiveKey extends Base {
    type: constants.UPDATE_OUT_ACTIVE_KEY;
}


export type ApiAction = InitPage | UpdatePanes | PageLoading | UpdateOutActiveKey ;