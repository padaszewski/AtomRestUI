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

    this.previewData =  {};

  }

  createPreviewView(editor) {

    this.reqPreview.editor = editor;
    this.reqPreview.view = new RequestPreviewWindow(this);

    return this.reqPreview.view;
  }

  savePreview(reqPreview) {

    const editor = this.reqPreview.editor;
    const range = editor.getSelectedBufferRange();
    const marker = editor.markBufferRange(range, {invalidate: 'overlap', maintainHistory: true});

    editor.decorateMarker(marker, {type: 'highlight', class: "hl"});

    const path = editor.getPath();

    if (this.previewData[path]) {
        this.previewData[path].addPreviewMarker(reqPreview, marker);
    } else {
        this.previewData[path] = new PreviewMarkerContainer(editor);
        this.previewData[path].addPreviewMarker(reqPreview, marker);
    }

  }

  deletePreview() {

  }

  updatePreview() {

  }

  serialize(state) {
    const obj = {};
    Object.keys(this.previewData).forEach((path) => {
      obj[path] = this.previewData[path].serialize();
    })
    return obj;
  }

  deserialize(state) {

    Object.keys(state).forEach((path) => {
      this.previewData[path] = new PreviewMarkerContainer();
    })

    atom.workspace.getTextEditors().forEach(editor => {
      const path = editor.getPath();
      if(this.previewData[path]) {
        const markerReqMapping = state[path];
        this.previewData[path].deserialize(editor, markerReqMapping);
      }
    })

    atom.workspace.onDidAddTextEditor((event) => {
      const editor = event.textEditor;
      const path = editor.getPath();
      //add existing markers
      if(this.previewData[path]) {
        const markerReqMapping = state[path];
        this.previewData[path].deserialize(editor, markerReqMapping);
      }
    })

  }

  destroy() {
    this.reqPreview.view.destroy();
  }

}
