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
            stats: {},
            spins: [],
            spinFind: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.findSpins = this.findSpins.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
    }

    handleChange (event) {
      this.setState({ spinFind: event.target.value });
    }

    componentDidMount() {
      var api = Api.GetUser(this.props.params.userName)
      api.then(
        response => {
            this.setState({user: response.data})
        },
        error => {
            console.log("error")
        }
      );
      api = Api.GetUserSpins(this.props.params.userName)
      api.then(
        response => {
          this.setState({spins: response.data})
        },
        error => {
            console.log("error")
        }
      );
    }

    findSpins(){
      const api = Api.GetUserSpinsBy(this.props.params.userName, this.state.spinFind)
      api.then(
        response => {
            this.setState({spins: response.data})
        },
        error => {
            console.log("error")
        }
      );
    }  

    handleKeyPress(target) {
      if(target.charCode==13){
              this.findSpins()  
      }
  
    }

    render() {
      const user = this.state.user
      const spins = this.state.spins
      return (
        <div id="container">
          <h2>{user.login}</h2>
          <Row>
          <Col sm={2}>
              <div class="img-userprofile">
                <a href={user.url_profile}>
                  <img src={user.avatar} width="96" height="96"/>
                </a>
              </div>
            </Col>
            <Col sm={10}> 
              <div class="info-userprofile">
                <div>Name : {user.name}</div>
                <div>Followers: </div>
              </div>
            </Col>
          </Row>  
          <Row>
            <Col smOffset={6} sm={6}>
              <FormGroup onSubmit={this.findSpins}>
                  <InputGroup>
                      <FormControl
                        type="text"
                        value={this.state.spinFind}
                        placeholder="Enter spin name"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                      />
                      <InputGroup.Addon>
                        <Glyphicon glyph="search" onClick={this.findSpins}/>
                      </InputGroup.Addon>
                  </InputGroup>
              </FormGroup>
            </Col>
          </Row>  
          <Row>
            <Col sm={12}>
            <table id="authors-table">
              <thead>
                <tr><td>Name</td><td>Description</td></tr>
                </thead>
                <tbody>
              {
                spins.length>0 && spins.map((spin) => {
                  var url = "/"+user.login+"/"+spin.name
                  return (
                      <tr>
                        <td>
                          <a href={url}>{spin.name}</a>
                        </td>
                        <td >
                        {spin.description}
                         </td>
                      </tr>
                  )
                })
              }
              {
                spins.length==0 && <tr><td colspan={2}><center>No spins with value {this.state.spinFind}</center></td></tr>
              }
              </tbody>
              </table>
            </Col>
          </Row>  
        </div>
      )
    }  
}

