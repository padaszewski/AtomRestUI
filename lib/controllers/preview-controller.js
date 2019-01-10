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
    const path = editor.getPath();

    const marker = this.createMarker(editor);

    if (!this.previewData[path]) {
      this.previewData[path] = new PreviewMarkerContainer(editor);
    }
      this.previewData[path].addPreviewMarker(reqPreview, marker);

  }

  createMarker(editor) {
    //get range that is marked in active editor
    const range = editor.getSelectedBufferRange();
    //create marker with given range
    const marker = editor.markBufferRange(range, {invalidate: 'overlap', maintainHistory: true});

    return marker;
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


    atom.workspace.getTextEditors().forEach(editor => {
      const path = editor.getPath();
      if(state[path]) {
        this.previewData[path] = new PreviewMarkerContainer(editor);
        this.previewData[path].deserialize(state[path]);
      }
    })

    atom.workspace.onDidAddTextEditor((event) => {

      const editor = event.textEditor;
      const path = editor.getPath();
    
      //add existing markers
      if(this.previewData[path]) {
        this.previewData[path].refreshMarkers(editor);
      } else {
        this.previewData[path] = new PreviewMarkerContainer(editor);
        if(!state[path]) {return; }
        this.previewData[path].deserialize(state[path]);
      }
    })

  }

  destroy() {
    this.reqPreview.view.destroy();
  }

}
