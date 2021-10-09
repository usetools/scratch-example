import { Row, Col, Layout } from 'antd';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import VMManager from '@src/lib/vm-manager';
import emptyProject from '@src/lib/empty-project.json';
import Block from '../Block';
import Stage from '../Stage';
import './index.less';

const { Header, Content } = Layout;

function Gui(props) {
  const { vm } = props
  useEffect(() => {
    vm.loadProject(emptyProject);
    vm.start();
    const vmManager = new VMManager(vm);
    vmManager.attachKeyboardEvents();
    console.log(vm, emptyProject);
  }, []); 
  return (
    <Layout>
      <Header>
        <div>Scratch Example</div>
      </Header>
      <Content className="gui-content">
        <Row className="gui-content-row">
          <Col className="gui-content-col" span={10}>
            <Stage vm={vm}></Stage>
          </Col>
          <Col className="gui-content-col" span={14}>
            <Block vm={vm}></Block>
          </Col> 
        </Row> 
      </Content>
    </Layout>
  );
}

const mapStateToProps = state => {
  return {vm: state.vm}
}
export default connect(mapStateToProps)(Gui);