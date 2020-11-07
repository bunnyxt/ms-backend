<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

<h1 align="center">
<b>ms-backend</b>
</h1>

<div align="center">
VOCALOID CHINA (VC) 里程碑(milestone, 简写为ms) 计划的后端API程序，基于Express + GraphQL + MySQL实现。
</div>

## 简介

VC里程碑计划是天钿Daily计划的一部分，致力于提供一个开放记录的B站VC相关视频达到关键播放数（殿堂、传说、神话等）时间的平台，任何人都可以在此平台添加、修改、查询视频播放记录。

截至本文档更新时（2020年11月8日），本项目仍在开发初期，平台需求、交互逻辑、接口设计、数据库设计还未最终确定，可能会发生较大改动。欢迎在GitHub上关注此项目，或加入QQ群[537793686](https://jq.qq.com/?_wv=1027&k=588s7nw) 与我们联系。欢迎各种讨论与建议！

## 环境

- `NodeJS` `v12.18.2`
- `MySQL` `v5.7.30`

## 运行

- 使用`git clone https://github.com/bunnyxt/ms-backend.git` 命令或网页端右上角绿色`Code -> Download ZIP` 按钮下载项目代码
- `cd ms-backend` 进入项目文件夹
- 修改`.env`文件中的配置项，参考[.env配置项说明](doc/dotenv.md)
- `npm install` 安装依赖
- `npm run dev` 在开发环境下运行，或`npm run start` 在生产环境下运行
