"use strict";function X2JS(e){function t(){void 0===e.escapeMode&&(e.escapeMode=!0),e.attributePrefix=e.attributePrefix||"_",e.arrayAccessForm=e.arrayAccessForm||"none",e.emptyNodeForm=e.emptyNodeForm||"text",void 0===e.enableToStringFunc&&(e.enableToStringFunc=!0),e.arrayAccessFormPaths=e.arrayAccessFormPaths||[],void 0===e.skipEmptyTextNodesForObj&&(e.skipEmptyTextNodesForObj=!0),void 0===e.stripWhitespaces&&(e.stripWhitespaces=!0),e.datetimeAccessFormPaths=e.datetimeAccessFormPaths||[]}function n(){function e(e){var t=String(e);return 1===t.length&&(t="0"+t),t}"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|^\n+|(\s|\n)+$/g,"")}),"function"!=typeof Date.prototype.toISOString&&(Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"."+String((this.getUTCMilliseconds()/1e3).toFixed(3)).slice(2,5)+"Z"})}function r(e){var t=e.localName;return null==t&&(t=e.baseName),(null==t||""==t)&&(t=e.nodeName),t}function o(e){return e.prefix}function a(e){return"string"==typeof e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;"):e}function s(e){return e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#x2F;/g,"/")}function i(t,n,r){switch(e.arrayAccessForm){case"property":t[n+"_asArray"]=t[n]instanceof Array?t[n]:[t[n]]}if(!(t[n]instanceof Array)&&e.arrayAccessFormPaths.length>0){for(var o=0;o<e.arrayAccessFormPaths.length;o++){var a=e.arrayAccessFormPaths[o];if("string"==typeof a){if(a==r)break}else if(a instanceof RegExp){if(a.test(r))break}else if("function"==typeof a&&a(t,n,r))break}o!=e.arrayAccessFormPaths.length&&(t[n]=[t[n]])}}function c(e){var t=e.split(/[-T:+Z]/g),n=new Date(t[0],t[1]-1,t[2]),r=t[5].split(".");if(n.setHours(t[3],t[4],r[0]),r.length>1&&n.setMilliseconds(r[1]),t[6]&&t[7]){var o=60*t[6]+Number(t[7]),a=/\d\d-\d\d:\d\d$/.test(e)?"-":"+";o=0+("-"==a?-1*o:o),n.setMinutes(n.getMinutes()-o-n.getTimezoneOffset())}else-1!==e.indexOf("Z",e.length-1)&&(n=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds())));return n}function l(t,n,r){if(e.datetimeAccessFormPaths.length>0){for(var o=r.split(".#")[0],a=0;a<e.datetimeAccessFormPaths.length;a++){var s=e.datetimeAccessFormPaths[a];if("string"==typeof s){if(s==o)break}else if(s instanceof RegExp){if(s.test(o))break}else if("function"==typeof s&&s(obj,n,o))break}return a!=e.datetimeAccessFormPaths.length?c(t):t}return t}function m(t,n){if(t.nodeType==x.DOCUMENT_NODE){for(var a=new Object,c=t.childNodes,d=0;d<c.length;d++){var u=c.item(d);if(u.nodeType==x.ELEMENT_NODE){var p=r(u);a[p]=m(u,p)}}return a}if(t.nodeType==x.ELEMENT_NODE){var a=new Object;a.__cnt=0;for(var c=t.childNodes,d=0;d<c.length;d++){var u=c.item(d),p=r(u);u.nodeType!=x.COMMENT_NODE&&(a.__cnt++,null==a[p]?(a[p]=m(u,n+"."+p),i(a,p,n+"."+p)):(null!=a[p]&&(a[p]instanceof Array||(a[p]=[a[p]],i(a,p,n+"."+p))),a[p][a[p].length]=m(u,n+"."+p)))}for(var f=0;f<t.attributes.length;f++){var v=t.attributes.item(f);a.__cnt++,a[e.attributePrefix+v.name]=v.value}var h=o(t);return null!=h&&""!=h&&(a.__cnt++,a.__prefix=h),null!=a["#text"]&&(a.__text=a["#text"],a.__text instanceof Array&&(a.__text=a.__text.join("\n")),e.escapeMode&&(a.__text=s(a.__text)),e.stripWhitespaces&&(a.__text=a.__text.trim()),delete a["#text"],"property"==e.arrayAccessForm&&delete a["#text_asArray"],a.__text=l(a.__text,p,n+"."+p)),null!=a["#cdata-section"]&&(a.__cdata=a["#cdata-section"],delete a["#cdata-section"],"property"==e.arrayAccessForm&&delete a["#cdata-section_asArray"]),1==a.__cnt&&null!=a.__text?a=a.__text:0==a.__cnt&&"text"==e.emptyNodeForm?a="":a.__cnt>1&&null!=a.__text&&e.skipEmptyTextNodesForObj&&(e.stripWhitespaces&&""==a.__text||""==a.__text.trim())&&delete a.__text,delete a.__cnt,!e.enableToStringFunc||null==a.__text&&null==a.__cdata||(a.toString=function(){return(null!=this.__text?this.__text:"")+(null!=this.__cdata?this.__cdata:"")}),a}return t.nodeType==x.TEXT_NODE||t.nodeType==x.CDATA_SECTION_NODE?t.nodeValue:void 0}function d(t,n,r,o){var s="<"+(null!=t&&null!=t.__prefix?t.__prefix+":":"")+n;if(null!=r)for(var i=0;i<r.length;i++){var c=r[i],l=t[c];e.escapeMode&&(l=a(l)),s+=" "+c.substr(e.attributePrefix.length)+"='"+l+"'"}return s+=o?"/>":">"}function u(e,t){return"</"+(null!=e.__prefix?e.__prefix+":":"")+t+">"}function p(e,t){return-1!==e.indexOf(t,e.length-t.length)}function f(t,n){return"property"==e.arrayAccessForm&&p(n.toString(),"_asArray")||0==n.toString().indexOf(e.attributePrefix)||0==n.toString().indexOf("__")||t[n]instanceof Function?!0:!1}function v(e){var t=0;if(e instanceof Object)for(var n in e)f(e,n)||t++;return t}function h(t){var n=[];if(t instanceof Object)for(var r in t)-1==r.toString().indexOf("__")&&0==r.toString().indexOf(e.attributePrefix)&&n.push(r);return n}function g(t){var n="";return null!=t.__cdata&&(n+="<![CDATA["+t.__cdata+"]]>"),null!=t.__text&&(n+=e.escapeMode?a(t.__text):t.__text),n}function b(t){var n="";return t instanceof Object?n+=g(t):null!=t&&(n+=e.escapeMode?a(t):t),n}function y(e,t,n){var r="";if(0==e.length)r+=d(e,t,n,!0);else for(var o=0;o<e.length;o++)r+=d(e[o],t,h(e[o]),!1),r+=T(e[o]),r+=u(e[o],t);return r}function T(e){var t="",n=v(e);if(n>0)for(var r in e)if(!f(e,r)){var o=e[r],a=h(o);if(null==o||void 0==o)t+=d(o,r,a,!0);else if(o instanceof Object)if(o instanceof Array)t+=y(o,r,a);else if(o instanceof Date)t+=d(o,r,a,!1),t+=o.toISOString(),t+=u(o,r);else{var s=v(o);s>0||null!=o.__text||null!=o.__cdata?(t+=d(o,r,a,!1),t+=T(o),t+=u(o,r)):t+=d(o,r,a,!0)}else t+=d(o,r,a,!1),t+=b(o),t+=u(o,r)}return t+=b(e)}var C="1.1.5";e=e||{},t(),n();var x={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_NODE:9};this.parseXmlString=function(e){var t=window.ActiveXObject||"ActiveXObject"in window;if(void 0===e)return null;var n;if(window.DOMParser){var r=new window.DOMParser,o=null;if(!t)try{o=r.parseFromString("INVALID","text/xml").childNodes[0].namespaceURI}catch(a){o=null}try{n=r.parseFromString(e,"text/xml"),null!=o&&n.getElementsByTagNameNS(o,"parsererror").length>0&&(n=null)}catch(a){n=null}}else 0==e.indexOf("<?")&&(e=e.substr(e.indexOf("?>")+2)),n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(e);return n},this.asArray=function(e){return e instanceof Array?e:[e]},this.toXmlDateTime=function(e){return e instanceof Date?e.toISOString():"number"==typeof e?new Date(e).toISOString():null},this.asDateTime=function(e){return"string"==typeof e?c(e):e},this.xml2json=function(e){return m(e)},this.xml_str2json=function(e){var t=this.parseXmlString(e);return null!=t?this.xml2json(t):null},this.json2xml_str=function(e){return T(e)},this.json2xml=function(e){var t=this.json2xml_str(e);return this.parseXmlString(t)},this.getVersion=function(){return C}}angular.module("smartTVRemote.Controllers",[]),angular.module("smartTVRemote.Directives",[]),angular.module("smartTVRemote.Filters",[]),angular.module("smartTVRemote.Providers",[]),angular.module("smartTVRemote.Services",[]),angular.module("smartTVRemote",["ngRoute","ngAnimate","smartTVRemote.Controllers","smartTVRemote.Directives","smartTVRemote.Services","smartTVRemote.Providers","smartTVRemote.Filters"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/page-home.html",controller:"HomePageController"}).when("/about",{templateUrl:"views/page-about.html",controller:"AboutPageController"}).when("/discovery",{templateUrl:"views/page-discovery.html",controller:"DiscoveryPageController"}).otherwise({redirectTo:"/"})}]).config(["$compileProvider",function(e){var t=-1!==window.location.href.indexOf("http://localhost:8000/app");e.debugInfoEnabled(!t)}]).config(function(){String.prototype.format||(String.prototype.format=function(){var e=arguments;return this.replace(/{(\d+)}/g,function(t,n){return"undefined"!=typeof e[n]?e[n]:t})})}).run(["$window","$rootScope",function(e,t){var n=!0;navigator&&navigator.onLine&&(n=navigator.onLine),t.$apply(function(){t.applicationIsOnline=n}),e.addEventListener?(e.addEventListener("online",function(){t.$apply(function(){t.applicationIsOnline=!0})},!1),e.addEventListener("offline",function(){t.$apply(function(){t.applicationIsOnline=!1})},!1)):(document.body.ononline=function(){t.$apply(function(){t.applicationIsOnline=!0})},document.body.onoffline=function(){t.$apply(function(){t.applicationIsOnline=!1})})}]),angular.module("smartTVRemote.Controllers").controller("AboutPageController",["$scope",function(){}]),angular.module("smartTVRemote.Controllers").controller("DiscoveryPageController",["$scope","discoveryService","tvRemoteService",function(e,t,n){var r=t.getConnectedSamsungSmartTVs();r.then(function(t){e.tvDevices=t},function(e){console.error(e)});var o=t.getConnectedDevices();o.then(function(t){e.devices=t},function(e){console.error(e)}),e.getTVDetails=function(e){if(e.headersParsed&&e.headersParsed.LOCATION){var t=e.headersParsed.LOCATION,r=n.getTVServices(t);r.then(function(e){var r=document.createElement("a");r.href=t;var o=r.hostname,a=r.port,s=e.root.device.serviceList.service.controlURL,i=n.getDTVInformation(o,a,s);i.then(function(e){var t=e.Envelope.Body.GetDTVInformationResponse.DTVInformation;console.log(t)},function(e){console.error(e)})},function(e){console.error(e)})}}}]),angular.module("smartTVRemote.Controllers").controller("HomePageController",["$scope","$timeout","tvRemoteService",function(e,t,n){t(function(){var t=n.getSmartTVCommands();t.then(function(t){e.supportedCommands=t},function(){e.supportedCommands=[]})},100)}]),angular.module("smartTVRemote.Controllers").controller("RouteController",["$scope","$route","$location",function(e,t){e.$on("$routeChangeSuccess",function(){e.controller=t.current.controller})}]),angular.module("smartTVRemote.Controllers").controller("TVCommandController",["$scope","$element","$document","tvRemoteService",function(e,t,n,r){var o=$("#successInfobox"),a=$("#errorInfobox"),s=t.find(".js-remote-command-button"),i=function(t){t.keyCode.toString()===e.keyCode&&(e.executeCommand(),t.preventDefault())};e.executeCommand=function(){s.prop("disabled",!1),r.sendRemoteCommand(void 0,e.command).then(function(e){e.success?(o.find(".message").text(e.message),o.show(),a.hide(),console.log(e)):(a.find(".message").text(e.errorMessage),a.show(),o.hide(),console.error(e.errorMessage)),s.prop("disabled",!1)},function(){a.find(".message").text(JSON.stringify(err)),a.show(),o.hide(),console.error(err),s.prop("disabled",!1)})},n.on("keydown",i),e.$on("$destroy",function(){n.off("keydown",i)})}]),angular.module("smartTVRemote.Directives").directive("navigationBar",function(){return{restrict:"E",templateUrl:"views/partial-navigationBar.html",controller:"RouteController"}}),angular.module("smartTVRemote.Directives").directive("tvCommand",function(){return{restrict:"E",scope:{title:"@",ctaTitle:"@",keyboardShortcut:"@",keyCode:"@",command:"@"},templateUrl:"views/partial-tvCommand.html",controller:"TVCommandController"}}),angular.module("smartTVRemote.Providers").provider("appConfig",function(){var e="AngularSamsungTVRemote_localStorage_",t={JSONPTimeout:1e4,JSONTimeout:1e4,StorageKeys:{ConnectedTVIP:e+"connectedTVIP",ConnectedTVMAC:e+"connectedTVMAC"}};return{set:function(e,n){t[e]=n},$get:function(){return t}}}),angular.module("smartTVRemote.Providers").provider("errorMessages",function(){var e={NoData:{Error:"NoData",Message:"No data received"},Timeout:{Error:"Timeout",Message:"Request took longer than {0}ms"},YQL:{Error:"YQLError",Message:'Check "data" for details'}};return{set:function(t,n){e[t]=n},$get:function(){return e}}}),angular.module("smartTVRemote.Providers").factory("XMLToJSON",[function(){return new X2JS}]),angular.module("smartTVRemote.Services").factory("applicationStorageService",["$window","appConfig","storageService",function(e,t,n){var r={},o=function(e){return r[e]},a=function(e,t){r[e]=t},s=function(){var e=t.StorageKeys.ConnectedTVIP,r=o(e);if(r)return r;var a=n.getData(e);return a},i=function(e){var r=t.StorageKeys.ConnectedTVIP;a(r,e),n.setData(r,e)},c=function(){var e=t.StorageKeys.ConnectedTVMAC,r=o(e);if(r)return r;var a=n.getData(e);return a},l=function(e){var r=t.StorageKeys.ConnectedTVMAC;a(r,e),n.setData(r,e)};return{getConnectedTVIP:s,setConnectedTVIP:i,getConnectedTVMAC:c,setConnectedTVMAC:l}}]),angular.module("smartTVRemote.Services").factory("discoveryService",["$q","$http","$timeout","appConfig","errorMessages",function(e,t,n,r,o){var a=function(){var a=e.defer(),s=e.defer(),i=!1,c=void 0,l="//localhost:8080/api/tv/discovery";return t.get(l,{timeout:s.promise,cache:!1}).success(function(e){0===e.length&&a.reject({error:o.NoData.Error,message:o.NoData.Message}),n.cancel(c),s.reject(),a.resolve(e)}).error(function(e){a.reject(i?{error:o.Timeout.Error,message:o.Timeout.Message.format(r.JSONTimeout),data:e}:e)}),c=n(function(){i=!0,s.resolve()},r.JSONTimeout),a.promise},s=function(){var a=e.defer(),s=e.defer(),i=!1,c=void 0,l="//localhost:8080/api/discovery/all";return t.get(l,{timeout:s.promise,cache:!1}).success(function(e){if(0===e.length)a.reject({error:o.NoData.Error,message:o.NoData.Message});else for(var t=0,r=e.length;r>t;t++){var i=e[t];i.headersFormatted=i.headers.split(String.fromCharCode(13,10))}n.cancel(c),s.reject(),a.resolve(e)}).error(function(e){a.reject(i?{error:o.Timeout.Error,message:o.Timeout.Message.format(r.JSONTimeout),data:e}:e)}),c=n(function(){i=!0,s.resolve()},r.JSONTimeout),a.promise};return{getConnectedSamsungSmartTVs:a,getConnectedDevices:s}}]),angular.module("smartTVRemote.Services").factory("storageService",["$window",function(e){var t=function(t,n){var r=e.localStorage;r&&r.setItem(t,n)},n=function(t){var n=e.localStorage;return n?n.getItem(t):void 0},r=function(t){var n=e.localStorage;n&&n.removeItem(t)},o=function(){var t=e.localStorage;t&&t.clear()};return{setData:t,getData:n,deleteData:r,deleteAllData:o}}]),angular.module("smartTVRemote.Services").factory("tvRemoteService",["$q","$http","$timeout","appConfig","errorMessages","XMLToJSON",function(e,t,n,r,o,a){var s=function(a,s){var i=e.defer(),c=e.defer(),l=!1,m=void 0,d="//localhost:8080/api/tv/command/"+("undefined"==typeof a?"":a+"/")+s;return t.get(d,{timeout:c.promise,cache:!1}).success(function(e){0===e.length&&i.reject({error:o.NoData.Error,message:o.NoData.Message}),n.cancel(m),c.reject(),i.resolve(e)}).error(function(e){i.reject(l?{error:o.Timeout.Error,message:o.Timeout.Message.format(r.JSONTimeout),data:e}:e)}),m=n(function(){l=!0,c.resolve()},r.JSONTimeout),i.promise},i=function(){var a=e.defer(),s=e.defer(),i=!1,c=void 0,l="//localhost:8080/api/tv/commands";return t.get(l,{timeout:s.promise,cache:!1}).success(function(e){0===e.length&&a.reject({error:o.NoData.Error,message:o.NoData.Message}),n.cancel(c),s.reject(),a.resolve(e)}).error(function(e){a.reject(i?{error:o.Timeout.Error,message:o.Timeout.Message.format(r.JSONTimeout),data:e}:e)}),c=n(function(){i=!0,s.resolve()},r.JSONTimeout),a.promise},c=function(s){var i=e.defer(),c=e.defer(),l=!1,m=void 0,d="//localhost:8080/api/tv/details/"+encodeURIComponent(s);return t.get(d,{timeout:c.promise,cache:!1,transformResponse:function(e){var t=a.xml_str2json(e);return t}}).success(function(e){if(0===e.length)i.reject({error:o.NoData.Error,message:o.NoData.Message});else for(var t=0,r=e.length;r>t;t++){var a=e[t];if(a.headersParsed&&a.headersParsed.LOCATION){var s=a.headersParsed.LOCATION;console.log("LOCATION",s)}}n.cancel(m),c.reject(),i.resolve(e)}).error(function(e){i.reject(l?{error:o.Timeout.Error,message:o.Timeout.Message.format(r.JSONTimeout),data:e}:e)}),m=n(function(){l=!0,c.resolve()},r.JSONTimeout),i.promise},l=function(s,i,c){var l=e.defer(),m=e.defer(),d=!1,u=void 0,p="//localhost:8080/api/tv/GetDTVInformation/"+encodeURIComponent(s)+"/"+encodeURIComponent(i)+"/"+encodeURIComponent(c);return t.get(p,{timeout:m.promise,cache:!1,transformResponse:function(e){var t=a.xml_str2json(e);return t}}).success(function(e){e||l.reject({error:o.NoData.Error,message:o.NoData.Message}),n.cancel(u),m.reject(),l.resolve(e)}).error(function(e){l.reject(d?{error:o.Timeout.Error,message:o.Timeout.Message.format(r.JSONTimeout),data:e}:e)}),u=n(function(){d=!0,m.resolve()},r.JSONTimeout),l.promise};return{sendRemoteCommand:s,getSmartTVCommands:i,getTVServices:c,getDTVInformation:l}}]),angular.module("smartTVRemote").run(["$templateCache",function(e){e.put("views/index.html",'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content><meta name="author" content><link rel="icon" href="http://getbootstrap.com/favicon.ico"><title>SmartTV Web Remote Demo</title><link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"><link rel="stylesheet" type="text/css" href="//getbootstrap.com/examples/jumbotron/jumbotron.css"><style type="text/css">\n    	#successInfobox,\n    	#errorInfobox {\n    		display: none;\n    	}\n    </style><script src="//getbootstrap.com/assets/js/ie-emulation-modes-warning.js"></script></head><body><nav class="navbar navbar-inverse navbar-fixed-top"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#">SmartTV Web Remote</a></div></div></nav><div class="jumbotron"><div class="container"><h1>SmartTV Web Remote</h1><p>This is a (crude) demo to showcase the ability to control a SmartTV through a simple web interface.</p><p><a class="btn btn-primary btn-lg" href="https://github.com/philsawicki/Angular-SamsungTVRemote" role="button">Learn more &raquo;</a></p></div></div><div class="container"><div class="row text-center"><div class="col-md-3"><h2>Volume Up</h2><p>Or &uparrow; on keyboard</p><p><a class="btn btn-primary" href="javascript:;" role="button" id="volumeUp">Volume Up &raquo;</a></p></div><div class="col-md-3"><h2>Volume Down</h2><p>Or &downarrow; on keyboard</p><p><a class="btn btn-primary" href="javascript:;" role="button" id="volumeDown">Volume Down &raquo;</a></p></div><div class="col-md-3"><h2>Channel Up</h2><p>Or &rightarrow; on keyboard</p><p><a class="btn btn-primary" href="javascript:;" role="button" id="channelUp">Channel Up &raquo;</a></p></div><div class="col-md-3"><h2>Channel Down</h2><p>Or &leftarrow; on keyboard</p><p><a class="btn btn-primary" href="javascript:;" role="button" id="channelDown">Channel Down &raquo;</a></p></div></div><div id="successInfobox" class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Success!</strong> <span class="message"></span></div><div id="errorInfobox" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Warning!</strong> <span class="message"></span></div><hr><footer><p>&copy; <a href="http://philippesawicki.com" rel="me">Philippe Sawicki</a> 2014-2015</p></footer></div><script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script><script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script><script src="//getbootstrap.com/assets/js/ie10-viewport-bug-workaround.js"></script><script type="text/javascript">\n		jQuery(document).ready(function ($) {\n			var successInfobox = $(\'#successInfobox\'),\n			    errorInfobox = $(\'#errorInfobox\');\n\n			/**\n			 * Mediator to wrap actions between the Web Interface and the SmartTV.\n			 * @type {Object}\n			 */\n			var remoteMediator = {\n				execute: function (options) {\n					options.url = options.url || \'/api/tv/KEY_VOLDOWN\';\n					options.elementToDisable = options.elementToDisable || \'\';\n\n					$(options.elementToDisable).prop(\'disabled\', true);\n\n					$.ajax({\n						url: options.url,\n						success: function (data) {\n							if (data.success) {\n								successInfobox.find(\'.message\').text(data.message);\n								successInfobox.show();\n								errorInfobox.hide();\n\n								console.log(data);\n							} else {\n								errorInfobox.find(\'.message\').text(data.errorMessage);\n								errorInfobox.show();\n								successInfobox.hide();\n\n								console.error(data.errorMessage);\n							}\n\n							$(options.elementToDisable).prop(\'disabled\', false);\n						},\n						error: function (err) {\n							errorInfobox.find(\'.message\').text( JSON.stringify(err) );\n							errorInfobox.show();\n							successInfobox.hide();\n\n							console.error(err);\n							$(options.elementToDisable).prop(\'disabled\', false);\n						}\n					})\n				}\n			};\n\n			/**\n			 * Actions to execute on the remote.\n			 * @type {Object}\n			 */\n			var remoteActions = {\n				/**\n				 * Extremely basic handler for the "Volume Up" button.\n				 * @return {void}\n				 */\n				volumeUpCallback: function () {\n					remoteMediator.execute({\n						url: \'/api/tv/command/KEY_VOLUP\',\n						elementToDisable: \'#volumeUp\'\n					});\n				},\n\n				/**\n				 * Extremely basic handler for the "Volume Down" button.\n				 * @return {void}\n				 */\n				volumeDownCallback: function () {\n					remoteMediator.execute({\n						url: \'/api/tv/command/KEY_VOLDOWN\',\n						elementToDisable: \'#volumeDown\'\n					});\n				},\n\n				/**\n				 * Extremely basic handler for the "Channel Up" button.\n				 * @return {void}\n				 */\n				channelUpCallback: function () {\n					remoteMediator.execute({\n						url: \'/api/tv/command/KEY_CHUP\',\n						elementToDisable: \'#channelUp\'\n					});\n				},\n\n				/**\n				 * Extremely basic handler for the "Channel Down" button.\n				 * @return {void}\n				 */\n				channelDownCallback: function () {\n					remoteMediator.execute({\n						url: \'/api/tv/command/KEY_CHDOWN\',\n						elementToDisable: \'#channelDown\'\n					});\n				}\n			};\n\n\n			// Register callbacks for CTA button clicks:\n			$(\'#volumeUp\').on(\'click\', remoteActions.volumeUpCallback);\n			$(\'#volumeDown\').on(\'click\', remoteActions.volumeDownCallback);\n			$(\'#channelUp\').on(\'click\', remoteActions.channelUpCallback);\n			$(\'#channelDown\').on(\'click\', remoteActions.channelDownCallback);\n\n			// Register callbacks for keypress events:\n			$(\'html\').keydown(function (event) {\n				switch (event.keyCode) {\n					// Up arrow:\n					case 38:\n						remoteActions.volumeUpCallback();\n						break;\n\n					// Down arrow:\n					case 40:\n						remoteActions.volumeDownCallback();\n						break;\n\n					// Left arrow:\n					case 37:\n						remoteActions.channelDownCallback();\n						break;\n\n					// Right arrow:\n					case 39:\n						remoteActions.channelUpCallback();\n						break;\n				}\n			});\n		});\n	</script></body></html>'),e.put("views/page-about.html","<h1>About</h1><div>About Page for <em>SmartTV Remote</em></div>"),e.put("views/page-discovery.html",'<h1>Discovery</h1><div>Discovery Page for <em>SmartTV Remote</em></div><div class="page-header"><h2><span class="glyphicon glyphicon-film"></span> Connected TVs</h2></div><table class="table table-striped"><thead><tr><th>#</th><th>Headers</th></tr></thead><tbody><tr ng-repeat="tvDevice in tvDevices"><th scope="row">{{ ::($index + 1) }}</th><td ng-click="getTVDetails(tvDevice)">{{ ::tvDevice.headers }}</td></tr></tbody></table><div class="page-header"><h2><span class="glyphicon glyphicon-transfer"></span> Connected Devices</h2></div><table class="table table-striped"><thead><tr><th>#</th><th>Headers</th></tr></thead><tbody><tr ng-repeat="device in devices"><th scope="row">{{ ::($index + 1) }}</th><td>{{ ::device.headers }}</td></tr></tbody></table>'),e.put("views/page-home.html",'<h1>Home</h1><div>Home Page for <em>SmartTV Remote</em></div><div class="page-header"><h2>TV Remote Demo</h2></div><div class="row text-center"><div class="col-md-3"><tv-command title="Volume Up" cta-title="Volume Up" keyboard-shortcut="&uparrow;" key-code="38" command="KEY_VOLUP"></tv-command></div><div class="col-md-3"><tv-command title="Volume Down" cta-title="Volume Down" keyboard-shortcut="&downarrow;" key-code="40" command="KEY_VOLDOWN"></tv-command></div><div class="col-md-3"><tv-command title="Channel Up" cta-title="Channel Up" keyboard-shortcut="&rightarrow;" key-code="39" command="KEY_CHUP"></tv-command></div><div class="col-md-3"><tv-command title="Channel Down" cta-title="Channel Down" keyboard-shortcut="&leftarrow;" key-code="37" command="KEY_CHDOWN"></tv-command></div><div class="col-md-12"><form class="form-inline"><div class="form-group"><label for="commandSelect">Available Command:</label><select id="commandSelect"><option ng-repeat="supportedCommand in supportedCommands">{{ ::supportedCommand }}</option></select><button id="sendCommand" type="submit" class="btn btn-primary">Send Command</button></div></form></div></div><div id="successInfobox" class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Success!</strong> <span class="message"></span></div><div id="errorInfobox" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Warning!</strong> <span class="message"></span></div><script type="text/javascript">\r\n		jQuery(document).ready(function ($) {\r\n			var successInfobox = $(\'#successInfobox\'),\r\n			    errorInfobox = $(\'#errorInfobox\');\r\n\r\n			/**\r\n			 * Mediator to wrap actions between the Web Interface and the SmartTV.\r\n			 * @type {Object}\r\n			 */\r\n			var remoteMediator = {\r\n				execute: function (options) {\r\n					options.command = options.command || \'KEY_VOLDOWN\';\r\n					options.API_URL = options.API_URL || \'//localhost:8080/api/\';\r\n					options.elementToDisable = options.elementToDisable || undefined;\r\n\r\n					// Build the URL for the given Command:\r\n					var tvIP = undefined;\r\n					var commandAPIURL = options.API_URL\r\n						+ \'tv/command/\'\r\n						+ (typeof tvIP === \'undefined\' ? \'\' : tvIP + \'/\')\r\n						+ options.command;\r\n\r\n					if (options.elementToDisable) {\r\n						$(options.elementToDisable).prop(\'disabled\', true);\r\n					}\r\n\r\n					$.ajax({\r\n						url: commandAPIURL,\r\n						success: function (data) {\r\n							if (data.success) {\r\n								successInfobox.find(\'.message\').text(data.message);\r\n								successInfobox.show();\r\n								errorInfobox.hide();\r\n\r\n								console.log(data);\r\n							} else {\r\n								errorInfobox.find(\'.message\').text(data.errorMessage);\r\n								errorInfobox.show();\r\n								successInfobox.hide();\r\n\r\n								console.error(data.errorMessage);\r\n							}\r\n\r\n							if (options.elementToDisable) {\r\n								$(options.elementToDisable).prop(\'disabled\', false);\r\n							}\r\n						},\r\n						error: function (err) {\r\n							errorInfobox.find(\'.message\').text( JSON.stringify(err) );\r\n							errorInfobox.show();\r\n							successInfobox.hide();\r\n\r\n							console.error(err);\r\n							if (options.elementToDisable) {\r\n								$(options.elementToDisable).prop(\'disabled\', false);\r\n							}\r\n						}\r\n					})\r\n				}\r\n			};\r\n\r\n			/**\r\n			 * Actions to execute on the remote.\r\n			 * @type {Object}\r\n			 */\r\n			var remoteActions = {\r\n				/**\r\n				 * Extremely basic handler for the "Volume Up" button.\r\n				 * @return {void}\r\n				 */\r\n				//volumeUpCallback: function () {\r\n				//	remoteMediator.execute({\r\n				//		command: \'KEY_VOLUP\',\r\n				//		elementToDisable: \'#volumeUp\'\r\n				//	});\r\n				//},\r\n\r\n				/**\r\n				 * Extremely basic handler for the "Volume Down" button.\r\n				 * @return {void}\r\n				 */\r\n				//volumeDownCallback: function () {\r\n				//	remoteMediator.execute({\r\n				//		command: \'KEY_VOLDOWN\',\r\n				//		elementToDisable: \'#volumeDown\'\r\n				//	});\r\n				//},\r\n\r\n				/**\r\n				 * Extremely basic handler for the "Channel Up" button.\r\n				 * @return {void}\r\n				 */\r\n				//channelUpCallback: function () {\r\n				//	remoteMediator.execute({\r\n				//		command: \'KEY_CHUP\',\r\n				//		elementToDisable: \'#channelUp\'\r\n				//	});\r\n				//},\r\n\r\n				/**\r\n				 * Extremely basic handler for the "Channel Down" button.\r\n				 * @return {void}\r\n				 */\r\n				//channelDownCallback: function () {\r\n				//	remoteMediator.execute({\r\n				//		command: \'KEY_CHDOWN\',\r\n				//		elementToDisable: \'#channelDown\'\r\n				//	});\r\n				//},\r\n\r\n				/**\r\n				 * Send a custom Command to the Remote.\r\n				 * @param  {string} command The command to send to the SmartTV.\r\n				 * @return {void}\r\n				 */\r\n				selectedCommandCallback : function (command) {\r\n					remoteMediator.execute({\r\n						command: command\r\n					});\r\n				}\r\n			};\r\n\r\n\r\n			/*\r\n			// Register callbacks for CTA button clicks:\r\n			$(\'#volumeUp\').on(\'click\', remoteActions.volumeUpCallback);\r\n			$(\'#volumeDown\').on(\'click\', remoteActions.volumeDownCallback);\r\n			$(\'#channelUp\').on(\'click\', remoteActions.channelUpCallback);\r\n			$(\'#channelDown\').on(\'click\', remoteActions.channelDownCallback);\r\n			*/\r\n			\r\n			/*\r\n			// Register callbacks for keypress events:\r\n			$(\'html\').keydown(function (event) {\r\n				switch (event.keyCode) {\r\n					// Up arrow:\r\n					case 38:\r\n						remoteActions.volumeUpCallback();\r\n						break;\r\n\r\n					// Down arrow:\r\n					case 40:\r\n						remoteActions.volumeDownCallback();\r\n						break;\r\n\r\n					// Left arrow:\r\n					case 37:\r\n						remoteActions.channelDownCallback();\r\n						break;\r\n\r\n					// Right arrow:\r\n					case 39:\r\n						remoteActions.channelUpCallback();\r\n						break;\r\n				}\r\n			});\r\n			*/\r\n			\r\n			// Register callback for the "Available Commands" select:\r\n			$(\'#sendCommand\').on(\'click\', function (event) {\r\n				var selectedCommand = $(\'#commandSelect\').find(\'option:selected\').val();\r\n				remoteActions.selectedCommandCallback(selectedCommand);\r\n			});\r\n		});\r\n	</script>'),e.put("views/partial-navigationBar.html",'<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#/">SmartTV Remote</a></div><div id="navbar" class="navbar-collapse collapse"><ul class="nav navbar-nav"><li ng-class="{active: controller == \'HomePageController\'}"><a href="#/">Home</a></li><li ng-class="{active: controller == \'DiscoveryPageController\'}"><a href="#/discovery">Discovery</a></li><li ng-class="{active: controller == \'AboutPageController\'}"><a href="#/about">About</a></li><li class="disabled"><a href="#contact">Contact</a></li><li class="dropdown disabled"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a><ul class="dropdown-menu" role="menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li class="dropdown-header">Nav header</li><li><a href="#">Separated link</a></li><li><a href="#">One more separated link</a></li></ul></li></ul></div></div></nav>'),e.put("views/partial-tvCommand.html",'<h2>{{ ::title }}</h2><p>Or {{ ::keyboardShortcut }} on keyboard</p><p><a class="btn btn-primary js-remote-command-button" role="button" ng-click="executeCommand()">{{ ::ctaTitle }} &raquo;</a></p>')
}]);