import * as React from 'react';

interface ApiTestModuleProps {
    test: (value: string) => void;
}

export class ApiTestModule extends React.Component<ApiTestModuleProps, {}> {
    render() {
        const { test } = this.props;

        return (
            <div>
                <p onClick={() => test('1')}>11</p>
            </div>
        )
    }
}