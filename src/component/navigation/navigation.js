import React from 'react';
import { Menu, Button, Icon, Drawer, Dropdown } from 'antd';
import './navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = ({disableNavigation, handleSignout}) => {
  const [visible, setVisible] = React.useState(false);
  
  const toggle = () => {
    setVisible(!visible);
    document.getElementById('mainview').style.marginLeft = '220px';
    //document.getElementById('container').style.width = '85%';
  }

  const close = () => {
    setVisible(!visible);
    document.getElementById('mainview').style.marginLeft = '0';
    //document.getElementById('container').style.width = '95.83333333%';
  }

  const Signout = () => {
      handleSignout();
      close();
  }

  const menu = (
    <Menu style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>
      <Menu.Item>
        <NavLink to="/store">Store</NavLink>
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
        width = {200}
        onClose={close}
        closable={true}
        placement='left'
        visible={visible}
        keyboard={true}
      >
        <div style={{textAlign: 'center'}}>
              <img 
              style={{width: 40, height: 40}}
              src="https://scontent.fhan3-1.fna.fbcdn.net/v/t39.2081-6/c0.0.129.129a/p128x128/82889464_510778339791186_3832427677889855488_n.png?_nc_cat=110&_nc_ohc=FN1DGrPWk2sAQm-1Tc17Jwk39_CBF4F0UdPI98A6f350x1G2GI67Pu30Q&_nc_ht=scontent.fhan3-1.fna&oh=943a62fdaeae3b929dac4689bec8c449&oe=5E9E6ECF" 
              alt=""/>
        </div>
        <div style={{textAlign: 'center'}}>
        <Dropdown overlay={menu}  placement="bottomCenter">
          <Button className="ant-dropdown-link" color="rgb(24,2,5)" style={{border: 'none'}}>
            <div style={{textAlign: 'center'}}>
            <span style={{color: '#030303', fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>
              SHU STORE <Icon type="caret-down"/>
              </span>
            </div>
          </Button>
        </Dropdown>
        </div>
        <Menu style={{border: 'none',lineHeight:'25px', textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}>
          <Menu.Item>
            <NavLink className="ant-link" to='/dashboard'>Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="ant-link" to='/dashboard'>Analystic</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="ant-link" to='/posts'>Posts</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink className="ant-link" to='/tasks'>Tasks</NavLink>
          </Menu.Item>
        </Menu>
      </Drawer>
    </div>
  )
}

export default Navigation;