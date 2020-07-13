# 项目目录结构

```text

├─.github
│  └─workflows    // 自动部署到github pages
├─config          // 配置
├─docs            // vuepress 文档 
├─public          
├─assets          // 资源
│  └─imgs
├─components      // 组件
│  ├─Article      // 文章组件
│  ├─Bg           // 背景
│  ├─Card         // 卡片(暂时无用)
│  ├─Comment      // 评论组件    
│  ├─Task         // 任务板(暂时无用)
│  ├─Time         // 时间
│  ├─Upload       // 图片上传
│  └─User         // 用户
├─directives      // 自定义指令
├─layout          // 布局
│  └─components   // 布局组件
│      ├─ASide    // 侧边栏 
│      ├─Footer   // 底部
│      └─Header   // 头部
├─mock            // mock数据  
├─router          // 路由相关 
├─store           // vuex
│  └─modules      // vuex模块 
│      ├─article 
│      └─layout
├─styles          // 统一样式
│  ├─common       // 公共
│  ├─components   // 组件样式
│  ├─layout       // 布局样式 
│  └─views        // 页面样式
├─utils           // 工具包
└─views           // 页面
    ├─article     // 文章 
    │  ├─category // 分类
    │  ├─edit     // 文章编辑
    │  └─list     // 文章列表 
    ├─board       // 仪表板
    ├─comment     // 评论
    ├─demo        // 示例 
    ├─errors      // 错误
    ├─login       // 登陆 
    ├─other       // 其他 
    │  ├─card   
    │  ├─gen
    │  └─task
    ├─profile     // 个人中心
    │  ├─info     // 基本信息
    │  └─quanta   // 配置管理
    └─user        // 用户管理

```

