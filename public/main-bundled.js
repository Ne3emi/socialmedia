(()=>{var e={669:(e,t,n)=>{e.exports=n(609)},448:(e,t,n)=>{"use strict";var r=n(867),s=n(26),i=n(372),o=n(327),a=n(97),c=n(109),u=n(985),l=n(61),f=n(655),h=n(263);e.exports=function(e){return new Promise((function(t,n){var d,p=e.data,v=e.headers,m=e.responseType;function y(){e.cancelToken&&e.cancelToken.unsubscribe(d),e.signal&&e.signal.removeEventListener("abort",d)}r.isFormData(p)&&delete v["Content-Type"];var g=new XMLHttpRequest;if(e.auth){var b=e.auth.username||"",w=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";v.Authorization="Basic "+btoa(b+":"+w)}var x=a(e.baseURL,e.url);function S(){if(g){var r="getAllResponseHeaders"in g?c(g.getAllResponseHeaders()):null,i={data:m&&"text"!==m&&"json"!==m?g.response:g.responseText,status:g.status,statusText:g.statusText,headers:r,config:e,request:g};s((function(e){t(e),y()}),(function(e){n(e),y()}),i),g=null}}if(g.open(e.method.toUpperCase(),o(x,e.params,e.paramsSerializer),!0),g.timeout=e.timeout,"onloadend"in g?g.onloadend=S:g.onreadystatechange=function(){g&&4===g.readyState&&(0!==g.status||g.responseURL&&0===g.responseURL.indexOf("file:"))&&setTimeout(S)},g.onabort=function(){g&&(n(l("Request aborted",e,"ECONNABORTED",g)),g=null)},g.onerror=function(){n(l("Network Error",e,null,g)),g=null},g.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",r=e.transitional||f.transitional;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,r.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",g)),g=null},r.isStandardBrowserEnv()){var E=(e.withCredentials||u(x))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;E&&(v[e.xsrfHeaderName]=E)}"setRequestHeader"in g&&r.forEach(v,(function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete v[t]:g.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(g.withCredentials=!!e.withCredentials),m&&"json"!==m&&(g.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&g.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&g.upload&&g.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(d=function(e){g&&(n(!e||e&&e.type?new h("canceled"):e),g.abort(),g=null)},e.cancelToken&&e.cancelToken.subscribe(d),e.signal&&(e.signal.aborted?d():e.signal.addEventListener("abort",d))),p||(p=null),g.send(p)}))}},609:(e,t,n)=>{"use strict";var r=n(867),s=n(849),i=n(321),o=n(185),a=function e(t){var n=new i(t),a=s(i.prototype.request,n);return r.extend(a,i.prototype,n),r.extend(a,n),a.create=function(n){return e(o(t,n))},a}(n(655));a.Axios=i,a.Cancel=n(263),a.CancelToken=n(972),a.isCancel=n(502),a.VERSION=n(288).version,a.all=function(e){return Promise.all(e)},a.spread=n(713),a.isAxiosError=n(268),e.exports=a,e.exports.default=a},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,n)=>{"use strict";var r=n(263);function s(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;this.promise.then((function(e){if(n._listeners){var t,r=n._listeners.length;for(t=0;t<r;t++)n._listeners[t](e);n._listeners=null}})),this.promise.then=function(e){var t,r=new Promise((function(e){n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}s.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},s.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},s.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},s.source=function(){var e;return{token:new s((function(t){e=t})),cancel:e}},e.exports=s},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,n)=>{"use strict";var r=n(867),s=n(327),i=n(782),o=n(572),a=n(185),c=n(875),u=c.validators;function l(e){this.defaults=e,this.interceptors={request:new i,response:new i}}l.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&c.assertOptions(t,{silentJSONParsing:u.transitional(u.boolean),forcedJSONParsing:u.transitional(u.boolean),clarifyTimeoutError:u.transitional(u.boolean)},!1);var n=[],r=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(r=r&&t.synchronous,n.unshift(t.fulfilled,t.rejected))}));var s,i=[];if(this.interceptors.response.forEach((function(e){i.push(e.fulfilled,e.rejected)})),!r){var l=[o,void 0];for(Array.prototype.unshift.apply(l,n),l=l.concat(i),s=Promise.resolve(e);l.length;)s=s.then(l.shift(),l.shift());return s}for(var f=e;n.length;){var h=n.shift(),d=n.shift();try{f=h(f)}catch(e){d(e);break}}try{s=o(f)}catch(e){return Promise.reject(e)}for(;i.length;)s=s.then(i.shift(),i.shift());return s},l.prototype.getUri=function(e){return e=a(this.defaults,e),s(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,n){return this.request(a(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){l.prototype[e]=function(t,n,r){return this.request(a(r||{},{method:e,url:t,data:n}))}})),e.exports=l},782:(e,t,n)=>{"use strict";var r=n(867);function s(){this.handlers=[]}s.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},s.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},s.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=s},97:(e,t,n)=>{"use strict";var r=n(793),s=n(303);e.exports=function(e,t){return e&&!r(t)?s(e,t):t}},61:(e,t,n)=>{"use strict";var r=n(481);e.exports=function(e,t,n,s,i){var o=new Error(e);return r(o,t,n,s,i)}},572:(e,t,n)=>{"use strict";var r=n(867),s=n(527),i=n(502),o=n(655),a=n(263);function c(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new a("canceled")}e.exports=function(e){return c(e),e.headers=e.headers||{},e.data=s.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||o.adapter)(e).then((function(t){return c(e),t.data=s.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=s.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,n,r,s){return e.config=t,n&&(e.code=n),e.request=r,e.response=s,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e}},185:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){t=t||{};var n={};function s(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function i(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:s(void 0,e[n]):s(e[n],t[n])}function o(e){if(!r.isUndefined(t[e]))return s(void 0,t[e])}function a(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:s(void 0,e[n]):s(void 0,t[n])}function c(n){return n in t?s(e[n],t[n]):n in e?s(void 0,e[n]):void 0}var u={url:o,method:o,data:o,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:c};return r.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=u[e]||i,s=t(e);r.isUndefined(s)&&t!==c||(n[e]=s)})),n}},26:(e,t,n)=>{"use strict";var r=n(61);e.exports=function(e,t,n){var s=n.config.validateStatus;n.status&&s&&!s(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},527:(e,t,n)=>{"use strict";var r=n(867),s=n(655);e.exports=function(e,t,n){var i=this||s;return r.forEach(n,(function(n){e=n.call(i,e,t)})),e}},655:(e,t,n)=>{"use strict";var r=n(867),s=n(16),i=n(481),o={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var c,u={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(c=n(448)),c),transformRequest:[function(e,t){return s(t,"Accept"),s(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)||t&&"application/json"===t["Content-Type"]?(a(t,"application/json"),function(e,t,n){if(r.isString(e))try{return(0,JSON.parse)(e),r.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||u.transitional,n=t&&t.silentJSONParsing,s=t&&t.forcedJSONParsing,o=!n&&"json"===this.responseType;if(o||s&&r.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(o){if("SyntaxError"===e.name)throw i(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){u.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){u.headers[e]=r.merge(o)})),e.exports=u},288:e=>{e.exports={version:"0.24.0"}},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},327:(e,t,n)=>{"use strict";var r=n(867);function s(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var o=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),o.push(s(t)+"="+s(e))})))})),i=o.join("&")}if(i){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,s,i,o){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(s)&&a.push("path="+s),r.isString(i)&&a.push("domain="+i),!0===o&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function s(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=s(window.location.href),function(t){var n=r.isString(t)?s(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},16:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},109:(e,t,n)=>{"use strict";var r=n(867),s=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,o={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(o[t]&&s.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([n]):o[t]?o[t]+", "+n:n}})),o):o}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},875:(e,t,n)=>{"use strict";var r=n(288).version,s={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){s[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));var i={};s.transitional=function(e,t,n){function s(e,t){return"[Axios v"+r+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(n,r,o){if(!1===e)throw new Error(s(r," has been removed"+(t?" in "+t:"")));return t&&!i[r]&&(i[r]=!0,console.warn(s(r," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,r,o)}},e.exports={assertOptions:function(e,t,n){if("object"!=typeof e)throw new TypeError("options must be an object");for(var r=Object.keys(e),s=r.length;s-- >0;){var i=r[s],o=t[i];if(o){var a=e[i],c=void 0===a||o(a,i,e);if(!0!==c)throw new TypeError("option "+i+" must be "+c)}else if(!0!==n)throw Error("Unknown option "+i)}},validators:s}},867:(e,t,n)=>{"use strict";var r=n(849),s=Object.prototype.toString;function i(e){return"[object Array]"===s.call(e)}function o(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==s.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===s.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===s.call(e)},isBuffer:function(e){return null!==e&&!o(e)&&null!==e.constructor&&!o(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:c,isUndefined:o,isDate:function(e){return"[object Date]"===s.call(e)},isFile:function(e){return"[object File]"===s.call(e)},isBlob:function(e){return"[object Blob]"===s.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function n(n,r){c(t[r])&&c(n)?t[r]=e(t[r],n):c(n)?t[r]=e({},n):i(n)?t[r]=n.slice():t[r]=n}for(var r=0,s=arguments.length;r<s;r++)l(arguments[r],n);return t},extend:function(e,t,n){return l(t,(function(t,s){e[s]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(669),t=n.n(e);function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.injectHtml(),this.searchIcon=document.querySelector(".header-search-icon"),this.closeIcon=document.querySelector(".close-live-search"),this.overlay=document.querySelector(".search-overlay"),this.inputField=document.getElementById("live-search-field"),this.resultsArea=document.querySelector(".live-search-results"),this.loaderLoading=document.querySelector(".circle-loader"),this.typeTimer,this.prevValue="",this.events()}var n,s;return n=e,(s=[{key:"events",value:function(){var e=this;this.searchIcon.addEventListener("click",(function(t){t.preventDefault(),e.openOverlay()})),this.closeIcon.addEventListener("click",(function(){e.closeOverlay()})),this.inputField.addEventListener("keyup",(function(){e.loadingResults()}))}},{key:"closeOverlay",value:function(){this.overlay.classList.remove("search-overlay--visible")}},{key:"openOverlay",value:function(){var e=this;this.overlay.classList.add("search-overlay--visible"),setTimeout((function(){return e.inputField.focus()}),50)}},{key:"loadingResults",value:function(){var e=this,t=this.inputField.value;""==t&&(this.hideSpinning(),this.hideResults()),""!=t&&t!=this.prevValue&&(clearTimeout(this.typeTimer),this.spinning(),this.typeTimer=setTimeout((function(){e.sendRequest()}),750)),this.prevValue=t}},{key:"sendRequest",value:function(){var e=this;t().post("/search",{searchTerm:this.inputField.value}).then((function(t){e.resultsHtml(t.data)})).catch((function(e){alert(e)}))}},{key:"showResults",value:function(){this.resultsArea.classList.add("live-search-results--visible")}},{key:"hideResults",value:function(){this.resultsArea.classList.remove("live-search-results--visible")}},{key:"hideSpinning",value:function(){this.loaderLoading.classList.remove("circle-loader--visible")}},{key:"resultsHtml",value:function(e){e.length?this.resultsArea.innerHTML='\n       <div class="list-group shadow-sm">\n      <div class="list-group-item active">\n      <strong>Search Results</strong> ('.concat(e.length," items found)</div>\n       \n          ").concat(e.map((function(e){return new Date(e.createdData),'<a href="/post/'.concat(e._id,'" class="list-group-item list-group-item-action">\n                  <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"> <strong>').concat(e.title,'</strong>\n                  <span class="text-muted small">by ').concat(e.author.username," </span>\n                </a>")})).join(""),"\n       \n              \n              \n                    \n              </div>"):this.resultsArea.innerHTML="<p>No results found</p>",this.hideSpinning(),this.showResults()}},{key:"spinning",value:function(){this.loaderLoading.classList.add("circle-loader--visible")}},{key:"injectHtml",value:function(){document.body.insertAdjacentHTML("beforeend",'<div class="search-overlay">\n        <div class="search-overlay-top shadow-sm">\n          <div class="container container--narrow">\n            <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>\n            <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">\n            <span class="close-live-search"><i class="fas fa-times-circle"></i></span>\n          </div>\n        </div>\n    \n        <div class="search-overlay-bottom">\n          <div class="container container--narrow py-3">\n            <div class="circle-loader"></div>\n            <div class="live-search-results"></div>\n            </div>\n        </div>\n      </div>')}}])&&r(n.prototype,s),Object.defineProperty(n,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.firstTime=!1,this.chatIcon=document.querySelector(".header-chat-icon"),this.chatBox=document.querySelector("#chat-wrapper"),this.injectHtml(),this.closeChat=document.querySelector(".chat-title-bar-close"),this.chatField=document.querySelector("#chatField"),this.chatForm=document.querySelector("#chatForm"),this.chatLog=document.querySelector("#chat"),this.events()}var t,n;return t=e,(n=[{key:"events",value:function(){var e=this;this.chatIcon.addEventListener("click",(function(){e.showChat()})),this.closeChat.addEventListener("click",(function(){return e.hideChat()})),this.chatForm.addEventListener("submit",(function(t){t.preventDefault(),e.sendMsgToServer()}))}},{key:"showChat",value:function(){this.firstTime||this.startConnection(),this.chatBox.classList.add("chat--visible"),this.firstTime=!0}},{key:"startConnection",value:function(){this.socket=io(),this.receiveMsgFromServer()}},{key:"sendMsgToServer",value:function(){this.socket.emit("msgFromBrowser",{message:this.chatField.value}),this.chatLog.insertAdjacentHTML("beforeend",'  <div class="chat-self">\n        <div class="chat-message">\n          <div class="chat-message-inner">\n            '.concat(this.chatField.value,'\n          </div>\n        </div>\n        <img class="chat-avatar avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128">\n      </div>')),this.chatField.value="",this.chatField.focus()}},{key:"receiveMsgFromServer",value:function(){var e=this;this.socket.on("msgFromServer",(function(t){e.chatLog.insertAdjacentHTML("beforeend",'<div class="chat-other">\n              <a href="/profile/fuck"><img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"></a>\n              <div class="chat-message"><div class="chat-message-inner">\n                <a href="/profile/fuck"><strong>fuck:</strong></a>\n                '.concat(t.message,"\n              </div></div>\n            </div>"))}))}},{key:"hideChat",value:function(){this.chatBox.classList.remove("chat--visible")}},{key:"injectHtml",value:function(){this.chatBox.innerHTML='\n     <div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i class="fas fa-times-circle"></i></span></div>\n    <div id="chat" class="chat-log"></div>\n    \n    <form id="chatForm" class="chat-form border-top">\n      <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">\n    </form>\n    '}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();new s,document.querySelector("#chat-wrapper")&&new o})()})();