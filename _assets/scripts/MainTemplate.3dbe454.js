"use strict";(self.webpackChunk_uiengine_ui=self.webpackChunk_uiengine_ui||[]).push([[214],{4724:function(t,e,i){i.r(e),i.d(e,{default:function(){return _}});var n=i(3225),a=i(569),o=i(938),s=i(8165),r=i(4815),c=i(5311),p=i(8906),l=i(393),d=i(1819),f=i(1545),u=i(7453);function h(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function v(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?h(Object(i),!0).forEach((function(e){(0,n.A)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):h(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var b={components:{ContentHeader:c.A,ContentText:p.A,ContentTag:d.A,ContentProperties:l.A,ContentPreview:f.A,ContentCode:u.A},mixins:[s.A,r.A],props:{id:{type:String,required:!0}},data:function(){return{activeSectionTop:null,activeSectionBottom:null}},computed:v(v({},(0,a.L8)("state",["config","pages"])),{},{page:function(){return this.pages[this.id]},hasProperties:function(){var t=this.page.properties;return t&&Object.keys(t).length>0},hasInfo:function(){return!!this.page.content},isInfoActive:function(){return"info"===this.activeSectionTop||!this.activeSectionTop&&this.hasInfo},isPropertiesActive:function(){return"properties"===this.activeSectionTop||!this.activeSectionTop&&!this.hasInfo&&this.hasProperties},hasPreview:function(){return!(!this.page.template&&!this.page.fragment)},hasCode:function(){return!!this.page.context},href:function(){return"".concat(window.UIengine.base,"_pages/").concat(this.currentTheme.id,"/").concat(this.page.id,".html")}}),methods:{tabId:function(t){return"".concat((0,o.dasherize)(this.page.id),"-").concat(t)},isTabActive:function(t){return this.activeSectionBottom===t||!this.activeSectionBottom&&("preview"===t&&this.hasPreview||"code"===t&&!this.hasPreview&&this.hasCode)},switchTabTop:function(t){this.activeSectionTop=t,this.$refs["".concat(t,"-tab")].focus()},switchTabBottom:function(t){this.activeSectionBottom=t,this.$refs["".concat(t,"-tab")].focus()}}},_=(0,i(9524).A)(b,(function(){var t=this,e=t._self._c;return e("div",[e("section",{staticClass:"page"},[e("ContentHeader",{attrs:{title:t.page.title}},[t._l(t.page.tags,(function(t){return e("ContentTag",{key:t,staticClass:"uie-sob-m",attrs:{tag:t}})})),t._v(" "),e("div",{staticClass:"contentheader__right"},[t.hasInfo&&t.hasProperties?e("div",{staticClass:"contentheader__options",attrs:{role:"tablist"}},[e("a",{ref:"info-tab",staticClass:"contentheader__option",attrs:{id:t.tabId("info"),"aria-selected":t.isInfoActive,tabindex:!t.isInfoActive&&"-1",role:"tab",href:"#info"},on:{click:function(e){e.preventDefault(),t.activeSectionTop="info"},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"right",39,e.key,["Right","ArrowRight"])||"button"in e&&2!==e.button?null:t.switchTabTop("properties")}}},[t._v("\n            "+t._s(t._f("localize")("options.info"))+"\n          ")]),t._v(" "),e("a",{ref:"properties-tab",staticClass:"contentheader__option",attrs:{id:t.tabId("properties"),"aria-selected":t.isPropertiesActive,tabindex:!t.isPropertiesActive&&"-1",role:"tab",href:"#properties"},on:{click:function(e){e.preventDefault(),t.activeSectionTop="properties"},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.switchTabTop("info")}}},[t._v("\n            "+t._s(t._f("localize")("options.properties"))+"\n          ")])]):t._e()])],2),t._v(" "),t.hasInfo||t.hasProperties?e("div",{staticClass:"uie-sot-xs"},[t.hasInfo?e("div",{staticClass:"contentsection",attrs:{"aria-labelledby":t.tabId("info"),hidden:!t.isInfoActive,role:"tabpanel"}},[e("ContentText",{attrs:{item:t.page}})],1):t._e(),t._v(" "),t.hasProperties?e("div",{staticClass:"contentsection",attrs:{"aria-labelledby":t.tabId("properties"),hidden:!t.isPropertiesActive,role:"tabpanel"}},[e("div",{staticClass:"content"},t._l(t.page.properties,(function(t,i){return e("ContentProperties",{key:i,attrs:{title:i,properties:t}})})),1)]):t._e()]):t._e(),t._v(" "),e("hr",{staticClass:"sections-divider"}),t._v(" "),e("ContentHeader",{staticClass:"uie-sob-m"},[e("div",{staticClass:"contentheader__right"},[t.hasPreview&&t.hasCode?e("div",{staticClass:"contentheader__options",attrs:{role:"tablist"}},[t._l(t.pluginActions,(function(i){return e("button",{key:i.title,ref:"plugin-action",refInFor:!0,staticClass:"contentheader__action",attrs:{title:i.title,"aria-label":i.title,href:"#"},on:{click:function(e){return e.preventDefault(),t.dispatchPluginEvent("click",i,e)}}},[i.icon?e("AppIcon",{attrs:{symbol:i.icon}}):e("span",[t._v("\n              "+t._s(i.title)+"\n            ")])],1)})),t._v(" "),t.displayAllThemes?t._e():e("a",{staticClass:"contentheader__action",attrs:{target:t._f("dasherize")(t.page.id),title:t._f("localize")("options.open_in_window"),href:t.href},on:{click:function(t){t.stopPropagation()}}},[e("AppIcon",{attrs:{symbol:"open-in-window"}})],1),t._v(" "),e("div",{staticClass:"contentheader__buttons"},[e("a",{ref:"preview-tab",staticClass:"contentheader__option",attrs:{id:t.tabId("preview"),"aria-selected":t.isTabActive("preview"),tabindex:!t.isTabActive("preview")&&"-1",href:"#",role:"tab"},on:{click:function(e){e.preventDefault(),t.activeSectionBottom="preview"}}},[t._v("\n              "+t._s(t._f("localize")("options.preview"))+"\n            ")]),t._v(" "),e("a",{ref:"code-tab",staticClass:"contentheader__option",attrs:{id:t.tabId("code"),"aria-selected":t.isTabActive("code"),tabindex:!t.isTabActive("code")&&"-1",href:"#",role:"tab"},on:{click:function(e){e.preventDefault(),t.activeSectionBottom="code"}}},[t._v("\n              "+t._s(t._f("localize")("options.code"))+"\n            ")]),t._v(" "),t._l(t.pluginTabs,(function(i){return e("a",{key:i.id,ref:"plugin-tab",refInFor:!0,staticClass:"contentheader__option",attrs:{id:t.tabId(i.id),"aria-selected":t.isTabActive(i.id),tabindex:!t.isTabActive(i.id)&&"-1","data-test-variant-tab-link":i.id,href:"#",role:"tab"},on:{click:function(e){e.preventDefault(),t.activeSectionBottom=i.id}}},[t._v("\n              "+t._s(i.title)+"\n            ")])}))],2)],2):t._e()])])],1),t._v(" "),t.hasPreview||t.hasCode?e("div",{staticClass:"uie-sot-xl"},[t.hasPreview?e("div",{staticClass:"contentsection",attrs:{"aria-labelledby":t.tabId("preview"),hidden:!t.isTabActive("preview"),role:"tabpanel"}},[e("ContentPreview",{ref:"preview",attrs:{id:t.id,title:t.page.title,"path-postfix":t.page.id,"path-prefix":"_pages"}})],1):t._e(),t._v(" "),t.hasCode?e("div",{staticClass:"contentsection",attrs:{"aria-labelledby":t.tabId("code"),hidden:!t.isTabActive("code"),role:"tabpanel"}},[e("ContentCode",{attrs:{extension:t.page.extension,context:t.page.context,"path-postfix":t.page.id,"path-prefix":"_pages"}})],1):t._e(),t._v(" "),t._l(t.pluginTabs,(function(i){return e("div",{key:i.id,ref:"plugin-tab-content",refInFor:!0,staticClass:"contentsection content",attrs:{"aria-labelledby":t.tabId(i.id),hidden:!t.isTabActive(i.id),role:"tabpanel"}},[t._v("\n      "+t._s(i.id)+"\n    ")])}))],2):t._e()])}),[],!1,null,"0e8f8c65",null).exports}}]);