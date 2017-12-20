import { ApiAction } from './apiActions';
import * as apiContains from './apiContains';

export interface StoreState {
    panes: string[];
    activeKey: string;
    pageLoading: boolean;
    outActiveKey: string;
}

const initialState: StoreState = {
    panes: [],
    activeKey: '1',
    pageLoading: false,
    outActiveKey: '1',
};

export const apiReducer = (state = initialState, action: ApiAction) => {
    switch (action.type) {
        case apiContains.INIT_PAGE:
            return initialState;

        case apiContains.UPDATE_PANES:
            return {...state, panes: action.payload.panes, activeKey: action.payload.activeKey};

        case apiContains.PAGE_LOADING:
            return {...state, pageLoading: action.payload};

        case apiContains.UPDATE_OUT_ACTIVE_KEY:
            return {...state, outActiveKey: action.payload};

        default:
            return state;
    }
};