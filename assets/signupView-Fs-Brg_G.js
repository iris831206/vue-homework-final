import{a as V,S as u}from"./sweetalert2.all-3AyHTPfb.js";import{r as d,g as C,d as p,h as l,o as b,b as n,F as i,a as e,t as m,f as h,i as k,u as x,e as g}from"./index-7vbtwaSz.js";const y=e("h2",{class:"formControls_txt"},"註冊帳號",-1),P=e("label",{class:"formControls_label",for:"email"},"Email",-1),q=e("label",{class:"formControls_label",for:"name"},"您的暱稱",-1),S=e("label",{class:"formControls_label",for:"pwd"},"密碼",-1),U=e("label",{class:"formControls_label",for:"pwd"},"再次輸入密碼",-1),B=e("input",{class:"formControls_btnSubmit",type:"submit",value:"註冊帳號"},null,-1),F="https://todolist-api.hexschool.io",D={__name:"signupView",setup(L){const c=x(),o=d({email:"",password:"",nickname:"",confirmPassword:""}),t=d(""),f={email:"required|email",nickname:"required",password:"required|min:6",confirmPassword:"confirmed:@password"},_=async()=>{try{await V.post(`${F}/users/sign_up`,o.value),t.value="註冊成功",u.fire({icon:"success",title:t.value,showConfirmButton:!1,timer:1500}),c.push("/")}catch{t.value="註冊失敗: 用戶已存在",u.fire({icon:"error",title:t.value})}};return(w,s)=>{const v=g("RouterLink");return b(),C(l(k),{class:"formControls",onSubmit:_,"validation-schema":f},{default:p(({errors:r})=>[y,P,n(l(i),{modelValue:o.value.email,"onUpdate:modelValue":s[0]||(s[0]=a=>o.value.email=a),class:"formControls_input",type:"text",id:"email",name:"email",placeholder:"請輸入 email",required:""},null,8,["modelValue"]),e("span",null,m(r.email),1),q,n(l(i),{modelValue:o.value.nickname,"onUpdate:modelValue":s[1]||(s[1]=a=>o.value.nickname=a),class:"formControls_input",type:"text",name:"nickname",id:"nickname",placeholder:"請輸入您的暱稱"},null,8,["modelValue"]),e("span",null,m(r.nickname?"暱稱為必填":""),1),S,n(l(i),{modelValue:o.value.password,"onUpdate:modelValue":s[2]||(s[2]=a=>o.value.password=a),class:"formControls_input",type:"password",name:"password",id:"password",placeholder:"請輸入密碼",required:""},null,8,["modelValue"]),e("span",null,m(r.password),1),U,n(l(i),{modelValue:o.value.confirmPassword,"onUpdate:modelValue":s[3]||(s[3]=a=>o.value.confirmPassword=a),class:"formControls_input",type:"password",name:"confirmPassword",id:"confirmPassword",placeholder:"請再次輸入密碼",required:""},null,8,["modelValue"]),e("span",null,m(r.confirmPassword?"您的密碼未相符":""),1),B,n(v,{to:"/",class:"formControls_btnLink"},{default:p(()=>[h("登入")]),_:1})]),_:1})}}};export{D as default};