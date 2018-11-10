'use babel';

import AtomRestUIView from './atom-rest-u-i-view';
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
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomRestUIView = new AtomRestUIView(this);
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
      'atom-rest-u-i:clearView': () => this.clearView()
    }));
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
console.log('workspace:', atom.workspace);
    console.log('AtomRestUI was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  test() {

  },

  clearView() {
    this.atomRestUIView.clear();
  },

  /** request needs to be created and sent here
  * @param request: consists of url, header-and body-data, request-type
  */
  sendRequest(request) {

    setTimeout(() => {
      const response = {
        resAttr: 'test',
        status: 500,
        time: 20,
        jsonData: "{'test': 'lul'}"
      }
      // update the view ()
      this.atomRestUIView.update({request: request, response: response});
    }, 1000)
  }

};
