## BabyDay


> 背景：宝宝出生后，想着做一款比较漂亮的喂养数据记录工具，用于记录宝宝的日常数据，关心宝宝每天的成长。
> 项目地址：  http://www.wetalks.cn/babyDay
> github地址：https://github.com/liuyahuiZ/babyDay
> 主要功能：宝宝的信息录入，编辑、 每天的喂养记录数据、 喂养记录数据的管理、 喂养记录类型的管理、喂养记录数据可视化

#### 技术架构

前端目前是移动web版，基于React开发，UI组件是自主研发的neo-ui，icon字体化，
图表简单的调用了一下 阿里的图表库 F2

neo-ui地址 http://www.wetalks.cn/neo-ui/

后端Api是基于koa2+mongodb开发的 server-koa 
github地址 https://github.com/liuyahuiZ/server-koa

#### 效果图

##### 喂养部分

<div>
<img width='40%' src="http://neo-blick.oss-cn-shanghai.aliyuncs.com/698FC8EDC04BCCDBCE1A6ECFAD3C775C.png"/>
<img width='40%' src="http://neo-blick.oss-cn-shanghai.aliyuncs.com/9E1B4DF9F120784CD4344C3D95673E51.png"/>
</div>

<div>
<img width='40%' src="
http://neo-blick.oss-cn-shanghai.aliyuncs.com/47465BAF2A55AAFF844CD054FE84795E.png"/>
<img width='40%' src="http://neo-blick.oss-cn-shanghai.aliyuncs.com/C8C19B5E22F0283FE5FA6E2BAFB09B88.png"/>
</div>

<div>
<img width='40%' src="http://neo-blick.oss-cn-shanghai.aliyuncs.com/EC337A49835CD0DFB97CBB401C95297A.png"/>

</div>


##### 音乐部分

线上地址：http://www.wetalks.cn/babyDay/#/MusicCategory
后端api是调用该大神提供的网易音乐接口 https://github.com/Binaryify/NeteaseCloudMusicApi

<div>
<img width='40%' src="
http://neo-blick.oss-cn-shanghai.aliyuncs.com/3191559551068_.pic.jpg" />
<img width='40%' src="http://neo-blick.oss-cn-shanghai.aliyuncs.com/WX20190613-084052.png" />
</div>

<div>
<img width='40%' src="http://neo-blick.oss-cn-shanghai.aliyuncs.com/3201559551069_.pic.jpg"/>
<img width='40%' src="http://neo-blick.oss-cn-shanghai.aliyuncs.com/3211559551070_.pic.jpg"/>
</div>


#### 目录结构

```
├── cgiMock   接口模拟工具
│   ├── test.json 模拟文件
│   └── token.json
├── package-lock.json
├── package.json
├── readme.md
├── src
│   ├── App 项目主目录
│   │   ├── Allroutes.js  路由配置文件
│   │   ├── api 接口分离
│   │   ├── components 公用组件
│   │   ├── config  公用配置
│   │   ├── core  核心模块
│   │   ├── page  所有页面目录
│   │   ├── servise  服务层 请求，加密
│   │   ├── style  公用样式
│   │   └── utils  工具方法
│   ├── index.html
│   ├── index.js
│   └── neo UI框架
│       ├── Components 基础组件
│       ├── Parts 高阶组件
│       ├── Style 
│       ├── index.js
│       └── utils
├── test.sh
├── tools
│   └── localServer.js
├── webpack.config.js
└── webpack.config.pro.js
```