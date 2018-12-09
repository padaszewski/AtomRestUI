'use babel'

import RequestPreviewWindow from '../request-preview/components/request-preview';
import PreviewMarkerContainer from '../preview-marker';

export default class PreviewController {

  constructor() {
    this.reqPreview = {
      view: null,
      marker: null,
      editor: null
    };

    this.previewData = {};

  }

  createPreviewView(editor) {

    const range = editor.getSelectedBufferRange();
    const marker = editor.markBufferRange(range, {invalidate: 'overlap', maintainHistory: true});
    console.log('marker', marker);
    console.log('editor', editor.getLongTitle());
    editor.decorateMarker(marker, {type: 'highlight', class: "hl"});
    this.reqPreview.editor = editor;
    this.reqPreview.marker = marker;
    this.reqPreview.view = new RequestPreviewWindow(this, marker);

    return this.reqPreview.view;
  }

  savePreview(reqPreview) {
    console.log('preview', reqPreview);
    const marker = this.reqPreview.marker;
    const editor = this.reqPreview.editor;
    editor.decorateMarker(marker, {type: 'highlight', class: "hl"});

    const path = editor.getPath();

    if (this.previewData[path]) {
        this.previewData[path].addPreviewMarker(reqPreview, marker);
    } else {
        this.previewData[path] = new PreviewMarkerContainer();
        this.previewData[path].addPreviewMarker(reqPreview, marker);
    }

  }

  deletePreview() {

  }

  updatePreview() {

  }

  serialize() {
    const obj = {};
    Object.keys(this.previewData).forEach((path) => {
      obj[path] = this.previewData[path].serialize();
    })
    return obj;
  }

  destroy() {
    this.reqPreview.view.destroy();
  }

}
