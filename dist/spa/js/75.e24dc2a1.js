"use strict";(self["webpackChunkvadakkanchery"]=self["webpackChunkvadakkanchery"]||[]).push([[75],{8075:(e,a,l)=>{l.r(a),l.d(a,{default:()=>_});var t=l(3673);const n={class:"row flex justify-center"},o={class:"col-12 col-md-4"},s={class:"row"},r={class:"col"};function c(e,a,l,c,d,u){const i=(0,t.up)("q-select"),p=(0,t.up)("q-form"),m=(0,t.up)("q-card-section"),f=(0,t.up)("q-btn"),y=(0,t.up)("q-card-actions"),v=(0,t.up)("q-card"),w=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(w,{class:"q-pa-sm"},{default:(0,t.w5)((()=>[(0,t._)("div",n,[(0,t._)("div",o,[(0,t.Wm)(v,null,{default:(0,t.w5)((()=>[(0,t.Wm)(m,null,{default:(0,t.w5)((()=>[(0,t.Wm)(p,{ref:"form"},{default:(0,t.w5)((()=>[(0,t._)("div",s,[(0,t._)("div",r,[(0,t.Wm)(i,{label:e.selectFamilyLabel,options:e.familyOptions,modelValue:e.model.parent,"onUpdate:modelValue":[a[0]||(a[0]=a=>e.model.parent=a),e.onFamilyChange],outlined:"",square:"",dense:""},null,8,["label","options","modelValue","onUpdate:modelValue"])])])])),_:1},512)])),_:1}),(0,t.Wm)(y,null,{default:(0,t.w5)((()=>[e.parent?((0,t.wg)(),(0,t.j4)(f,{key:0,color:"primary",label:"Next",to:"/add"})):(0,t.kq)("",!0)])),_:1})])),_:1})])])])),_:1})}var d=l(8825),u=l(1768),i=l(556),p=l(1959);const m=(0,t.aZ)({setup(){const e=(0,d.Z)(),a=(0,p.iH)([]);(0,t.bv)((()=>{e.loading.show(),u.api.get("parents").then((e=>{a.value=e.data})).catch((e=>console.log(e))).finally((()=>e.loading.hide()))}));const l=(0,i.useStore)(),n=(0,p.Fl)((()=>"en"===l.state.lang)),o=(0,p.Fl)((()=>n.value?"Select Parent Family":"രക്ഷിതാക്കളെ തെരഞ്ഞെടുക്കുക ")),s=(0,p.Fl)((()=>l.state.parent)),r=(0,p.iH)({parent:null}),c=e=>{l.commit("setParent",e)};return{model:r,familyOptions:a,selectFamilyLabel:o,onFamilyChange:c,parent:s}}});var f=l(4260),y=l(4379),v=l(151),w=l(5589),g=l(5269),h=l(5969),k=l(9367),q=l(8240),Z=l(7518),b=l.n(Z);const F=(0,f.Z)(m,[["render",c]]),_=F;b()(m,"components",{QPage:y.Z,QCard:v.Z,QCardSection:w.Z,QForm:g.Z,QSelect:h.Z,QCardActions:k.Z,QBtn:q.Z})}}]);