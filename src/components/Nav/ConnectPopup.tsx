import { toParams, toQuery } from './utils';

import { Config } from '../../configuration/config'
let config: Config = require('../../config.json');
  
class ConnectPopup {
  id: string
  url: string
  options: any
  promise: any
  _iid: any
  window: any
  constructor(id: string, url:string, options = {}) {
    this.id = id;
    this.url = url;
    this.options = options;
  }

  open() {
    const { url, id, options } = this;

    this.window = window.open(url, id, toQuery(options, ','));
  }

  close() {
    this.cancel();
    this.window.close();
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this._iid = window.setInterval(() => {
        try {
          const popup = this.window;

          if (!popup || popup.closed !== false) {
            this.close();

            reject(new Error('The popup was closed'));

            return;
          }

          if (popup.location.href === this.url || popup.location.pathname === 'blank') {
            return;
          }

          const params = toParams(popup.location.search.replace(/^\?/, ''));

          resolve(params);

          this.close();
        } catch (error) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame.
           */
        }
      }, 500);
    });
  }

  cancel() {
    if (this._iid) {
      window.clearInterval(this._iid);
      this._iid = null;
    }
  }

  then(...args: any[]) {
    return this.promise.then(...args);
  }

  catch(...args: any[]) {
    return this.promise.then(...args);
  }

  static open(...args: any[]) {
    const search = toQuery({
      client_id: config.github.clientId,
      user:'email',
      redirect_uri: config.github.redirectUri,
    });
    const popup = new ConnectPopup('github-oauth-authorize',
      `https://github.com/login/oauth/authorize?${search}`,
      { height: 1000, width: 600 });

    popup.open();
    popup.poll();

    return popup;
  }
}

export default ConnectPopup;