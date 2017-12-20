import * as React from 'react';
import { Button } from 'antd';

type State = {
    count: number,
};

export default class ProjectManage extends React.Component<State> {
    state: State = {
        count: 0,
    };

    onClick = () => {
        this.setState({count: this.state.count + 1});
    }

    render() {
        return (
            <div>
                <h1>ProjectManage</h1>
                <h1>{this.state.count}</h1>
                <Button onClick={this.onClick}>+</Button>
            </div>
        );
    }
}