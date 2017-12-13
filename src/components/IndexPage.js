'use strict';

import React from 'react';
import config from '../config';
import GoPrimitiveDot from 'react-icons/lib/go/primitive-dot';
import { Grid, Row, Col, Panel, PageHeader } from 'react-bootstrap';
import Api from '../service/Api';
import TiSocialGithubCircular from 'react-icons/lib/ti/social-github-circular';
import MdShare from 'react-icons/lib/md/share';

export default class IndexPage extends React.Component {

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
      },
      error => {
          this.setState({version: '', colorApi: 'red'})
      }
    );
  }
  render() {
    return (

    <Grid>
        <Row width="80%" style={{marginLeft:"10%",marginRight:"10%"}}>
          <Col md={4}> 
          <h2>How Works</h2>
          </Col>
          <Col md={4}> 
          <h2><MdShare/> SHARE</h2>
          <p>Help other users of MiQ with your contents</p>
          <p>Tops will be appear in the website</p>
          </Col>
          <Col md={4}> 
          <h2>TOP</h2>
          </Col>
        </Row>
        <Row className="indexFooter">
          <Col md={4} className="banner-container">
            <img src="/img/logo_100.png" height="30%" width="30%" /> <br/><br/><br /><br />
          </Col>
          <Col md={4} className="left-border">
            <section>
              <h3>SERVICES</h3>
              <ul>
                <li>API {this.state.version}   <GoPrimitiveDot color={this.state.colorApi} /></li>
                <li>Web Version { config.version }</li>
              </ul>  
            </section>  

          </Col>
          <Col md={4} className="left-border">
            <section>
              <h3>COMMUNITY</h3>

              <div class="social-logos">
                   <a href="https://github.com/miq-consumption/manageiq-galaxy" target="_blank"><TiSocialGithubCircular size={30} color="#9d9d9d"/></a>
              </div>
            </section>  
          </Col>
        </Row> 
    </Grid> 
    );
  }
}
