!function i(a,c,u){function s(t,e){if(!c[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(f)return f(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=c[t]={exports:{}};a[t][0].call(o.exports,function(e){return s(a[t][1][e]||e)},o,o.exports,i,a,c,u)}return c[t].exports}for(var f="function"==typeof require&&require,e=0;e<u.length;e++)s(u[e]);return s}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.generateKey=function(){var e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";return Array(16).join().split(",").map(function(){return e.charAt(Math.floor(Math.random()*e.length))}).join("")},n.stringifyObject=function(t){return"?"+Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&")}},{}],2:[function(e,t,n){"use strict";var u=r(e("cookies-js")),s=r(e("./lib/util.js"));function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}var o=window.fathom.q||[],f="",i={trackPageview:function(){""===f&&(e=document.getElementById("fathom-script"),f=e?e.src.replace("tracker.js","collect"):"");var e;if("doNotTrack"in navigator&&"1"===navigator.doNotTrack)return;if("visibilityState"in document&&"prerender"===document.visibilityState)return;var r=location.pathname+location.search,t=document.querySelector('link[rel="canonical"][href]');if(t){var n=document.createElement("a");n.href=t.href,r=n.pathname}var o="";document.referrer.indexOf(location.hostname)<0&&(o=document.referrer);var i=function(){var e=new Date;e.setMinutes(e.getMinutes()-30);var t=u.get("_fathom");if(!t)return d();try{t=JSON.parse(t)}catch(e){return console.error(e),d()}t.lastSeen<+e&&(t.isNewSession=!0);return t}(),a={sid:i.sid,p:r,t:document.title,r:o,u:-1==i.pagesViewed.indexOf(r)?1:0,nv:i.isNewVisitor?1:0,ns:i.isNewSession?1:0},c=document.createElement("img");c.src=f+s.stringifyObject(a),c.addEventListener("load",function(){var e=new Date,t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),24,0,0)),n=Math.round((t-e)/1e3);i.pagesViewed.push(r),i.isNewVisitor=!1,i.isNewSession=!1,i.lastSeen=+new Date,u.set("_fathom",JSON.stringify(i),{expires:n})}),document.body.appendChild(c),window.setTimeout(function(){document.body.removeChild(c)},1e3)},setTrackerUrl:function(e){f=e}};function d(){return{sid:s.generateKey(),isNewVisitor:!0,isNewSession:!0,pagesViewed:[],lastSeen:+new Date}}window.fathom=function(){var e=[].slice.call(arguments),t=e.shift();i[t].apply(this,e)},o.forEach(function(e){return fathom.apply(void 0,e)})},{"./lib/util.js":1,"cookies-js":3}],3:[function(e,r,o){!function(e,a){"use strict";var t=function(e){if("object"!=typeof e.document)throw new Error("Cookies.js requires a `window` with a `document` object");var i=function(e,t,n){return 1===arguments.length?i.get(e):i.set(e,t,n)};return i._document=e.document,i._cacheKeyPrefix="cookey.",i._maxExpireDate=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),i.defaults={path:"/",secure:!1},i.get=function(e){i._cachedDocumentCookie!==i._document.cookie&&i._renewCache();var t=i._cache[i._cacheKeyPrefix+e];return t===a?a:decodeURIComponent(t)},i.set=function(e,t,n){return(n=i._getExtendedOptions(n)).expires=i._getExpiresDate(t===a?-1:n.expires),i._document.cookie=i._generateCookieString(e,t,n),i},i.expire=function(e,t){return i.set(e,a,t)},i._getExtendedOptions=function(e){return{path:e&&e.path||i.defaults.path,domain:e&&e.domain||i.defaults.domain,expires:e&&e.expires||i.defaults.expires,secure:e&&e.secure!==a?e.secure:i.defaults.secure}},i._isValidDate=function(e){return"[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e.getTime())},i._getExpiresDate=function(e,t){if(t=t||new Date,"number"==typeof e?e=e===1/0?i._maxExpireDate:new Date(t.getTime()+1e3*e):"string"==typeof e&&(e=new Date(e)),e&&!i._isValidDate(e))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return e},i._generateCookieString=function(e,t,n){var r=(e=(e=e.replace(/[^#$&+\^`|]/g,encodeURIComponent)).replace(/\(/g,"%28").replace(/\)/g,"%29"))+"="+(t=(t+"").replace(/[^!#$&-+\--:<-\[\]-~]/g,encodeURIComponent));return r+=(n=n||{}).path?";path="+n.path:"",r+=n.domain?";domain="+n.domain:"",r+=n.expires?";expires="+n.expires.toUTCString():"",r+=n.secure?";secure":""},i._getCacheFromString=function(e){for(var t={},n=e?e.split("; "):[],r=0;r<n.length;r++){var o=i._getKeyValuePairFromCookieString(n[r]);t[i._cacheKeyPrefix+o.key]===a&&(t[i._cacheKeyPrefix+o.key]=o.value)}return t},i._getKeyValuePairFromCookieString=function(e){var t=e.indexOf("=");t=t<0?e.length:t;var n,r=e.substr(0,t);try{n=decodeURIComponent(r)}catch(e){console&&"function"==typeof console.error&&console.error('Could not decode cookie with key "'+r+'"',e)}return{key:n,value:e.substr(t+1)}},i._renewCache=function(){i._cache=i._getCacheFromString(i._document.cookie),i._cachedDocumentCookie=i._document.cookie},i._areEnabled=function(){var e="cookies.js",t="1"===i.set(e,1).get(e);return i.expire(e),t},i.enabled=i._areEnabled(),i},n=e&&"object"==typeof e.document?t(e):t;"function"==typeof define&&define.amd?define(function(){return n}):"object"==typeof o?("object"==typeof r&&"object"==typeof r.exports&&(o=r.exports=n),o.Cookies=n):e.Cookies=n}("undefined"==typeof window?this:window)},{}]},{},[2]);