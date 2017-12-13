'use strict';

import React from 'react';
import { Grid, Row, Col, Panel, PageHeader } from 'react-bootstrap';
import config from '../config';
import GoPrimitiveDot from 'react-icons/lib/go/primitive-dot';
import Api from '../service/Api';

export default class Footer extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
          version: 'Version ', 
          colorApi: 'yellow',

        };
    }

    componentDidMount() {
        const api = Api.version()
        api.then(
          response => {
              this.setState({version: 'Version '+response.data.data.version, colorApi: 'green'})
              sessionStorage.setItem('Apiversion',response.data.data.version)
              sessionStorage.setItem('ApiColorState','green')
          },
          error => {
              this.setState({version: '', colorApi: 'red'})
              sessionStorage.setItem('ApiColorState','red')
          }
        );
    }

  render() {
    return (
        <footer>
            <Grid>
            <Row className="show-grid">
            <Col md={4}>

            </Col>
            <Col md={8}>
            Copyright © 2018 ManageIQ, Inc. | <a href="https://raw.githubusercontent.com/miq-consumption/manageiq-galaxy/master/LICENSE">License</a> | MIQ GALAXY 1.0.0
            </Col>
            </Row>
            </Grid>  
    </footer>
    );
  }
}
