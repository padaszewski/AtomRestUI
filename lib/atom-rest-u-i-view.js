'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import Body from './components/body.js'
import Header from './components/header.js'
import RequestBar from './components/request-bar.js'
import RequestContent from './components/request-content.js'
import ResponseContent from './components/response-content.js'

export default class AtomRestUIView {
  constructor (model) {
    this.model = model;
    this.request = {
      url: '',
      body: '',
      header: '',
    };
    this.response = {
      time: '',
      status: '',
      jsonData: ''
    };

    etch.initialize(this);
  }

  render () {
    return (
      <div className="ui-container native-key-bindings">
      <div className="request">
        <RequestBar className="req-bar" request={this.request} updateURL={this.updateURL} updateReqType={this.updateReqType} sendRequest={this.sendRequest} />
        <RequestContent request={this.request} updateBody={this.updateBody} updateHeader={this.updateHeader} />
      </div>
      <div className="response">
        <ResponseContent response={this.response} />
      </div>
      </div>
    )
  }

  update (props) {
    this.request = props.request;
    this.response = props.response;
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)

  }

  async clear () {
    this.request = {
      url: '',
      body: '',
      header: '',
    };
    this.response = {
      status: '',
      time: '',
      jsonData: ''
    };

    await this.update({request: this.request, response: this.response});
  }

  updateURL = (event) => {
    this.request.url = event.target.value;
    return etch.update(this)
  }

  updateBody = (event) => {
    this.request.body = event.target.value;
    return etch.update(this)
  }

  updateHeader = (event) => {
    this.request.header = event.target.value;
    return etch.update(this)
  }

  sendRequest = () => {
    this.model.sendRequest(this.request);
  }

  updateReqType = (event) => {
    this.request.type = event.target.value;
    return etch.update(this)
  }




}
