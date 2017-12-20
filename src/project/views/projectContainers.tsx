import ProjectManage from './ProjectManage';
import { connect } from 'react-redux';

export function mapStateToProps(state: any) {
    return {

    };
}

export function mapDispatchToProps() {
    return {

    };
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProjectManage);