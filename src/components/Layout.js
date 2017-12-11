'use strict';

import React from 'react';
import Menu from './Nav/Menu';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router';
import { Glyphicon, Modal, Button, Media, Image } from 'react-bootstrap';
import { LogError } from '../service/Log'

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.UserProfile = this.UserProfile.bind(this);
    this.state = {
      showProfile: false
    };
    
  }

  UserProfile(){
    this.setState({showProfile: true})
  }

  render() {
    return (
      <div className="app-container">
        <header>
          <Menu showProfile={this.UserProfile}/>
        </header>
        <div className="app-content">{this.props.children}</div>         
        { this.state.showProfile && (
          <Modal
          show={this.state.showProfile}
          onHide={() => this.setState({ showProfile: false })}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">{ sessionStorage.getItem('name') }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Media>
            <Media.Left>
              <img width={64} height={64} src={sessionStorage.getItem('github_avatar_url')} alt="Image" />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <Link to={ sessionStorage.getItem('github_html_url') }>
                    { sessionStorage.getItem('github_login') }
                </Link>
              </Media.Heading>
              <p>{!!(sessionStorage.getItem('github_bio'))?sessionStorage.getItem('github_bio'):"No BIO in profile"}</p>
            </Media.Body>
          </Media>
            <b>Company : {!!(sessionStorage.getItem('github_company'))?sessionStorage.getItem('github_company'):"No Company in profile"}</b>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showProfile: false })}>Close</Button>
          </Modal.Footer>
        </Modal>       
        )}
      </div>
    );
  }
}