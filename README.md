# 小程序模板
---
该项目是小程序模板    
使用了原生小程序、typescript、scss  
采用了官方封装的store、comptued、watch插件
├─page_template  
│      data.d.ts  
│      page_template.js   
│      page_template.json  
│      page_template.scss  
│      page_template.ts    
│      page_template.wxml  
│      page_template.wxss  
│      service.js  
│      service.ts  

1. 使用流程
    + git拉取
    + npm i 安装依赖
    + 微信开发者工具构建npm（构建失败就把node_modules复制到 miniprogram下）
    + 按照page_template文件夹下新建页面（这里是用组件渲染页面，所以app.json的pages数组需要自己手动添加）

2. 文件夹作用  
├─.vscode // vsCode配置 设置了sass  
├─miniprogram  
│  ├─custom-tab-bar // 自定义导航栏  
│  ├─miniprogram_npm // npm构建出来的文件夹   
│  │  ├─fast-deep-equal  
│  │  ├─lodash  
│  │  ├─miniprogram-computed  
│  │  ├─mobx-miniprogram  
│  │  ├─mobx-miniprogram-bindings  
│  │  └─rfdc   
│  ├─pages // 页面  
│  │  ├─error  
│  │  │  ├─404  
│  │  │  └─500  
│  │  ├─page_template  
│  │  │  ├─data.d.ts // 页面interface  
│  │  │  ├─page_template.js //ts编译生成  
│  │  │  ├─page_template.json   
│  │  │  ├─page_template.scss   
│  │  │  ├─page_template.ts    
│  │  │  ├─page_template.wxml  
│  │  │  ├─page_template.wxss // sass编译生成  
│  │  │  ├─service.js  
│  │  │  └─service.ts // 页面内请求  
│  │  └─store_and_computed // store与computed插件的使用  
│  ├─public  
│  │  ├─components // 全局自定义组件  
│  │  │  ├─project // 只适用于本项目  
│  │  │  └─public // 通用  
│  │  │      ├─drag_item // 行拖曳 与 drag_list 配合使用  
│  │  │      ├─drag_list // 行拖曳 与 drag_item 配合使用  
│  │  │      ├─ec-canvas // echarts
│  │  │      ├─empty // 没数据页面  
│  │  │      ├─form // 表单组件  
│  │  │      ├─load_more // 页底加载  
│  │  │      ├─navigator_bar // 自定义导航栏  
│  │  │      ├─navigator_btn // 导航栏上的按钮  
│  │  │      ├─painter // 绘制画笔  
│  │  │      ├─plates_number_input // 车牌输入组件
│  │  │      ├─table // table 表格  
│  │  │      ├─tabs // 滚动tabs组件  
│  │  │      ├─triangle // 三角形  
│  │  │      └─up_img // 上传图片  
│  │  ├─img // 本地图片  
│  │  ├─plugIn // npm上没有的插件   
│  │  ├─utils // 方法文件夹  
│  │  └─wxss // 全局scss  
│  └─store // 数据仓库  
│      ├─globalData // 全局数据  
│      └─other // 短信验证码数据  
├─node_modules  
└─typings   
    └─types  
        ├─wx   
        ├─component.d.ts // zml对微信component的ts注解的补充 （添加store与computed注解）  
        ├─global.d.ts // zml的全局自定义属性注解  
        └─index.d.ts // 微信的ts注解  



