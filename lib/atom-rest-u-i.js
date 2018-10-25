'use babel';

import AtomRestUIView from './atom-rest-u-i-view';
import { CompositeDisposable } from 'atom';

export default {

  atomRestUIView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomRestUIView = new AtomRestUIView(state.atomRestUIViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomRestUIView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-rest-u-i:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomRestUIView.destroy();
  },

  serialize() {
    return {
      atomRestUIViewState: this.atomRestUIView.serialize()
    };
  },

  toggle() {
    console.log('AtomRestUI was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
