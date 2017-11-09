/* eslint-env node */
'use strict';
let path = require('path');

module.exports = class Config {
  constructor(app, ui) {
    // defaults
    this.autoElementImport = true;
    this.excludeElements = [];
    this.htmlImportsFile = path.join('app', 'elements.html');
    this.bundlerOutput = path.join('assets', 'bundled.html');
    this.bundlerOptions = {
      stripComments: true
    };

    // retrieve and apply addon options
    let addonOptions = app.options['ember-polymer'] || {};
    Object.assign(this, addonOptions);
    this.projectRoot = app.project.root;

    // check for deprecations
    if (this.vulcanizeOutput) {
      ui.writeWarnLine('Deprecation: the `vulcanizeOutput` option was ' +
      'renamed to `bundlerOutput` and will be removed in 3.x (ember-polymer)');
      this.bundlerOutput = this.vulcanizeOutput;
    }
    if (this.vulcanizeOptions) {
      ui.writeWarnLine('Deprecation: the `vulcanizeOptions` option was ' +
      'renamed to `bundlerOptions` and will be removed in 3.x (ember-polymer)');
      this.bundlerOptions = this.vulcanizeOptions;
    }

    // convert relative path to absolute path
    this.htmlImportsFile = path.join(this.projectRoot, this.htmlImportsFile);
  }

  set bundlerOutput(bundlerOutput) {
    if (path.extname(bundlerOutput) === '.html') {
      this._bundlerOutput = bundlerOutput;
    } else {
      throw new Error('[ember-polymer] The `bundlerOutput` file ' +
      `is not a .html file. You specified '${bundlerOutput}'`);
    }
  }

  get bundlerOutput() {
    return this._bundlerOutput;
  }
};