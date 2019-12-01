(this.webpackJsonptimer=this.webpackJsonptimer||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(5),c=n.n(i),o=(n(12),n(6)),s=n(1),u=n(2),l=n.n(u),f=n(3);n(14);function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=null,b=[500,250,500,250,500],v=[200],h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Timer";try{var t=window.speechSynthesis.getVoices().find((function(e){return"en-US"===e.lang})),n=new SpeechSynthesisUtterance("".concat(e," Finished\xa1"));n.voice=t||window.speechSynthesis.getVoices()[0],window.speechSynthesis.speak(n)}catch(r){}},w=function(e){try{window.navigator.vibrate(e)}catch(t){}},y=function(){var e=Object(f.a)(l.a.mark((function e(t,n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.serviceWorker.getRegistration();case 3:if(r=e.sent){e.next=6;break}return e.abrupt("return");case 6:r.showNotification(t,n),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,n){return e.apply(this,arguments)}}(),O=function(){var e=Object(f.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"Notification"in window&&"serviceWorker"in navigator){e.next=3;break}return e.abrupt("return");case 3:if("default"!==Notification.permission){e.next=6;break}return e.next=6,Notification.requestPermission();case 6:if("blocked"!==Notification.permission){e.next=8;break}return e.abrupt("return");case 8:if("granted"===Notification.permission){e.next=10;break}return e.abrupt("return");case 10:e.next=14;break;case 12:e.prev=12,e.t0=e.catch(0);case 14:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.minutes,n=void 0===t?0:t,a=e.seconds,i=void 0===a?0:a,c=Object(r.useState)({minutes:n,seconds:i}),o=Object(s.a)(c,2),u=o[0],l=o[1],f=Object(r.useState)({minutes:n,seconds:i}),p=Object(s.a)(f,2),g=p[0],j=p[1],k=Object(r.useState)("off"),E=Object(s.a)(k,2),S=E[0],x=E[1],T=function(e){var t=e.minutes,n=e.seconds;return t<=0&&n<=0},P=function(){x("off"),d&&(clearInterval(d),d=null),j(m({},u))},I=function(){x("pause"),clearInterval(d),d=null},D=function(){g.seconds<=0&&(g.minutes--,g.seconds=60),g.seconds--,j(m({},g)),T(g)&&(P(),h(),O(),y("Timer finished!",{body:"Timer finished!",tag:1,silent:!1,renotify:!0,vibrate:b}))},N=function(){"off"===S&&l(m({},g)),O(),w(v),d=setInterval(D,1e3),x("on")},F=function(e){j(e)};return{timer:m({},g,{status:S}),restartTimer:P,pauseTimer:I,playTimer:N,updateTimer:F}},j=function(){var e=Object(r.useState)(!1),t=Object(s.a)(e,2),n=t[0],a=t[1],i=Object(r.useState)({minutes:0,seconds:0}),c=Object(s.a)(i,2),o=c[0],u=c[1];return{form:m({},o,{active:n}),setActiveForm:a,setForm:u}};var k=function(){var e=g({minutes:1,seconds:0}),t=e.timer,n=e.restartTimer,r=e.pauseTimer,i=e.playTimer,c=e.updateTimer,o=j({minutes:0,seconds:0}),s=o.form,u=o.setForm,l=o.setActiveForm,f=function(e){return 1===String(e).length?"0".concat(e):e};return a.a.createElement("div",null,s.active?a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),c(s),l(!1)},onReset:function(e){e.preventDefault(),l(!1)}},a.a.createElement("input",{type:"number",min:"0",max:"59",placeholder:"minutes",onInput:function(e){return u(m({},s,{minutes:parseInt(e.target.value)}))},defaultValue:s.minutes}),a.a.createElement("input",{type:"number",min:"0",max:"59",step:"5",placeholder:"seconds",onInput:function(e){return u(m({},s,{seconds:parseInt(e.target.value)}))},defaultValue:s.seconds}),a.a.createElement("br",null),a.a.createElement("button",{type:"reset"},"cancelar"),a.a.createElement("button",{type:"submit"},"actualizar")):a.a.createElement("div",null,a.a.createElement("div",null,["off","pause"].includes(t.status)&&a.a.createElement("button",{onClick:function(){u(m({},t)),l(!0),console.log(t)}},"editar")),a.a.createElement("div",null,a.a.createElement("span",null,f(t.minutes)),":",a.a.createElement("span",null,f(t.seconds))),a.a.createElement("div",null,["on","pause"].includes(t.status)&&a.a.createElement("button",{onClick:n},"reiniciar"),["off","pause"].includes(t.status)&&a.a.createElement("button",{onClick:i},"play"),"on"===t.status&&a.a.createElement("button",{onClick:r},"pause"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,t,n){e.exports=n(15)}},[[7,1,2]]]);
//# sourceMappingURL=main.5a1c5ad4.chunk.js.map