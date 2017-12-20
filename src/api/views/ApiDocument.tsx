import * as React from 'react';
import { Spin, Input, Affix, Tooltip, Icon } from 'antd';

import { TabType } from './ApiManage';

interface ApiDocumentProps {
    data: any;
    pane: TabType;
    test: (value: string) => void;
    save: (key: string) => void;
    contentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const { TextArea } = Input;

export class ApiDocument extends React.Component<ApiDocumentProps, {}> {
    render() {
        const { data, contentChange, save, pane, test } = this.props;

        return (
            <div>
                <Spin spinning={data.pageLoading}>
                    <TextArea
                        style={{width: '45%'}}
                        autosize={true}
                        defaultValue={pane.originalContent}
                        onChange={(e) => contentChange(e)}
                    />
                    <div className="tabContent" dangerouslySetInnerHTML={{__html: pane.content}}/>
                    <Affix style={{position: 'absolute', top: 0, right: 0}}>
                        <Tooltip title="保存">
                            <Icon type="save" className="icon" onClick={() => save(pane.key)}/>
                        </Tooltip>
                        <Tooltip title="测试">
                            <Icon type="rocket" className="icon" onClick={() => test('2')}/>
                        </Tooltip>
                    </Affix>
                </Spin>
            </div>
        )
    }
}