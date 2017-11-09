/* eslint-env node */
'use strict';

let assert = require('assert');
let app = require('../../fixtures/app-fixture');

describe('config', function() {
  let Config;

  before(function() {
    Config = require('../../../lib/config');
  });

  it('loads it', function() {
    app.project.root = process.cwd();
    this.options = new Config(app);
    assert.ok(this.options);
  });

  it('loads it with options', function() {
    app.options['ember-polymer'] = {
      bundlerOptions: {
        stripExcludes: ['.*paper-styles\.html.*']
      }
    };

    this.options = new Config(app);
    assert.ok(this.options);
  });

  it('wrong bundlerOutput extension throws an error', function() {
    assert.throws(() => {
      this.options.bundlerOutput = 'elements.wrongextension';
    }, Error);
  });

  it('assigns input and output to bundlerOptions', function() {
    this.options.htmlImportsFile = 'app/elements.html';
    this.options.bundlerOutput = 'bundled.html';
    this.options.bundlerOptions = {};
    assert.deepEqual(this.options.bundlerOptions, {
      input: 'elements.html',
      output: 'bundled.html'
    });
  });
});