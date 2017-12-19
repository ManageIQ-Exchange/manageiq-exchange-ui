import React, { Component } from 'react';
import { Row,Col,Pagination,FormGroup,InputGroup,FormControl,Glyphicon} from 'react-bootstrap';
import GoMarkGithub from 'react-icons/lib/go/mark-github';
import GoBug from 'react-icons/lib/go/bug';

export default class SpinDetails extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const spin = this.props.spin;
        const url_repo = spin.clone_url.replace(".git","")
        const url_download_zip = url_repo +"/archive/master.zip"
        const url_issues = url_repo +"/issues"

        return (
            <div style={{border: "1px solid rgb(238, 238, 238)",marginTop: "10px"}}>
                <Row style={{marginTop:"10px",marginLeft:"10px"}}>
                    <Col md={12}>
                    <div className="badge-container">
                                    
                                    <div className="download-badge" data-toggle="tooltip" data-placement="top" title="" data-original-title="Galaxy Download Count">
                                        <div className="title">Downloads</div>
                                        <div className="count">0</div>
                                    </div>
                    </div>  
                    </Col>
                </Row>
                <Row style={{marginTop:"10px",marginLeft:"10px"}}>
                    <Col  md={12}>

                    
                    <a className="btn btn-default btn-sm" href={url_issues} target="_blank">
                        <GoBug/> Issues
                    </a>
                    <a className="btn btn-default btn-sm" href={url_repo} style={{marginLeft:"10px"}} target="_blank">
                        <GoMarkGithub/> GitHub Repo
                    </a>
                    <a className="btn btn-default btn-sm" href={url_download_zip} style={{marginLeft:"10px"}}>
                        <span className="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Download
                    </a>
                    <a className="btn btn-default btn-sm" href={url_download_zip} style={{marginLeft:"10px"}}>
                        <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Watch 0
                    </a>
                    <a className="btn btn-default btn-sm" href={url_download_zip} style={{marginLeft:"10px"}}>
                        <span className="glyphicon glyphicon-start" aria-hidden="true"></span> Start 0
                    </a>

                    <table id="authors-table" style={{marginTop:"10px"}}>
                        <tr><td>Name</td><td>{spin.name}</td></tr>
                        <tr><td>Description</td><td>{spin.description}</td></tr>
                    </table>  
                    </Col>
                </Row>
                <Row style={{marginTop:"10px",marginLeft:"10px",marginRight:"10px"}}>
                  <Col md={8} mdOffset={2}>
                    <div className="panel panel-default">
                        <div className="panel-heading"><center>Clone this repo</center></div>
                        <div claclassNamess="panel-body">
                        <center> <i>git clone <b>{spin.clone_url}</b></i></center>
                        </div>
                    </div>
                  </Col>
                </Row>    
            </div> 
        )
      }
}