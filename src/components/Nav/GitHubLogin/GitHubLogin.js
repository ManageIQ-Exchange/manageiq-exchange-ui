import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PopupWindow from './PopupWindow';
import { toQuery, sessionUserDataSave } from './utils';
import { MenuItem } from 'react-bootstrap';
import FaGithubAlt from 'react-icons/lib/fa/github-alt';
import config from '../../../config'
import Api from '../../../service/Api'

class GitHubLogin extends React.Component {
    constructor(props) {
        super(props);
        this.onBtnClick = this.onBtnClick.bind(this);
        this.OnRequest = this.OnRequest.bind(this);
        this.OnSuccess = this.OnSuccess.bind(this);
        this.OnFailure = this.OnFailure.bind(this);
    }
  onBtnClick(){
    this.props.islogging(true)
    const search = toQuery({
      client_id: config.GITHUB_OAUTH_ID,
      user:'email'
    });
    const popup = PopupWindow.open(
      'github-oauth-authorize',
      `https://github.com/login/oauth/authorize?${search}`,
      { height: 1000, width: 600 }
    );

    this.OnRequest()
    popup.then(
      data => this.OnSuccess(data),
      error => this.OnFailure(error)
    );
  }

  OnRequest(){
    console.info("GitHub Login Request")
  }
  OnSuccess(data){
    if (!data.code) {
      console.error('\'code\' not found');
    }else{
        Api.SignIn(data.code)
        .then(response => {
            sessionUserDataSave(response.data.data)
            this.props.userLoggedAction()
        })
        .catch(error => {
            this.props.islogging(false)
            
        });
    }    
  }

  OnFailure(error){
    this.props.islogging(false)
    console.error(response)
  }

  render() {
    const attrs = { onClick: this.onBtnClick };
    return <MenuItem eventKey={3.1} {...attrs}><FaGithubAlt/> GitHub</MenuItem>;
  }
}

GitHubLogin.defaultProps = {
    scope: 'user:email'
}
export default GitHubLogin;