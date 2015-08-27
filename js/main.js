!function e(t,n,o){function r(u,a){if(!n[u]){if(!t[u]){var s="function"==typeof require&&require;if(!a&&s)return s(u,!0);if(i)return i(u,!0);var l=new Error("Cannot find module '"+u+"'");throw l.code="MODULE_NOT_FOUND",l}var d=n[u]={exports:{}};t[u][0].call(d.exports,function(e){var n=t[u][1][e];return r(n?n:e)},d,d.exports,e,t,n,o)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(e,t,n){function o(e){var t,n,r=[];for(t=0;t<e.length;t++)n=e[t],r.push(null!==n.children?a("div").key(n.key).children(o(n.children)):a("span").key(n.key).children(n.key));return r}function r(e,t,n){this.container=e,this.a=t,this.b=n}var i=e("vdom-benchmark-base"),u=e("vidom"),a=u.node,s="vidom",l="0.0.52";r.prototype.setUp=function(){},r.prototype.tearDown=function(){u.unmountFromDomSync(this.container)},r.prototype.render=function(){u.mountToDomSync(this.container,a("div").children(o(this.a)))},r.prototype.update=function(){u.mountToDomSync(this.container,a("div").children(o(this.b)))},document.addEventListener("DOMContentLoaded",function(e){i(s,l,r)},!1)},{"vdom-benchmark-base":4,vidom:31}],2:[function(e,t,n){"use strict";function o(){this.running=!1,this.impl=null,this.tests=null,this.reportCallback=null,this.enableTests=!1,this.container=document.createElement("div"),this._runButton=document.getElementById("RunButton"),this._iterationsElement=document.getElementById("Iterations"),this._reportElement=document.createElement("pre"),document.body.appendChild(this.container),document.body.appendChild(this._reportElement);var e=this;this._runButton.addEventListener("click",function(t){if(t.preventDefault(),!e.running){var n=parseInt(e._iterationsElement.value);0>=n&&(n=10),e.run(n)}},!1),this.ready(!0)}var r=e("./executor");o.prototype.ready=function(e){this._runButton.disabled=e?"":"true"},o.prototype.run=function(e){var t=this;this.running=!0,this.ready(!1),new r(t.impl,t.container,t.tests,1,function(){new r(t.impl,t.container,t.tests,e,function(e){t._reportElement.textContent=JSON.stringify(e,null," "),t.running=!1,t.ready(!0),null!=t.reportCallback&&t.reportCallback(e)},void 0,!1).start()},void 0,this.enableTests).start()},t.exports=o},{"./executor":3}],3:[function(e,t,n){"use strict";function o(e){var t,n,r,i,u,a=[];for(r=0;r<e.length;r++)if(u=e[r],null!==u.children){for(i=document.createElement("div"),n=o(u.children),t=0;t<n.length;t++)i.appendChild(n[t]);a.push(i)}else i=document.createElement("span"),i.textContent=u.key.toString(),a.push(i);return a}function r(e,t,n){for(var r=document.createElement("div"),i=document.createElement("div"),u=o(t),a=0;a<u.length;a++)i.appendChild(u[a]);r.appendChild(i),r.innerHTML!==n.innerHTML&&(console.log("error in test: "+e),console.log("container.innerHTML:"),console.log(n.innerHTML),console.log("should be:"),console.log(r.innerHTML))}function i(e,t,n,o,r,i,u){void 0===i&&(i=null),this.impl=e,this.container=t,this.tests=n,this.iterations=o,this.cb=r,this.iterCb=i,this.enableTests=u,this._currentTest=0,this._currentIter=0,this._renderSamples=[],this._updateSamples=[],this._result=[],this._tasksCount=n.length*o,this._iter=this.iter.bind(this)}i.prototype.start=function(){this._iter()},i.prototype.finished=function(){this.cb(this._result)},i.prototype.progress=function(){if(0===this._currentTest&&0===this._currentIter)return 0;var e=this.tests;return(this._currentTest*e.length+this._currentIter)/(e.length*this.iterataions)},i.prototype.iter=function(){null!=this.iterCb&&this.iterCb(this);var e=this.tests;if(this._currentTest<e.length){var t=e[this._currentTest];if(this._currentIter<this.iterations){var n,o,i,u;n=new this.impl(this.container,t.data.a,t.data.b),n.setUp(),o=window.performance.now(),n.render(),i=window.performance.now()-o,this.enableTests&&r(t.name+"render()",t.data.a,this.container),o=window.performance.now(),n.update(),u=window.performance.now()-o,this.enableTests&&r(t.name+"update()",t.data.b,this.container),n.tearDown(),this._renderSamples.push(i),this._updateSamples.push(u),this._currentIter++}else this._result.push({name:t.name+" render()",data:this._renderSamples.slice(0)}),this._result.push({name:t.name+" update()",data:this._updateSamples.slice(0)}),this._currentTest++,this._currentIter=0,this._renderSamples=[],this._updateSamples=[];setTimeout(this._iter,0)}else this.finished()},t.exports=i},{}],4:[function(e,t,n){"use strict";function o(e,t){var n=document.createElement("script");n.src=e,n.onload=function(){a.tests=window.generateBenchmarkData(),a.ready(!0)},document.head.appendChild(n)}function r(e,t,n,o){window.addEventListener("message",function(r){var i=r.data,u=i.type;"tests"===u?(a.tests=i.data,a.reportCallback=function(r){e.postMessage({type:"report",data:{name:t,version:n,samples:r},id:o},"*")},a.ready(!0),e.postMessage({type:"ready",data:null,id:o},"*")):"run"===u&&a.run(i.data.iterations)},!1),e.postMessage({type:"init",data:null,id:o},"*")}function i(e,t,n){var i=function(e){if(""==e)return{};for(var t={},n=0;n<e.length;++n){var o=e[n].split("=",2);t[o[0]]=1==o.length?"":decodeURIComponent(o[1].replace(/\+/g," "))}return t}(window.location.search.substr(1).split("&"));void 0!==i.name&&(e=i.name),void 0!==i.version&&(t=i.version);var u=i.type;void 0!==i.test&&(a.enableTests=!0,console.log("tests enabled"));var s;if("iframe"===u)s=i.id,void 0===s&&(s=null),r(window.parent,e,t,s);else if("window"===u)null!=window.opener?(s=i.id,void 0===s&&(s=null),r(window.opener,e,t,s)):console.log("Failed to initialize: opener window is NULL");else{var l=i.data;void 0!==l?o(l):console.log("Failed to initialize: cannot load tests data")}a.impl=n}var u=e("./benchmark"),a=new u;if("undefined"==typeof window.performance&&(window.performance={}),!window.performance.now){var s=Date.now();performance.timing&&performance.timing.navigationStart&&(s=performance.timing.navigationStart),window.performance.now=function(){return Date.now()-s}}t.exports=i},{"./benchmark":2}],5:[function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var r=e("./createComponent"),i=o(r);n["default"]=i["default"](),t.exports=n["default"]},{"./createComponent":20}],6:[function(e,t,n){(function(e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e.navigator?e.navigator.userAgent:"",o=t.indexOf("Trident")>-1;n.isTrident=o;var r=t.indexOf("Edge")>-1;n.isEdge=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(e,t,n){(function(o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){if("type"===t&&"INPUT"===e.tagName){var o=e.value;e.setAttribute(t,""+n),e.value=o}else e.setAttribute(M[t]||t,""+n)}function u(e,t,n){e[t]=n}function a(e,t,n){var o=e[t];for(var r in n)o[r]=null==n[r]?"":n[r]}function s(e,t,n){"value"===t&&"SELECT"===e.tagName?c(e,n):e[t]!==n&&(e[t]=n)}function l(e,t){e.removeAttribute(t)}function d(e,t){"value"===t&&"SELECT"===e.tagName?f(e):e[t]=m(e.tagName,t)}function c(e,t){for(var n=Array.isArray(t),o=e.options,r=o.length,i=0,u=void 0;r>i;)u=o[i++],u.selected=null!=t&&(n?b["default"](t,u.value):u.value==t)}function f(e){for(var t=e.options,n=t.length,o=0;n>o;)t[o++].selected=!1}function h(e,t){return(M[e]||e)+'="'+g["default"](t)+'"'}function p(e,t){return t?e:""}function v(e,t){var n="";for(var o in t)null!=t[o]&&(n+=k["default"](o)+":"+t[o]+";");return n?e+'="'+n+'"':n}function m(e,t){var n=D[e]||(D[e]={});return t in n?n[t]:n[t]=C.createElement(e)[t]}Object.defineProperty(n,"__esModule",{value:!0});var _=e("../utils/escapeAttr"),g=r(_),y=e("../utils/isInArray"),b=r(y),w=e("../utils/dasherize"),k=r(w),C=o.document,D={},M={acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoCorrect:"autocorrect",autoFocus:"autofocus",autoPlay:"autoplay",encType:"encoding",hrefLang:"hreflang",radioGroup:"radiogroup",spellCheck:"spellcheck",srcDoc:"srcdoc",srcSet:"srcset",tabIndex:"tabindex"},N={set:i,remove:l,toString:h},T={set:i,remove:l,toString:p},E={set:u,remove:d,toString:h},O={set:u,remove:d,toString:p},S={checked:O,controls:E,disabled:T,id:E,ismap:T,loop:E,multiple:O,muted:E,readOnly:O,selected:O,srcDoc:E,style:{set:a,remove:d,toString:v},value:{set:s,remove:d,toString:h}};n["default"]=function(e){return S[e]||N},t.exports=n["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils/dasherize":26,"../utils/escapeAttr":27,"../utils/isInArray":29}],8:[function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(t,n){o(this,e),this.type=t,this.target=n.target,this.nativeEvent=n,this._isPropagationStopped=!1,this._isDefaultPrevented=!1}return r(e,[{key:"stopPropagation",value:function(){this._isPropagationStopped=!0;var e=this.nativeEvent;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}},{key:"isPropagationStopped",value:function(){return this._isPropagationStopped}},{key:"preventDefault",value:function(){this._isDefaultPrevented=!0;var e=this.nativeEvent;e.preventDefault?e.preventDefault():e.returnValue=!1}},{key:"isDefaultPrevented",value:function(){return this._isDefaultPrevented}}]),e}();n["default"]=i,t.exports=n["default"]},{}],9:[function(e,t,n){"use strict";function o(e,t,n,o){e.addEventListener(t,n,o)}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=o,t.exports=n["default"]},{}],10:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]={onMouseOver:"mouseover",onMouseMove:"mousemove",onMouseOut:"mouseout",onMouseDown:"mousedown",onMouseUp:"mousedown",onClick:"click",onDblClick:"dblclick",onKeyDown:"keydown",onKeyPress:"keypress",onKeyUp:"keyup",onChange:"change",onInput:"input",onSubmit:"submit",onFocus:"focus",onBlur:"blur",onScroll:"scroll",onLoad:"load",onError:"error",onContextMenu:"contextmenu",onDragStart:"dragstart",onDrag:"drag",onDragEnter:"dragenter",onDragOver:"dragover",onDragLeave:"dragleave",onDragEnd:"dragend",onDrop:"drop",onWheel:"wheel",onCopy:"copy",onCut:"cut",onPaste:"paste"},t.exports=n["default"]},{}],11:[function(e,t,n){(function(t){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){t||(t=e.type);for(var n=D[t],o=e.target,r=n.listenersCounter,i=void 0,u=void 0,a=void 0,s=void 0;r>0&&o!==b;){if((a=g["default"](o,!0))&&(i=C[a],i&&(u=i[t]))){if(u(s||(s=new m["default"](t,e))),s.isPropagationStopped())break;--r}o=o.parentNode}}function i(e){C[g["default"](e.target)][e.type](new m["default"](e.type,e))}function u(e,t,n){var o=D[t];if(o){o.set||(o.setup?o.setup():o.bubbles&&d["default"](b,t,r,!1),o.set=!0);var u=g["default"](e),a=C[u]||(C[u]={});a[t]||(o.bubbles?++o.listenersCounter:d["default"](e,t,i,!1)),a[t]=n}}function a(e,t){var n=g["default"](e,!0);if(n){var o=C[n];if(o&&o[t]){o[t]=null;var r=D[t];r&&(r.bubbles?--r.listenersCounter:f["default"](e,t,i))}}}function s(e){var t=g["default"](e,!0);if(t){var n=C[t];if(n){delete C[t];for(var o in n)a(e,o)}}}Object.defineProperty(n,"__esModule",{value:!0});var l=e("./addDomEventListener"),d=o(l),c=e("./removeDomEventListener"),f=o(c),h=e("./isEventSupported"),p=o(h),v=e("./SyntheticEvent"),m=o(v),_=e("../getDomNodeId"),g=o(_),y=t.document,b=y&&y.body,w=["mouseover","mousemove","mouseout","mousedown","mouseup","click","dblclick","keydown","keypress","keyup","change","input","submit","focus","blur","dragstart","drag","dragenter","dragover","dragleave","dragend","drop","contextmenu","wheel","copy","cut","paste"],k=["scroll","load","error"],C={},D={};b&&!function(){for(var e={focus:"focusin",blur:"focusout"},t=0,n=void 0;t<w.length;)n=w[t++],D[n]={type:n,bubbles:!0,listenersCounter:0,set:!1,setup:e[n]?p["default"](e[n])?function(){var t=this.type;d["default"](b,e[t],function(e){r(e,t)})}:function(){d["default"](b,this.type,r,!0)}:null};for(t=0;t<k.length;)D[k[t++]]={type:n,bubbles:!1,set:!1}}(),n.addListener=u,n.removeListener=a,n.removeListeners=s}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../getDomNodeId":14,"./SyntheticEvent":8,"./addDomEventListener":9,"./isEventSupported":12,"./removeDomEventListener":13}],12:[function(e,t,n){(function(e){"use strict";function o(e){var t="on"+e;if(t in r)return!0;var n=r.createElement("div");return n.setAttribute(t,"return;"),"function"==typeof n[t]?!0:"wheel"===e&&r.implementation&&r.implementation.hasFeature&&r.implementation.hasFeature("","")!==!0&&r.implementation.hasFeature("Events.wheel","3.0")}Object.defineProperty(n,"__esModule",{value:!0});var r=e.document;n["default"]=o,t.exports=n["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],13:[function(e,t,n){"use strict";function o(e,t,n){e.removeEventListener(t,n)}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=o,t.exports=n["default"]},{}],14:[function(e,t,n){"use strict";function o(e,t){return e[r]||(t?null:e[r]=i++)}Object.defineProperty(n,"__esModule",{value:!0});var r="__vidom__id__",i=1;n["default"]=o,t.exports=n["default"]},{}],15:[function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t,n,o,r){var i=f["default"](e),a=v[i],s=void 0;if(a&&a.tree){s=++a.id;var l=function(){v[i]&&v[i].id===s&&(a.tree.patch(t),a.tree=t,u(n,o))};r?l():p["default"](l)}else{v[i]={tree:null,id:s=++m};var d=e.firstChild;if(d)v[i].tree=t,t.adoptDom(d),t.mount(),u(n,o);else{var c=function(){v[i]&&v[i].id===s&&(v[i].tree=t,e.appendChild(t.renderToDom()),t.mount(),u(n,o))};r?c():p["default"](c)}}}function i(e,t,n,o){var r=f["default"](e),i=v[r];i?!function(){var a=++i.id,s=function(){i=v[r],i&&i.id===a&&(i.tree&&i.tree.unmount(),delete v[r],e.innerHTML="",u(t,n))};i.tree?o?s():p["default"](s):o||u(t,n)}():o||u(t,n)}function u(e,t){e&&e.call(t||this)}function a(e,t,n,o){r(e,t,n,o,!1)}function s(e,t){r(e,t,null,null,!0)}function l(e,t,n){i(e,t,n,!1)}function d(e){i(e,null,null,!0)}Object.defineProperty(n,"__esModule",{value:!0}),n.mountToDom=a,n.mountToDomSync=s,n.unmountFromDom=l,n.unmountFromDomSync=d;var c=e("./getDomNodeId"),f=o(c),h=e("./rafBatch"),p=o(h),v={},m=0},{"./getDomNodeId":14,"./rafBatch":17}],16:[function(e,t,n){(function(o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){e.getDomNode().appendChild(t.renderToDom(e)),t.mount()}function u(e,t,n){e.getDomNode().insertBefore(t.renderToDom(e),n.getDomNode()),t.mount()}function a(e,t){var n=t.getDomNode();t.unmount(),e.getDomNode().removeChild(n)}function s(e,t,n,o){var r=e.getDomNode(),i=t.getDomNode(),u=n.getDomNode(),a=b.activeElement;if(o){var s=u.nextSibling;s?r.insertBefore(i,s):r.appendChild(i)}else r.insertBefore(i,u);b.activeElement!==a&&a.focus()}function l(e){for(var t=e._children,n=t.length,o=0;n>o;)t[o++].unmount();e.getDomNode().innerHTML=""}function d(e,t,n){var o=t.getDomNode();t.unmount(),o.parentNode.replaceChild(n.renderToDom(e),o),n.mount()}function c(e,t,n){var o=e.getDomNode();y["default"][t]?_.addListener(o,y["default"][t],n):m["default"](t).set(o,t,n)}function f(e,t){var n=e.getDomNode();y["default"][t]?_.removeListener(n,y["default"][t]):m["default"](t).remove(n,t)}function h(e,t,n){var o=e.getDomNode();n?o.textContent=t:o.innerHTML=t}function p(e){e.getDomNode().innerHTML=""}Object.defineProperty(n,"__esModule",{value:!0});var v=e("./domAttrsMutators"),m=r(v),_=e("./events/domEventManager"),g=e("./events/attrsToEvents"),y=r(g),b=o.document;n["default"]={appendChild:i,insertChild:u,removeChild:a,moveChild:s,removeChildren:l,replace:d,updateAttr:c,removeAttr:f,updateText:h,removeText:p},t.exports=n["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./domAttrsMutators":7,"./events/attrsToEvents":10,"./events/domEventManager":11}],17:[function(e,t,n){(function(e){"use strict";function o(){for(var e=0;e<u.length;)u[e++]();u=[]}function r(e){1===u.push(e)&&i(o)}Object.defineProperty(n,"__esModule",{value:!0});var i=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},u=[];n["default"]=r,t.exports=n["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],18:[function(e,t,n){(function(e){"use strict";function o(e,t){var n=void 0;if(e){var o=e+":"+t;n=i[o]||(i[o]=r.createElementNS(e,t))}else n=i[t]||(i[t]=r.createElement(t));return n.cloneNode()}Object.defineProperty(n,"__esModule",{value:!0});var r=e.document,i={};n["default"]=o,t.exports=n["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],19:[function(e,t,n){(function(e){"use strict";function o(e,t,n){if(i||(i=document.createElement("div")),!n||!r[n]||r[n]===t)return i.innerHTML=e,i.removeChild(i.firstChild);var o=r[n];return i.innerHTML="<"+o+' xmlns="'+n+'">'+e+"</"+o+">",i.removeChild(i.firstChild).firstChild}Object.defineProperty(n,"__esModule",{value:!0});var r=(e.document,{"http://www.w3.org/2000/svg":"svg","http://www.w3.org/1998/Math/MathML":"math"}),i=void 0;n["default"]=o,t.exports=n["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],20:[function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(){this._isMounted=!0,this._rootNode.mount(),this.onMount(this.getAttrs())}function i(){this._isMounted=!1,this._domRefs=null,this._rootNode.unmount(),this.onUnmount()}function u(e,t,n){var o=this._rootNode,r=this._attrs;r!==e&&(this._attrs=e,this.isMounted()&&(this._isUpdating=!0,this.onAttrsReceive(this.getAttrs(),r||D),this._isUpdating=!1)),this._children=t,this.isMounted()&&(this._rootNode=this.render(),o.patch(this._rootNode,n),this.onUpdate(e))}function a(e){return this._rootNode.renderToDom(e)}function s(e){return this._rootNode.renderToString(e)}function l(e,t){this._rootNode.adoptDom(e,t)}function d(){return this._rootNode.getDomNode()}function c(){return this._attrs||D}function f(){return this._domRefs={},this.onRender(this.getAttrs(),this._children)||C["default"]("noscript")}function h(e,t){var n=this;this._isUpdating?e&&w["default"](function(){return e.call(t||n)}):(this._isUpdating=!0,w["default"](function(){n.isMounted()&&(n.patch(n._attrs,n._children),n._isUpdating=!1,e&&e.call(t||n))}))}function p(){return this._isMounted}function v(e,t){return this._domRefs[e]=t}function m(e){return this._domRefs[e]?this._domRefs[e].getDomNode():null}function _(e,t){var n=function(e,t){this._attrs=e,this._children=t,this._domRefs=null,this._isMounted=!1,this._isUpdating=!1,this.onInit(),this._rootNode=this.render()},o={constructor:n,onInit:y["default"],mount:r,unmount:i,onMount:y["default"],onUnmount:y["default"],onAttrsReceive:y["default"],onUpdate:y["default"],isMounted:p,renderToDom:a,renderToString:s,adoptDom:l,getDomNode:d,render:f,onRender:y["default"],update:h,patch:u,getDomRef:m,setDomRef:v,getAttrs:c};for(var _ in e)o[_]=e[_];n.prototype=o;for(var _ in t)n[_]=t[_];return n}Object.defineProperty(n,"__esModule",{value:!0});var g=e("./utils/noOp"),y=o(g),b=e("./client/rafBatch"),w=o(b),k=e("./createNode"),C=o(k),D={};n["default"]=_,t.exports=n["default"]},{"./client/rafBatch":17,"./createNode":21,"./utils/noOp":30}],21:[function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e){switch(typeof e){case"string":return new u["default"](e);case"function":return new s["default"](e);default:throw Error("unsupported node type: "+typeof e)}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./nodes/TagNode"),u=o(i),a=e("./nodes/ComponentNode"),s=o(a);n["default"]=r,t.exports=n["default"]},{"./nodes/ComponentNode":22,"./nodes/TagNode":23}],22:[function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=e("../client/patchOps"),a=o(u),s=function(){function e(t){r(this,e),this.type=e,this._component=t,this._key=null,this._attrs=null,this._instance=null,this._children=null,this._ns=null,this._parentNode=null}return i(e,[{key:"getDomNode",value:function(){return this._instance.getDomNode()}},{key:"key",value:function(e){return this._key=e,this}},{key:"attrs",value:function(e){return this._attrs=e,this}},{key:"children",value:function(e){return this._children=e,this}},{key:"renderToDom",value:function(e){return e&&(this._parentNode=e,this._ns||(this._ns=e._ns)),this._domNode=this._getInstance().renderToDom(this)}},{key:"renderToString",value:function(e){return this._getInstance().renderToString(e)}},{key:"adoptDom",value:function(e,t){this._getInstance().adoptDom(e,t)}},{key:"mount",value:function(){this._instance.mount()}},{key:"unmount",value:function(){this._instance&&(this._instance.unmount(),this._instance=null),this._parentNode=null}},{key:"patch",value:function(e,t){if(this.type!==e.type||this._component!==e._component)return void a["default"].replace(this._parentNode,this,t);var n=this._getInstance();n.patch(e._attrs,e._children,t),e._instance=n}},{key:"_getInstance",value:function(){return this._instance||(this._instance=new this._component(this._attrs,this._children))}}]),e}();n["default"]=s,t.exports=n["default"]},{"../client/patchOps":16}],23:[function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e){if(!e)return null;var t=typeof e;if("object"===t){var n=Array.isArray(e)?e:[e];return n}return"string"===t?e:e.toString()}function u(e,t,n){for(var o={},r=void 0;n>t;)r=e[t],null!=r._key&&(o[r._key]=t),++t;return o}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=e("../client/patchOps"),l=o(s),d=e("../client/domAttrsMutators"),c=o(d),f=e("../client/events/domEventManager"),h=e("../client/events/attrsToEvents"),p=o(h),v=e("../utils/escapeHtml"),m=o(v),_=e("../utils/isInArray"),g=o(_),y=e("../utils/console"),b=(o(y),e("../client/browsers")),w=e("../client/utils/createElement"),k=o(w),C=e("../client/utils/createElementByHtml"),D=o(C),M={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuitem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},N=b.isTrident||b.isEdge,T=function(){function e(t){r(this,e),this.type=e,this._tag=t,this._domNode=null,this._key=null,this._ns=null,this._attrs=null,this._children=null,this._escapeChildren=!0,this._parentNode=null}return a(e,[{key:"getDomNode",value:function(){return this._domNode}},{key:"key",value:function(e){return this._key=e,this}},{key:"ns",value:function(e){return this._ns=e,this}},{key:"attrs",value:function(e){return this._attrs=e,this}},{key:"children",value:function(e){return this._children=i(e),this}},{key:"html",value:function(e){return this._children=e,this._escapeChildren=!1,this}},{key:"renderToDom",value:function(e){e&&(this._parentNode=e,this._ns||(this._ns=e._ns));var t=this._children;if(N&&t&&"string"!=typeof t){var n=D["default"](this.renderToString(),this._tag,this._ns);return this.adoptDom(n,e),n}var o=k["default"](this._ns,this._tag),r=this._attrs;if(t)if("string"==typeof t)this._escapeChildren?o.textContent=t:o.innerHTML=t;else for(var i=0,u=t.length;u>i;)o.appendChild(t[i++].renderToDom(this));if(r){var a=void 0,s=void 0;for(a in r)null!=(s=r[a])&&(p["default"][a]?f.addListener(o,p["default"][a],s):c["default"](a).set(o,a,s))}return this._domNode=o}},{key:"renderToString",value:function(e){var t=this._tag,n=this._ns,o=this._attrs,r=this._children,i="<"+t;if(n&&(i+=' xmlns="'+n+'"'),o){var u=void 0,a=void 0,s=void 0;for(u in o)if(a=o[u],null!=a){if("value"===u)switch(t){case"textarea":r=a;continue;case"select":e={value:a,multiple:o.multiple};continue;case"option":(e.multiple?g["default"](e.value,a):e.value===a)&&(i+=" "+c["default"]("selected").toString("selected",!0))}!p["default"][u]&&(s=c["default"](u).toString(u,a))&&(i+=" "+s)}}if(M[t])i+="/>";else{if(i+=">",r)if("string"==typeof r)i+=this._escapeChildren?m["default"](r):r;else for(var l=0,d=r.length;d>l;)i+=r[l++].renderToString(e);i+="</"+t+">"}return i}},{key:"adoptDom",value:function(e,t){t&&(this._parentNode=t,this._ns||(this._ns=t._ns)),this._domNode=e;var n=this._attrs,o=this._children;if(n){var r=void 0,i=void 0;for(r in n)null!=(i=n[r])&&p["default"][r]&&f.addListener(e,p["default"][r],i)}if(o&&"string"!=typeof o){var u=0,a=o.length;if(a)for(var s=e.childNodes;a>u;)o[u].adoptDom(s[u],this),++u}}},{key:"mount",value:function(){var e=this._children;if(e&&"string"!=typeof e)for(var t=0,n=e.length;n>t;)e[t++].mount()}},{key:"unmount",value:function(){var e=this._children;if(e&&"string"!=typeof e)for(var t=0,n=e.length;n>t;)e[t++].unmount();f.removeListeners(this._domNode),this._domNode=null,this._parentNode=null}},{key:"patch",value:function(e,t){if(this!==e){if(t&&(e._parentNode=t,e._ns||(e._ns=t._ns)),this.type!==e.type||this._tag!==e._tag||this._ns!==e._ns)return void l["default"].replace(t||null,this,e);this._domNode&&(e._domNode=this._domNode),this._patchChildren(e),this._patchAttrs(e)}}},{key:"_patchChildren",value:function(e){var t=this._children,n=e._children;if(t!==n){var o="string"==typeof t,r="string"==typeof n;if(r)return o?void l["default"].updateText(this,n,e._escapeChildren):(t&&t.length&&l["default"].removeChildren(this),void(n&&l["default"].updateText(this,n,e._escapeChildren)));if(!n||!n.length)return void(t&&(o?l["default"].removeText(this):t.length&&l["default"].removeChildren(this)));o&&t&&l["default"].removeText(this);var i=n.length;if(!o&&t&&t.length){var a=t.length;if(1===a&&1===i)return void t[0].patch(n[0],e);for(var s=0,d=a-1,c=t[s],f=c._key,h=t[d],p=h._key,v=0,m=i-1,_=n[v],g=_._key,y=n[m],b=y._key,w=!1,k=!1,C=!1,D=!1,M={},N=void 0,T=void 0,E=void 0;d>=s&&m>=v;)M[s]?w=!0:M[d]?k=!0:f===g?(c.patch(_,e),w=!0,C=!0):p===b?(h.patch(y,e),k=!0,D=!0):null!=f&&f===b?(l["default"].moveChild(e,c,h,!0),c.patch(y,e),w=!0,D=!0):null!=p&&p===g?(l["default"].moveChild(e,h,c,!1),h.patch(_,e),k=!0,C=!0):null!=f&&null==g?(l["default"].insertChild(e,_,c),C=!0):null==f&&null!=g?(l["default"].removeChild(e,c),w=!0):(N||(N=u(t,s,d)),null!=(T=N[g])?(E=t[T],M[T]=!0,l["default"].moveChild(e,E,c,!1),E.patch(_,e)):l["default"].insertChild(e,_,c),C=!0),w&&(w=!1,++s<=d&&(c=t[s],f=c._key)),k&&(k=!1,--d>=s&&(h=t[d],p=h._key)),C&&(C=!1,++v<=m&&(_=n[v],g=_._key)),D&&(D=!1,--m>=v&&(y=n[m],b=y._key));for(;d>=s;)M[s]||l["default"].removeChild(e,t[s]),++s;for(;m>=v;)i-1>m?l["default"].insertChild(e,n[v],n[m+1]):l["default"].appendChild(e,n[v]),++v}else for(var O=0;i>O;)l["default"].appendChild(e,n[O++])}}},{key:"_patchAttrs",value:function(e){var t=this._attrs,n=e._attrs;if(t!==n){var o=void 0,r=void 0,i=void 0,u=void 0,a=void 0;if(n)for(o in n)i=n[o],t&&null!=(r=t[o])?null==i?l["default"].removeAttr(this,o):"object"==typeof i&&"object"==typeof r?(a=Array.isArray(i),u=Array.isArray(r),a||u?a&&u?this._patchAttrArr(o,r,i):l["default"].updateAttr(this,o,i):this._patchAttrObj(o,r,i)):r!==i&&l["default"].updateAttr(this,o,i):null!=i&&l["default"].updateAttr(this,o,i);if(t)for(o in t)n&&o in n||null==(r=t[o])||l["default"].removeAttr(this,o)}}},{key:"_patchAttrArr",value:function(e,t,n){if(t!==n){var o=t.length,r=!1;if(o!==n.length)r=!0;else for(var i=0;!r&&o>i;)t[i]!=n[i]&&(r=!0),++i;r&&l["default"].updateAttr(this,e,n)}}},{key:"_patchAttrObj",value:function(e,t,n){if(t!==n){var o=!1,r={};for(var i in n)t[i]!=n[i]&&(o=!0,r[i]=n[i]);for(var i in t)null==t[i]||i in n||(o=!0,r[i]=null);o&&l["default"].updateAttr(this,e,r)}}}]),e}();n["default"]=T,t.exports=n["default"]},{"../client/browsers":6,"../client/domAttrsMutators":7,"../client/events/attrsToEvents":10,"../client/events/domEventManager":11,"../client/patchOps":16,"../client/utils/createElement":18,"../client/utils/createElementByHtml":19,"../utils/console":25,"../utils/escapeHtml":28,"../utils/isInArray":29}],24:[function(e,t,n){"use strict";function o(e){return e.renderToString()}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=o,t.exports=n["default"]},{}],25:[function(e,t,n){(function(o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./noOp"),u=r(i),a=o.console,s={};["log","info","warn","error"].forEach(function(e){s[e]=a?a[e]?function(t,n,o,r,i){switch(arguments.length){case 1:a[e](t);break;case 2:a[e](t,n);break;case 3:a[e](t,n,o);break;case 4:a[e](t,n,o,r);break;case 5:a[e](t,n,o,r,i)}}:function(){a.log.apply(a,arguments)}:u["default"]}),n["default"]=s,t.exports=n["default"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./noOp":30}],26:[function(e,t,n){"use strict";function o(e){return e.replace(r,"$1-$2").toLowerCase()}Object.defineProperty(n,"__esModule",{value:!0});var r=/([^A-Z]+)([A-Z])/g;n["default"]=o,t.exports=n["default"]},{}],27:[function(e,t,n){"use strict";function o(e){return(e+"").replace(/&/g,"&amp;").replace(/"/g,"&quot;")}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=o,t.exports=n["default"]},{}],28:[function(e,t,n){"use strict";function o(e){return(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=o,t.exports=n["default"]},{}],29:[function(e,t,n){"use strict";function o(e,t){for(var n=e.length,o=0;n>o;)if(e[o++]==t)return!0;return!1}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=o,t.exports=n["default"]},{}],30:[function(e,t,n){"use strict";function o(){}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=o,t.exports=n["default"]},{}],31:[function(e,t,n){"use strict";function o(e,t){var n=t({},e);return delete n["default"],n}function r(e,t){for(var n=Object.getOwnPropertyNames(t),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(t,r);i&&i.configurable&&void 0===e[r]&&Object.defineProperty(e,r,i)}return e}function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var u=e("./createNode"),a=i(u),s=e("./createComponent"),l=i(s),d=e("./renderToString"),c=i(d),f=e("./Component"),h=i(f),p=e("./utils/console"),v=(i(p),e("./client/mounter"));r(n,o(v,r)),n.node=a["default"],n.createComponent=l["default"],n.renderToString=c["default"],n.Component=h["default"]},{"./Component":5,"./client/mounter":15,"./createComponent":20,"./createNode":21,"./renderToString":24,"./utils/console":25}]},{},[1]);
//# sourceMappingURL=main.js.map