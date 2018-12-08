'use babel';


import RequestWindow from './components/request';
import RequestPreviewWindow from './request-preview/components/request-preview';
import { CompositeDisposable } from 'atom';
import RequestResponseController from './request-response-controller.js';


export default {

  // config that can be seen in package-settings
   config: {
     general: {
       type: 'object',
       order: 1,
       properties: {
     autoActivation: {
       order: 2,
       type: 'boolean',
       default: false,
       title: 'Auto-Activation',
       description: 'Package is automatically activated when starting the editor.'
     }
    }
  }
},

  modalPanel: null,
  previewPanel: null,
  subscriptions: null,
  requestPreviews: new Map(),

  resResController: null,

  reqPreview: {
    panel: null,
    marker: null,
    editor: null
  },


  previewOpened: false,

  activate(state) {

      this.reqResController = new RequestResponseController();
      const view = this.reqResController.initView();

      this.modalPanel = atom.workspace.addFooterPanel({
      item: view.element,
      visible: false
    })


    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();


    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-rest-u-i:toggle': () => this.toggle(),
      'atom-rest-u-i:test': () => this.test(),
      'atom-rest-u-i:clearView': () => this.clearView(),
      'atom-rest-u-i:openRequestModal': () => this.openRequestModal()
    }));
  },

  openRequestModal() {

    if(this.previewOpened) {
      this.previewOpened = false;
      this.reqPreview.panel.destroy();
      this.reqPreviewView.destroy();
      return;
    }

    const editor = atom.workspace.getActiveTextEditor();
    atom.workspace.onDidChangeActiveTextEditor((event) => {
      console.log('editor changed!', event);
    })

    if(editor) {
      console.log('editor', editor);
      const range = editor.getSelectedBufferRange();
      const marker = editor.markBufferRange(range, {invalidate: 'overlap', maintainHistory: true});
      this.reqPreviewView = new RequestPreviewWindow(this, marker);
      this.previewOpened = true;
      this.reqPreview.panel = atom.workspace.addModalPanel({item: this.reqPreviewView});
      this.reqPreview.editor = editor;
      this.reqPreview.marker = marker;
    }
  },

  deactivate() {
    this.reqResController.destroy();
    this.modalPanel.destroy();
    this.subscriptions.dispose();
  },

  serialize() {
    return {
    //  atomRestUIViewState: this.atomRestUIView.serialize()
    };
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  clearView() {
    this.reqView.clear();
    this.resView.clear();
  },



  checkChanges() {
    // get position of cursor
    //iterate over all markers until overlap with cursor-pos is found (no overlapping marker allowed!)
    //if pos of cursor is in range of marker -> add options to menu and visualize

  },




  savePreview(reqPreview) {
    const marker = this.reqPreview.marker;
    const editor = this.reqPreview.editor;
    editor.decorateMarker(marker, {type: 'highlight', class: "hl"});
    this.requestPreviews.set(marker, reqPreview);
  }

};
