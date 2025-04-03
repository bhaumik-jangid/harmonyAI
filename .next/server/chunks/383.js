exports.id=383,exports.ids=[383],exports.modules={14892:()=>{},20972:()=>{},37590:(e,t,r)=>{"use strict";r.d(t,{l$:()=>ed,Ay:()=>ec});var i,a=r(43210);let s={data:""},o=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||s,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let r="",i="",a="";for(let s in e){let o=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+o+";":i+="f"==s[1]?c(o,s):s+"{"+c(o,"k"==s[1]?"":t)+"}":"object"==typeof o?i+=c(o,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=o&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(s,o):s+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+i},p={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e},m=(e,t,r,i,a)=>{let s=u(e),o=p[s]||(p[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!p[o]){let t=s!==e?e:(e=>{let t,r,i=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?i.shift():t[3]?(r=t[3].replace(d," ").trim(),i.unshift(i[0][r]=i[0][r]||{})):i[0][t[1]]=t[2].replace(d," ").trim();return i[0]})(e);p[o]=c(a?{["@keyframes "+o]:t}:t,r?"":"."+o)}let m=r&&p.g?p.g:null;return r&&(p.g=p[o]),((e,t,r,i)=>{i?t.data=t.data.replace(i,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(p[o],t,i,m),o},f=(e,t,r)=>e.reduce((e,i,a)=>{let s=t[a];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+i+(null==s?"":s)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return m(r.unshift?r.raw?f(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,o(t.target),t.g,t.o,t.k)}h.bind({g:1});let b,g,y,v=h.bind({k:1});function x(e,t){let r=this||{};return function(){let i=arguments;function a(s,o){let n=Object.assign({},s),l=n.className||a.className;r.p=Object.assign({theme:g&&g()},n),r.o=/ *go\d+/.test(l),n.className=h.apply(r,i)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),y&&d[0]&&y(n),b(d,n)}return t?t(a):a}}var w=e=>"function"==typeof e,P=(e,t)=>w(e)?e(t):e,E=(()=>{let e=0;return()=>(++e).toString()})(),$=(()=>{let e;return()=>e})(),k=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return k(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},j=[],D={toasts:[],pausedAt:void 0},A=e=>{D=k(D,e),j.forEach(e=>{e(D)})},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},N=(e={})=>{let[t,r]=(0,a.useState)(D),i=(0,a.useRef)(D);(0,a.useEffect)(()=>(i.current!==D&&r(D),j.push(r),()=>{let e=j.indexOf(r);e>-1&&j.splice(e,1)}),[]);let s=t.toasts.map(t=>{var r,i,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(i=e[t.type])?void 0:i.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...t,toasts:s}},z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),C=e=>(t,r)=>{let i=z(t,e,r);return A({type:2,toast:i}),i.id},I=(e,t)=>C("blank")(e,t);I.error=C("error"),I.success=C("success"),I.loading=C("loading"),I.custom=C("custom"),I.dismiss=e=>{A({type:3,toastId:e})},I.remove=e=>A({type:4,toastId:e}),I.promise=(e,t,r)=>{let i=I.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?P(t.success,e):void 0;return a?I.success(a,{id:i,...r,...null==r?void 0:r.success}):I.dismiss(i),e}).catch(e=>{let a=t.error?P(t.error,e):void 0;a?I.error(a,{id:i,...r,...null==r?void 0:r.error}):I.dismiss(i)}),e};var M=(e,t)=>{A({type:1,toast:{id:e,height:t}})},S=()=>{A({type:5,time:Date.now()})},T=new Map,F=1e3,H=(e,t=F)=>{if(T.has(e))return;let r=setTimeout(()=>{T.delete(e),A({type:4,toastId:e})},t);T.set(e,r)},_=e=>{let{toasts:t,pausedAt:r}=N(e);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),i=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&I.dismiss(t.id);return}return setTimeout(()=>I.dismiss(t.id),r)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[t,r]);let i=(0,a.useCallback)(()=>{r&&A({type:6,time:Date.now()})},[r]),s=(0,a.useCallback)((e,r)=>{let{reverseOrder:i=!1,gutter:a=8,defaultPosition:s}=r||{},o=t.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...i?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[t]);return(0,a.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)H(e.id,e.removeDelay);else{let t=T.get(e.id);t&&(clearTimeout(t),T.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:M,startPause:S,endPause:i,calculateOffset:s}}},L=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,q=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,G=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,Y=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Z=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,J=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Z} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,K=x("div")`
  position: absolute;
`,Q=x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,V=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${V} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,X=({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return void 0!==t?"string"==typeof t?a.createElement(W,null,t):t:"blank"===r?null:a.createElement(Q,null,a.createElement(G,{...i}),"loading"!==r&&a.createElement(K,null,"error"===r?a.createElement(q,{...i}):a.createElement(J,{...i})))},ee=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,et=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=x("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ei=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ea=(e,t)=>{let r=e.includes("top")?1:-1,[i,a]=$()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ee(r),et(r)];return{animation:t?`${v(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},es=a.memo(({toast:e,position:t,style:r,children:i})=>{let s=e.height?ea(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(X,{toast:e}),n=a.createElement(ei,{...e.ariaProps},P(e.message,e));return a.createElement(er,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof i?i({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});i=a.createElement,c.p=void 0,b=i,g=void 0,y=void 0;var eo=({id:e,className:t,style:r,onHeightUpdate:i,children:s})=>{let o=a.useCallback(t=>{if(t){let r=()=>{i(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return a.createElement("div",{ref:o,className:t,style:r},s)},en=(e,t)=>{let r=e.includes("top"),i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:$()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...i}},el=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ed=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:i,children:s,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:d}=_(r);return a.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let o=r.position||t,n=en(o,d.calculateOffset(r,{reverseOrder:e,gutter:i,defaultPosition:t}));return a.createElement(eo,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?el:"",style:n},"custom"===r.type?P(r.message,r):s?s(r):a.createElement(es,{toast:r,position:o}))}))},ec=I},61135:()=>{},70440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var i=r(31658);let a=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,i.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},73029:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,86346,23)),Promise.resolve().then(r.t.bind(r,27924,23)),Promise.resolve().then(r.t.bind(r,35656,23)),Promise.resolve().then(r.t.bind(r,40099,23)),Promise.resolve().then(r.t.bind(r,38243,23)),Promise.resolve().then(r.t.bind(r,28827,23)),Promise.resolve().then(r.t.bind(r,62763,23)),Promise.resolve().then(r.t.bind(r,97173,23))},79109:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,16444,23)),Promise.resolve().then(r.t.bind(r,16042,23)),Promise.resolve().then(r.t.bind(r,88170,23)),Promise.resolve().then(r.t.bind(r,49477,23)),Promise.resolve().then(r.t.bind(r,29345,23)),Promise.resolve().then(r.t.bind(r,12089,23)),Promise.resolve().then(r.t.bind(r,46577,23)),Promise.resolve().then(r.t.bind(r,31307,23))},94431:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>l});var i=r(37413),a=r(22376),s=r.n(a),o=r(68726),n=r.n(o);r(61135);let l={title:"harmony AI",description:"AI stress relief GURU created using gemini API"};function d({children:e}){return(0,i.jsx)("html",{lang:"en",children:(0,i.jsx)("body",{className:`${s().variable} ${n().variable} antialiased`,children:e})})}}};