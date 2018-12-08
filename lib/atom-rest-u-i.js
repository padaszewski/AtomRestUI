'use babel';

import AtomRestUIView from './atom-rest-u-i-view';
import RequestWindow from './components/request';
import RequestPreviewWindow from './request-preview/components/request-preview';
import { CompositeDisposable } from 'atom';

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

  atomRestUIView: null,
  reqView: null,
  resView: null,
  modalPanel: null,
  subscriptions: null,
  markers: new Map(),

  activate(state) {
    this.atomRestUIView = new AtomRestUIView(this);
    this.reqView = this.atomRestUIView.refs.reqView;
    this.resView = this.atomRestUIView.refs.resView;
      this.modalPanel = atom.workspace.addFooterPanel({
      item: this.atomRestUIView.element,
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
    const editor = atom.workspace.getActiveTextEditor();
    if(editor) {
      const range = editor.getSelectedBufferRange();
      const marker = editor.markBufferRange(range, {invalidate: 'none'});
      //editor.setTextInBufferRange(marker.getBufferRange(), 'OMEGALUL');
      const req = new RequestPreviewWindow(this, marker);
      atom.workspace.addModalPanel({item: req});
    }
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomRestUIView.destroy();
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

  /** request needs to be created and sent here
  * @param request: consists of url, header-and body-data, request-type
  */
  sendRequest(request) {

    console.log('request', request)

    setTimeout(() => {
      const response = {
        resAttr: 'test',
        status: 500,
        time: 20,
        jsonData: "{'test': 'abcd'}"
      }
      // update the view ()
      this.resView.update({request: request, response: response});
    }, 1000)
  },

  savePreview(reqPreview, marker) {
    this.reqPreviews.push({preview: reqPreview, marker: marker});
  }

};
