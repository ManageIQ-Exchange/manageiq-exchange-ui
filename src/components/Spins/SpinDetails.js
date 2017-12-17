import React, { Component } from 'react';
import { Row,Col,Pagination,FormGroup,InputGroup,FormControl,Glyphicon} from 'react-bootstrap';
import GoMarkGithub from 'react-icons/lib/go/mark-github';


export default class SpinDetails extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const spin = this.props.spin;

        return (
            <div style={{border: "1px solid rgb(238, 238, 238)"}}>
                <Row>
                    <Col md={12}>
                    
                    </Col>
                </Row>
                {spin.name} <br/>
                {spin.description}
            </div> 
        )
      }
}