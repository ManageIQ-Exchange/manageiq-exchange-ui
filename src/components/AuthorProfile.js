'use strict';

import React from 'react';
import { Row,Col,Pagination,FormGroup,InputGroup,FormControl,Glyphicon} from 'react-bootstrap';
import Api from '../service/Api';
import TiSocialGithubCircular from 'react-icons/lib/ti/social-github-circular';

export default class AuthorProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            stats: {}
        };
        
    }
    componentDidMount() {
        const api = Api.GitUserStats(this.props.params.userName)
        api.then(
          response => {
              this.setState({user: response.data})
          },
          error => {
              console.log("error")
          }
        );
        
    }

    render() {
      const user = this.state.user
      return (
        <div id="container">
          <h2>{user.login}</h2>
          <Row>
          <Col sm={2}>
              <div class="img-userprofile">
                <a href={user.url}>
                  <img src={user.avatar_url} width="96" height="96"/>
                </a>
              </div>
            </Col>
            <Col sm={10}> 
              <div class="info-userprofile">
                <div>{user.name}</div>
                <div>Followers: {user.followers}</div>
              </div>
            </Col>
          </Row>  
          <Row>
            <Col smOffset={6} sm={6}>
              <FormGroup>
                  <InputGroup>
                      <FormControl type="text" />
                      <InputGroup.Addon>
                      <Glyphicon glyph="search" />
                      </InputGroup.Addon>
                  </InputGroup>
              </FormGroup>
            </Col>
          </Row>  
        </div>
      )
    }  
}

