'use babel'

import AtomRestUIView from '../atom-rest-u-i-view';

export default class RequestResponseController {

  constructor() {
    this.atomRestUIView = null;
    this.reqView = null;
    this.resView = null;
  }

  /** request needs to be created and sent here
  * @param request: consists of url, header-and body-data, request-type
  */

  sendRequest(request) {

    setTimeout(() => {
      const response = {
        resAttr: 'test',
        status: 500,
        time: 20,
        jsonData: "{'test': 'abcd'}"
      }
      // update the view ()
      this.resView.update({request: request, response: response});
    }, 1000)
  }

  initView() {
    this.atomRestUIView = new AtomRestUIView(this);
    this.reqView = this.atomRestUIView.refs.reqView;
    this.resView = this.atomRestUIView.refs.resView;
    return this.atomRestUIView;
  }

  destroy() {
    this.atomRestUIView.destroy();
  }

}
