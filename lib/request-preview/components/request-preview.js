'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import RequestView from '../../components/request/request';

export default class RequestPreviewWindow {
  constructor (model) {
    this.model = model;
    this.request = {};

    etch.initialize(this);
  }

  render () {
    return (
      <div className="request">
        <RequestView  request={this.request} updateReq={this.onUpdateReq}>
          <button on={{click: this.onSavePreview}}>Save</button>
        </RequestView>
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

  onUpdateReq = (request) => {
    this.request = request;
  }

  onSavePreview = (reqPreview) => {
    this.model.savePreview(this.request);
  }


}
