'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import RequestBar from './request-bar';
import RequestContent from './request-content';

export default class RequestWindow {
  constructor (props, children) {
    this.children = children;
    this.props = props || {};
    this.props.request = {
      url: '',
      body: '{\n\n}',
      header: '{\n\n}',
      type: 'GET'
    };

    etch.initialize(this);
  }

  render () {
    return (
      <div className="request">
      <div className="request-bar">
        <RequestBar className="req-bar" request={this.props.request} updateURL={this.updateURL} updateReqType={this.updateReqType} sendRequest={this.sendRequest} />
        {this.children}
      </div>
        <RequestContent request={this.props.request} updateBody={this.updateBody} updateHeader={this.updateHeader} />
      </div>
    )
  }

  update (props) {
    this.props = props;
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)
  }

  clear() {
    this.props.request = {
      url: '',
      body: '{\n\n}',
      header: '{\n\n}',
    };
    this.update(this.props);
  }

  updateURL = (event) => {
    this.props.request.url = event.target.value;
    this.props.updateReq(this.props.request);
    return etch.update(this)
  }

  updateBody = (event) => {
    this.props.request.body = event.target.value;
    this.props.updateReq(this.props.request);
    return etch.update(this)
  }

  updateHeader = (event) => {
    this.props.request.header = event.target.value;
    this.props.updateReq(this.props.request);
    return etch.update(this)
  }

  updateReqType = (event) => {
    this.props.request.type = event.target.value;
    this.props.updateReq(this.props.request);
    return etch.update(this)
  }

}
