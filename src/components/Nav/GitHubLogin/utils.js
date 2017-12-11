export function toParams(query) {
    const q = query.replace(/^\??\//, '');
  
    return q.split('&').reduce((values, param) => {
      const [key, value] = param.split('=');
  
      values[key] = value;
  
      return values;
    }, {});
  }
  
  export function toQuery(params, delimiter = '&') {
    const keys = Object.keys(params);
  
    return keys.reduce((str, key, index) => {
      let query = `${str}${key}=${params[key]}`;
  
      if (index < (keys.length - 1)) {
        query += delimiter;
      }
  
      return query;
    }, '');
  }

  export function sessionUserDataSave(data){
    sessionStorage.setItem('authentication_token', data.authentication_token);
    sessionStorage.setItem('github_id', data.user.github_id);
    sessionStorage.setItem('github_login', data.user.github_login);
    sessionStorage.setItem('github_bio', data.user.github_bio);
    sessionStorage.setItem('github_location', data.user.github_location);
    sessionStorage.setItem('github_company', data.user.github_company);
    sessionStorage.setItem('github_avatar_url', data.user.github_avatar_url);
    sessionStorage.setItem('github_html_url',data.user.github_html_url)
    sessionStorage.setItem('karma', data.user.karma);
    sessionStorage.setItem('name', data.user.name);  
  }