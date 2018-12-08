'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import RequestBar from '../../components/request-bar';
import RequestWindow from '../../components/request';

export default class RequestPreviewWindow {
  constructor (model) {
    this.model = model;

    etch.initialize(this);
  }

  render () {
    return (
      <div className="request">
        <RequestWindow>
          <button on={{click: this.onSavePreview}}>Save</button>
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

  onSavePreview = (reqPreview) => {
    this.model.savePreview(reqPreview);
  }


}
