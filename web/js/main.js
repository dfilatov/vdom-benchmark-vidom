var benchmark = require('vdom-benchmark-base');
var vidom = require('vidom');
var node = vidom.node;

var NAME = 'vidom';
var VERSION = '0.1.4';

function renderTree(nodes) {
  var children = [];
  var i;
  var n;

  for (i = 0; i < nodes.length; i++) {
    n = nodes[i];
    if (n.children !== null) {
      children.push(node('div').key(n.key).children(renderTree(n.children)));
    } else {
      children.push(node('span').key(n.key).children(n.key));
    }
  }

  return children;
}

function BenchmarkImpl(container, a, b) {
  this.container = container;
  this.a = a;
  this.b = b;
}

BenchmarkImpl.prototype.setUp = function() {
};

BenchmarkImpl.prototype.tearDown = function() {
  vidom.unmountFromDomSync(this.container);
};

BenchmarkImpl.prototype.render = function() {
  vidom.mountToDomSync(
    this.container,
    node('div').children(renderTree(this.a)));
};

BenchmarkImpl.prototype.update = function() {
  vidom.mountToDomSync(
    this.container,
    node('div').children(renderTree(this.b)));
};

document.addEventListener('DOMContentLoaded', function(e) {
  benchmark(NAME, VERSION, BenchmarkImpl);
}, false);
