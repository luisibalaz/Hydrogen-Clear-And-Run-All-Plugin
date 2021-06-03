'use babel';

import { CompositeDisposable, Disposable } from 'atom';

const HydrogenClearAndRun = {
  subscriptions: null,
  hydrogen: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-text-editor', {
        // 'example-plugin:connect-to-hydrogen': () => this.connectToHydrogen(),
        'hydrogen-clear-and-run:clear-and-run': () => this.hydrogenClearAndRun(),
      }),
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  consumeHydrogen(hydrogen) {
    this.hydrogen = hydrogen;
    return new Disposable(() => {
      this.hydrogen = null;
    });
  },

  hydrogenClearAndRun() {
    const editor = atom.workspace.getActiveTextEditor();
    const target = editor.element;
    const runAll = 'hydrogen:run-all';
    const hyClear = 'hydrogen:clear-results';
    atom.commands.dispatch(target, hyClear);
    atom.commands.dispatch(target, runAll);
  },

  // connectToHydrogen() {
  //   if (this.hydrogen) {
  //     atom.notifications.addSuccess('Successfully connected to Hydrogen!');
  //     return;
  //   }
  //   atom.notifications.addError('Hydrogen `v1.0.0+` has to be running.');
  // },
};

export default HydrogenClearAndRun;
