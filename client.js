!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(t.braintree||(t.braintree={})).client=e()}}(function(){return function e(t,n,r){function o(a,s){if(!n[a]){if(!t[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){var n=t[a][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){"use strict";function r(e){var t,n;if(e=e||{},t=JSON.stringify(e),n=e.gatewayConfiguration,!n)throw new a(c.CLIENT_MISSING_GATEWAY_CONFIGURATION);["assetsUrl","clientApiUrl","configUrl"].forEach(function(e){if(e in n&&!i(n[e]))throw new a({type:c.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,code:c.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,message:e+" property is on an invalid domain."})}),this.getConfiguration=function(){return JSON.parse(t)},this._request=o,this._baseUrl=e.gatewayConfiguration.clientApiUrl+"/v1/",this._configuration=this.getConfiguration(),this.toJSON=this.getConfiguration}var o=e("./request"),i=e("../lib/is-whitelisted-domain"),a=e("../lib/error"),s=e("../lib/add-metadata"),u=e("../lib/deferred"),c=e("./errors");r.prototype.request=function(e,t){var n;return e.method?e.endpoint||(n="options.endpoint"):n="options.method",n?(t=u(t),void t(new a({type:c.CLIENT_OPTION_REQUIRED.type,code:c.CLIENT_OPTION_REQUIRED.code,message:n+" is required when making a request."}))):void this._request({url:this._baseUrl+e.endpoint,method:e.method,data:s(this._configuration,e.data),headers:e._headers,timeout:e.timeout},this._bindRequestCallback(t))},r.prototype._bindRequestCallback=function(e){return function(t,n,r){-1===r?e(new a(c.CLIENT_REQUEST_TIMEOUT),null,r):403===r?e(new a(c.CLIENT_AUTHORIZATION_INSUFFICIENT),null,r):429===r?e(new a(c.CLIENT_RATE_LIMITED),null,r):r>=500?e(new a(c.CLIENT_GATEWAY_NETWORK),null,r):200>r||r>=400?e(new a({type:c.CLIENT_REQUEST_ERROR.type,code:c.CLIENT_REQUEST_ERROR.code,message:c.CLIENT_REQUEST_ERROR.message,details:{originalError:t}}),null,r):e(null,n,r)}},t.exports=r},{"../lib/add-metadata":13,"../lib/deferred":16,"../lib/error":18,"../lib/is-whitelisted-domain":19,"./errors":2,"./request":7}],2:[function(e,t,n){"use strict";var r=e("../lib/error");t.exports={CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN:{type:r.types.MERCHANT,code:"CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN"},CLIENT_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"CLIENT_OPTION_REQUIRED"},CLIENT_MISSING_GATEWAY_CONFIGURATION:{type:r.types.INTERNAL,code:"CLIENT_MISSING_GATEWAY_CONFIGURATION",message:"Missing gatewayConfiguration."},CLIENT_INVALID_AUTHORIZATION:{type:r.types.MERCHANT,code:"CLIENT_INVALID_AUTHORIZATION",message:"Authorization is invalid. Make sure your client token or tokenization key is valid."},CLIENT_GATEWAY_NETWORK:{type:r.types.NETWORK,code:"CLIENT_GATEWAY_NETWORK",message:"Cannot contact the gateway at this time."},CLIENT_REQUEST_TIMEOUT:{type:r.types.NETWORK,code:"CLIENT_REQUEST_TIMEOUT",message:"Request timed out waiting for a reply."},CLIENT_REQUEST_ERROR:{type:r.types.NETWORK,code:"CLIENT_REQUEST_ERROR",message:"There was a problem with your request."},CLIENT_RATE_LIMITED:{type:r.types.MERCHANT,code:"CLIENT_RATE_LIMITED",message:"You are being rate-limited; please try again in a few minutes."},CLIENT_AUTHORIZATION_INSUFFICIENT:{type:r.types.MERCHANT,code:"CLIENT_AUTHORIZATION_INSUFFICIENT",message:"The authorization used has insufficient privileges."}}},{"../lib/error":18}],3:[function(e,t,n){(function(n){"use strict";function r(e,t){var r,l,f,d,p=a(),E={merchantAppId:n.location.host,platform:s.PLATFORM,sdkVersion:s.VERSION,source:s.SOURCE,integration:s.INTEGRATION,integrationType:s.INTEGRATION,sessionId:p};try{l=u(e.authorization)}catch(I){return void t(new o(c.CLIENT_INVALID_AUTHORIZATION))}f=l.attrs,d=l.configUrl,f._meta=E,f.braintreeLibraryVersion=s.BRAINTREE_LIBRARY_VERSION,f.configVersion="3",i({url:d,method:"GET",data:f},function(n,i,a){var s;return n?(s=403===a?c.CLIENT_AUTHORIZATION_INSUFFICIENT:c.CLIENT_GATEWAY_NETWORK,void t(new o({type:s.type,code:s.code,message:s.message,details:{originalError:n}}))):(r={authorization:e.authorization,authorizationType:f.tokenizationKey?"TOKENIZATION_KEY":"CLIENT_TOKEN",analyticsMetadata:E,gatewayConfiguration:i},void t(null,r))})}var o=e("../lib/error"),i=e("./request"),a=e("../lib/uuid"),s=e("../lib/constants"),u=e("../lib/create-authorization-data"),c=e("./errors");t.exports={getConfiguration:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lib/constants":14,"../lib/create-authorization-data":15,"../lib/error":18,"../lib/uuid":25,"./errors":2,"./request":7}],4:[function(e,t,n){"use strict";function r(e,t){return s(t,"create"),t=c(t),e.authorization?void a(e,function(e,n){var r;if(e)return void t(e);try{r=new i(n)}catch(o){return void t(o)}t(null,r)}):void t(new o({type:l.INSTANTIATION_OPTION_REQUIRED.type,code:l.INSTANTIATION_OPTION_REQUIRED.code,message:"options.authorization is required when instantiating a client."}))}var o=e("../lib/error"),i=e("./client"),a=e("./get-configuration").getConfiguration,s=e("../lib/throw-if-no-callback"),u="3.4.0",c=e("../lib/deferred"),l=e("../errors");t.exports={create:r,VERSION:u}},{"../errors":12,"../lib/deferred":16,"../lib/error":18,"../lib/throw-if-no-callback":24,"./client":1,"./get-configuration":3}],5:[function(e,t,n){(function(n){"use strict";function r(){return u?new XMLHttpRequest:new XDomainRequest}function o(e,t){var n,o,c=e.method,l=e.url,f=e.data,d=e.timeout,p=e.headers||{},E=r(),I=t;"GET"===c&&(l=i.queryify(l,f),f=null),u?E.onreadystatechange=function(){4===E.readyState&&(n=E.status,o=s(E.responseText),n>=400||200>n?I(o||"error",null,n||500):I(null,o,n))}:(E.onload=function(){I(null,s(E.responseText),E.status)},E.onerror=function(){I("error",null,500)},E.onprogress=function(){},E.ontimeout=function(){I("timeout",null,-1)}),E.open(c,l,!0),E.timeout=d,u&&"POST"===c&&(E.setRequestHeader("Content-Type","application/json"),Object.keys(p).forEach(function(e){E.setRequestHeader(e,p[e])}));try{E.send(a(c,f))}catch(T){}}var i=e("../../lib/querystring"),a=e("./prep-body"),s=e("./parse-body"),u=n.XMLHttpRequest&&"withCredentials"in new n.XMLHttpRequest;t.exports={request:o}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../lib/querystring":23,"./parse-body":10,"./prep-body":11}],6:[function(e,t,n){(function(e){"use strict";t.exports=function(){return e.navigator.userAgent}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(e,t,n){"use strict";function r(){return null==o&&(o=!(c()&&/MSIE\s(8|9)/.test(u()))),o}var o,i=e("../../lib/once"),a=e("./jsonp-driver"),s=e("./ajax-driver"),u=e("./get-user-agent"),c=e("./is-http");t.exports=function(e,t){t=i(t||Function.prototype),e.method=(e.method||"GET").toUpperCase(),e.timeout=null==e.timeout?6e4:e.timeout,e.data=e.data||{},r()?s.request(e,t):a.request(e,t)}},{"../../lib/once":21,"./ajax-driver":5,"./get-user-agent":6,"./is-http":8,"./jsonp-driver":9}],8:[function(e,t,n){(function(e){"use strict";t.exports=function(){return"http:"===e.location.protocol}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(e,t,n){(function(n){"use strict";function r(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function o(e,t){var r=document.createElement("script"),o=!1;return r.src=e,r.async=!0,r.onerror=function(){n[t]({message:"error",status:500})},r.onload=r.onreadystatechange=function(){o||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(o=!0,r.onload=r.onreadystatechange=null)},r}function i(e){try{delete n[e]}catch(t){n[e]=null}}function a(e,t){d[t]=setTimeout(function(){d[t]=null,n[t]({error:"timeout",status:-1}),n[t]=function(){i(t)}},e)}function s(e,t,o){n[o]=function(n){var a=n.status||500,s=null,u=null;delete n.status,a>=400||200>a?s=n:u=n,i(o),r(e),clearTimeout(d[o]),t(s,u,a)}}function u(e,t){var n,r="callback_json_"+l().replace(/-/g,""),i=e.url,u=e.data,d=e.method,p=e.timeout;i=f.queryify(i,u),i=f.queryify(i,{_method:d,callback:r}),n=o(i,r),s(n,t,r),a(p,r),c||(c=document.getElementsByTagName("head")[0]),c.appendChild(n)}var c,l=e("../../lib/uuid"),f=e("../../lib/querystring"),d={};t.exports={request:u}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../lib/querystring":23,"../../lib/uuid":25}],10:[function(e,t,n){"use strict";t.exports=function(e){try{e=JSON.parse(e)}catch(t){}return e}},{}],11:[function(e,t,n){"use strict";t.exports=function(e,t){if("string"!=typeof e)throw new Error("Method must be a string");return"get"!==e.toLowerCase()&&null!=t&&(t="string"==typeof t?t:JSON.stringify(t)),t}},{}],12:[function(e,t,n){"use strict";var r=e("./lib/error");t.exports={CALLBACK_REQUIRED:{type:r.types.MERCHANT,code:"CALLBACK_REQUIRED"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./lib/error":18}],13:[function(e,t,n){"use strict";function r(e,t){var n,r=t?i(t):{},s=o(e.authorization).attrs,u=i(e.analyticsMetadata);r.braintreeLibraryVersion=a.BRAINTREE_LIBRARY_VERSION;for(n in r._meta)r._meta.hasOwnProperty(n)&&(u[n]=r._meta[n]);return r._meta=u,s.tokenizationKey?r.tokenizationKey=s.tokenizationKey:r.authorizationFingerprint=s.authorizationFingerprint,r}var o=e("./create-authorization-data"),i=e("./json-clone"),a=e("./constants");t.exports=r},{"./constants":14,"./create-authorization-data":15,"./json-clone":20}],14:[function(e,t,n){"use strict";var r="3.4.0",o="web";t.exports={ANALYTICS_REQUEST_TIMEOUT_MS:2e3,INTEGRATION_TIMEOUT_MS:6e4,VERSION:r,INTEGRATION:"custom",SOURCE:"client",PLATFORM:o,BRAINTREE_LIBRARY_VERSION:"braintree/"+o+"/"+r}},{}],15:[function(e,t,n){"use strict";function r(e){return/^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)}function o(e){var t=e.split("_"),n=t[0],r=t.slice(2).join("_");return{merchantId:r,environment:n}}function i(e){var t,n,i={attrs:{},configUrl:""};return r(e)?(n=o(e),i.attrs.tokenizationKey=e,i.configUrl=s[n.environment]+"/merchants/"+n.merchantId+"/client_api/v1/configuration"):(t=JSON.parse(a(e)),i.attrs.authorizationFingerprint=t.authorizationFingerprint,i.configUrl=t.configUrl),i}var a=e("../lib/polyfill").atob,s={production:"https://api.braintreegateway.com:443",sandbox:"https://api.sandbox.braintreegateway.com:443"};t.exports=i},{"../lib/polyfill":22}],16:[function(e,t,n){"use strict";t.exports=function(e){return function(){var t=arguments;setTimeout(function(){e.apply(null,t)},1)}}},{}],17:[function(e,t,n){"use strict";function r(e,t){return t=null==t?"":t,e.reduce(function(e,n){return e[n]=t+n,e},{})}t.exports=r},{}],18:[function(e,t,n){"use strict";function r(e){if(!r.types.hasOwnProperty(e.type))throw new Error(e.type+" is not a valid type.");if(!e.code)throw new Error("Error code required.");if(!e.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=e.code,this.message=e.message,this.type=e.type,this.details=e.details}var o=e("./enumerate");r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.types=o(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),t.exports=r},{"./enumerate":17}],19:[function(e,t,n){"use strict";function r(e){return e.split(".").slice(-2).join(".")}function o(e){var t;return e=e.toLowerCase(),/^https:/.test(e)?(i=i||document.createElement("a"),i.href=e,t=r(i.hostname),a.hasOwnProperty(t)):!1}var i,a={"paypal.com":1,"braintreepayments.com":1,"braintreegateway.com":1};t.exports=o},{}],20:[function(e,t,n){"use strict";t.exports=function(e){return JSON.parse(JSON.stringify(e))}},{}],21:[function(e,t,n){"use strict";function r(e){var t=!1;return function(){t||(t=!0,e.apply(null,arguments))}}t.exports=r},{}],22:[function(e,t,n){(function(e){"use strict";function n(e){var t,n,r,o,i,a,s,u,c=new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"),l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",f="";if(!c.test(e))throw new Error("Non base64 encoded input passed to window.atob polyfill");u=0;do o=l.indexOf(e.charAt(u++)),i=l.indexOf(e.charAt(u++)),a=l.indexOf(e.charAt(u++)),s=l.indexOf(e.charAt(u++)),t=(63&o)<<2|i>>4&3,n=(15&i)<<4|a>>2&15,r=(3&a)<<6|63&s,f+=String.fromCharCode(t)+(n?String.fromCharCode(n):"")+(r?String.fromCharCode(r):"");while(u<e.length);return f}var r="function"==typeof e.atob?e.atob:n;t.exports={atob:r,_atob:n}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],23:[function(e,t,n){(function(e){"use strict";function n(e){var t;for(t in e)if(e.hasOwnProperty(t))return!0;return!1}function r(e){return e&&"object"==typeof e&&"number"==typeof e.length&&"[object Array]"===Object.prototype.toString.call(e)||!1}function o(t){var n,r;return t=t||e.location.href,/\?/.test(t)?(n=t.replace(/#.*$/,"").replace(/^.*\?/,"").split("&"),r=n.reduce(function(e,t){var n=t.split("="),r=decodeURIComponent(n[0]),o=decodeURIComponent(n[1]);return e[r]=o,e},{})):{}}function i(e,t){var n,o,a,s=[];for(a in e)e.hasOwnProperty(a)&&(o=e[a],n=t?r(e)?t+"[]":t+"["+a+"]":a,"object"==typeof o?s.push(i(o,n)):s.push(encodeURIComponent(n)+"="+encodeURIComponent(o)));return s.join("&")}function a(e,t){return e=e||"",null!=t&&"object"==typeof t&&n(t)&&(e+=-1===e.indexOf("?")?"?":"",e+=-1!==e.indexOf("=")?"&":"",e+=i(t)),e}t.exports={parse:o,stringify:i,queryify:a}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],24:[function(e,t,n){"use strict";var r=e("./error"),o=e("../errors");t.exports=function(e,t){if("function"!=typeof e)throw new r({type:o.CALLBACK_REQUIRED.type,code:o.CALLBACK_REQUIRED.code,message:t+" must include a callback function."})}},{"../errors":12,"./error":18}],25:[function(e,t,n){"use strict";function r(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,n="x"===e?t:3&t|8;return n.toString(16)})}t.exports=r},{}]},{},[4])(4)});
