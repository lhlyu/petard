(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{346:function(n,e,a){"use strict";a.r(e);var o=a(40),r=Object(o.a)({},(function(){var n=this,e=n.$createElement,a=n._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("h1",{attrs:{id:"lint-规则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lint-规则"}},[n._v("#")]),n._v(" lint 规则")]),n._v(" "),a("h2",{attrs:{id:"枚举"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#枚举"}},[n._v("#")]),n._v(" 枚举")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('"off"或者0    //关闭规则关闭\n"warn"或者1    //在打开的规则作为警告（不影响退出代码）\n"error"或者2    //把规则作为一个错误（退出代码触发时为1）\n')])])]),a("h2",{attrs:{id:"规则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#规则"}},[n._v("#")]),n._v(" 规则")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('"no-alert": 0,//禁止使用alert confirm prompt\n"no-array-constructor": 2,//禁止使用数组构造器\n"no-bitwise": 0,//禁止使用按位运算符\n"no-caller": 1,//禁止使用arguments.caller或arguments.callee\n"no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名\n"no-class-assign": 2,//禁止给类赋值\n"no-cond-assign": 2,//禁止在条件表达式中使用赋值语句\n"no-console": 2,//禁止使用console\n"no-const-assign": 2,//禁止修改const声明的变量\n"no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)\n"no-continue": 0,//禁止使用continue\n"no-control-regex": 2,//禁止在正则表达式中使用控制字符\n"no-debugger": 2,//禁止使用debugger\n"no-delete-var": 2,//不能对var声明的变量使用delete操作符\n"no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/\n"no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}\n"no-dupe-args": 2,//函数参数不能重复\n"no-duplicate-case": 2,//switch中的case标签不能重复\n"no-else-return": 2,//如果if语句里面有return,后面不能跟else语句\n"no-empty": 2,//块语句中的内容不能为空\n"no-empty-character-class": 2,//正则表达式中的[]内容不能为空\n"no-empty-label": 2,//禁止使用空label\n"no-eq-null": 2,//禁止对null使用==或!=运算符\n"no-eval": 1,//禁止使用eval\n"no-ex-assign": 2,//禁止给catch语句中的异常参数赋值\n"no-extend-native": 2,//禁止扩展native对象\n"no-extra-bind": 2,//禁止不必要的函数绑定\n"no-extra-boolean-cast": 2,//禁止不必要的bool转换\n"no-extra-parens": 2,//禁止非必要的括号\n"no-extra-semi": 2,//禁止多余的冒号\n"no-fallthrough": 1,//禁止switch穿透\n"no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.\n"no-func-assign": 2,//禁止重复的函数声明\n"no-implicit-coercion": 1,//禁止隐式转换\n"no-implied-eval": 2,//禁止使用隐式eval\n"no-inline-comments": 0,//禁止行内备注\n"no-inner-declarations": [2, "functions"],//禁止在块语句中使用声明（变量或函数）\n"no-invalid-regexp": 2,//禁止无效的正则表达式\n"no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量\n"no-irregular-whitespace": 2,//不能有不规则的空格\n"no-iterator": 2,//禁止使用__iterator__ 属性\n"no-label-var": 2,//label名不能与var声明的变量名相同\n"no-labels": 2,//禁止标签声明\n"no-lone-blocks": 2,//禁止不必要的嵌套块\n"no-lonely-if": 2,//禁止else语句内只有if语句\n"no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）\n"no-mixed-requires": [0, false],//声明时不能混用声明类型\n"no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格\n"linebreak-style": [0, "windows"],//换行风格\n"no-multi-spaces": 1,//不能用多余的空格\n"no-multi-str": 2,//字符串不能用\\换行\n"no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行\n"no-native-reassign": 2,//不能重写native对象\n"no-negated-in-lhs": 2,//in 操作符的左边不能有!\n"no-nested-ternary": 0,//禁止使用嵌套的三目运算\n"no-new": 1,//禁止在使用new构造一个实例后不赋值\n"no-new-func": 1,//禁止使用new Function\n"no-new-object": 2,//禁止使用new Object()\n"no-new-require": 2,//禁止使用new require\n"no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number\n"no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()\n"no-octal": 2,//禁止使用八进制数字\n"no-octal-escape": 2,//禁止使用八进制转义序列\n"no-param-reassign": 2,//禁止给参数重新赋值\n"no-path-concat": 0,//node中不能使用__dirname或__filename做路径拼接\n"no-plusplus": 0,//禁止使用++，--\n"no-process-env": 0,//禁止使用process.env\n"no-process-exit": 0,//禁止使用process.exit()\n"no-proto": 2,//禁止使用__proto__属性\n"no-redeclare": 2,//禁止重复声明变量\n"no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/\n"no-restricted-modules": 0,//如果禁用了指定模块，使用就会报错\n"no-return-assign": 1,//return 语句中不能有赋值表达式\n"no-script-url": 0,//禁止使用javascript:void(0)\n"no-self-compare": 2,//不能比较自身\n"no-sequences": 0,//禁止使用逗号运算符\n"no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名\n"no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用\n"no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格\n"no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]\n"no-sync": 0,//nodejs 禁止同步方法\n"no-ternary": 0,//禁止使用三目运算符\n"no-trailing-spaces": 1,//一行结束后面不要有空格\n"no-this-before-super": 0,//在调用super()之前不能使用this或super\n"no-throw-literal": 2,//禁止抛出字面量错误 throw "error";\n"no-undef": 1,//不能有未定义的变量\n"no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined\n"no-undefined": 2,//不能使用undefined\n"no-unexpected-multiline": 2,//避免多行表达式\n"no-underscore-dangle": 1,//标识符不能以_开头或结尾\n"no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;\n"no-unreachable": 2,//不能有无法执行的代码\n"no-unused-expressions": 2,//禁止无用的表达式\n"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数\n"no-use-before-define": 2,//未定义前不能使用\n"no-useless-call": 2,//禁止不必要的call和apply\n"no-void": 2,//禁用void操作符\n"no-var": 0,//禁用var，用let和const代替\n"no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注\n"no-with": 2,//禁用with\n\n"array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格\n"arrow-parens": 0,//箭头函数用小括号括起来\n"arrow-spacing": 0,//=>的前/后括号\n"accessor-pairs": 0,//在对象中使用getter/setter\n"block-scoped-var": 0,//块语句中使用var\n"brace-style": [1, "1tbs"],//大括号风格\n"callback-return": 1,//避免多次调用回调什么的\n"camelcase": 2,//强制驼峰法命名\n"comma-dangle": [2, "never"],//对象字面量项尾不能有逗号\n"comma-spacing": 0,//逗号前后的空格\n"comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾\n"complexity": [0, 11],//循环复杂度\n"computed-property-spacing": [0, "never"],//是否允许计算后的键名什么的\n"consistent-return": 0,//return 后面是否允许省略\n"consistent-this": [2, "that"],//this别名\n"constructor-super": 0,//非派生类不能调用super，派生类必须调用super\n"curly": [2, "all"],//必须使用 if(){} 中的{}\n"default-case": 2,//switch语句最后必须有default\n"dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾\n"dot-notation": [0, { "allowKeywords": true }],//避免不必要的方括号\n"eol-last": 0,//文件以单一的换行符结束\n"eqeqeq": 2,//必须使用全等\n"func-names": 0,//函数表达式必须有名字\n"func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式\n"generator-star-spacing": 0,//生成器函数*的前后空格\n"guard-for-in": 0,//for in循环要用if语句过滤\n"handle-callback-err": 0,//nodejs 处理错误\n"id-length": 0,//变量名长度\n"indent": [2, 4],//缩进风格\n"init-declarations": 0,//声明时必须赋初值\n"key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格\n"lines-around-comment": 0,//行前/行后备注\n"max-depth": [0, 4],//嵌套块深度\n"max-len": [0, 80, 4],//字符串最大长度\n"max-nested-callbacks": [0, 2],//回调嵌套深度\n"max-params": [0, 3],//函数最多只能有3个参数\n"max-statements": [0, 10],//函数内最多有几个声明\n"new-cap": 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用\n"new-parens": 2,//new时必须加小括号\n"newline-after-var": 2,//变量声明后是否需要空一行\n"object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格\n"object-shorthand": 0,//强制对象字面量缩写语法\n"one-var": 1,//连续声明\n"operator-assignment": [0, "always"],//赋值运算符 += -=什么的\n"operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首\n"padded-blocks": 0,//块语句内行首行尾是否要空行\n"prefer-const": 0,//首选const\n"prefer-spread": 0,//首选展开运算\n"prefer-reflect": 0,//首选Reflect的方法\n"quotes": [1, "single"],//引号类型 `` "" \'\'\n"quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号\n"radix": 2,//parseInt必须指定第二个参数\n"id-match": 0,//命名检测\n"require-yield": 0,//生成器函数必须有yield\n"semi": [2, "always"],//语句强制分号结尾\n"semi-spacing": [0, {"before": false, "after": true}],//分号前后空格\n"sort-vars": 0,//变量声明时排序\n"space-after-keywords": [0, "always"],//关键字后面是否要空一格\n"space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格\n"space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格\n"space-in-parens": [0, "never"],//小括号里面要不要有空格\n"space-infix-ops": 0,//中缀操作符周围要不要有空格\n"space-return-throw-case": 2,//return throw case后面要不要加空格\n"space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格\n"spaced-comment": 0,//注释风格要不要有空格什么的\n"strict": 2,//使用严格模式\n"use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()\n"valid-jsdoc": 0,//jsdoc规则\n"valid-typeof": 2,//必须使用合法的typeof的值\n"vars-on-top": 2,//var必须放在作用域顶部\n"wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格\n"wrap-regex": 0,//正则表达式字面量用小括号包起来\n"yoda": [2, "never"]//禁止尤达条件\n')])])])])}),[],!1,null,null,null);e.default=r.exports}}]);