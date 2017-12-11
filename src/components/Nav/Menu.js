'use strict';

import React from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Col, Image, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import GitHubLogin from './GitHubLogin/GitHubLogin';
import config from '../../config'
import FaGitlab from 'react-icons/lib/fa/gitlab'; 
import FaKey from 'react-icons/lib/fa/key';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaSpinner from 'react-icons/lib/fa/spinner';
import Api from '../../service/Api'


const urlbaseForApi =`${ config[process.env.NODE_ENV].API_BACKEND }/${ config[process.env.NODE_ENV].API_VERSION }`
const urlForApiSignin =`${ urlbaseForApi}/users/sign_in`



export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.UserLogged  = this.UserLogged.bind(this);
    this.UserLogging = this.UserLogging.bind(this);
    this.UserLogOut  = this.UserLogOut.bind(this);
    this.state = {
      logged: false,
      logging: false,
      username: "",
      avatar: ""
    };
  }

  UserLogged(){
    this.setState({
      logging: false,
      logged: true,
      username: sessionStorage.getItem('github_login'),
      avatar: sessionStorage.getItem('github_avatar_url')
    })
  }
  UserLogging(value){
    this.setState({
      logging: value})
  }
  
  UserLogOut(){
    Api.SignOut()
    .then(response => {
        if(response.status == 200){
          this.setState({logged:false})
        }else{
          console.log("ERROR "+response)
        }
    })
    .catch(error => {
        console.log(error)
    });
    
  }

  render() {
    const isLoggedIn = this.state.logged
    const logging = this.state.logging
    const img =   this.state.username
    const buttonLogged = <span> <Image height="10%" width="10%" src={this.state.avatar} circle/>  { this.state.username } </span>
    const buttonLogging = <span> <FaSpinner size="25" className="icon-spin" />  Logging </span>
    const buttonLogin = <span> <FaKey /> Login </span>
    return (
      <div>
        <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">
            ManageIQ Galaxy
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <MenuItem eventKey={1} href="/about/">About</MenuItem>
          <MenuItem eventKey={1} href="/authors/">Authors</MenuItem>
        </Nav>
        <Nav pullRight>
        { logging ? (
          <NavDropdown eventKey={3} title={buttonLogging} id="basic-nav-dropdown">
          </NavDropdown>
        ): isLoggedIn ? (
          <NavDropdown eventKey={3} title={buttonLogged} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} onClick={ () => this.props.showProfile()}>Profile</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.2} onClick={ () => this.UserLogOut() }>Logout</MenuItem>
        </NavDropdown>
        ):(
          <NavDropdown eventKey={3} title={buttonLogin} id="basic-nav-dropdown">
            <GitHubLogin userLoggedAction={this.UserLogged} islogging={this.UserLogging}/>
            <MenuItem className='disabled'><FaGitlab /> GitLab</MenuItem>
          </NavDropdown>
        )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      </div>
    );
  }
}
