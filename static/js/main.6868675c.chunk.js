(this["webpackJsonpjackbox-lobbies"]=this["webpackJsonpjackbox-lobbies"]||[]).push([[0],{53:function(e,t,r){e.exports=r(89)},58:function(e,t,r){},59:function(e,t,r){},89:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(12),o=r.n(c),u=(r(58),r(121)),i=(r(59),r(26)),s=r(17),f=r(4),l=r.n(f),p=r(8),m=r(11),d=r(122),h=r(123),v=r(117),b=r(116),w=r(124),x=r(114),g=Object(x.a)((function(e){return{formControl:{margin:e.spacing(3)}}}));function j(e){var t=e.names,r=e.selectedNames,n=e.onCheckboxChange,c=g();return a.a.createElement(a.a.Fragment,null,a.a.createElement(h.a,{component:"fieldset",className:c.formControl},a.a.createElement(w.a,{component:"legend"},"Games"),a.a.createElement(b.a,{row:!0},t.map((function(e){return a.a.createElement(v.a,{key:e,label:e,control:a.a.createElement(d.a,{checked:r.has(e),onChange:function(e){return n&&n(e.currentTarget)},name:e})})})))))}var k=r(126),O=r(125),E=r(118),y=r(120),A=r(119),C=r(90),S=r(47),P=0;function R(){var e=new Map,t=new Set,r=function(){var e=void 0,t=void 0,r=0;return{add:function(n){var a={value:n};e||(e=a),t||(t=a),t.next=a,t=a,r+=1},pop:function(){if(!e)return e;var n=e;return(e=e.next)||(t=void 0),r-=1,n.value},clear:function(){e=void 0,t=void 0,r=0},peek:function(){var t;return null===(t=e)||void 0===t?void 0:t.value},get length(){return r}}}();return{init:function(){var e=arguments;return Object(p.a)(l.a.mark((function t(){var r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.length>0&&void 0!==e[0]?e[0]:1,t.abrupt("return",Promise.all(Array(r).fill().map(n)));case 2:case"end":return t.stop()}}),t)})))()},getIdleWorker:function(){return Object(p.a)(l.a.mark((function e(){var n,a,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=Object(i.a)(t),e.prev=1,n.s();case 3:if((a=n.n()).done){e.next=8;break}return o=a.value,e.abrupt("return",c(o));case 6:e.next=3;break;case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),n.e(e.t0);case 13:return e.prev=13,n.f(),e.finish(13);case 16:return e.abrupt("return",new Promise((function(e){return r.add((function(t){e(t)}))})));case 17:case"end":return e.stop()}}),e,null,[[1,10,13,16]])})))()},killWorkerId:function(r){var a=arguments;return Object(p.a)(l.a.mark((function c(){var o,u;return l.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:if(o=a.length>1&&void 0!==a[1]&&a[1],e.has(r)){c.next=3;break}return c.abrupt("return");case 3:return u=e.get(r),e.delete(u.id),t.delete(u.id),c.next=8,u.terminate();case 8:if(!o){c.next=10;break}return c.abrupt("return");case 10:return c.next=12,n();case 12:case"end":return c.stop()}}),c)})))()},freeWorkerId:function(n){e.has(n)&&(t.add(n),r.length&&r.pop()(c(n)))},terminate:function(){return Object(p.a)(l.a.mark((function n(){var a;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.clear(),r.clear(),a=Object(s.a)(e.values()),e.clear(),n.next=6,Promise.all(a.map((function(e){return e.terminate()})));case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}}),n)})))()}};function n(){return a.apply(this,arguments)}function a(){return(a=Object(p.a)(l.a.mark((function r(){var n;return l.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=Object(S.createWorker)({workerPath:"/jackbox-lobbies/tesseract/worker.min.js",workerBlobURL:!1,corePath:"/jackbox-lobbies"+"/tesseract/tesseract-core.".concat("object"===typeof WebAssembly?"wasm":"asm",".js")}),r.next=3,n.load();case 3:return r.next=5,n.loadLanguage("eng");case 5:return r.next=7,n.initialize("eng");case 7:return r.next=9,n.setParameters({tessjs_create_hocr:"0",tessjs_create_tsv:"0"});case 9:return e.set(n.id,n),t.add(n.id),r.abrupt("return",n);case 12:case"end":return r.stop()}}),r)})))).apply(this,arguments)}function c(r){var n=e.get(r);return t.delete(r),n}}var T=a.a.createContext();function _(e){var t=e.children,r=e.numWorkers,c=void 0===r?20:r,o=Object(n.useState)(),u=Object(m.a)(o,2),i=u[0],s=u[1];return Object(n.useEffect)((function(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.workersPoolSize,r=void 0===t?20:t,n=new Map,a=R();return{init:function(){return Object(p.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.init(r);case 2:case"end":return e.stop()}}),e)})))()},addRecognitionJob:function(e,t,r){function c(){return(c=Object(p.a)(l.a.mark((function c(){var o;return l.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,a.getIdleWorker();case 2:return o=c.sent,n.set(r,o.id),c.prev=4,c.next=7,o.recognize(e,t,r);case 7:return c.abrupt("return",c.sent);case 8:return c.prev=8,n.delete(r),a.freeWorkerId(o.id),c.finish(8);case 12:case"end":return c.stop()}}),c,null,[[4,,8,12]])})))).apply(this,arguments)}function o(){return(o=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.has(r)){e.next=2;break}return e.abrupt("return");case 2:t=n.get(r),n.delete(r),a.freeWorkerId(t);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r=r||"job-".concat(P++),[function(){return c.apply(this,arguments)}(),function(){return o.apply(this,arguments)}]},terminate:function(){return Object(p.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.clear(),e.next=3,a.terminate();case 3:case"end":return e.stop()}}),e)})))()}}}({workersPoolSize:c});e.init(),s(e)}),[c]),a.a.createElement(T.Provider,{value:i},i&&t)}T.displayName="ImageTextRecognitionContext";var W=Object(x.a)((function(e){return{root:{margin:e.spacing(1)},media:{width:480,height:270}}}));function K(e){var t=e.stream,r=e.gameName,c=W(),o=function(e){var t=Object(n.useState)({}),r=Object(m.a)(t,2),a=r[0],c=r[1];return Object(n.useEffect)((function(){if(e){var t=!1;return Object(p.a)(l.a.mark((function r(){var n;return l.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,L(e);case 2:if(n=r.sent,!t){r.next=5;break}return r.abrupt("return");case 5:c(n);case 6:case"end":return r.stop()}}),r)})))(),function(){return t=!0}}}),[e]),a}(t.thumbnail_url),u=o.blob,i=o.imgSrc,s=function(e,t){var r=Object(n.useContext)(T),a=Object(n.useState)(),c=Object(m.a)(a,2),o=c[0],u=c[1];return Object(n.useEffect)((function(){if(r&&e){var n=!1,a=r.addRecognitionJob(e,t),c=Object(m.a)(a,2),o=c[0],i=c[1];return Object(p.a)(l.a.mark((function e(){var t,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o;case 2:if(t=e.sent,r=t.data,!n){e.next=6;break}return e.abrupt("return");case 6:u(r);case 7:case"end":return e.stop()}}),e)})))(),function(){n=!0,i()}}}),[e,t,r]),o}(u),f=!s,d=null===s||void 0===s?void 0:s.lines.some((function(e){return e.text.match(/everybody|to start|same players|room|on your/i)}));if(!f&&!d)return a.a.createElement(a.a.Fragment,null);var h="https://twitch.tv/".concat(t.user_name.toLowerCase());return a.a.createElement(a.a.Fragment,null,a.a.createElement(O.a,{className:c.root,style:{opacity:d?1:.3,order:d?0:1}},a.a.createElement(E.a,{href:h,target:"_blank",rel:"noopener noreferrer"},a.a.createElement(A.a,{className:c.media,image:i||"https://via.placeholder.com/480x270?text=%E2%80%A6",title:"Click to watch ".concat(t.user_name," on Twitch")}),f&&a.a.createElement(k.a,null),a.a.createElement(y.a,{style:{display:"flex",flexDirection:"row"}},a.a.createElement(C.a,{variant:"body1",color:"textSecondary",component:"span"},r||t.user_name),a.a.createElement("span",{style:{flex:1}}),a.a.createElement(C.a,{variant:"body1",color:"textSecondary",component:"span"},"watching now: ",t.viewer_count)))))}function L(e){return N.apply(this,arguments)}function N(){return(N=Object(p.a)(l.a.mark((function e(t){var r,n,a,c,o,u,i,s=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=s.length>1&&void 0!==s[1]?s[1]:1920,n=s.length>2&&void 0!==s[2]?s[2]:1080,a=s.length>3&&void 0!==s[3]?s[3]:0,c=t.replace("{width}",r).replace("{height}",n),e.next=6,fetch(c,{cache:"reload"});case 6:if(o=e.sent,!(U(o.headers)>20&&a<8)){e.next=10;break}return e.abrupt("return",L(t,r+1,n,a+1));case 10:return e.next=12,o.blob();case 12:return u=e.sent,i=window.URL.createObjectURL(u),e.abrupt("return",{blob:u,imgSrc:i});case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(e){var t=1e3*function(e){var t=e.get("cache-control");if(!t)return 300;var r=new URLSearchParams(t).get("max-age");return r?+r:300}(e),r=new Date(e.get("expires")||Date.now()).getTime()-t;return(Date.now()-r)/1e3}var B=function(e){var t="",r=function(){return{"Client-ID":e,Authorization:"Bearer ".concat(t)}};return{getStreams:function(e,t){var n=this;return Object(p.a)(l.a.mark((function a(){var c,o,u,i,s;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=new URLSearchParams,e.forEach((function(e){return c.append("game_id",e)})),c.append("first","100"),t&&c.append("after",t),a.next=6,fetch("https://api.twitch.tv/helix/streams?"+c,{headers:r()});case 6:return o=a.sent,a.next=9,o.json();case 9:return u=a.sent,i=u.data,s=u.pagination,a.abrupt("return",{streams:i,fetchNext:function(){var t=Object(p.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",n.getStreams(e,s.cursor));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()});case 13:case"end":return a.stop()}}),a)})))()},getGames:function(e){return Object(p.a)(l.a.mark((function t(){var n,a,c,o;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=new URLSearchParams,e.forEach((function(e){return n.append("name",e)})),t.next=4,fetch("https://api.twitch.tv/helix/games?"+n,{headers:r()});case 4:return a=t.sent,t.next=7,a.json();case 7:return c=t.sent,o=c.data,t.abrupt("return",o||[]);case 10:case"end":return t.stop()}}),t)})))()},getAuthUrl:function(){var t=new URLSearchParams;return t.append("client_id",e),t.append("redirect_uri",window.location.origin+window.location.pathname),t.append("response_type","token"),t.append("scope",""),"https://id.twitch.tv/oauth2/authorize?"+t},handleAuthResponse:function(){var e=new URLSearchParams(window.location.hash.slice(1)).get("access_token");e&&(t=e)},hasAuth:function(){return!!t}}},J=a.a.createContext({twitchApi:B("r2000vj19f088smr120ej452wxlkrt")});function z(){var e=Object(n.useContext)(J).twitchApi;return e.handleAuthResponse(),e}var I=["DRAWFUL 2","THE JACKBOX PARTY PACK","THE JACKBOX PARTY PACK 2","THE JACKBOX PARTY PACK 3","THE JACKBOX PARTY PACK 4","THE JACKBOX PARTY PACK 5","THE JACKBOX PARTY PACK 6"];function M(){var e=z(),t=Object(n.useState)(new Set([])),r=Object(m.a)(t,2),c=r[0],o=r[1],i=Object(n.useState)([]),f=Object(m.a)(i,2),d=f[0],h=f[1],v=Object(n.useState)(new Map),b=Object(m.a)(v,2),w=b[0],x=b[1],g=Object(n.useState)([]),k=Object(m.a)(g,2),O=k[0],E=k[1],y=Object(n.useState)((function(){return function(){}})),A=Object(m.a)(y,2),C=A[0],S=A[1];return Object(n.useEffect)((function(){if(!c.size)return h([]),void x(new Map);var t=!1;return Object(p.a)(l.a.mark((function r(){var n;return l.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.getGames(c);case 2:if(n=r.sent,!t){r.next=5;break}return r.abrupt("return");case 5:h(n),x(new Map(n.map((function(e){return[e.id,e.name]}))));case 7:case"end":return r.stop()}}),r)})))(),function(){return t=!0}}),[e,c]),Object(n.useEffect)((function(){if(!d.length)return E([]),void S((function(){return function(){}}));var t=!1;function r(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];E(t?function(t){return H([].concat(Object(s.a)(t),Object(s.a)(e.streams)))}:e.streams),S((function(){return Object(p.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=r,t.next=3,e.fetchNext();case 3:return t.t1=t.sent,t.abrupt("return",(0,t.t0)(t.t1,!0));case 5:case"end":return t.stop()}}),t)})))}))}return Object(p.a)(l.a.mark((function n(){var a;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.getStreams(d.map((function(e){return e.id})));case 2:if(a=n.sent,!t){n.next=5;break}return n.abrupt("return");case 5:r(a);case 6:case"end":return n.stop()}}),n)})))(),function(){return t=!0}}),[e,d]),a.a.createElement(a.a.Fragment,null,a.a.createElement(_,null,a.a.createElement(j,{names:I,selectedNames:c,onCheckboxChange:function(e){var t=e.name,r=e.checked;o((function(e){var n=new Set(e);return r?n.add(t):n.delete(t),n}))}}),a.a.createElement("div",null,"Checking ",O.length," streams\u2026"),a.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},O.map((function(e){return a.a.createElement(K,{key:e.id,stream:e,gameName:w.get(e.game_id)})}))),a.a.createElement(u.a,{variant:"contained",size:"large",color:"primary",onClick:C,style:{position:"fixed",bottom:0}},"SHOW ME MOAR")))}function H(e){var t,r=new Map,n=Object(i.a)(e);try{for(n.s();!(t=n.n()).done;){var a=t.value;r.set(a.id,a)}}catch(c){n.e(c)}finally{n.f()}return Object(s.a)(r.values())}var D=function(){var e=z();return a.a.createElement("div",{className:"App"},e.hasAuth()?a.a.createElement(M,null):a.a.createElement(u.a,{color:"primary",variant:"contained",size:"large",href:e.getAuthUrl()},"Login"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[53,1,2]]]);
//# sourceMappingURL=main.6868675c.chunk.js.map