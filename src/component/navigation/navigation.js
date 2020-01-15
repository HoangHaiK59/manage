import React from 'react';
import { Menu, Button, Icon, Drawer, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
import './navigation.css';

const Navigation = ({disableNavigation, handleSignout}) => {
  let history = useHistory();
  const [visible, setVisible] = React.useState(false);
  
  const toggle = () => {
    setVisible(!visible);
  }

  // const handleSignout = () => {
  //   window.FB.logout(function(response) {
  //     console.log(response)
  //   })
  //   toggle();
  //   localStorage.removeItem('facebookUser');
  //   disableNavigation();
  //   history.push('/');
  // }

  const Signout = () => {
      handleSignout();
      toggle();
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
      </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Button onClick={Signout} type="link">Signout</Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <div style={{ margin: '20px 0 0 0', position: 'fixed' }}>
      <Button onClick={toggle}>&#9776;</Button>
      <Drawer
        onClose={toggle}
        closable={true}
        placement='left'
        visible={visible}
      >
        <div style={{textAlign: 'center'}}>
              <img 
              style={{width: 30, height: 30}}
              src="https://scontent.fhan3-1.fna.fbcdn.net/v/t39.2081-6/c0.0.129.129a/p128x128/82889464_510778339791186_3832427677889855488_n.png?_nc_cat=110&_nc_ohc=FN1DGrPWk2sAQm-1Tc17Jwk39_CBF4F0UdPI98A6f350x1G2GI67Pu30Q&_nc_ht=scontent.fhan3-1.fna&oh=943a62fdaeae3b929dac4689bec8c449&oe=5E9E6ECF" 
              alt=""/>
        </div>
        <div style={{textAlign: 'center'}}>
        <Dropdown overlay={menu}  placement="bottomCenter">
          <Button className="ant-dropdown-link">
            <div style={{textAlign: 'center'}}>
            <span style={{color: '#030303', fontSize: 16, textAlign: 'center'}}>
              SHU STORE <Icon type="caret-down"/>
              </span>
            </div>
          </Button>
        </Dropdown>
        </div>
      </Drawer>
    </div>
  )
}

export default Navigation;