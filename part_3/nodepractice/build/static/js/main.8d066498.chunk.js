(this.webpackJsonpreacttesting=this.webpackJsonpreacttesting||[]).push([[0],{41:function(t,e,n){},42:function(t,e,n){"use strict";n.r(e);var c=n(2),r=n.n(c),o=n(17),i=n.n(o),a=n(8),u=n(3),s=n(0),l=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(s.jsxs)("li",{className:"note",children:[e.content,Object(s.jsx)("button",{onClick:n,children:c})]})},j=n(6),f=n.n(j),b="/api/notes",d=function(){return f.a.get(b).then((function(t){return t.data}))},O=function(t){return f.a.post(b,t).then((function(t){return t.data}))},h=function(t,e){return f.a.put("".concat(b,"/").concat(t),e).then((function(t){return t.data}))},m=function(t){var e=t.message;return null===e?null:Object(s.jsx)("div",{className:"error",children:e})},p=function(){return Object(s.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16,textAlign:"center"},children:[Object(s.jsx)("br",{}),Object(s.jsx)("em",{children:"Note app, Department of Computar Sicence, University of Helsinki 2021"})]})},x=function(){var t=Object(c.useState)([]),e=Object(u.a)(t,2),n=e[0],r=e[1],o=Object(c.useState)(""),i=Object(u.a)(o,2),j=i[0],f=i[1],b=Object(c.useState)(!0),x=Object(u.a)(b,2),g=x[0],v=x[1],S=Object(c.useState)(null),k=Object(u.a)(S,2),y=k[0],w=k[1];Object(c.useEffect)((function(){d().then((function(t){r(t)}))}),[]);var C=g?n:n.filter((function(t){return!0===t.important}));return Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{children:"Notes"}),Object(s.jsx)(m,{message:y}),Object(s.jsxs)("button",{onClick:function(){return v(!g)},children:["show ",g?"important":"all"]}),Object(s.jsx)("ul",{children:C.map((function(t){return Object(s.jsx)(l,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),c=Object(a.a)(Object(a.a)({},e),{},{important:!e.important});h(t,c).then((function(e){console.log(e),r(n.map((function(n){return n.id!==t?n:e})))})).catch((function(c){w("the note ".concat(e.content," has already been deleted from the server")),setTimeout((function(){w(null)}),5e3),r(n.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(s.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:j,date:(new Date).toISOString(),important:Math.random()<.5};O(e).then((function(t){r(n.concat(t)),f("")}))},children:[Object(s.jsx)("input",{value:j,onChange:function(t){console.log(t.target.value),f(t.target.value)}}),Object(s.jsx)("button",{type:"submit",children:"save"})]}),Object(s.jsx)(p,{})]})};n(41);i.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(x,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.8d066498.chunk.js.map