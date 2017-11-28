export interface Config
{
    host: string;
    api: string;
    api_version: string;
    github: GitHubConfig;
    oauth_popup: OauthPopupConfig;
    default: DefaultConfig;
}


export interface GitHubConfig
{
   redirectUri: string;
   clientId: string;
   authorize_url: string;
   access_token_url: string;
   api_url: string;
}


export interface OauthPopupConfig
{
   width: number;
   height: number;
}


export interface DefaultConfig
{
   ui: uiConfig
}


export interface uiConfig
{
  button_github_login: ButtonConfig;
  button_github_logout: ButtonConfig;
}


export interface ButtonConfig{
  text: string;
  icon: string;
  class: string;
}
