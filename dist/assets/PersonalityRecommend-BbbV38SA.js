import{L as v}from"./ListCard-CKd1e577.js";import{_ as f}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{a as s,k as _,g as u,c as h,l as x,b as c,F as y,e as i,r as m,f as n,h as C}from"./index-Cmw_d75W.js";import{r as p}from"./request-qcfbbcHn.js";const w=["src"],B={__name:"SliderCard",props:{sliders:{type:[Object,Array],requered:!0}},setup(d){return(a,r)=>{const o=i("el-carousel-item"),l=i("el-carousel");return s(),_(l,{interval:3e3,type:"card",height:"230px"},{default:u(()=>[(s(!0),h(y,null,x(d.sliders,(e,t)=>(s(),_(o,{key:t},{default:u(()=>[c("img",{src:e.imageUrl},null,8,w)]),_:2},1024))),128))]),_:1})}}},k=f(B,[["__scopeId","data-v-26964dc1"]]),L={class:"title"},b={__name:"PersonalityRecommend",setup(d){const a=m([]),r=m([]),o=async()=>{const e=await p("/banner");a.value=e.data.banners},l=async()=>{const e=await p("/personalized",{limit:10});r.value=e.data.result};return o(),l(),(e,t)=>{const g=i("ArrowRightBold");return s(),h("div",null,[n(k,{sliders:a.value},null,8,["sliders"]),c("div",null,[c("h2",L,[t[0]||(t[0]=C(" 推荐歌单 ")),n(g,{style:{width:"25px",height:"25px"}})]),n(v,{listCardData:r.value},null,8,["listCardData"])])])}}},V=f(b,[["__scopeId","data-v-76c45358"]]);export{V as default};
