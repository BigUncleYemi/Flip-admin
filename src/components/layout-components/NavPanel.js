import React, { Component } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';
import { connect } from "react-redux";
import { logOutUser } from 'redux/actions/user';

export class NavPanel extends Component {
	state = { visible: false };

  showDrawer = () => {
    // this.setState({
    //   visible: true,
    // });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
	};
	
	render() {
		return (
      <>
        <Menu mode="horizontal">
          <Menu.Item onClick={this.showDrawer}>
            <SettingOutlined className="nav-icon mr-0" />
          </Menu.Item>
          <Menu.Item onClick={() =>  this.props.logout()}>
            Logout
          </Menu.Item>
        </Menu>
        <Drawer
          title="Theme Config"
          placement="right"
          width={350}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          NavPanel Contents here!
        </Drawer>
      </>
    );
	}
}

const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

const mapDispatchToProps  = (dispatch) => ({
  logout: () => {
    dispatch(logOutUser());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(NavPanel);