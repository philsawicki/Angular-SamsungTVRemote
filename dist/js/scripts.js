function X2JS(e){"use strict";function t(){void 0===e.escapeMode&&(e.escapeMode=!0),e.attributePrefix=e.attributePrefix||"_",e.arrayAccessForm=e.arrayAccessForm||"none",e.emptyNodeForm=e.emptyNodeForm||"text",void 0===e.enableToStringFunc&&(e.enableToStringFunc=!0),e.arrayAccessFormPaths=e.arrayAccessFormPaths||[],void 0===e.skipEmptyTextNodesForObj&&(e.skipEmptyTextNodesForObj=!0),void 0===e.stripWhitespaces&&(e.stripWhitespaces=!0),e.datetimeAccessFormPaths=e.datetimeAccessFormPaths||[]}function n(){function e(e){var t=String(e);return 1===t.length&&(t="0"+t),t}"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|^\n+|(\s|\n)+$/g,"")}),"function"!=typeof Date.prototype.toISOString&&(Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"."+String((this.getUTCMilliseconds()/1e3).toFixed(3)).slice(2,5)+"Z"})}function o(e){var t=e.localName;return null==t&&(t=e.baseName),(null==t||""==t)&&(t=e.nodeName),t}function r(e){return e.prefix}function a(e){return"string"==typeof e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;"):e}function s(e){return e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#x2F;/g,"/")}function i(t,n,o){switch(e.arrayAccessForm){case"property":t[n+"_asArray"]=t[n]instanceof Array?t[n]:[t[n]]}if(!(t[n]instanceof Array)&&e.arrayAccessFormPaths.length>0){for(var r=0;r<e.arrayAccessFormPaths.length;r++){var a=e.arrayAccessFormPaths[r];if("string"==typeof a){if(a==o)break}else if(a instanceof RegExp){if(a.test(o))break}else if("function"==typeof a&&a(t,n,o))break}r!=e.arrayAccessFormPaths.length&&(t[n]=[t[n]])}}function c(e){var t=e.split(/[-T:+Z]/g),n=new Date(t[0],t[1]-1,t[2]),o=t[5].split(".");if(n.setHours(t[3],t[4],o[0]),o.length>1&&n.setMilliseconds(o[1]),t[6]&&t[7]){var r=60*t[6]+Number(t[7]),a=/\d\d-\d\d:\d\d$/.test(e)?"-":"+";r=0+("-"==a?-1*r:r),n.setMinutes(n.getMinutes()-r-n.getTimezoneOffset())}else-1!==e.indexOf("Z",e.length-1)&&(n=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds())));return n}function l(t,n,o){if(e.datetimeAccessFormPaths.length>0){for(var r=o.split(".#")[0],a=0;a<e.datetimeAccessFormPaths.length;a++){var s=e.datetimeAccessFormPaths[a];if("string"==typeof s){if(s==r)break}else if(s instanceof RegExp){if(s.test(r))break}else if("function"==typeof s&&s(obj,n,r))break}return a!=e.datetimeAccessFormPaths.length?c(t):t}return t}function d(t,n){if(t.nodeType==w.DOCUMENT_NODE){for(var a=new Object,c=t.childNodes,u=0;u<c.length;u++){var m=c.item(u);if(m.nodeType==w.ELEMENT_NODE){var p=o(m);a[p]=d(m,p)}}return a}if(t.nodeType==w.ELEMENT_NODE){var a=new Object;a.__cnt=0;for(var c=t.childNodes,u=0;u<c.length;u++){var m=c.item(u),p=o(m);m.nodeType!=w.COMMENT_NODE&&(a.__cnt++,null==a[p]?(a[p]=d(m,n+"."+p),i(a,p,n+"."+p)):(null!=a[p]&&(a[p]instanceof Array||(a[p]=[a[p]],i(a,p,n+"."+p))),a[p][a[p].length]=d(m,n+"."+p)))}for(var f=0;f<t.attributes.length;f++){var v=t.attributes.item(f);a.__cnt++,a[e.attributePrefix+v.name]=v.value}var g=r(t);return null!=g&&""!=g&&(a.__cnt++,a.__prefix=g),null!=a["#text"]&&(a.__text=a["#text"],a.__text instanceof Array&&(a.__text=a.__text.join("\n")),e.escapeMode&&(a.__text=s(a.__text)),e.stripWhitespaces&&(a.__text=a.__text.trim()),delete a["#text"],"property"==e.arrayAccessForm&&delete a["#text_asArray"],a.__text=l(a.__text,p,n+"."+p)),null!=a["#cdata-section"]&&(a.__cdata=a["#cdata-section"],delete a["#cdata-section"],"property"==e.arrayAccessForm&&delete a["#cdata-section_asArray"]),1==a.__cnt&&null!=a.__text?a=a.__text:0==a.__cnt&&"text"==e.emptyNodeForm?a="":a.__cnt>1&&null!=a.__text&&e.skipEmptyTextNodesForObj&&(e.stripWhitespaces&&""==a.__text||""==a.__text.trim())&&delete a.__text,delete a.__cnt,!e.enableToStringFunc||null==a.__text&&null==a.__cdata||(a.toString=function(){return(null!=this.__text?this.__text:"")+(null!=this.__cdata?this.__cdata:"")}),a}return t.nodeType==w.TEXT_NODE||t.nodeType==w.CDATA_SECTION_NODE?t.nodeValue:void 0}function u(t,n,o,r){var s="<"+(null!=t&&null!=t.__prefix?t.__prefix+":":"")+n;if(null!=o)for(var i=0;i<o.length;i++){var c=o[i],l=t[c];e.escapeMode&&(l=a(l)),s+=" "+c.substr(e.attributePrefix.length)+"='"+l+"'"}return s+=r?"/>":">"}function m(e,t){return"</"+(null!=e.__prefix?e.__prefix+":":"")+t+">"}function p(e,t){return-1!==e.indexOf(t,e.length-t.length)}function f(t,n){return"property"==e.arrayAccessForm&&p(n.toString(),"_asArray")||0==n.toString().indexOf(e.attributePrefix)||0==n.toString().indexOf("__")||t[n]instanceof Function?!0:!1}function v(e){var t=0;if(e instanceof Object)for(var n in e)f(e,n)||t++;return t}function g(t){var n=[];if(t instanceof Object)for(var o in t)-1==o.toString().indexOf("__")&&0==o.toString().indexOf(e.attributePrefix)&&n.push(o);return n}function h(t){var n="";return null!=t.__cdata&&(n+="<![CDATA["+t.__cdata+"]]>"),null!=t.__text&&(n+=e.escapeMode?a(t.__text):t.__text),n}function b(t){var n="";return t instanceof Object?n+=h(t):null!=t&&(n+=e.escapeMode?a(t):t),n}function T(e,t,n){var o="";if(0==e.length)o+=u(e,t,n,!0);else for(var r=0;r<e.length;r++)o+=u(e[r],t,g(e[r]),!1),o+=y(e[r]),o+=m(e[r],t);return o}function y(e){var t="",n=v(e);if(n>0)for(var o in e)if(!f(e,o)){var r=e[o],a=g(r);if(null==r||void 0==r)t+=u(r,o,a,!0);else if(r instanceof Object)if(r instanceof Array)t+=T(r,o,a);else if(r instanceof Date)t+=u(r,o,a,!1),t+=r.toISOString(),t+=m(r,o);else{var s=v(r);s>0||null!=r.__text||null!=r.__cdata?(t+=u(r,o,a,!1),t+=y(r),t+=m(r,o)):t+=u(r,o,a,!0)}else t+=u(r,o,a,!1),t+=b(r),t+=m(r,o)}return t+=b(e)}var C="1.1.5";e=e||{},t(),n();var w={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_NODE:9};this.parseXmlString=function(e){var t=window.ActiveXObject||"ActiveXObject"in window;if(void 0===e)return null;var n;if(window.DOMParser){var o=new window.DOMParser,r=null;if(!t)try{r=o.parseFromString("INVALID","text/xml").childNodes[0].namespaceURI}catch(a){r=null}try{n=o.parseFromString(e,"text/xml"),null!=r&&n.getElementsByTagNameNS(r,"parsererror").length>0&&(n=null)}catch(a){n=null}}else 0==e.indexOf("<?")&&(e=e.substr(e.indexOf("?>")+2)),n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(e);return n},this.asArray=function(e){return e instanceof Array?e:[e]},this.toXmlDateTime=function(e){return e instanceof Date?e.toISOString():"number"==typeof e?new Date(e).toISOString():null},this.asDateTime=function(e){return"string"==typeof e?c(e):e},this.xml2json=function(e){return d(e)},this.xml_str2json=function(e){var t=this.parseXmlString(e);return null!=t?this.xml2json(t):null},this.json2xml_str=function(e){return y(e)},this.json2xml=function(e){var t=this.json2xml_str(e);return this.parseXmlString(t)},this.getVersion=function(){return C}}!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return f({type:C.error,iconClass:v().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=v()),h=e("#"+t.containerId),h.length?h:(n&&(h=u(t)),h)}function o(e,t,n){return f({type:C.info,iconClass:v().iconClasses.info,message:e,optionsOverride:n,title:t})}function r(e){b=e}function a(e,t,n){return f({type:C.success,iconClass:v().iconClasses.success,message:e,optionsOverride:n,title:t})}function s(e,t,n){return f({type:C.warning,iconClass:v().iconClasses.warning,message:e,optionsOverride:n,title:t})}function i(e){var t=v();h||n(t),d(e,t)||l(t)}function c(t){var o=v();return h||n(o),t&&0===e(":focus",t).length?void g(t):void(h.children().length&&h.remove())}function l(t){for(var n=h.children(),o=n.length-1;o>=0;o--)d(e(n[o]),t)}function d(t,n){return t&&0===e(":focus",t).length?(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){g(t)}}),!0):!1}function u(t){return h=e("<div/>").attr("id",t.containerId).addClass(t.positionClass).attr("aria-live","polite").attr("role","alert"),h.appendTo(e(t.target)),h}function m(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body",closeHtml:"<button>&times;</button>",newestOnTop:!0,preventDuplicates:!1,progressBar:!1}}function p(e){b&&b(e)}function f(t){function o(t){return!e(":focus",d).length||t?(clearTimeout(C.intervalId),d[i.hideMethod]({duration:i.hideDuration,easing:i.hideEasing,complete:function(){g(d),i.onHidden&&"hidden"!==w.state&&i.onHidden(),w.state="hidden",w.endTime=new Date,p(w)}})):void 0}function r(){(i.timeOut>0||i.extendedTimeOut>0)&&(l=setTimeout(o,i.extendedTimeOut),C.maxHideTime=parseFloat(i.extendedTimeOut),C.hideEta=(new Date).getTime()+C.maxHideTime)}function a(){clearTimeout(l),C.hideEta=0,d.stop(!0,!0)[i.showMethod]({duration:i.showDuration,easing:i.showEasing})}function s(){var e=(C.hideEta-(new Date).getTime())/C.maxHideTime*100;f.width(e+"%")}var i=v(),c=t.iconClass||i.iconClass;if(i.preventDuplicates){if(t.message===T)return;T=t.message}"undefined"!=typeof t.optionsOverride&&(i=e.extend(i,t.optionsOverride),c=t.optionsOverride.iconClass||c),y++,h=n(i,!0);var l=null,d=e("<div/>"),u=e("<div/>"),m=e("<div/>"),f=e("<div/>"),b=e(i.closeHtml),C={intervalId:null,hideEta:null,maxHideTime:null},w={toastId:y,state:"visible",startTime:new Date,options:i,map:t};return t.iconClass&&d.addClass(i.toastClass).addClass(c),t.title&&(u.append(t.title).addClass(i.titleClass),d.append(u)),t.message&&(m.append(t.message).addClass(i.messageClass),d.append(m)),i.closeButton&&(b.addClass("toast-close-button").attr("role","button"),d.prepend(b)),i.progressBar&&(f.addClass("toast-progress"),d.prepend(f)),d.hide(),i.newestOnTop?h.prepend(d):h.append(d),d[i.showMethod]({duration:i.showDuration,easing:i.showEasing,complete:i.onShown}),i.timeOut>0&&(l=setTimeout(o,i.timeOut),C.maxHideTime=parseFloat(i.timeOut),C.hideEta=(new Date).getTime()+C.maxHideTime,i.progressBar&&(C.intervalId=setInterval(s,10))),d.hover(a,r),!i.onclick&&i.tapToDismiss&&d.click(o),i.closeButton&&b&&b.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),o(!0)}),i.onclick&&d.click(function(){i.onclick(),o()}),p(w),i.debug&&console&&console.log(w),d}function v(){return e.extend({},m(),w.options)}function g(e){h||(h=n()),e.is(":visible")||(e.remove(),e=null,0===h.children().length&&h.remove())}var h,b,T,y=0,C={error:"error",info:"info",success:"success",warning:"warning"},w={clear:i,remove:c,error:t,getContainer:n,info:o,options:{},subscribe:r,success:a,version:"2.1.0",warning:s};return w}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)}),angular.module("smartTVRemote.Controllers",[]),angular.module("smartTVRemote.Directives",[]),angular.module("smartTVRemote.Filters",[]),angular.module("smartTVRemote.Providers",[]),angular.module("smartTVRemote.Services",[]),angular.module("smartTVRemote",["ngRoute","ngAnimate","smartTVRemote.Controllers","smartTVRemote.Directives","smartTVRemote.Services","smartTVRemote.Providers","smartTVRemote.Filters"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/page-home.html",controller:"HomePageController"}).when("/about",{templateUrl:"views/page-about.html",controller:"AboutPageController"}).when("/discovery",{templateUrl:"views/page-discovery.html",controller:"DiscoveryPageController"}).otherwise({redirectTo:"/"})}]).config(["$compileProvider","appConfigProvider",function(e,t){var n=-1!==window.location.href.indexOf("http://localhost:8000/app");e.debugInfoEnabled(!n),n||t.set("APIServer","/")}]).config(function(){String.prototype.format||(String.prototype.format=function(){var e=arguments;return this.replace(/{(\d+)}/g,function(t,n){return"undefined"!=typeof e[n]?e[n]:t})})}).config(function(){"undefined"!=typeof toastr&&(toastr.options={closeButton:!0,closeHtml:'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>',newestOnTop:!1,positionClass:"toast-bottom-left",timeOut:"2000",toastClass:"alert alert-dismissible",iconClasses:{error:"alert-danger",info:"alert-info",success:"alert-success",warning:"alert-warning"}})}).run(["$window","$rootScope",function(e,t){var n=!0;navigator&&navigator.onLine&&(n=navigator.onLine),t.$apply(function(){t.applicationIsOnline=n}),e.addEventListener?(e.addEventListener("online",function(){t.$apply(function(){t.applicationIsOnline=!0})},!1),e.addEventListener("offline",function(){t.$apply(function(){t.applicationIsOnline=!1})},!1)):(document.body.ononline=function(){t.$apply(function(){t.applicationIsOnline=!0})},document.body.onoffline=function(){t.$apply(function(){t.applicationIsOnline=!1})})}]),angular.module("smartTVRemote.Controllers").controller("AboutPageController",["$scope",function(){}]),angular.module("smartTVRemote.Controllers").controller("DiscoveryPageController",["$scope","discoveryService","tvRemoteService","applicationStorageService",function(e,t,n,o){var r=function(){var n=t.getConnectedSamsungSmartTVs();n.then(function(t){e.tvDevices=t},function(t){e.tvDevices=[],console.error(t)})};e.tvDevices=null,r();var a=function(){var n=t.getConnectedDevices();n.then(function(t){e.devices=t},function(t){e.devices=[],console.error(t)})};e.devices=null,a(),e.associatedTVIP=o.getConnectedTVIP(),e.getTVDetails=function(e){if(e.headersParsed&&e.headersParsed.LOCATION){var t=e.headersParsed.LOCATION,o=n.getTVServices(t);o.then(function(e){var o=document.createElement("a");o.href=t;var r=o.hostname,a=o.port,s=e.root.device.serviceList.service.controlURL,i=n.getDTVInformation(r,a,s);i.then(function(e){var t=e.Envelope.Body.GetDTVInformationResponse.DTVInformation;console.log(t)},function(e){console.error(e)})},function(e){console.error(e)})}},e.saveTVIP=function(t){if(t){var n=t.headersParsed.LOCATION,a=document.createElement("a");a.href=n;var s=a.hostname;o.setConnectedTVIP(s),r(),e.getTVDetails(t)}}}]),angular.module("smartTVRemote.Controllers").controller("HomePageController",["$scope","$timeout","tvRemoteService","discoveryService","applicationStorageService",function(e,t,n,o,r){var a=r.getConnectedTVIP();e.tvIPSaved=a?!0:!1;var s=o.getConnectedSamsungSmartTVs();s.then(function(t){var o=t[0];if(o.headersParsed&&o.headersParsed.LOCATION){var r=o.headersParsed.LOCATION,a=n.getTVServices(r);a.then(function(t){e.tvFriendlyName=t.root.device.friendlyName,e.tvModelName=t.root.device.modelName},function(e){console.error(e)})}},function(e){console.error(e)}),t(function(){var t=n.getSmartTVCommands();t.then(function(t){e.supportedCommands=t},function(){e.supportedCommands=[]});var o=n.getVolume(a);o.then(function(e){console.log(e)},function(e){console.log(e)})},100)}]),angular.module("smartTVRemote.Controllers").controller("RouteController",["$scope","$route","$location",function(e,t){e.$on("$routeChangeSuccess",function(){e.controller=t.current.controller})}]),angular.module("smartTVRemote.Controllers").controller("TVCommandController",["$scope","$element","$document","tvRemoteService","applicationStorageService",function(e,t,n,o,r){var a=t.find(".js-remote-command-button"),s=function(t){t.keyCode.toString()===e.keyCode&&(e.executeCommand(),t.preventDefault())};e.executeCommand=function(){var t="undefined"!=typeof a.attr("disabled");if(!t){a.attr("disabled",!0);var n=r.getConnectedTVIP();o.sendRemoteCommand(n,e.command).then(function(t){if(t.success){var n=e.getSuccessMessageForCommand(e.command);"undefined"!=typeof toastr?toastr.success(n):console.log(t)}else"undefined"!=typeof toastr?toastr.error(t.errorMessage):console.error(t)},function(t){var n=e.getErrorMessageForCommand(t);"undefined"!=typeof toastr?toastr.error(n):console.error(t)})["finally"](function(){a.attr("disabled",!1)})}},e.getSuccessMessageForCommand=function(e){var t="<strong>Success!</strong> ";switch(e){case"KEY_VOLUP":t+="Volume raised";break;case"KEY_VOLDOWN":t+="Volume lowered";break;case"KEY_CHUP":t+="Channel Up";break;case"KEY_CHDOWN":t+="Channel Down";break;default:t=""}return t},e.getErrorMessageForCommand=function(e){var t="<strong>Error:</strong> ";return t+=e&&e.message?e.message:JSON.stringify(e)},n.on("keydown",s),e.$on("$destroy",function(){n.off("keydown",s)})}]),angular.module("smartTVRemote.Directives").directive("navigationBar",function(){return{restrict:"E",templateUrl:"views/partial-navigationBar.html",controller:"RouteController"}}),angular.module("smartTVRemote.Directives").directive("tvCommand",function(){return{restrict:"E",scope:{title:"@",ctaTitle:"@",keyboardShortcut:"@",keyCode:"@",command:"@",icon:"@"},templateUrl:"views/partial-tvCommand.html",controller:"TVCommandController"}}),angular.module("smartTVRemote.Providers").provider("appConfig",function(){var e="AngularSamsungTVRemote_localStorage_",t={APIServer:"//localhost:8080/",JSONPTimeout:1e4,JSONTimeout:1e4,StorageKeys:{ConnectedTVIP:e+"connectedTVIP",ConnectedTVMAC:e+"connectedTVMAC"}};return{set:function(e,n){t[e]=n},$get:function(){return t}}}),angular.module("smartTVRemote.Providers").provider("errorMessages",function(){var e={NoData:{Error:"NoData",Message:"No data received"},Timeout:{Error:"Timeout",Message:"Request took longer than {0}ms"},YQL:{Error:"YQLError",Message:'Check "data" for details'}};return{set:function(t,n){e[t]=n},$get:function(){return e}}}),angular.module("smartTVRemote.Providers").factory("XMLToJSON",[function(){return new X2JS}]),angular.module("smartTVRemote.Services").factory("applicationStorageService",["$window","appConfig","storageService",function(e,t,n){var o={},r=function(e){return o[e]},a=function(e,t){o[e]=t},s=function(){var e=t.StorageKeys.ConnectedTVIP,o=r(e);if(o)return o;var a=n.getData(e);return a},i=function(e){var o=t.StorageKeys.ConnectedTVIP;a(o,e),n.setData(o,e)},c=function(){var e=t.StorageKeys.ConnectedTVMAC,o=r(e);if(o)return o;var a=n.getData(e);return a},l=function(e){var o=t.StorageKeys.ConnectedTVMAC;a(o,e),n.setData(o,e)};return{getConnectedTVIP:s,setConnectedTVIP:i,getConnectedTVMAC:c,setConnectedTVMAC:l}}]),angular.module("smartTVRemote.Services").factory("discoveryService",["$q","$http","$timeout","appConfig","errorMessages",function(e,t,n,o,r){var a=o.APIServer,s=function(){var s=e.defer(),i=e.defer(),c=!1,l=void 0,d=a+"api/tv/discovery";return t.get(d,{timeout:i.promise,cache:!1}).success(function(e){0===e.length&&s.reject({error:r.NoData.Error,message:r.NoData.Message}),n.cancel(l),i.reject(),s.resolve(e)}).error(function(e){s.reject(c?{error:r.Timeout.Error,message:r.Timeout.Message.format(o.JSONTimeout),data:e}:e)}),l=n(function(){c=!0,i.resolve()},o.JSONTimeout),s.promise},i=function(){var s=e.defer(),i=e.defer(),c=!1,l=void 0,d=a+"api/discovery/all";return t.get(d,{timeout:i.promise,cache:!1}).success(function(e){if(0===e.length)s.reject({error:r.NoData.Error,message:r.NoData.Message});else for(var t=0,o=e.length;o>t;t++){var a=e[t];a.headersFormatted=a.headers.split(String.fromCharCode(13,10))}n.cancel(l),i.reject(),s.resolve(e)}).error(function(e){s.reject(c?{error:r.Timeout.Error,message:r.Timeout.Message.format(o.JSONTimeout),data:e}:e)}),l=n(function(){c=!0,i.resolve()},o.JSONTimeout),s.promise};return{getConnectedSamsungSmartTVs:s,getConnectedDevices:i}}]),angular.module("smartTVRemote.Services").factory("storageService",["$window",function(e){var t=function(t,n){var o=e.localStorage;o&&o.setItem(t,n)},n=function(t){var n=e.localStorage;return n?n.getItem(t):void 0},o=function(t){var n=e.localStorage;n&&n.removeItem(t)},r=function(){var t=e.localStorage;t&&t.clear()};return{setData:t,getData:n,deleteData:o,deleteAllData:r}}]),angular.module("smartTVRemote.Services").factory("tvRemoteService",["$q","$http","$timeout","appConfig","errorMessages","XMLToJSON",function(e,t,n,o,r,a){var s=o.APIServer,i=function(a,i){var c=e.defer(),l=e.defer(),d=!1,u=void 0,m=s+"api/tv/command/"+(null===a||"undefined"==typeof a?"":a+"/")+i;return t.get(m,{timeout:l.promise,cache:!1}).success(function(e){0===e.length&&c.reject({error:r.NoData.Error,message:r.NoData.Message}),n.cancel(u),l.reject(),c.resolve(e)}).error(function(e){c.reject(d?{error:r.Timeout.Error,message:r.Timeout.Message.format(o.JSONTimeout),data:e}:e)}),u=n(function(){d=!0,l.resolve()},o.JSONTimeout),c.promise},c=function(){var a=e.defer(),i=e.defer(),c=!1,l=void 0,d=s+"api/tv/commands";return t.get(d,{timeout:i.promise,cache:!1}).success(function(e){0===e.length&&a.reject({error:r.NoData.Error,message:r.NoData.Message}),n.cancel(l),i.reject(),a.resolve(e)}).error(function(e){a.reject(c?{error:r.Timeout.Error,message:r.Timeout.Message.format(o.JSONTimeout),data:e}:e)}),l=n(function(){c=!0,i.resolve()},o.JSONTimeout),a.promise},l=function(i){var c=e.defer(),l=e.defer(),d=!1,u=void 0,m=s+"api/tv/details/"+encodeURIComponent(i);return t.get(m,{timeout:l.promise,cache:!1,transformResponse:function(e){var t=a.xml_str2json(e);return t}}).success(function(e){0===e.length&&c.reject({error:r.NoData.Error,message:r.NoData.Message}),n.cancel(u),l.reject(),c.resolve(e)}).error(function(e){c.reject(d?{error:r.Timeout.Error,message:r.Timeout.Message.format(o.JSONTimeout),data:e}:e)}),u=n(function(){d=!0,l.resolve()},o.JSONTimeout),c.promise},d=function(i,c,l){var d=e.defer(),u=e.defer(),m=!1,p=void 0,f=s+"api/tv/GetDTVInformation/"+encodeURIComponent(i)+"/"+encodeURIComponent(c)+"/"+encodeURIComponent(l);return t.get(f,{timeout:u.promise,cache:!1,transformResponse:function(e){var t=a.xml_str2json(e);return t}}).success(function(e){e||d.reject({error:r.NoData.Error,message:r.NoData.Message}),n.cancel(p),u.reject(),d.resolve(e)}).error(function(e){d.reject(m?{error:r.Timeout.Error,message:r.Timeout.Message.format(o.JSONTimeout),data:e}:e)}),p=n(function(){m=!0,u.resolve()},o.JSONTimeout),d.promise},u=function(a){var i=e.defer(),c=e.defer(),l=!1,d=void 0,u=s+"api/tv/GetVolume/"+(null===a||"undefined"==typeof a?"":a);return t.get(u,{timeout:c.promise,cache:!1}).success(function(e){0===e.length&&i.reject({error:r.NoData.Error,message:r.NoData.Message}),n.cancel(d),c.reject(),i.resolve(e)}).error(function(e){i.reject(l?{error:r.Timeout.Error,message:r.Timeout.Message.format(o.JSONTimeout),data:e}:e)}),d=n(function(){l=!0,c.resolve()},o.JSONTimeout),i.promise};return{sendRemoteCommand:i,getSmartTVCommands:c,getTVServices:l,getDTVInformation:d,getVolume:u}}]),angular.module("smartTVRemote").run(["$templateCache",function(e){e.put("views/index.html",'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content><meta name="author" content><link rel="icon" href="http://getbootstrap.com/favicon.ico"><title>SmartTV Web Remote Demo</title><link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"><link rel="stylesheet" type="text/css" href="//getbootstrap.com/examples/jumbotron/jumbotron.css"><style type="text/css">\n    	#successInfobox,\n    	#errorInfobox {\n    		display: none;\n    	}\n    </style><script src="//getbootstrap.com/assets/js/ie-emulation-modes-warning.js"></script></head><body><nav class="navbar navbar-inverse navbar-fixed-top"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#">SmartTV Web Remote</a></div></div></nav><div class="jumbotron"><div class="container"><h1>SmartTV Web Remote</h1><p>This is a (crude) demo to showcase the ability to control a SmartTV through a simple web interface.</p><p><a class="btn btn-primary btn-lg" href="https://github.com/philsawicki/Angular-SamsungTVRemote" role="button">Learn more &raquo;</a></p></div></div><div class="container"><div class="row text-center"><div class="col-md-3"><h2>Volume Up</h2><p>Or &uparrow; on keyboard</p><p><a class="btn btn-primary" href="javascript:;" role="button" id="volumeUp">Volume Up &raquo;</a></p></div><div class="col-md-3"><h2>Volume Down</h2><p>Or &downarrow; on keyboard</p><p><a class="btn btn-primary" href="javascript:;" role="button" id="volumeDown">Volume Down &raquo;</a></p></div><div class="col-md-3"><h2>Channel Up</h2><p>Or &rightarrow; on keyboard</p><p><a class="btn btn-primary" href="javascript:;" role="button" id="channelUp">Channel Up &raquo;</a></p></div><div class="col-md-3"><h2>Channel Down</h2><p>Or &leftarrow; on keyboard</p><p><a class="btn btn-primary" href="javascript:;" role="button" id="channelDown">Channel Down &raquo;</a></p></div></div><div id="successInfobox" class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Success!</strong> <span class="message"></span></div><div id="errorInfobox" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Warning!</strong> <span class="message"></span></div><hr><footer><p>&copy; <a href="http://philippesawicki.com" rel="me">Philippe Sawicki</a> 2014-2015</p></footer></div><script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script><script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script><script src="//getbootstrap.com/assets/js/ie10-viewport-bug-workaround.js"></script><script type="text/javascript">\n		jQuery(document).ready(function ($) {\n			var successInfobox = $(\'#successInfobox\'),\n			    errorInfobox = $(\'#errorInfobox\');\n\n			/**\n			 * Mediator to wrap actions between the Web Interface and the SmartTV.\n			 * @type {Object}\n			 */\n			var remoteMediator = {\n				execute: function (options) {\n					options.url = options.url || \'/api/tv/KEY_VOLDOWN\';\n					options.elementToDisable = options.elementToDisable || \'\';\n\n					$(options.elementToDisable).prop(\'disabled\', true);\n\n					$.ajax({\n						url: options.url,\n						success: function (data) {\n							if (data.success) {\n								successInfobox.find(\'.message\').text(data.message);\n								successInfobox.show();\n								errorInfobox.hide();\n\n								console.log(data);\n							} else {\n								errorInfobox.find(\'.message\').text(data.errorMessage);\n								errorInfobox.show();\n								successInfobox.hide();\n\n								console.error(data.errorMessage);\n							}\n\n							$(options.elementToDisable).prop(\'disabled\', false);\n						},\n						error: function (err) {\n							errorInfobox.find(\'.message\').text( JSON.stringify(err) );\n							errorInfobox.show();\n							successInfobox.hide();\n\n							console.error(err);\n							$(options.elementToDisable).prop(\'disabled\', false);\n						}\n					})\n				}\n			};\n\n			/**\n			 * Actions to execute on the remote.\n			 * @type {Object}\n			 */\n			var remoteActions = {\n				/**\n				 * Extremely basic handler for the "Volume Up" button.\n				 * @return {void}\n				 */\n				volumeUpCallback: function () {\n					remoteMediator.execute({\n						url: \'/api/tv/command/KEY_VOLUP\',\n						elementToDisable: \'#volumeUp\'\n					});\n				},\n\n				/**\n				 * Extremely basic handler for the "Volume Down" button.\n				 * @return {void}\n				 */\n				volumeDownCallback: function () {\n					remoteMediator.execute({\n						url: \'/api/tv/command/KEY_VOLDOWN\',\n						elementToDisable: \'#volumeDown\'\n					});\n				},\n\n				/**\n				 * Extremely basic handler for the "Channel Up" button.\n				 * @return {void}\n				 */\n				channelUpCallback: function () {\n					remoteMediator.execute({\n						url: \'/api/tv/command/KEY_CHUP\',\n						elementToDisable: \'#channelUp\'\n					});\n				},\n\n				/**\n				 * Extremely basic handler for the "Channel Down" button.\n				 * @return {void}\n				 */\n				channelDownCallback: function () {\n					remoteMediator.execute({\n						url: \'/api/tv/command/KEY_CHDOWN\',\n						elementToDisable: \'#channelDown\'\n					});\n				}\n			};\n\n\n			// Register callbacks for CTA button clicks:\n			$(\'#volumeUp\').on(\'click\', remoteActions.volumeUpCallback);\n			$(\'#volumeDown\').on(\'click\', remoteActions.volumeDownCallback);\n			$(\'#channelUp\').on(\'click\', remoteActions.channelUpCallback);\n			$(\'#channelDown\').on(\'click\', remoteActions.channelDownCallback);\n\n			// Register callbacks for keypress events:\n			$(\'html\').keydown(function (event) {\n				switch (event.keyCode) {\n					// Up arrow:\n					case 38:\n						remoteActions.volumeUpCallback();\n						break;\n\n					// Down arrow:\n					case 40:\n						remoteActions.volumeDownCallback();\n						break;\n\n					// Left arrow:\n					case 37:\n						remoteActions.channelDownCallback();\n						break;\n\n					// Right arrow:\n					case 39:\n						remoteActions.channelUpCallback();\n						break;\n				}\n			});\n		});\n	</script></body></html>'),e.put("views/page-about.html","<h1>About</h1><div>About Page for <em>SmartTV Remote</em></div>"),e.put("views/page-discovery.html",'<h1>Discovery</h1><div>Discovery Page for <em>SmartTV Remote</em></div><div class="page-header"><h2><span class="glyphicon glyphicon-film"></span> Connected TVs</h2></div><table class="table table-striped"><thead><tr><th>#</th><th>Headers</th></tr></thead><tbody><tr ng-repeat="tvDevice in tvDevices" ng-class="{ success: tvDevice.headersParsed[\'LOCATION\'].indexOf(associatedTVIP) !== -1 }"><th scope="row">{{ ($index + 1) }}</th><td ng-click="saveTVIP(tvDevice)">{{ tvDevice.headers }}</td></tr><tr ng-show="tvDevices === null"><td colspan="2" class="text-center"><strong>Scanning network...</strong></td></tr><tr ng-show="tvDevices.length === 0"><td colspan="2" class="text-center"><strong>No TV found.</strong></td></tr></tbody></table><div class="page-header"><h2><span class="glyphicon glyphicon-transfer"></span> Connected Devices</h2></div><table class="table table-striped"><thead><tr><th>#</th><th>Headers</th></tr></thead><tbody><tr ng-repeat="device in devices"><th scope="row">{{ ::($index + 1) }}</th><td>{{ ::device.headers }}</td></tr><tr ng-show="devices === null"><td colspan="2" class="text-center"><strong>Scanning network...</strong></td></tr><tr ng-show="devices.length === 0"><td colspan="2" class="text-center"><strong>No device found.</strong></td></tr></tbody></table>'),e.put("views/page-home.html",'<div class="page-header"><h1>TV Remote Demo <small ng-bind-template="{{ ::tvFriendlyName }} {{ ::tvModelName }}"></small></h1></div><div class="alert alert-warning fade-in fade-out ng-cloak" role="alert" ng-hide="tvIPSaved"><strong>TV not connected.</strong> You have not connected with a SmartTV yet. Check the <a href="#/discovery" class="alert-link">Discovery page</a> to associate with a device.</div><div class="row text-center"><div class="col-xs-6 col-sm-3 col-md-3"><tv-command title="Volume Up" cta-title="Volume Up" keyboard-shortcut="&uparrow;" key-code="38" command="KEY_VOLUP" icon="glyphicon-volume-down"></tv-command></div><div class="col-xs-6 col-sm-3 col-md-3"><tv-command title="Volume Down" cta-title="Volume Down" keyboard-shortcut="&downarrow;" key-code="40" command="KEY_VOLDOWN" icon="glyphicon-volume-up"></tv-command></div><div class="col-xs-6 col-sm-3 col-md-3"><tv-command title="Channel Up" cta-title="Channel Up" keyboard-shortcut="&rightarrow;" key-code="39" command="KEY_CHUP" icon="glyphicon-step-backward"></tv-command></div><div class="col-xs-6 col-sm-3 col-md-3"><tv-command title="Channel Down" cta-title="Channel Down" keyboard-shortcut="&leftarrow;" key-code="37" command="KEY_CHDOWN" icon="glyphicon-step-forward"></tv-command></div></div><div class="row"><div class="col-md-12"><div class="input-group"><select id="commandSelect" class="form-control"><option ng-repeat="supportedCommand in supportedCommands">{{ ::supportedCommand }}</option></select><span class="input-group-btn"><button id="sendCommand" type="submit" class="btn btn-primary">Send Command</button></span></div></div></div>'),e.put("views/partial-navigationBar.html",'<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#/">SmartTV Remote</a></div><div id="navbar" class="navbar-collapse collapse"><ul class="nav navbar-nav"><li class="active" ng-class="{ active: controller == \'HomePageController\' }"><a href="#/">Home</a></li><li ng-class="{ active: controller == \'DiscoveryPageController\' }"><a href="#/discovery">Discovery</a></li><li ng-class="{ active: controller == \'AboutPageController\' }"><a href="#/about">About</a></li><li class="disabled"><a href="#contact">Contact</a></li><li class="dropdown disabled"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a><ul class="dropdown-menu" role="menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li class="dropdown-header">Nav header</li><li><a href="#">Separated link</a></li><li><a href="#">One more separated link</a></li></ul></li></ul></div></div></nav>'),e.put("views/partial-tvCommand.html",'<p><a class="btn btn-block btn-lg btn-primary js-remote-command-button" role="button" ng-click="executeCommand()"><span class="glyphicon {{ ::icon }}"></span> {{ ::ctaTitle }}</a></p><p class="visible-lg-block">Or <kbd>{{ ::keyboardShortcut }}</kbd> on keyboard</p>')
}]);