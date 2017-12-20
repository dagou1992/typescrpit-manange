import * as React from 'react';
import * as marked from 'marked';
import { Card, Row, Col, Icon, Dropdown, Menu, Tabs, Tree } from 'antd';

import '../../_style/api.css';

import { ApiDocument } from './ApiDocument';
import { ApiTestModule } from './ApiTestModule';

const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

export interface TabType {
    key: string;
    title: string;
    content: string;
    activeKey: string;
    originalContent: string;
}

interface ApiState {
    newTabIndex: number;
    changeKey: string;
    outActiveKey: string;
}

interface ApiProps {
    data: any;
    initPage: () => void;
    updateOutActiveKey: (value: string) => void;
    updatePanes: (panes: string[], activeKey: string) => void;
}

export default class ApiManage extends React.Component<ApiProps, ApiState> {
    state: ApiState = {
        newTabIndex: 0,
        changeKey: 'Gurita',
        outActiveKey: '1',
    };

    componentWillMount() {
        this.props.initPage();
    }

    // 切换项目
    handleMenuClick = (e: any) => {
        this.setState({ changeKey: e.key });
    }

    // 树节点选择
    treeNodeSelect = (selectedKeys: string[], info: any) => {
        this.add(info.node.props.title, info.node.props.eventKey);
    }

    // tab切换
    inTabChange = (activeKey: string) => {
        const { data, updatePanes } = this.props;
        updatePanes(data.panes, activeKey);
    }

    outTabChange = (activeKey: string) => {
        this.props.updateOutActiveKey(activeKey);
    }

    // tab编辑，包括添加和删除
    tabEdit = (targetKey: string, action: string) => {
        this[action](targetKey);
    }

    add = (title: string, key: string) => {
        let activeKey = `newTabs${this.state.newTabIndex++}`;
        const { data, updatePanes } = this.props;
        const panes = [...data.panes];
        fetch('./ss.md')
            .then(response => {
                return response.text();
            })
            .then(text => {
                const isInPanes = () => {
                    for (let item of panes) {
                        if (item.key === key) {
                            activeKey = item.activeKey;
                            return true;
                        }
                    }
                    return false;
                };
                if (!isInPanes()) {
                    panes.push({key, title: title, content: marked(text), activeKey: activeKey, originalContent: text});
                }
                updatePanes(panes, activeKey);
            });
    }

    remove = (targetKey: string) => {
        const { data, updatePanes } = this.props;
        let activeKey = data.activeKey;
        let lastIndex = 0;
        data.panes.forEach((pane: TabType, i: number) => {
            if (pane.activeKey === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = data.panes.filter((pane: TabType) => pane.activeKey !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].activeKey;
        }
        updatePanes(panes, activeKey);
    }

    // 文档内容更改
    contentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { data, updatePanes } = this.props;
        const panes = [...data.panes];
        for (let item of panes) {
            if (item.activeKey === data.activeKey) {
                item.content = marked(e.target.value);
                item.originalContent = e.target.value;
            }
        }
        updatePanes(panes, data.activeKey);
    }

    // 保存文档内容
    save = (key: string) => {
        const panes = [...this.props.data.panes];
        let content = '', title = '';
        for (let item of panes) {
            if (item.key === key) {
                content = item.originalContent;
                title = item.title;
            }
        }
        const blob = new Blob([content]);
        const file = new File([blob], title + '.md');
        console.log(file);
    }

    render() {
        const { changeKey } = this.state;
        const { data, updateOutActiveKey } = this.props;
        const pageHeight = Number(document.body.clientHeight) - 170;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="SDK">SDK</Menu.Item>
                <Menu.Item key="Kamus">Kamus</Menu.Item>
                <Menu.Item key="Gurita">Gurita</Menu.Item>
            </Menu>
        );

        const outTab = [
            {tab: '文档', key: '1'},
            {tab: '测试', key: '2'},
        ];

        return (
            <div className="container">
                <Row>
                    <Col span={4}>
                        <Card style={{ minHeight: 500 }}>
                            <Card style={{ marginBottom: 20 }}>
                                <Row>
                                    <Col span={8}>
                                        <Icon type="calendar" /> Project:
                                    </Col>
                                    <Col span={9}>
                                        <Dropdown overlay={menu} placement="bottomCenter">
                                            <a className="ant-dropdown-link" href="#">
                                                {changeKey} <Icon type="down" />
                                            </a>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Card>
                            <Card>
                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="接口列表" key="1">
                                        <Tree
                                            defaultExpandAll={true}
                                            onSelect={this.treeNodeSelect}
                                        >
                                            <TreeNode title="用户模块" key="用户模块">
                                                <TreeNode title="添加用户" key="添加用户" />
                                            </TreeNode>
                                            <TreeNode title="商品模块" key="商品模块key" />
                                            <TreeNode title="订单模块" key="订单模块" />
                                        </Tree>
                                    </TabPane>
                                </Tabs>
                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="数据字典" key="1">
                                        <Tree
                                            defaultExpandAll={true}
                                            onSelect={this.treeNodeSelect}
                                        >
                                            <TreeNode title="用户表" key="用户表" />
                                            <TreeNode title="商品表" key="商品表" />
                                        </Tree>
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </Card>
                    </Col>
                    <Col span={19} style={{ marginLeft: '20px' }}>
                        <Tabs
                            tabPosition='right'
                            onChange={this.outTabChange}
                            activeKey={data.outActiveKey}
                        >
                            {outTab.map(item =>
                                <TabPane tab={item.tab} key={item.key}>
                                    <div className="tabContainer" style={{ minHeight: pageHeight }}>
                                        <Tabs
                                            hideAdd={true}
                                            onChange={this.inTabChange}
                                            activeKey={data.activeKey}
                                            type="editable-card"
                                            onEdit={this.tabEdit}
                                        >
                                            {data.panes.map((pane: TabType) =>
                                                <TabPane tab={pane.title} key={pane.activeKey}>
                                                    {
                                                        item.key === '1'?
                                                            <ApiDocument
                                                                data={data}
                                                                pane={pane}
                                                                save={this.save}
                                                                test={updateOutActiveKey}
                                                                contentChange={this.contentChange}
                                                            />:
                                                            <ApiTestModule
                                                                test={updateOutActiveKey}
                                                            />
                                                    }
                                                </TabPane>
                                            )}
                                        </Tabs>
                                    </div>
                                </TabPane>
                            )}
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
}