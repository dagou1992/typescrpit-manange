import * as React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row, Col } from 'antd';

import './_style/main.css';

const { Header, Content } = Layout;

const managers = [
    {key: 'apiManage', name: '接口管理'},
    {key: 'projectManage', name: '项目管理'},
    {key: 'userManage', name: '用户管理'}
];

class Main extends React.Component {
    render() {
        return (
            <Layout className="layout" >
                <Header>
                    <Row>
                        <Col span={18} offset={4}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['apiManage']}
                                style={{ lineHeight: '64px', marginLeft: 20 }}
                            >
                                {managers.map(param =>
                                    <Menu.Item key={param.key}>
                                        <Link to={`/${param.key}`}>{param.name}</Link>
                                    </Menu.Item>
                                )}
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Content className="content">
                        {this.props.children}
                </Content>
            </Layout>
        );
    }
}

export default Main;