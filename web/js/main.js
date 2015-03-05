'use strict';

var benchmark = require('vdom-benchmark-base');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');

var NAME = 'virtual-dom';
var VERSION = '2.0.0';

function renderTree(nodes) {
  var children = [];
  var i;
  var n;

  for (i = 0; i < nodes.length; i++) {
    n = nodes[i];
    if (n.children !== null) {
      children.push(new VNode('div', null, renderTree(n.children), n.key));
    } else {
      children.push(new VNode('span', null, [new VText(n.key.toString())], n.key));
    }
  }

  return children;
}

function BenchmarkImpl(container, a, b) {
  this.container = container;
  this.a = a;
  this.b = b;
  this._vRoot = null;
  this._root = null;
}

BenchmarkImpl.prototype.setUp = function() {
};

BenchmarkImpl.prototype.tearDown = function() {
  this._root.remove();
};

BenchmarkImpl.prototype.render = function() {
  this._vRoot = new VNode('div', null, renderTree(this.a));
  this._root = createElement(this._vRoot);
  this.container.appendChild(this._root);
};

BenchmarkImpl.prototype.update = function() {
  var newVroot = new VNode('div', null, renderTree(this.b));
  var patches = diff(this._vRoot, newVroot);
  this._root = patch(this._root, patches);
};

document.addEventListener('DOMContentLoaded', function(e) {
  benchmark(NAME, VERSION, BenchmarkImpl);
}, false);
