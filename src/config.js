
const config = {
    settings: {
        VERSION: '1.0'
    },
    development: {
        API_BACKEND: 'http://backend-manageiq-galaxy.int.open.paas.redhat.com',
        API_VERSION: 'v1',
        GITHUB_OAUTH_ID: '6260e5a4c3e173a40795',
        GITHUB_REDIRECTUI: 'http://web-manageiq-galaxy.int.open.paas.redhat.com/users/auth/github/callback'
    },
    production: {
        API_BACKEND: 'http://backend-manageiq-galaxy.int.open.paas.redhat.com',
        API_VERSION: 'v1',
        GITHUB_OAUTH_ID: '6260e5a4c3e173a40795',
        GITHUB_REDIRECTUI: 'http://web-manageiq-galaxy.int.open.paas.redhat.com/users/auth/github/callback'
       /* API_BACKEND: 'http://localhost:5000',
        API_VERSION: 'v1',
        GITHUB_OAUTH_ID: 'f49137725fc5870b0104',
        GITHUB_REDIRECTUI: 'http://localhost:8080/users/auth/github/callback',
        GITLAB_OAUTH_ID: 'ee5fc086db19422dd9f5144f550647d904d6bdc3352fb98324531823096a57a3',
        GITLAB_REDIRECTUI: 'http://localhost:8080/',*/
    } 
};
    
module.exports = config;