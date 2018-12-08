'use babel'

import RequestPreviewWindow from './request-preview/components/request-preview';

export default class PreviewController {

  constructor() {
    this.reqPreview = {
      view: null,
      marker: null,
      editor: null
    }
  }

  createPreviewView(editor) {

      console.log('editor', editor);
      const range = editor.getSelectedBufferRange();
      const marker = editor.markBufferRange(range, {invalidate: 'overlap', maintainHistory: true});
      this.reqPreview.editor = editor;
      this.reqPreview.marker = marker;
      this.reqPreview.view = new RequestPreviewWindow(this, marker);


    return this.reqPreview.view;
  }

  savePreview(reqPreview) {
    const marker = this.reqPreview.marker;
    const editor = this.reqPreview.editor;
    editor.decorateMarker(marker, {type: 'highlight', class: "hl"});
    this.requestPreviews.set(marker, reqPreview);
  }

  deletePreview() {

  }

  updatePreview() {

  }

  destroy() {
    this.reqPreview.view.destroy();
  }

}
