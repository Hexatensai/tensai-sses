import React, { Component } from 'react';
import tensaiLogo from '../assets/tensai.png';
import hexawareLogo from '../assets/hexaware.png';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'

export class Header extends Component {
  static displayName = Header.name;
  render() {
    return (  
      <header>
        <div className='header-outer row'>
          <div className='logo-outer col-sm-3'>
            <a href="/" title='tensai-logo'>
              <img  src={tensaiLogo} alt='tensai-logo'/>
            </a>
          </div>
          <div className='col-sm-6 header-center-align'>
            <h2 style={{fontSize:"25px"}}>Onboarding and Release Orchestration Platform</h2>
          </div>
          <div className='col-sm-3 header-right-align'>
            <div className='profile-icon'>
              <PermIdentityIcon fontSize="large"/>
              <NavDropdown id="signout-dropdown">
                <NavDropdown.Item href="/">Signout</NavDropdown.Item>
              </NavDropdown>
            </div>
            <NotificationsIcon className="notification-icon" fontSize="large"/>
            <div className='hexaware-outer'>
              <img src={hexawareLogo} alt='hexaware-logo'/>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
