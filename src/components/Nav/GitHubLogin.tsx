import * as React from 'react';
import { Config } from '../../configuration/config'
import { toQuery } from './utils';

import ConnectPopup from './ConnectPopup';

let config: Config = require('../../config.json');

interface Props {
  buttonText?:string;
  className?:string; 	
  icon?:string;
}

interface State {
  buttonText:string;
  className:string;	
  icon:string
}

export class GitHubLogin extends React.Component<Props,State> {
	popup:any
	
	constructor(props: Props) {
	    super(props);
	    this.state = {
          buttonText: props.buttonText || config.default.ui.button_github_login.text,
          className: props.className || config.default.ui.button_github_login.class,
          icon: props.icon || config.default.ui.button_github_login.icon
     	}
	}
	onBtnClick = () => {
		const search = toQuery({
		  client_id: config.github.clientId,
		  read:'user',
		  redirect_uri: config.github.redirectUri,
		});
		const popup = this.popup = ConnectPopup.open(
		  'github-oauth-authorize',
		  config.github.authorize_url+`?${search}`,
		  { height: 1000, width: 600 }
		);
	    console.log(search)

	    this.onRequest();
	    popup.then(
		      (data:any) => this.onSuccess(data),
		      (error:any) => this.onFailure(error)
		);
	}

	onRequest(){
    	console.log("Request")
    }

    onSuccess(data:any){
	    if (!data.code) {
	      return this.onFailure(new Error('\'code\' not found'));
	    }else{
	      const acess_token_query = toQuery({
			  client_id: config.github.clientId,
			  client_secret: config.github.clientSecret,
			  code:data.code,
			  redirect_uri: config.github.redirectUri,
			});

	      console.log(data)

	      console.log(config.github.access_token_url+`?${acess_token_query}`)

	      fetch(config.github.access_token_url+`?${acess_token_query}`, { 
	        method: 'POST',
	        headers:{
	             'Origin': 'http://localhost:3000/',
	             'Content-Type': 'application/json',
	             'Accept': 'application/json'
		    }
	      })
	      .then(function(response) {
	        console.log(response.status)
	      }).then(function(data) {
	        console.log(data);
	      });

	      this.setState({ 
	      	buttonText: config.default.ui.button_github_logout.text,
	      	className: config.default.ui.button_github_logout.class,
	      	icon: config.default.ui.button_github_login.icon
	      });
	    }

	    
    }

	onFailure(error:any){
	    console.log(error)
	}

    render() {
        const attrs = { onClick: this.onBtnClick };
        const { buttonText, icon, className}  = this.state
        return (

	      <button className={ className } type="button" {...attrs}>
	      { buttonText } <span title="Login GitHub" className={ icon } />
	      </button>
	    );

    }
}

