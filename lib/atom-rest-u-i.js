'use babel';


import { CompositeDisposable } from 'atom';
import RequestResponseController from './controllers/request-response-controller.js';
import PreviewController from './controllers/preview-controller.js';

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

  previewData: null,

  resResController: null,
  previewController: null,

  previewOpened: false,

  activate(state) {

      this.reqResController = new RequestResponseController();
      this.previewController = new PreviewController();
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
      this.previewController.destroy();
      this.previewPanel.destroy();
      return;
    }

    const editor = atom.workspace.getActiveTextEditor();

    if(editor) {
      const view = this.previewController.createPreviewView(editor);
      this.previewPanel = atom.workspace.addModalPanel({item: view});
      this.previewOpened = true;
    }

  },

  test() {
    console.log('serialize', this.previewController.serialize());
  },

  deactivate() {
    this.reqResController.destroy();
    this.previewController.destroy();
    this.previewPanel.destroy();
    this.modalPanel.destroy();
    this.subscriptions.dispose();
  },

  serialize() {
    return this.previewController.serialize();
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
  }

};
