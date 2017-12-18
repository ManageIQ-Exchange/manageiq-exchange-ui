'use strict';

import React from 'react';
import { Row,Col,Pagination,FormGroup,InputGroup,FormControl,Glyphicon} from 'react-bootstrap';
import Api from '../service/Api';
import TiSocialGithubCircular from 'react-icons/lib/ti/social-github-circular';

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spins: [],
            spinValue: ''
        };
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.finsSpinsOptions = this.finsSpinsOptions.bind(this);
        
    }

    handleChangeValue (event) {
        this.setState({ spinValue: event.target.value });
    }

    handleKeyPress(target) {
        if(target.charCode==13){
                this.finsSpinsOptions()  
        }
    
    }

    finsSpinsOptions(){
        const api = Api.GetSpinsBy("",this.state.spinValue)
        api.then(
          response => {
              this.setState({spins: response.data})
          },
          error => {
              console.log("error")
          }
        );
    }

    componentDidMount() {
        const api = Api.GetSpins()
        api.then(
          response => {
              this.setState({spins: response.data})
          },
          error => {
              console.log("error")
          }
        );
        
    }

    render() {
      const spins = this.state.spins
      return (
        <div id="container">
          <Row >
            <Col md={10}>
                <Row style={{backgroundColor: "grey",textAlign: "vertical"}}>
                    <Col md={2}>
                    <FormGroup controlId="SelectSearch">
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select">Name</option>
                        </FormControl>
                    </FormGroup>
                    </Col>
                    <Col md={5}> 
                    <FormGroup>
                    <InputGroup>
                    <FormControl
                        type="text"
                        value={this.state.spinFind}
                        placeholder="Enter spin name"
                        onChange={this.handleChangeValue}
                        onKeyPress={this.handleKeyPress}
                      />
                    <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                    </Col>
                    <Col md={2}>
                    <FormGroup controlId="SortSearch">
                        <FormControl componentClass="select" placeholder="Sort">
                            <option value="select">Name</option>
                        </FormControl>
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                <Col md={12}>
                <div className="row">
                {
                    spins.length>0 && spins.map((spin) => {
                        var urlauthor = "/author/"+spin.user_id
                    return (
                        <div className="col-sm-4" style={{borderColor: "#333"}}>
                            <div className="card">
                                <div className="card-header">
                                  {spin.name}
                                </div>
                            <div className="card-block">
                                <p className="card-text">{spin.description}</p>
                                <table>
                                <tr><td>Author</td><td><a href={urlauthor}>{spin.user_id}</a></td></tr>
                                </table>    
                            </div>
                            </div>
                        </div>
                    )
                    })
                }
                </div>
                </Col>
                </Row>
            </Col>
          
            <Col md={2}>
              <div style={{borderBottom: "1px solid #FFF",backgroundColor:"grey"}}>
                  Top Tags
              </div>    
              <div style={{backgroundColor:"grey"}}>
                  Tags
                  </div>
            </Col>
          </Row>  
          <Row>
           
          </Row>  
        </div>
      )
    }  
}

