(function(){"use strict";var t={4886:function(t,i,e){var o=e(9242),n=e(3396),a=e(7139),s=e.p+"img/logo.cd294876.jpg";const l={class:"container"},r=(0,n._)("img",{alt:"Home Cinema",src:s,class:"page__logo"},null,-1),d={key:0,class:"page__inner"},u={key:1,class:"page__inner"},c={key:0,class:"footer"},m={class:"container"};function h(t,i,e,o,s,h){const f=(0,n.up)("FilmView");return(0,n.wg)(),(0,n.iD)("div",{class:(0,a.C_)(["page",{"page_auth-loading":s.authLoading}])},[(0,n._)("div",l,[r,s.activeUserFilmList?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("div",d,[(0,n._)("button",{type:"button",class:"button",onClick:i[0]||(i[0]=t=>h.loadFilms("Нэйт"))},"Нэйт"),(0,n._)("button",{type:"button",class:"button",onClick:i[1]||(i[1]=t=>h.loadFilms("Алекс"))},"Алекс")])),s.activeUserFilmList?((0,n.wg)(),(0,n.iD)("div",u,[s.activeUserFilmList?((0,n.wg)(),(0,n.j4)(f,{key:0,author:s.activeUserFilmList},null,8,["author"])):(0,n.kq)("",!0),(0,n._)("button",{type:"button",class:"button button_theme_secondary",onClick:i[2]||(i[2]=(...t)=>h.goBack&&h.goBack(...t))},"Назад")])):(0,n.kq)("",!0)]),s.currentUser?((0,n.wg)(),(0,n.iD)("footer",c,[(0,n._)("div",m,[(0,n._)("div",{class:"user-email",onClick:i[3]||(i[3]=(...t)=>h.logOut&&h.logOut(...t))},(0,a.zw)(s.currentUser?.email),1)])])):(0,n.kq)("",!0)],2)}const f=t=>((0,n.dD)("data-v-51b09a68"),t=t(),(0,n.Cn)(),t),g={key:0,class:"film-box"},_={key:0},p={key:1,class:"film-box__inner"},w=f((()=>(0,n._)("p",null,"Фильмы загружены, пора сделать выбор!",-1))),v={class:"film-box__info"},b={class:"film-box__item-title"},y={class:"film-box__item-poster"},k=["src"],F={class:"film-box__actions"},M={key:1,type:"button",disabled:"",class:"button"},U={key:2,class:"modal"},C={key:0,class:"modal__error"},L={key:1,class:"modal"};function P(t,i,e,s,l,r){return(0,n.wg)(),(0,n.iD)("div",{class:(0,a.C_)(["film-view",{"film-view_loading":l.loading}])},[l.loading?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("div",g,[l.filmList.length?((0,n.wg)(),(0,n.iD)("div",p,[l.currentRandomFilm?((0,n.wg)(),(0,n.iD)(n.HY,{key:1},[(0,n.wy)((0,n._)("div",{class:(0,a.C_)(["film-box__item",{"film-box__item_viewed":l.currentRandomFilm.viewed}])},[(0,n._)("h1",b,(0,a.zw)(l.currentRandomFilm.name),1),(0,n._)("div",y,[l.currentRandomFilm.poster?((0,n.wg)(),(0,n.iD)("img",{key:0,class:"film-box__item-image",src:l.currentRandomFilm.poster,alt:""},null,8,k)):(0,n.kq)("",!0)])],2),[[o.F8,!t.changeFilm]]),(0,n._)("div",F,[l.currentRandomFilm.viewed?((0,n.wg)(),(0,n.iD)("button",M,"Уже просмотрен!")):((0,n.wg)(),(0,n.iD)("button",{key:0,type:"button",class:"button",onClick:i[1]||(i[1]=t=>r.setAlreadyViewed())},"Смотрим этот!")),(0,n._)("button",{type:"button",class:"button",onClick:i[2]||(i[2]=t=>r.getRandomFilm())},"Другой ›")])],64)):((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[w,(0,n._)("div",v,[(0,n._)("div",null,[(0,n.Uk)("Фильмов в списке: "),(0,n._)("i",null,(0,a.zw)(l.filmList.length),1)]),(0,n._)("div",null,[(0,n.Uk)("Всего посмотрено: "),(0,n._)("i",null,(0,a.zw)(r.viewedFilmsLength),1)])]),(0,n._)("button",{type:"button",class:"button",onClick:i[0]||(i[0]=t=>r.getRandomFilm())},"Погнали!")],64))])):((0,n.wg)(),(0,n.iD)("p",_,"Дэээмн, в этом списке пока нет фильмов, го добавлять!")),(0,n._)("button",{type:"button",class:"button button_theme_secondary",onClick:i[3]||(i[3]=t=>l.currentUser?l.showAddModal=!0:l.showAuthModal=!0)},"Добавить фильм"),l.showAddModal?((0,n.wg)(),(0,n.iD)("div",U,[l.modalErrorMessage?((0,n.wg)(),(0,n.iD)("p",C,(0,a.zw)(l.modalErrorMessage),1)):(0,n.kq)("",!0),(0,n._)("div",{class:(0,a.C_)(["modal__form",{modal__form_loading:l.addInProgress}])},[(0,n.wy)((0,n._)("input",{type:"text","onUpdate:modelValue":i[4]||(i[4]=t=>l.filmName=t),placeholder:"Название фильма"},null,512),[[o.nr,l.filmName]]),(0,n.wy)((0,n._)("input",{type:"text","onUpdate:modelValue":i[5]||(i[5]=t=>l.filmPoster=t),placeholder:"Ссылка на постер"},null,512),[[o.nr,l.filmPoster]]),(0,n._)("button",{type:"button",class:"button modal__form-submit",onClick:i[6]||(i[6]=t=>r.addFilm())},"Отправить"),(0,n._)("button",{type:"button",class:"button modal__form-close",onClick:i[7]||(i[7]=t=>l.showAddModal=!1)})],2)])):(0,n.kq)("",!0)])),l.showAuthModal?((0,n.wg)(),(0,n.iD)("div",L,[(0,n._)("div",{class:(0,a.C_)(["modal__form",{modal__form_loading:l.signInProgress}])},[(0,n.wy)((0,n._)("input",{type:"text","onUpdate:modelValue":i[8]||(i[8]=t=>l.authEmail=t),placeholder:"Email"},null,512),[[o.nr,l.authEmail]]),(0,n.wy)((0,n._)("input",{type:"password","onUpdate:modelValue":i[9]||(i[9]=t=>l.authPassword=t),placeholder:"Пароль"},null,512),[[o.nr,l.authPassword]]),(0,n._)("button",{type:"button",class:"button modal__form-submit",onClick:i[10]||(i[10]=t=>r.signIn())},"Войти"),(0,n._)("button",{type:"button",class:"button modal__form-close",onClick:i[11]||(i[11]=t=>l.showAuthModal=!1)})],2)])):(0,n.kq)("",!0)],2)}e(560);var A=e(4287),D=e(7795);const x=(0,D.ZF)({apiKey:"AIzaSyBBi-qazeRwtQ223P0Gfm01uiflzvjvSxk",authDomain:"home-cinema-28af0.firebaseapp.com",projectId:"home-cinema-28af0",storageBucket:"home-cinema-28af0.appspot.com",messagingSenderId:"642870991425",appId:"1:642870991425:web:05c0f861395d9758fec4c0",measurementId:"G-D7CZHB9FZY"}),E=(0,A.ad)(x);var I=e(4672),R={name:"FilmView",props:{author:{required:!0,type:String,validator(t){return["Нэйт","Алекс"].includes(t)}}},data(){return{filmList:[],loading:!0,currentRandomFilm:null,currentUser:(0,I.v0)().currentUser,showAuthModal:!1,authEmail:"",authPassword:"",signInProgress:!1,showAddModal:!1,filmName:"",filmPoster:"",addInProgress:!1,modalErrorMessage:""}},computed:{viewedFilmsLength(){return this.filmList.filter((t=>t.viewed)).length}},methods:{async getRandomFilm(){const t=this.currentRandomFilm?.id,i=Math.floor(Math.random()*this.filmList.length),e=this.filmList[i];t===e.id?this.getRandomFilm():(this.currentRandomFilm=null,this.changeFilm=!0,await(0,n.Y3)(),this.changeFilm=!1,this.currentRandomFilm=e)},async setAlreadyViewed(){if(this.checkAuth())try{await(0,A.r7)((0,A.JU)(E,"films",this.currentRandomFilm.id),{viewed:!0}),this.currentRandomFilm.viewed=!0}catch(t){alert(t)}},async addFilm(){if(!this.filmName)return void(this.modalErrorMessage="Название фильма обязательное");const t=this.filmList.find((t=>t.name===this.filmName));if(t)this.modalErrorMessage="Фильм с таким названием уже в списке";else{this.addInProgress=!0;try{await(0,A.ET)((0,A.hJ)(E,"films"),{name:this.filmName,author:this.author,poster:this.filmPoster,viewed:!1}),await this.loadFilms(),this.showAddModal=!1,this.filmName="",this.filmPoster=""}catch(i){alert(i)}finally{this.addInProgress=!1}}},signIn(){this.authEmail&&this.authPassword||(this.modalErrorMessage="Оба поля обязательны"),this.signInProgress=!0,(0,I.e5)((0,I.v0)(),this.authEmail,this.authPassword).then((t=>{this.currentUser=t.user,this.showAuthModal=!1})).catch((t=>{console.log(t)})).finally((()=>{this.signInProgress=!1}))},checkAuth(){return!!this.currentUser||(this.showAuthModal=!0,!1)},async loadFilms(){this.loading=!0;try{const t=(0,A.IO)((0,A.hJ)(E,"films"),(0,A.ar)("author","==",this.author)),i=await(0,A.PL)(t);this.filmList=[],i.forEach((t=>{const i=t.data();i.id=t.id,this.filmList.push(i)}))}catch(t){console.log(t)}finally{this.loading=!1}}},watch:{showAuthModal(){this.modalErrorMessage=""},showAddModal(){this.modalErrorMessage=""}},mounted(){this.loadFilms()}},O=e(89);const j=(0,O.Z)(R,[["render",P],["__scopeId","data-v-51b09a68"]]);var q=j,V={name:"App",components:{FilmView:q},data(){return{films:[],activeUserFilmList:null,currentUser:null,authLoading:!0}},methods:{loadFilms(t){this.activeUserFilmList=t},goBack(){this.activeUserFilmList=null},logOut(){const t=(0,I.v0)();(0,I.w7)(t).then((()=>{window.location.reload()})).catch((t=>{console.log(t)}))}},async mounted(){const t=(0,I.v0)();(0,I.Aj)(t,(t=>{t&&(this.currentUser=t),this.authLoading=!1}))}};const z=(0,O.Z)(V,[["render",h]]);var B=z;(0,o.ri)(B).mount("#app")}},i={};function e(o){var n=i[o];if(void 0!==n)return n.exports;var a=i[o]={exports:{}};return t[o].call(a.exports,a,a.exports,e),a.exports}e.m=t,function(){var t=[];e.O=function(i,o,n,a){if(!o){var s=1/0;for(u=0;u<t.length;u++){o=t[u][0],n=t[u][1],a=t[u][2];for(var l=!0,r=0;r<o.length;r++)(!1&a||s>=a)&&Object.keys(e.O).every((function(t){return e.O[t](o[r])}))?o.splice(r--,1):(l=!1,a<s&&(s=a));if(l){t.splice(u--,1);var d=n();void 0!==d&&(i=d)}}return i}a=a||0;for(var u=t.length;u>0&&t[u-1][2]>a;u--)t[u]=t[u-1];t[u]=[o,n,a]}}(),function(){e.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(i,{a:i}),i}}(),function(){e.d=function(t,i){for(var o in i)e.o(i,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:i[o]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)}}(),function(){e.p="/home-cinema/"}(),function(){var t={143:0};e.O.j=function(i){return 0===t[i]};var i=function(i,o){var n,a,s=o[0],l=o[1],r=o[2],d=0;if(s.some((function(i){return 0!==t[i]}))){for(n in l)e.o(l,n)&&(e.m[n]=l[n]);if(r)var u=r(e)}for(i&&i(o);d<s.length;d++)a=s[d],e.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return e.O(u)},o=self["webpackChunkhome_cinema"]=self["webpackChunkhome_cinema"]||[];o.forEach(i.bind(null,0)),o.push=i.bind(null,o.push.bind(o))}();var o=e.O(void 0,[998],(function(){return e(4886)}));o=e.O(o)})();
//# sourceMappingURL=app.3f424a59.js.map