'use babel';

import { CompositeDisposable } from 'atom';

export default {

subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'json-remove-wrong-format:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    editor = atom.workspace.getActiveTextEditor();
    text = editor.getText();
    text = text.replace(/"HttpHeaders":"\[\[.*\]\]",/g, '');
    text = text.replace(/"{/g, '{');
    text = text.replace(/}"/g, '}');
    text = text.replace(/[\\]["]/g, '"');
    text = text.replace(/["][\[]/g, '[');
    text = text.replace(/[\]]["]/g, ']');
    editor.setText(text);
    console.log('MyJson was toggled!');
  }

};
