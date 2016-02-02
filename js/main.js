!function t(e,n,o){function r(u,s){if(!n[u]){if(!e[u]){var a="function"==typeof require&&require;if(!s&&a)return a(u,!0);if(i)return i(u,!0);var l=new Error("Cannot find module '"+u+"'");throw l.code="MODULE_NOT_FOUND",l}var d=n[u]={exports:{}};e[u][0].call(d.exports,function(t){var n=e[u][1][t];return r(n?n:t)},d,d.exports,t,e,n,o)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(t,e,n){function o(t){var e,n,r=[];for(e=0;e<t.length;e++)n=t[e],r.push(null!==n.children?s("div").key(n.key).children(o(n.children)):s("span").key(n.key).children(n.key));return r}function r(t,e,n){this.container=t,this.a=e,this.b=n}var i=t("vdom-benchmark-base"),u=t("vidom"),s=u.node,a="vidom",l="0.1.3";r.prototype.setUp=function(){},r.prototype.tearDown=function(){u.unmountFromDomSync(this.container)},r.prototype.render=function(){u.mountToDomSync(this.container,s("div").children(o(this.a)))},r.prototype.update=function(){u.mountToDomSync(this.container,s("div").children(o(this.b)))},document.addEventListener("DOMContentLoaded",function(t){i(a,l,r)},!1)},{"vdom-benchmark-base":4,vidom:35}],2:[function(t,e,n){"use strict";function o(){this.running=!1,this.impl=null,this.tests=null,this.reportCallback=null,this.enableTests=!1,this.container=document.createElement("div"),this._runButton=document.getElementById("RunButton"),this._iterationsElement=document.getElementById("Iterations"),this._reportElement=document.createElement("pre"),document.body.appendChild(this.container),document.body.appendChild(this._reportElement);var t=this;this._runButton.addEventListener("click",function(e){if(e.preventDefault(),!t.running){var n=parseInt(t._iterationsElement.value);0>=n&&(n=10),t.run(n)}},!1),this.ready(!0)}var r=t("./executor");o.prototype.ready=function(t){this._runButton.disabled=t?"":"true"},o.prototype.run=function(t){var e=this;this.running=!0,this.ready(!1),new r(e.impl,e.container,e.tests,1,function(){new r(e.impl,e.container,e.tests,t,function(t){e._reportElement.textContent=JSON.stringify(t,null," "),e.running=!1,e.ready(!0),null!=e.reportCallback&&e.reportCallback(t)},void 0,!1).start()},void 0,this.enableTests).start()},e.exports=o},{"./executor":3}],3:[function(t,e,n){"use strict";function o(t){var e,n,r,i,u,s=[];for(r=0;r<t.length;r++)if(u=t[r],null!==u.children){for(i=document.createElement("div"),n=o(u.children),e=0;e<n.length;e++)i.appendChild(n[e]);s.push(i)}else i=document.createElement("span"),i.textContent=u.key.toString(),s.push(i);return s}function r(t,e,n){for(var r=document.createElement("div"),i=document.createElement("div"),u=o(e),s=0;s<u.length;s++)i.appendChild(u[s]);r.appendChild(i),r.innerHTML!==n.innerHTML&&(console.log("error in test: "+t),console.log("container.innerHTML:"),console.log(n.innerHTML),console.log("should be:"),console.log(r.innerHTML))}function i(t,e,n,o,r,i,u){void 0===i&&(i=null),this.impl=t,this.container=e,this.tests=n,this.iterations=o,this.cb=r,this.iterCb=i,this.enableTests=u,this._currentTest=0,this._currentIter=0,this._renderSamples=[],this._updateSamples=[],this._result=[],this._tasksCount=n.length*o,this._iter=this.iter.bind(this)}i.prototype.start=function(){this._iter()},i.prototype.finished=function(){this.cb(this._result)},i.prototype.progress=function(){if(0===this._currentTest&&0===this._currentIter)return 0;var t=this.tests;return(this._currentTest*t.length+this._currentIter)/(t.length*this.iterataions)},i.prototype.iter=function(){null!=this.iterCb&&this.iterCb(this);var t=this.tests;if(this._currentTest<t.length){var e=t[this._currentTest];if(this._currentIter<this.iterations){var n,o,i,u;n=new this.impl(this.container,e.data.a,e.data.b),n.setUp(),o=window.performance.now(),n.render(),i=window.performance.now()-o,this.enableTests&&r(e.name+"render()",e.data.a,this.container),o=window.performance.now(),n.update(),u=window.performance.now()-o,this.enableTests&&r(e.name+"update()",e.data.b,this.container),n.tearDown(),this._renderSamples.push(i),this._updateSamples.push(u),this._currentIter++}else this._result.push({name:e.name+" render()",data:this._renderSamples.slice(0)}),this._result.push({name:e.name+" update()",data:this._updateSamples.slice(0)}),this._currentTest++,this._currentIter=0,this._renderSamples=[],this._updateSamples=[];setTimeout(this._iter,0)}else this.finished()},e.exports=i},{}],4:[function(t,e,n){"use strict";function o(t,e){var n=document.createElement("script");n.src=t,n.onload=function(){s.tests=window.generateBenchmarkData().units,s.ready(!0)},document.head.appendChild(n)}function r(t,e,n,o){window.addEventListener("message",function(r){var i=r.data,u=i.type;"tests"===u?(s.tests=i.data,s.reportCallback=function(r){t.postMessage({type:"report",data:{name:e,version:n,samples:r},id:o},"*")},s.ready(!0),t.postMessage({type:"ready",data:null,id:o},"*")):"run"===u&&s.run(i.data.iterations)},!1),t.postMessage({type:"init",data:null,id:o},"*")}function i(t,e,n){var i=function(t){if(""==t)return{};for(var e={},n=0;n<t.length;++n){var o=t[n].split("=",2);e[o[0]]=1==o.length?"":decodeURIComponent(o[1].replace(/\+/g," "))}return e}(window.location.search.substr(1).split("&"));void 0!==i.name&&(t=i.name),void 0!==i.version&&(e=i.version);var u=i.type;void 0!==i.test&&(s.enableTests=!0,console.log("tests enabled"));var a;if("iframe"===u)a=i.id,void 0===a&&(a=null),r(window.parent,t,e,a);else if("window"===u)null!=window.opener?(a=i.id,void 0===a&&(a=null),r(window.opener,t,e,a)):console.log("Failed to initialize: opener window is NULL");else{var l=i.data;void 0!==l?o(l):console.log("Failed to initialize: cannot load tests data")}s.impl=n}var u=t("./benchmark"),s=new u;if("undefined"==typeof window.performance&&(window.performance={}),!window.performance.now){var a=Date.now();performance.timing&&performance.timing.navigationStart&&(a=performance.timing.navigationStart),window.performance.now=function(){return Date.now()-a}}e.exports=i},{"./benchmark":2}],5:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(n,"__esModule",{value:!0});var r=t("./createComponent"),i=o(r);n["default"]=i["default"]()},{"./createComponent":21}],6:[function(t,e,n){(function(t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});{var e=t.navigator?t.navigator.userAgent:"";n.isTrident=e.indexOf("Trident")>-1,n.isEdge=e.indexOf("Edge")>-1}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(t,e,n){(function(e){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t,e,n){if("type"===e&&"INPUT"===t.tagName){var o=t.value;t.setAttribute(e,""+n),t.value=o}else t.setAttribute(M[e]||e,""+n)}function i(t,e,n){n?r(t,e,n):l(t,e)}function u(t,e,n){t[e]=n}function s(t,e,n){var o=t[e];for(var r in n)o[r]=null==n[r]?"":n[r]}function a(t,e,n){"value"===e&&"SELECT"===t.tagName?c(t,n):t[e]!==n&&(t[e]=n)}function l(t,e){t.removeAttribute(M[e]||e)}function d(t,e){"style"===e?t[e].cssText="":"value"===e&&"SELECT"===t.tagName?f(t):t[e]=v(t.tagName,e)}function c(t,e){for(var n=Array.isArray(e),o=t.options,r=o.length,i=0,u=void 0;r>i;)u=o[i++],u.selected=null!=e&&(n?b["default"](e,u.value):u.value==e)}function f(t){for(var e=t.options,n=e.length,o=0;n>o;)e[o++].selected=!1}function h(t,e){return(M[t]||t)+'="'+g["default"](e)+'"'}function p(t,e){return e?t:""}function m(t,e){var n="";for(var o in e)null!=e[o]&&(n+=C["default"](o)+":"+e[o]+";");return n?t+'="'+n+'"':n}function v(t,e){var n=T[t]||(T[t]={});return e in n?n[e]:n[e]=N.createElement(t)[e]}"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(t){return x[t]||S};var _=t("../utils/escapeAttr"),g=o(_),y=t("../utils/isInArray"),b=o(y),w=t("../utils/dasherize"),C=o(w),D=t("../utils/console"),N=(o(D),e.document),T={},M={acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoCorrect:"autocorrect",autoFocus:"autofocus",autoPlay:"autoplay",encType:"encoding",hrefLang:"hreflang",radioGroup:"radiogroup",spellCheck:"spellcheck",srcDoc:"srcdoc",srcSet:"srcset",tabIndex:"tabindex"},S={set:r,remove:l,toString:h},O={set:i,remove:l,toString:p},A={set:u,remove:d,toString:h},k={set:u,remove:d,toString:p},x={checked:k,controls:A,disabled:O,id:A,ismap:O,loop:A,multiple:k,muted:A,open:O,readOnly:k,selected:k,srcDoc:A,style:{set:s,remove:d,toString:m},value:{set:a,remove:d,toString:h}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils/console":27,"../utils/dasherize":28,"../utils/escapeAttr":30,"../utils/isInArray":32}],8:[function(t,e,n){"use strict";function o(t,e){this.type=t,this.target=e.target,this.nativeEvent=e,this._isPropagationStopped=!1,this._isDefaultPrevented=!1}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=o,o.prototype={stopPropagation:function(){this._isPropagationStopped=!0;var t=this.nativeEvent;t.stopPropagation?t.stopPropagation():t.cancelBubble=!0},isPropagationStopped:function(){return this._isPropagationStopped},preventDefault:function(){this._isDefaultPrevented=!0;var t=this.nativeEvent;t.preventDefault?t.preventDefault():t.returnValue=!1},isDefaultPrevented:function(){return this._isDefaultPrevented}}},{}],9:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]={onMouseOver:"mouseover",onMouseMove:"mousemove",onMouseOut:"mouseout",onMouseDown:"mousedown",onMouseUp:"mouseup",onClick:"click",onDblClick:"dblclick",onKeyDown:"keydown",onKeyPress:"keypress",onKeyUp:"keyup",onChange:"change",onInput:"input",onSubmit:"submit",onFocus:"focus",onBlur:"blur",onScroll:"scroll",onLoad:"load",onError:"error",onContextMenu:"contextmenu",onDragStart:"dragstart",onDrag:"drag",onDragEnter:"dragenter",onDragOver:"dragover",onDragLeave:"dragleave",onDragEnd:"dragend",onDrop:"drop",onWheel:"wheel",onCopy:"copy",onCut:"cut",onPaste:"paste"}},{}],10:[function(t,e,n){(function(e){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){e||(e=t.type);for(var n=y[e],o=[],r=t.target,i=n.listenersCounter,u=void 0,s=void 0,a=void 0;i>0&&r&&r!==m;)(a=p["default"](r,!0))&&(u=g[a],u&&(s=u[e])&&(o.push(s),--i)),r=r.parentNode;if(o.length)for(var l=new f["default"](e,t),d=o.length,c=0;d>c&&(o[c++](l),!l.isPropagationStopped()););}function i(t){g[p["default"](t.target)][t.type](new f["default"](t.type,t))}function u(t,e,n){var o=y[e];if(o){o.set||(o.setup?o.setup():o.bubbles&&m.addEventListener(e,r,!1),o.set=!0);var u=p["default"](t),s=g[u]||(g[u]={});s[e]||(o.bubbles?++o.listenersCounter:t.addEventListener(e,i,!1)),s[e]=n}}function s(t,e){var n=p["default"](t,!0);if(n){var o=g[n];if(o&&o[e]){o[e]=null;var r=y[e];r&&(r.bubbles?--r.listenersCounter:t.removeEventListener(e,i))}}}function a(t){var e=p["default"](t,!0);if(e){var n=g[e];if(n){delete g[e];for(var o in n)s(t,o)}}}Object.defineProperty(n,"__esModule",{value:!0}),n.removeListeners=n.removeListener=n.addListener=void 0;var l=t("./isEventSupported"),d=o(l),c=t("./SyntheticEvent"),f=o(c),h=t("../getDomNodeId"),p=o(h),m=e.document,v=["mouseover","mousemove","mouseout","mousedown","mouseup","click","dblclick","keydown","keypress","keyup","change","input","submit","focus","blur","dragstart","drag","dragenter","dragover","dragleave","dragend","drop","contextmenu","wheel","copy","cut","paste"],_=["scroll","load","error"],g={},y={};m&&!function(){for(var t={focus:"focusin",blur:"focusout"},e=0,n=void 0;e<v.length;)n=v[e++],y[n]={type:n,bubbles:!0,listenersCounter:0,set:!1,setup:t[n]?d["default"](t[n])?function(){var e=this.type;m.addEventListener(t[e],function(t){r(t,e)})}:function(){m.addEventListener(this.type,r,!0)}:null};for(e=0;e<_.length;)y[_[e++]]={type:n,bubbles:!1,set:!1}}(),n.addListener=u,n.removeListener=s,n.removeListeners=a}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../getDomNodeId":12,"./SyntheticEvent":8,"./isEventSupported":11}],11:[function(t,e,n){(function(t){"use strict";function e(t){var e="on"+t;if(e in o)return!0;var n=o.createElement("div");return n.setAttribute(e,"return;"),"function"==typeof n[e]?!0:"wheel"===t&&o.implementation&&o.implementation.hasFeature&&o.implementation.hasFeature("","")!==!0&&o.implementation.hasFeature("Events.wheel","3.0")}Object.defineProperty(n,"__esModule",{value:!0});var o=t.document;n["default"]=e}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],12:[function(t,e,n){"use strict";function o(t,e){return t[r]||(e?null:t[r]=i++)}Object.defineProperty(n,"__esModule",{value:!0});var r="__vidom__id__",i=1;n["default"]=o},{}],13:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t,e,n,o,r){var i=f["default"](t),s=v[i],a=void 0;if(s&&s.tree){a=++s.id;var l=function(){v[i]&&v[i].id===a&&(s.tree.patch(e),s.tree=e,u(n,o))};r?l():p["default"](l)}else{v[i]={tree:null,id:a=++_};var d=t.firstElementChild;if(d)v[i].tree=e,e.adoptDom(d),e.mount(),u(n,o);else{var c=function(){v[i]&&v[i].id===a&&(v[i].tree=e,t.appendChild(e.renderToDom()),e.mount(),u(n,o))};r?c():p["default"](c)}}}function i(t,e,n,o){var r=f["default"](t),i=v[r];i?!function(){var s=++i.id,a=function(){if(i=v[r],i&&i.id===s){delete v[r];var o=i.tree;if(o){var a=o.getDomNode();o.unmount(),t.removeChild(a)}u(e,n)}};i.tree?o?a():p["default"](a):o||u(e,n)}():o||u(e,n)}function u(t,e){t&&t.call(e||this)}function s(t,e,n,o){r(t,e,n,o,!1)}function a(t,e){r(t,e,null,null,!0)}function l(t,e,n){i(t,e,n,!1)}function d(t){i(t,null,null,!0)}Object.defineProperty(n,"__esModule",{value:!0}),n.mountToDom=s,n.mountToDomSync=a,n.unmountFromDom=l,n.unmountFromDomSync=d;var c=t("./getDomNodeId"),f=o(c),h=t("./rafBatch"),p=o(h),m=t("../utils/emptyObj"),v=(o(m),{}),_=0},{"../utils/emptyObj":29,"./getDomNodeId":12,"./rafBatch":15}],14:[function(t,e,n){(function(e){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){t.getDomNode().appendChild(e.renderToDom(t)),e.mount()}function i(t,e,n){t.getDomNode().insertBefore(e.renderToDom(t),n.getDomNode()),e.mount()}function u(t,e){var n=e.getDomNode();e.unmount(),t.getDomNode().removeChild(n)}function s(t,e,n,o){var r=t.getDomNode(),i=e.getDomNode(),u=n.getDomNode(),s=y.activeElement;if(o){var a=u.nextSibling;a?r.insertBefore(i,a):r.appendChild(i)}else r.insertBefore(i,u);y.activeElement!==s&&s.focus()}function a(t){for(var e=t._children,n=e.length,o=0;n>o;)e[o++].unmount();t.getDomNode().innerHTML=""}function l(t,e,n){var o=e.getDomNode();e.unmount(),o.parentNode.replaceChild(n.renderToDom(t),o),n.mount()}function d(t,e,n){var o=t.getDomNode();g["default"][e]?v.addListener(o,g["default"][e],n):m["default"](e).set(o,e,n)}function c(t,e){var n=t.getDomNode();g["default"][e]?v.removeListener(n,g["default"][e]):m["default"](e).remove(n,e)}function f(t,e,n){var o=t.getDomNode();n?o.textContent=e:o.innerHTML=e}function h(t){t.getDomNode().innerHTML=""}Object.defineProperty(n,"__esModule",{value:!0});var p=t("./domAttrs"),m=o(p),v=t("./events/domEventManager"),_=t("./events/attrsToEvents"),g=o(_),y=e.document;n["default"]={appendChild:r,insertChild:i,removeChild:u,moveChild:s,removeChildren:a,replace:l,updateAttr:d,removeAttr:c,updateText:f,removeText:h}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./domAttrs":7,"./events/attrsToEvents":9,"./events/domEventManager":10}],15:[function(t,e,n){(function(t){"use strict";function e(){for(var t=0;t<r.length;)r[t++]();r=[]}Object.defineProperty(n,"__esModule",{value:!0});var o=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},r=[];n["default"]=function(t){1===r.push(t)&&o(e)},n.applyBatch=e}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],16:[function(t,e,n){(function(t){"use strict";function e(t,e){var n=void 0;if(t){var i=t+":"+e;n=r[i]||(r[i]=o.createElementNS(t,e))}else n=r[e]||(r[e]=o.createElement(e));return n.cloneNode()}Object.defineProperty(n,"__esModule",{value:!0});var o=t.document,r={};n["default"]=e}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],17:[function(t,e,n){(function(t){"use strict";function e(t,e,n){if(r||(r=document.createElement("div")),!n||!o[n]||o[n]===e)return r.innerHTML=t,r.removeChild(r.firstChild);var i=o[n];return r.innerHTML="<"+i+' xmlns="'+n+'">'+t+"</"+i+">",r.removeChild(r.firstChild).firstChild}Object.defineProperty(n,"__esModule",{value:!0});var o=(t.document,{"http://www.w3.org/2000/svg":"svg","http://www.w3.org/1998/Math/MathML":"math"}),r=void 0;n["default"]=e}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],18:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};Object.defineProperty(n,"__esModule",{value:!0});var i=t("../createComponent"),u=o(i),s=t("../nodes/TagNode"),a=o(s),l=t("../client/rafBatch");n["default"]=u["default"]({onInit:function(){var t=this;this.onInput=function(e){var n=t.getAttrs();if(n.onInput&&n.onInput(e),n.onChange&&n.onChange(e),l.applyBatch(),t.isMounted()){n=t.getAttrs();var o=t.getDomRef("control");"undefined"!=typeof n.value&&o.value!==n.value&&(o.value=n.value)}},this.onClick=function(e){var n=t.getAttrs();if(n.onClick&&n.onClick(e),n.onChange&&n.onChange(e),l.applyBatch(),t.isMounted()){n=t.getAttrs();var o=t.getDomRef("control");"undefined"!=typeof n.checked&&o.checked!==n.checked&&(o.checked=n.checked)}}},onRender:function(t){var e=void 0;return"file"===t.type?e=t:(e=r({},t,{onChange:null}),"checkbox"===t.type||"radio"===t.type?e.onClick=this.onClick:e.onInput=this.onInput),this.setDomRef("control",new a["default"]("input").attrs(e))}})},{"../client/rafBatch":15,"../createComponent":21,"../nodes/TagNode":25}],19:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};Object.defineProperty(n,"__esModule",{value:!0});var i=t("../createComponent"),u=o(i),s=t("../nodes/TagNode"),a=o(s),l=t("../client/rafBatch");n["default"]=u["default"]({onInit:function(){var t=this;this.onChange=function(e){var n=t.getAttrs();if(n.onChange&&n.onChange(e),l.applyBatch(),t.isMounted()){n=t.getAttrs();var o=t.getDomRef("control");"undefined"!=typeof n.value&&o.value!==n.value&&(o.value=n.value)}}},onRender:function(t,e){var n=r({},t,{onChange:this.onChange});return this.setDomRef("control",new a["default"]("select").attrs(n).children(e))}})},{"../client/rafBatch":15,"../createComponent":21,"../nodes/TagNode":25}],20:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};Object.defineProperty(n,"__esModule",{value:!0});var i=t("../createComponent"),u=o(i),s=t("../nodes/TagNode"),a=o(s),l=t("../client/rafBatch");n["default"]=u["default"]({onInit:function(){var t=this;this.onInput=function(e){var n=t.getAttrs();if(n.onInput&&n.onInput(e),n.onChange&&n.onChange(e),l.applyBatch(),t.isMounted()){n=t.getAttrs();var o=t.getDomRef("control");"undefined"!=typeof n.value&&o.value!==n.value&&(o.value=n.value)}}},onRender:function(t){var e=r({},t,{onInput:this.onInput,onChange:null});return this.setDomRef("control",new a["default"]("textarea").attrs(e))}})},{"../client/rafBatch":15,"../createComponent":21,"../nodes/TagNode":25}],21:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(){this._isMounted=!0,this.onMount(this._attrs)}function i(){this._isMounted=!1,this._domRefs=null,this.onUnmount()}function u(t,e,n,o){t=this._buildAttrs(t);var r=this._rootNode,i=this._attrs;if(i!==t&&(this._attrs=t,this.isMounted())){var u=this._isUpdating;this._isUpdating=!0,this.onAttrsReceive(t,i),this._isUpdating=u}if(this._children=e,this._ctx=n,!this._isUpdating){var s=this.shouldUpdate(t,i);s&&(this._rootNode=this.render(),r.patch(this._rootNode,o),this.isMounted()&&this.onUpdate(t,i))}}function s(t,e){return!0}function a(t){return this._rootNode.renderToDom(t)}function l(){return this._rootNode.renderToString()}function d(t,e){this._rootNode.adoptDom(t,e)}function c(){return this._rootNode.getDomNode()}function f(){return this._attrs}function h(){return j["default"]}function p(){this._domRefs={};var t=this.onRender(this._attrs,this._children)||k["default"]("noscript"),e=this.onChildContextRequest(this._attrs);return t.ctx(e===j["default"]?this._ctx:this._ctx===j["default"]?e:N({},this._ctx,e)),t}function m(t,e){var n=this;this._isUpdating?t&&O["default"](function(){return t.call(e||n)}):(this._isUpdating=!0,O["default"](function(){n.isMounted()&&(n._isUpdating=!1,n.patch(n._attrs,n._children),t&&t.call(e||n))}))}function v(){return this._rootNode}function _(){return this._isMounted}function g(t,e){return this._domRefs[t]=e}function y(t){return this._domRefs[t]?this._domRefs[t].getDomNode():null}function b(){return this._ctx}function w(){return j["default"]}function C(t){if(this._attrs&&t===this._attrs)return t;var e=this.constructor,n=e._defaultAttrs||(e._defaultAttrs=e.getDefaultAttrs());if(!t)return n;if(n===j["default"])return t;var o={};for(var r in n)o[r]=n[r];for(var r in t)o[r]=t[r];return o}function D(t,e){var n=function(t,e,n){this._attrs=this._buildAttrs(t),this._children=e,this._ctx=n,this._domRefs=null,this._isMounted=!1,this._isUpdating=!1,this.onInit(this._attrs),this._rootNode=this.render()},o={constructor:n,onInit:M["default"],mount:r,unmount:i,onMount:M["default"],onUnmount:M["default"],onAttrsReceive:M["default"],shouldUpdate:s,onUpdate:M["default"],isMounted:_,renderToDom:a,renderToString:l,adoptDom:d,getDomNode:c,getRootNode:v,render:p,onRender:M["default"],update:m,patch:u,getDomRef:y,setDomRef:g,getAttrs:f,onChildContextRequest:h,getContext:b,_buildAttrs:C};for(var D in t)o[D]=t[D];n.prototype=o,n.getDefaultAttrs=w;for(var D in e)n[D]=e[D];return n.__vidom__component__=!0,n}{var N=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t}}Object.defineProperty(n,"__esModule",{value:!0});var T=t("./utils/noOp"),M=o(T),S=t("./client/rafBatch"),O=o(S),A=t("./createNode"),k=o(A),x=t("./utils/console"),E=(o(x),t("./utils/emptyObj")),j=o(E);n["default"]=D},{"./client/rafBatch":15,"./createNode":22,"./utils/console":27,"./utils/emptyObj":29,"./utils/noOp":33}],22:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(t){switch("undefined"==typeof t?"undefined":r(t)){case"string":return g[t]?new a["default"](g[t]):new u["default"](t);case"function":return t.__vidom__component__?new a["default"](t):new d["default"](t)}};var i=t("./nodes/TagNode"),u=o(i),s=t("./nodes/ComponentNode"),a=o(s),l=t("./nodes/FunctionComponentNode"),d=o(l),c=t("./components/Input"),f=o(c),h=t("./components/Textarea"),p=o(h),m=t("./components/Select"),v=o(m),_=t("./utils/console"),g=(o(_),{input:f["default"],textarea:p["default"],select:v["default"]})},{"./components/Input":18,"./components/Select":19,"./components/Textarea":20,"./nodes/ComponentNode":23,"./nodes/FunctionComponentNode":24,"./nodes/TagNode":25,"./utils/console":27}],23:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t){this.type=r,this._component=t,this._key=null,this._attrs=null,this._instance=null,this._children=null,this._ns=null,this._ctx=u["default"]}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=r;var i=t("../utils/emptyObj"),u=o(i);r.prototype={getDomNode:function(){return this._instance.getDomNode()},key:function(t){return this._key=t,this},attrs:function(t){return this._attrs=t,this},children:function(t){return this._children=t,this},ctx:function(t){return this._ctx=t,this},renderToDom:function(t){return!this._ns&&t&&t._ns&&(this._ns=t._ns),this._getInstance().renderToDom(this)},renderToString:function(){return this._getInstance().renderToString()},adoptDom:function(t,e){this._getInstance().adoptDom(t,e)},mount:function(){this._instance.getRootNode().mount(),this._instance.mount()},unmount:function(){this._instance&&(this._instance.getRootNode().unmount(),this._instance.unmount(),this._instance=null)},patch:function(t,e){if(this!==t){!t._ns&&e&&e._ns&&(t._ns=e._ns);var n=this._getInstance();if(this.type===t.type)if(this._component===t._component)n.patch(t._attrs,t._children,t._ctx,e),t._instance=n;else{n.unmount();var o=t._getInstance();n.getRootNode().patch(o.getRootNode(),e),o.mount()}else n.unmount(),n.getRootNode().patch(t,e)}},_getInstance:function(){return this._instance||(this._instance=new this._component(this._attrs,this._children,this._ctx))}}},{"../utils/emptyObj":29}],24:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t){this.type=r,this._component=t,this._key=null,this._attrs=a["default"],this._rootNode=null,this._children=null,this._ns=null,this._ctx=a["default"]}"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=r;var i=t("./TagNode"),u=o(i),s=t("../utils/emptyObj"),a=o(s);r.prototype={getDomNode:function(){return this._rootNode.getDomNode()},key:function(t){return this._key=t,this},attrs:function(t){return this._attrs=t,this},children:function(t){return this._children=t,this},ctx:function(t){return this._ctx=t,this},renderToDom:function(t){return!this._ns&&t&&t._ns&&(this._ns=t._ns),this._getRootNode().renderToDom(this)},renderToString:function(){return this._getRootNode().renderToString()},adoptDom:function(t,e){this._getRootNode().adoptDom(t,e)},mount:function(){this._getRootNode().mount()},unmount:function(){this._rootNode&&(this._rootNode.unmount(),this._rootNode=null)},patch:function(t,e){this!==t&&(!t._ns&&e&&e._ns&&(t._ns=e._ns),this._getRootNode().patch(this.type===t.type?t._getRootNode():t,e))},_getRootNode:function(){if(this._rootNode)return this._rootNode;var t=this._component(this._attrs,this._children,this._ctx)||new u["default"]("noscript");return t.ctx(this._ctx),this._rootNode=t}}},{"../utils/emptyObj":29,"./TagNode":25}],25:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t){this.type=r,this._tag=t,this._domNode=null,this._key=null,this._ns=null,this._attrs=null,this._children=null,this._escapeChildren=!0,this._ctx=w["default"]}function i(t){if(null==t)return null;var e="undefined"==typeof t?"undefined":s(t);if("object"===e){var n=Array.isArray(t)?t:[t];return n}return"string"===e?t:t.toString()}function u(t,e,n){for(var o={},r=void 0;n>e;)r=t[e],null!=r._key&&(o[r._key]=e),++e;return o}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=r;var a=t("../client/patchOps"),l=o(a),d=t("../client/domAttrs"),c=o(d),f=t("../client/events/domEventManager"),h=t("../client/events/attrsToEvents"),p=o(h),m=t("../utils/escapeHtml"),v=o(m),_=t("../utils/isInArray"),g=o(_),y=t("../utils/console"),b=(o(y),t("../utils/emptyObj")),w=o(b),C=t("../client/browsers"),D=t("../client/utils/createElement"),N=o(D),T=t("../client/utils/createElementByHtml"),M=o(T),S=t("./ComponentNode"),O=o(S),A=t("./FunctionComponentNode"),k=o(A),x={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuitem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},E=C.isTrident||C.isEdge;r.prototype={getDomNode:function(){return this._domNode},key:function(t){return this._key=t,this},ns:function(t){return this._ns=t,this},attrs:function(t){return this._attrs=t,this},children:function(t){return this._children=i(t),this},ctx:function(t){if(t!==w["default"]){this._ctx=t;var e=this._children;if(e&&"string"!=typeof e)for(var n=e.length,o=0;n>o;)e[o++].ctx(t)}return this},html:function(t){return this._children=t,this._escapeChildren=!1,this},renderToDom:function(t){!this._ns&&t&&t._ns&&(this._ns=t._ns);var e=this._children;if(E&&e&&"string"!=typeof e){var n=M["default"](this.renderToString(),this._tag,this._ns);return this.adoptDom(n,t),n}var o=N["default"](this._ns,this._tag),r=this._attrs;if(e)if("string"==typeof e)this._escapeChildren?o.textContent=e:o.innerHTML=e;else for(var i=0,u=e.length;u>i;)o.appendChild(e[i++].renderToDom(this));if(r){var s=void 0,a=void 0;for(s in r)null!=(a=r[s])&&(p["default"][s]?f.addListener(o,p["default"][s],a):c["default"](s).set(o,s,a))}return this._domNode=o},renderToString:function(){var t=this._tag,e=this._ns,n=this._attrs,o=this._children,r="<"+t;if(e&&(r+=' xmlns="'+e+'"'),n){var i=void 0,u=void 0,s=void 0;for(i in n)if(u=n[i],null!=u){if("value"===i)switch(t){case"textarea":o=u;continue;case"select":this.ctx({value:u,multiple:n.multiple});continue;case"option":(this._ctx.multiple?g["default"](this._ctx.value,u):this._ctx.value===u)&&(r+=" "+c["default"]("selected").toString("selected",!0))}!p["default"][i]&&(s=c["default"](i).toString(i,u))&&(r+=" "+s)}}if(x[t])r+="/>";else{if(r+=">",o)if("string"==typeof o)r+=this._escapeChildren?v["default"](o):o;else for(var a=0,l=o.length;l>a;)r+=o[a++].renderToString();r+="</"+t+">"}return r},adoptDom:function(t,e){!this._ns&&e&&e._ns&&(this._ns=e._ns),this._domNode=t;var n=this._attrs,o=this._children;if(n){var r=void 0,i=void 0;for(r in n)null!=(i=n[r])&&p["default"][r]&&f.addListener(t,p["default"][r],i)}if(o&&"string"!=typeof o){var u=0,s=o.length;if(s)for(var a=t.childNodes;s>u;)o[u].adoptDom(a[u],this),++u}},mount:function(){var t=this._children;if(t&&"string"!=typeof t)for(var e=0,n=t.length;n>e;)t[e++].mount()},unmount:function(){var t=this._children;if(t&&"string"!=typeof t)for(var e=0,n=t.length;n>e;)t[e++].unmount();f.removeListeners(this._domNode),this._domNode=null},patch:function(t,e){if(this!==t)if(!t._ns&&e&&e._ns&&(t._ns=e._ns),this.type===t.type){if(this._tag!==t._tag||this._ns!==t._ns)return void l["default"].replace(e||null,this,t);this._domNode&&(t._domNode=this._domNode),this._patchChildren(t),this._patchAttrs(t)}else switch(t.type){case O["default"]:var n=t._getInstance();this.patch(n.getRootNode(),e),n.mount();break;case k["default"]:this.patch(t._getRootNode(),e);break;default:l["default"].replace(e||null,this,t)}},_patchChildren:function(t){var e=this._children,n=t._children;if(e!==n){var o="string"==typeof e,r="string"==typeof n;if(r)return o?void l["default"].updateText(this,n,t._escapeChildren):(e&&e.length&&l["default"].removeChildren(this),
void(n&&l["default"].updateText(this,n,t._escapeChildren)));if(!n||!n.length)return void(e&&(o?l["default"].removeText(this):e.length&&l["default"].removeChildren(this)));o&&e&&l["default"].removeText(this);var i=n.length;if(!o&&e&&e.length){var s=e.length;if(1===s&&1===i)return void e[0].patch(n[0],t);for(var a=0,d=s-1,c=e[a],f=c._key,h=e[d],p=h._key,m=0,v=i-1,_=n[m],g=_._key,y=n[v],b=y._key,w=!1,C=!1,D=!1,N=!1,T={},M=void 0,S=void 0,O=void 0;d>=a&&v>=m;)T[a]?w=!0:T[d]?C=!0:f===g?(c.patch(_,t),w=!0,D=!0):p===b?(h.patch(y,t),C=!0,N=!0):null!=f&&f===b?(l["default"].moveChild(t,c,h,!0),c.patch(y,t),w=!0,N=!0):null!=p&&p===g?(l["default"].moveChild(t,h,c,!1),h.patch(_,t),C=!0,D=!0):null!=f&&null==g?(l["default"].insertChild(t,_,c),D=!0):null==f&&null!=g?(l["default"].removeChild(t,c),w=!0):(M||(M=u(e,a,d)),null!=(S=M[g])?(O=e[S],T[S]=!0,l["default"].moveChild(t,O,c,!1),O.patch(_,t)):l["default"].insertChild(t,_,c),D=!0),w&&(w=!1,++a<=d&&(c=e[a],f=c._key)),C&&(C=!1,--d>=a&&(h=e[d],p=h._key)),D&&(D=!1,++m<=v&&(_=n[m],g=_._key)),N&&(N=!1,--v>=m&&(y=n[v],b=y._key));for(;d>=a;)T[a]||l["default"].removeChild(t,e[a]),++a;for(;v>=m;)i-1>v?l["default"].insertChild(t,n[m],n[v+1]):l["default"].appendChild(t,n[m]),++m}else for(var A=0;i>A;)l["default"].appendChild(t,n[A++])}},_patchAttrs:function(t){var e=this._attrs,n=t._attrs;if(e!==n){var o=void 0,r=void 0,i=void 0,u=void 0,a=void 0;if(n)for(o in n)i=n[o],e&&null!=(r=e[o])?null==i?l["default"].removeAttr(this,o):"object"===("undefined"==typeof i?"undefined":s(i))&&"object"===("undefined"==typeof r?"undefined":s(r))?(a=Array.isArray(i),u=Array.isArray(r),a||u?a&&u?this._patchAttrArr(o,r,i):l["default"].updateAttr(this,o,i):this._patchAttrObj(o,r,i)):r!==i&&l["default"].updateAttr(this,o,i):null!=i&&l["default"].updateAttr(this,o,i);if(e)for(o in e)n&&o in n||null==(r=e[o])||l["default"].removeAttr(this,o)}},_patchAttrArr:function(t,e,n){if(e!==n){var o=e.length,r=!1;if(o!==n.length)r=!0;else for(var i=0;!r&&o>i;)e[i]!=n[i]&&(r=!0),++i;r&&l["default"].updateAttr(this,t,n)}},_patchAttrObj:function(t,e,n){if(e!==n){var o=!1,r={};for(var i in n)e[i]!=n[i]&&(o=!0,r[i]=n[i]);for(var i in e)null==e[i]||i in n||(o=!0,r[i]=null);o&&l["default"].updateAttr(this,t,r)}}}},{"../client/browsers":6,"../client/domAttrs":7,"../client/events/attrsToEvents":9,"../client/events/domEventManager":10,"../client/patchOps":14,"../client/utils/createElement":16,"../client/utils/createElementByHtml":17,"../utils/console":27,"../utils/emptyObj":29,"../utils/escapeHtml":31,"../utils/isInArray":32,"./ComponentNode":23,"./FunctionComponentNode":24}],26:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(t){return t.renderToString()}},{}],27:[function(t,e,n){(function(e){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(n,"__esModule",{value:!0});var r=t("./noOp"),i=o(r),u=e.console,s={},a={log:"",info:"",warn:"Warning!",error:"Error!"};["log","info","warn","error"].forEach(function(t){s[t]=u?u[t]?function(e,n,o,r,i){var s=a[t];switch(arguments.length){case 1:u[t](s,e);break;case 2:u[t](s,e,n);break;case 3:u[t](s,e,n,o);break;case 4:u[t](s,e,n,o,r);break;case 5:u[t](s,e,n,o,r,i)}}:function(){u.log.apply(u,arguments)}:i["default"]}),n["default"]=s}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./noOp":33}],28:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=/([^A-Z]+)([A-Z])/g;n["default"]=function(t){return t.replace(o,"$1-$2").toLowerCase()}},{}],29:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]={}},{}],30:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(t){return(t+"").replace(/&/g,"&amp;").replace(/"/g,"&quot;")}},{}],31:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(t){return(t+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}},{}],32:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(t,e){for(var n=t.length,o=0;n>o;)if(t[o++]==e)return!0;return!1}},{}],33:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){}},{}],34:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t){if(null==t)return null;var e="undefined"==typeof t?"undefined":s(t);if("object"!==e)return"string"===e?t:t.toString();if(!Array.isArray(t))return t;if(!t.length)return null;for(var n=t,o=0,i=t.length,a=!0,l=void 0,d=void 0;i>o;){if(l=r(t[o]),null===l)null!==n&&(a?n=null:n===t&&(n=t.slice(0,o)));else{if(null===n)n=l;else if(Array.isArray(l))n=a?l:(n===t?n.slice(0,o):Array.isArray(n)?n:[n]).concat(l);else if(d="object"===("undefined"==typeof l?"undefined":s(l)),d&&t[o]===l)n!==t&&(n=u(n,l));else{if(n===t){if(a&&d){n=l,++o;continue}n=n.slice(0,o)}n=u(n,l)}a=!1}++o}return n}function i(t){return"object"===("undefined"==typeof t?"undefined":s(t))?t:l["default"]("span").children(t)}function u(t,e){return Array.isArray(t)?(t.push(i(e)),t):[i(t),i(e)]}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(t){var e=r(t);return null===e||"object"!==("undefined"==typeof e?"undefined":s(e))||Array.isArray(e)||(e=[e]),e};var a=t("../createNode"),l=o(a)},{"../createNode":22}],35:[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(n,"__esModule",{value:!0}),n.Component=n.normalizeChildren=n.renderToString=n.createComponent=n.node=n.unmountFromDomSync=n.unmountFromDom=n.mountToDomSync=n.mountToDom=void 0;var r=t("./client/mounter");Object.defineProperty(n,"mountToDom",{enumerable:!0,get:function(){return r.mountToDom}}),Object.defineProperty(n,"mountToDomSync",{enumerable:!0,get:function(){return r.mountToDomSync}}),Object.defineProperty(n,"unmountFromDom",{enumerable:!0,get:function(){return r.unmountFromDom}}),Object.defineProperty(n,"unmountFromDomSync",{enumerable:!0,get:function(){return r.unmountFromDomSync}});{var i=t("./createNode"),u=o(i),s=t("./createComponent"),a=o(s),l=t("./renderToString"),d=o(l),c=t("./utils/normalizeChildren"),f=o(c),h=t("./Component"),p=o(h),m=t("./utils/console");o(m)}n.node=u["default"],n.createComponent=a["default"],n.renderToString=d["default"],n.normalizeChildren=f["default"],n.Component=p["default"]},{"./Component":5,"./client/mounter":13,"./createComponent":21,"./createNode":22,"./renderToString":26,"./utils/console":27,"./utils/normalizeChildren":34}]},{},[1]);
//# sourceMappingURL=main.js.map