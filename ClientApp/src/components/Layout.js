import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Header } from './Header';
import  MenuItems  from '../components/SideMenu/MenuItems';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Header />
        <Container className='container-wrap'>
        <MenuItems />
          {this.props.children}
        </Container>
      </div>
    );
  }
}
