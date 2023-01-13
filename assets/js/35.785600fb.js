(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{493:function(s,t,a){"use strict";a.r(t);var n=a(30),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[s._v("由於公司近期購買四個專案回來開發並維護，但並未使用 ESLint 去規範程式碼。另外這些專案大概有三四個前端共同維護，在修改 code 時風格不同或者格式化配置不同而自動格式化更新代碼，導致提交時修改了與feature / bug 無關聯的 code ，導致 code review 困難。所以萌生導入代碼規範化的系統。")]),s._v(" "),t("p",[s._v("\b導入這套系統的好處:")]),s._v(" "),t("ul",[t("li",[s._v("code review 時能專注在檢查 feature or bug 的 code")]),s._v(" "),t("li",[s._v("保持專案代碼的風格與品質，方便開發者閱讀代碼")]),s._v(" "),t("li",[s._v("減少風格的不同帶來的維護成本")]),s._v(" "),t("li",[s._v("無需統一開發者的編輯器配置")]),s._v(" "),t("li",[s._v("甚至可引入公司全部前端專案, 進而達到風格一致性")])]),s._v(" "),t("h2",{attrs:{id:"插件說明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#插件說明"}},[s._v("#")]),s._v(" 插件說明")]),s._v(" "),t("h3",{attrs:{id:"eslint"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#eslint"}},[s._v("#")]),s._v(" ESLint")]),s._v(" "),t("p",[s._v("ESLint 是一種靜態掃描的工具，由於 JS 不像其他的靜態語言能夠在寫代碼時就知道哪邊錯誤並且報出錯誤訊息，使用 ESLint 方便我們控管 Javascript 程式碼的品質。")]),s._v(" "),t("blockquote",[t("p",[s._v("例如: \b強制使用 === 取代 ==")])]),s._v(" "),t("p",[s._v("而選擇 ESLint 的原因是插件非常豐富並且規則彈性，能夠依照團隊需求而去進行調整。")]),s._v(" "),t("h3",{attrs:{id:"husky"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#husky"}},[s._v("#")]),s._v(" husky")]),s._v(" "),t("p",[s._v("是一種可以操作 git hooks 的套件，方便我們在提交代碼時能夠執行某些腳本。"),t("br"),s._v("\n而使用 husky 是打算在 commit 之前執行 ESLint 而達到自動檢查代碼規範及自動格式化。\n但是執行後會發現除了提交的檔案執行 lint 外，連其他未提交的也一起被檢查了，所以我們需要 lint-staged 來解決這件事。")]),s._v(" "),t("h3",{attrs:{id:"lint-staged"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#lint-staged"}},[s._v("#")]),s._v(" lint-staged")]),s._v(" "),t("p",[s._v("能夠讓 lint 只檢查存在 git stage 區的檔案，這樣的話就能避免全部檔案跑 lint 的問題。")]),s._v(" "),t("h2",{attrs:{id:"配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置文件"}},[s._v("#")]),s._v(" 配置文件")]),s._v(" "),t("p",[s._v("由於公司前端框架是使用 Vue 來開發，所以本次將結合 Vue 進行代碼規範統一。")]),s._v(" "),t("h3",{attrs:{id:"eslint-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#eslint-2"}},[s._v("#")]),s._v(" ESLint")]),s._v(" "),t("p",[s._v("先安裝ESLint、Vue插件依賴")]),s._v(" "),t("blockquote",[t("p",[s._v("npm i -D eslint babel-eslint eslint-plugin-vue")])]),s._v(" "),t("ul",[t("li",[s._v("eslint: ESLint 核心代碼")]),s._v(" "),t("li",[s._v("babel-eslint: 使 ESLint 能夠在代碼被babel轉譯後運行")]),s._v(" "),t("li",[s._v("eslint-plugin-vue: Vue 與 ESLint 整合，使得 ESLint 能夠在 Vue 檔案上運行")])]),s._v(" "),t("p",[s._v("配置"),t("code",[s._v(".eslintrc.js")]),s._v("檔案:")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("module"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("root")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("parserOptions")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 定義ESLint的解析器")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("parser")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'babel-eslint'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("sourceType")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'module'")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 指定代碼的運行環境")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("env")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("browser")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("node")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("es6")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ESLint 推薦規則")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'eslint:recommended'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 繼承vue的標準特性")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'plugin:vue/essential'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("plugins")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'vue'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("rules")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 當使用第三方的SDK時，ESLint會報找不到，可以加入到globals，取消對這個的檢查")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("globals")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br")])]),t("h3",{attrs:{id:"standard-code-style"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#standard-code-style"}},[s._v("#")]),s._v(" Standard code style")]),s._v(" "),t("p",[s._v("由於公司其他專案也是使用 ESLint + Standard 標準，所以這邊規則會使用 "),t("a",{attrs:{href:"https://standardjs.com/rules-zhtw.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("Standard的規範"),t("OutboundLink")],1),s._v("。")]),s._v(" "),t("p",[s._v("安裝 Standard 依賴")]),s._v(" "),t("blockquote",[t("p",[s._v("npm i -D eslint-config-standard eslint-plugin-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise")])]),s._v(" "),t("ul",[t("li",[s._v("eslint-plugin-standard: ESLint 的 Standard 規則插件")]),s._v(" "),t("li",[s._v("eslint-config-standard: 關閉與 Standard 有衝突的 ESLint 規則")]),s._v(" "),t("li",[s._v("eslint-plugin-import,eslint-plugin-node,eslint-plugin-promise: "),t("code",[s._v("eslint-config-standard")]),s._v(" 的依賴，若未安裝則無法進行\b。")])]),s._v(" "),t("p",[s._v("修改上述"),t("code",[s._v(".eslintrc.js")]),s._v("配置:")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ESLint 推薦規則")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'eslint:recommended'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 繼承vue的標準特性")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'plugin:vue/essential'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 添加Standard規範")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'standard'")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("p",[s._v("若檔案不希望進行檢查，則可新增"),t("code",[s._v(".eslintignore")]),s._v("檔案")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("// .eslintignore\nbuild/*.js\nsrc/assets\npublic\ndist\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h3",{attrs:{id:"husky-lint-staged配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#husky-lint-staged配置"}},[s._v("#")]),s._v(" husky + lint-staged配置")]),s._v(" "),t("p",[s._v("先安裝套件")]),s._v(" "),t("blockquote",[t("p",[s._v("npm i -D husky lint-staged")])]),s._v(" "),t("p",[s._v("進行\b package.json 配置：")]),s._v(" "),t("div",{staticClass:"language-json line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"husky"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"hooks"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"pre-commit"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"lint-staged"')]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"lint-staged"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 需先進行 lint 檢查")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"src/**/*.{js,vue}"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"eslint --fix"')]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("h2",{attrs:{id:"執行流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#執行流程"}},[s._v("#")]),s._v(" 執行流程")]),s._v(" "),t("ol",[t("li",[s._v("提交代碼( git commit )")]),s._v(" "),t("li",[s._v("透過 husky 執行 pre-commit 的 git hooks，調用 lint-staged。")]),s._v(" "),t("li",[s._v("lint-staged 對儲存在 git stage 區域的檔案依序執行寫好的任務( ESLint )。")]),s._v(" "),t("li",[s._v("若有錯誤則停止任務，需修復完成後再執行步驟1。")]),s._v(" "),t("li",[s._v("若無錯誤則進行 git commit。")])]),s._v(" "),t("h2",{attrs:{id:"參考"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#參考"}},[s._v("#")]),s._v(" 參考")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://medium.com/@danielhu95/set-up-eslint-pipeline-zh-tw-990d7d9eb68e",target:"_blank",rel:"noopener noreferrer"}},[s._v("提升專案品質及一致性"),t("OutboundLink")],1),t("br"),s._v(" "),t("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/159729783",target:"_blank",rel:"noopener noreferrer"}},[s._v("Vue 项目接入 Eslint + Prettier + Husky 格式化代码"),t("OutboundLink")],1),t("br"),s._v(" "),t("a",{attrs:{href:"https://quasar.dev/quasar-cli/linter#Lint-Rules",target:"_blank",rel:"noopener noreferrer"}},[s._v("quasar Lint Rules"),t("OutboundLink")],1),t("br"),s._v(" "),t("a",{attrs:{href:"https://juejin.cn/post/6844903778227847181#heading-5",target:"_blank",rel:"noopener noreferrer"}},[s._v("eslint + husky + prettier + lint-staged 提升前端应用质量"),t("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=e.exports}}]);