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

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.UserLogged  = this.UserLogged.bind(this);
    this.UserLogging = this.UserLogging.bind(this);
    this.UserLogOut  = this.UserLogOut.bind(this);
    this.postSpins = this.postSpins.bind(this);
    var user = ""
    var ava = ""
    var logged = false
    if (typeof(sessionStorage) !== 'undefined') {
      if (sessionStorage.getItem('github_login')){
          logged=true,
          user=sessionStorage.getItem('github_login'),
          ava=sessionStorage.getItem('github_avatar_url')
      }
    }
    this.state = {
      logged: logged,
      logging: false,
      username: user,
      avatar: ava
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
  postSpins(){
    Api.RefreshSpin()
    .then(response => {
        if(response.status == 200){
          console.log(response)
        }else{
          console.log("ERROR "+response)
        }
    })
    .catch(error => {
        console.log(error)
    });
  }
  UserLogOut(){
    Api.SignOut()
    .then(response => {
        if(response.status == 200){
          this.setState({logged:false})
          console.log("Logout")
          sessionStorage.clear()
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
          <MenuItem eventKey={2} href="/authors/">Authors</MenuItem>
          <MenuItem eventKey={3} href="/search/">Search</MenuItem>
        </Nav>
        <Nav pullRight>
        { logging ? (
          <NavDropdown eventKey={4} title={buttonLogging} id="basic-nav-dropdown">
          </NavDropdown>
        ): isLoggedIn ? (
          <NavDropdown eventKey={4} title={buttonLogged} id="basic-nav-dropdown">
          <MenuItem eventKey={4.1} onClick={ () => this.props.showProfile()}>Profile</MenuItem>
          <MenuItem eventKey={3} onClick={ () => this.postSpins()}>Spin Refresh</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={4.2} onClick={ () => this.UserLogOut() }>Logout</MenuItem>
        </NavDropdown>
        ):(
          <NavDropdown eventKey={4} title={buttonLogin} id="basic-nav-dropdown">
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
