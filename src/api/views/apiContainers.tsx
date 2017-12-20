import ApiManage from './ApiManage';
import { connect } from 'react-redux';
import * as apiActions from '../apiActions';

const mapStateToProps = (state: any) => ({
    data: state.apiManage
});

const mapDispatchToProps = {
    initPage: apiActions.initPage,
    updatePanes: apiActions.updatePanes,
    updateOutActiveKey: apiActions.updateOutActiveKey,
};

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ApiManage);