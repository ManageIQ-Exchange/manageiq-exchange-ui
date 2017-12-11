'use strict';

import React from 'react';
import { Row,Col,Pagination,FormGroup,InputGroup,FormControl,Glyphicon, Button} from 'react-bootstrap';
import Api from '../service/Api';
import TiSocialGithubCircular from 'react-icons/lib/ti/social-github-circular';

export default class AuthorsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage:  1,
            users: [],
            page: { first: 1, last:2 },
            item: { first: 1 , last:20, total:100}
        };
        
    }
    handleSelect(eventKey) {
        this.setState({
          activePage: eventKey,
        });
    } 
    
    componentDidMount() {
        const api = Api.GetUsers()
        api.then(
          response => {
              this.setState({users: response.data})
          },
          error => {
              console.log("error")
          }
        );
    }
  render() {
    const users = this.state.users || []
    return (
      <div id="container">
        <h1> MiQ Galaxy Contributors </h1>
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
        <table id="authors-table">
  <thead>
    <tr>
      <th colSpan={2}>Author</th>
    </tr>
  </thead>
  <tbody>
  {
    users.length>0 && users.map((user) => {
      var url = "/author/"+user.github_login
      return (
          <tr>
            <td>
              <a href={url}>{user.github_login}</a>
            </td>
            <td style={{textAlign: 'right'}}>
              <Button bsSize="small" href={user.github_html_url} target="_blank" style={{marginTop: 10,marginBottom:10}}><TiSocialGithubCircular/> GitHub</Button>
            </td>
          </tr>
       )
    })
  }
 </tbody>
      </table>
      <Row>
        <Col md={6}>
        <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={this.state.page.last}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelect}
        />
        PAGE {this.state.page.first} OF {this.state.page.last}
        </Col>
        <Col md={6}>
        ITEMS {this.state.item.first} - {this.state.item.last} OF {this.state.item.total}
        </Col>

      </Row>    
       
    
      </div>
    );
  }
}
