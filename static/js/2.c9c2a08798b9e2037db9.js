webpackJsonp([2],{121:function(n,e,r){e=n.exports=r(78)(),e.push([n.i,"\n.img-block .item {\n  float: left;\n  display: block;\n  box-sizing: border-box;\n  width: 50%;\n  height: 240px;\n  padding: 4px 2px 0 2px;\n}\n","",{version:3,sources:["D:/code/vue-study/src/components/wallpaper/wallpaper.vue"],names:[],mappings:";AACA;EACE,YAAY;EACZ,eAAe;EACf,uBAAuB;EACvB,WAAW;EACX,cAAc;EACd,uBAAuB;CACxB",file:"wallpaper.vue",sourcesContent:["\n.img-block .item {\n  float: left;\n  display: block;\n  box-sizing: border-box;\n  width: 50%;\n  height: 240px;\n  padding: 4px 2px 0 2px;\n}\n"],sourceRoot:""}])},126:function(n,e,r){var t=r(121);"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);r(79)("5dd75d5e",t,!0)},132:function(n,e){n.exports={render:function(){var n=this,e=n.$createElement,r=n._self._c||e;return r("div",[r("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:n.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-distance":"20","infinite-scroll-disabled":"busy"}},[r("div",{staticClass:"img-block clear-both"},n._l(n.imgData,function(n){return r("figure",{staticClass:"item"},[r("router-link",{attrs:{to:{name:"detail",params:{gallery_id:n.gallery_id}}}},[r("v-img",{attrs:{imageUrl:n.cover_url}})],1)],1)}))]),n._v(" "),r("transition",{attrs:{name:"fade"}},[r("router-view")],1)],1)},staticRenderFns:[]}},83:function(n,e,r){r(126);var t=r(0)(r(98),r(132),null,null);n.exports=t.exports},85:function(n,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{bgClass:"bg-"+this.size}},props:{imageUrl:{type:String},size:{type:String,default:"cover"}}}},86:function(n,e,r){e=n.exports=r(78)(),e.i(r(87),""),e.push([n.i,"\n","",{version:3,sources:[],names:[],mappings:"",file:"lazyImg.vue",sourceRoot:""}])},87:function(n,e,r){e=n.exports=r(78)(),e.push([n.i,"@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n.img[lazy=loading] {\r\n  background-size: 50%;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n.img[lazy=loaded] {\r\n  animation: fadeIn 0.5s\r\n}\r\n.img {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n}\r\n.bg-contain {\r\n  background-size: contain;\r\n}\r\n.bg-cover {\r\n  background-size: cover;\r\n}\r\n","",{version:3,sources:["D:/code/vue-study/src/components/img/img.less"],names:[],mappings:"AAAA;EACE;IACE,WAAW;GACZ;EACD;IACE,WAAW;GACZ;CACF;AACD;EACE,qBAAqB;EACrB,6BAA6B;EAC7B,4BAA4B;CAC7B;AACD;EACE,sBAAsB;CACvB;AACD;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,4BAA4B;EAC5B,6BAA6B;CAC9B;AACD;EACE,yBAAyB;CAC1B;AACD;EACE,uBAAuB;CACxB",file:"img.less",sourcesContent:["@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n.img[lazy=loading] {\r\n  background-size: 50%;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n.img[lazy=loaded] {\r\n  animation: fadeIn 0.5s\r\n}\r\n.img {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n}\r\n.bg-contain {\r\n  background-size: contain;\r\n}\r\n.bg-cover {\r\n  background-size: cover;\r\n}\r\n"],sourceRoot:""}])},88:function(n,e,r){var t=r(86);"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);r(79)("2336f87c",t,!0)},89:function(n,e,r){r(88);var t=r(0)(r(85),r(90),null,null);n.exports=t.exports},90:function(n,e){n.exports={render:function(){var n=this,e=n.$createElement;return(n._self._c||e)("span",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:n.imageUrl,expression:"imageUrl",arg:"background-image"}],staticClass:"img",class:n.bgClass,attrs:{lazy:"loading"}})},staticRenderFns:[]}},98:function(n,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(89),a=r.n(t);e.default={data:function(){return{page:1,imgData:[],busy:!1}},components:{vImg:a.a},methods:{loadMore:function(){var n=this;this.busy=!0,this.$store.commit("update_loading",!0),this.$http.jsonp("http://tu.duowan.com/index.php",{params:{r:"api/ajaxgallerys",page:this.page,pageSize:10,tag:32}}).then(function(e){n.imgData=n.imgData.concat(e.data.gallerys),n.$store.commit("update_loading",!1),n.busy=!1},function(n){console.log(n.state),alert("获取失败")}),this.page++}}}}});
//# sourceMappingURL=2.c9c2a08798b9e2037db9.js.map