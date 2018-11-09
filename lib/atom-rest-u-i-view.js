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
    this.bodyContent = null;
    this.headerContent = null;
    this.test = 'test';
    this.request = {
      url: '',
      body: '',
      header: ''
    };
    this.response = '';

    etch.initialize(this);
  }

  render () {
    return (
      <div className="ui-container">
      <div className="request">
        <RequestBar request={this.request} updateURL={this.updateURL} sendRequest={this.sendRequest.bind(this)} />
        <RequestContent request={this.request} updateBody={this.updateBody} updateHeader={this.updateHeader} />
      </div>
      <div className="response">
        <ResponseContent response={this.response} />
      </div>
      </div>
    )
  }

  update (props) {
    console.log('props in view', props);
    this.response = props.response;
    return etch.update(this)
  }
  destroy () {
    return etch.destroy(this)

  }

  updateURL = (event) => {
    this.request.url = event.target.value;
    console.log(this.request);
  }

  updateBody = (event) => {
    this.request.body = event.target.value;
  }

  updateHeader = (event) => {
    this.request.header = event.target.value;
  }

  sendRequest = () => {
    this.model.sendRequest(this.request);
  }




}
