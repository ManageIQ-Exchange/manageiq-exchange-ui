'use strict';

import React from 'react';
import { Tabs,Tab,Row,Col,Pagination,FormGroup,InputGroup,FormControl,Glyphicon} from 'react-bootstrap';
import Api from '../service/Api';
import TiSocialGithubCircular from 'react-icons/lib/ti/social-github-circular';

import ReactMarkdown from 'react-markdown';

import SpinDetails from './Spins/SpinDetails';

export default class SpinView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spin: {},
            key: 1,
            user: {}
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(key) {
        this.setState({ key: key });
    }

    componentWillMount() {  
      var api = Api.GetUserSpin(this.props.params.userName, this.props.params.spinName)
      api.then(
        response => {
            this.setState({spin: response.data})
            console.log(response.data)
        },
        error => {
            console.log("error")
        }
      );
      api = Api.GetUser(this.props.params.userName)
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
      const spin = this.state.spin
      const user = this.state.user
      const url_author = "/author/"+user.login
      return (
        <div id="container">
            <Row>
                <Col md={10}>

                <h1><a href={url_author}>{user.login}</a>.{spin.name}</h1>
                <h3>{spin.description}</h3>
                </Col>
                <Col md={2}>
                <img src={user.avatar} width="96" height="96" />
                  
                </Col>
            </Row>
            <Row>    
                <Tabs bsStyle="pills" activeKey={this.state.key} onSelect={this.handleSelect}>
                    <Tab eventKey={1} title="Details" style={{marginBottom: "10px"}}>
                        <SpinDetails spin={spin}/>
                    </Tab>
                    <Tab eventKey={2} title="Readme" style={{marginTop:"10px",marginLeft:"10px"}}>
                    <ReactMarkdown source={spin.readme} />
                    </Tab>
                </Tabs>
            </Row>
        </div>
      )
    }  
}

