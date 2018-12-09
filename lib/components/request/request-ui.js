'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import RequestBar from './request-bar';
import RequestContent from './request-content';
import RequestWindow from './request';

export default class GeneralRequestView {
  constructor (props) {
    this.props = props;
    etch.initialize(this);
    this.request = {};
  }

  render () {
    return (
      <div className="request">
      <RequestWindow request={this.request} updateReq={this.onUpdateReq}>
        <button className="btn btn-info"
        on={{click: this.onSendRequest}}>
        Send
        </button>

        <button className="btn btn-primary" on={{click: this.onSaveRequest}}>Save</button>
      </RequestWindow>
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

  onUpdateReq = (req) => {
    this.request = req;
    this.update(this.props);
  }

  onSendRequest = (req) => {
      this.props.model.sendRequest(this.request);
  }

  onSaveRequest = (req) => {
      this.props.model.saveRequest(this.request);
  }

}
